import { NextResponse } from "next/server";
import { siteConfig } from "@config";
import { docLangFor, mailLangFor, asNationality, NATIONALITIES, wireAccount, estimate as calcEstimate, estimateToText, type Estimate } from "@/lib/quote-pricing";
import { DEPOSIT, termsToText } from "@/lib/quote-terms";
import { usesXlsxTemplate } from "@/lib/quote-xlsx";

export const runtime = "nodejs";

type Quote = {
  date: string; groom: string; bride: string; phone: string; email: string; guests: string;
  time: string; venue: string; venueKey: string; flower: string; menu: string; video: string; wine: string; champagne: string; cake: string; bridalFlower: string; bouquet: string; mc: string; maleQuartet: string; stringQuartet: string; drink: string; noodles: string; canape: string; afterGuests: string; riceCake: string; method: string; budget: string; message: string; lang: string; sendCopy: string; nationality: string; nationalityOther: string; mailLang: string; visitDate: string; visitTime: string;
};

const FIELDS: (keyof Quote)[] = ["date", "groom", "bride", "phone", "email", "guests", "time", "venue", "venueKey", "flower", "menu", "video", "wine", "champagne", "cake", "bridalFlower", "bouquet", "mc", "maleQuartet", "stringQuartet", "drink", "noodles", "canape", "afterGuests", "riceCake", "method", "budget", "message", "lang", "sendCopy", "visitDate", "visitTime", "nationality", "nationalityOther"];

function clean(v: unknown, max = 500): string {
  return typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";
}

export function buildSubject(q: Quote): string {
  return `[견적 요청] ${q.date || "날짜 미정"} · ${q.groom} & ${q.bride} · ${q.guests || "?"}명`;
}

function nationalityLabel(q: Quote): string {
  if (q.nationality === "other") return q.nationalityOther ? `그 외 (${q.nationalityOther})` : "그 외 국가";
  return NATIONALITIES.find((n) => n.code === q.nationality)?.ko ?? "미입력";
}

export function buildBody(q: Quote): string {
  return [
    "Floating Island Wedding 견적 요청",
    "",
    `희망 날짜: ${q.date || "미정"}`,
    `신랑: ${q.groom}`,
    `신부: ${q.bride}`,
    `전화: ${q.phone}`,
    `이메일: ${q.email}`,
    `국적: ${nationalityLabel(q)}`,
    `예상 하객: ${q.guests || "미정"}`,
    `선호 시간: ${q.time || "미정"}`,
    `관심 공간: ${q.venue || "미정"}`,
    `선호 연락 방법: ${q.method || "미정"}`,
    `예산: ${q.budget || "미정"}`,
    `방문 상담 희망: ${q.visitDate || q.visitTime ? `${q.visitDate || "날짜 미정"} ${q.visitTime || "시간 미정"}` : "신청 안 함"}`,
    "",
    "추가 내용:",
    q.message || "(없음)",
    "",
    `답변 메일 언어: ${MAIL_LANG_KO[q.mailLang] || "한국어"} · 견적서 언어: ${q.lang === "en" ? "영문" : "국문"} · 접수 시각: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`,
  ].join("\n");
}

const won = (n: number) => n.toLocaleString("ko-KR");
const EMAIL_RE = /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/;

/**
 * 계약금 입금 계좌. 저장소가 공개이므로 계좌번호는 코드에 적지 않고 환경변수에서만 읽는다.
 * DEPOSIT_ACCOUNT_FLOATING (플로팅아일랜드 컨벤션·루프탑 가든), DEPOSIT_ACCOUNT_MARINA (마리나파크)
 * 예: "하나은행 000-000000-00000 (예금주 ㈜FIC)"
 */
function depositText(venueKey: string, lang: string): string {
  const en = lang === "en";
  const marina = venueKey === "marina";
  const account = (marina ? process.env.DEPOSIT_ACCOUNT_MARINA : process.env.DEPOSIT_ACCOUNT_FLOATING)?.trim();
  const name = marina ? (en ? "Marina Park" : "마리나파크") : (en ? "Floating Island" : "플로팅아일랜드");
  return en
    ? [
        "■ Deposit",
        `Deposit: KRW ${won(DEPOSIT)}. Your date is confirmed once the deposit is received.`,
        account ? `Wire transfer (${name}): ${wireAccount(account, marina)}` : `Account for ${name}: your coordinator will send it with the contract.`,
        "Please check the date with your coordinator before sending the deposit.",
      ].join("\n")
    : [
        "■ 계약금 안내",
        `계약금: ${won(DEPOSIT)}원 — 계약금 입금이 확인되면 예식일이 확정됩니다.`,
        account ? `${name} 입금 계좌: ${account}` : `${name} 입금 계좌: 담당자가 계약서와 함께 안내해 드립니다.`,
        "입금 전에 담당자와 예식 날짜·시간이 가능한지 먼저 확인해 주세요.",
      ].join("\n");
}

/** 한국어·영어 외 언어의 고객 안내 메일 문구 (엑셀 견적서는 영문으로 나간다) */
type MailText = {
  greet: (groom: string, bride: string) => string; intro: string; xlsx: string; recheck: string;
  visitTitle: string; visitReq: string; visitTbd: string; visitConfirm: string;
  date: string; dateTbd: string; allIn: string; noQuote: string; questions: string; sign: string; subject: string;
};
const MAIL_TEXT: Record<string, MailText> = {
  zh: {
    greet: (g, b) => `${g} · ${b} 您好，`,
    intro: "您好！我是 Floating Island 婚礼团队的 Rachel。感谢您咨询婚礼事宜。您填写的报价单已制作成 Excel 文件，请查收。",
    xlsx: "报价单（Excel，英文）下载",
    recheck: "※ 您希望的日期和时间段是否仍可预订，将由预订部再次确认后通知您。",
    visitTitle: "■ 到访咨询预约", visitReq: "您申请的到访时间", visitTbd: "日期待定",
    visitConfirm: "咨询确定后，我们会通过手机或邮件再次告知确认的日期和时间。",
    date: "婚礼日期", dateTbd: "待定",
    allIn: "各项目、金额、定金及汇款账户均已列在 Excel 报价单中。负责人将在一个工作日内与您联系。",
    noQuote: "我们将根据您的需求制作报价单，由负责人在一个工作日内与您联系。",
    questions: "咨询", sign: "Rachel | 婚礼团队", subject: "自助报价单",
  },
  ja: {
    greet: (g, b) => `${g} 様 · ${b} 様`,
    intro: "こんにちは。Floating Island ウェディングチームのレイチェルでございます。この度はご結婚式についてお問い合わせいただき、誠にありがとうございます。ご作成いただいたお見積書を Excel ファイルでお送りいたします。",
    xlsx: "お見積書（Excel・英語）のダウンロード",
    recheck: "※ ご希望の日時のご予約可否につきましては、予約担当より改めて確認のうえご案内いたします。",
    visitTitle: "■ ご来館相談のご予約", visitReq: "ご希望の来館日時", visitTbd: "日程未定",
    visitConfirm: "ご相談日が確定しましたら、お電話またはメールにて確定した日時を改めてご連絡いたします。",
    date: "挙式日時", dateTbd: "未定",
    allIn: "各項目・金額・内金・お振込先はすべて Excel のお見積書に記載しております。担当者より1営業日以内にご連絡いたします。",
    noQuote: "ご希望の内容に合わせてお見積書を作成し、担当者より1営業日以内にご連絡いたします。",
    questions: "お問い合わせ", sign: "レイチェル | ウェディングチーム", subject: "セルフお見積書",
  },
  vi: {
    greet: (g, b) => `Kính gửi anh ${g} và chị ${b},`,
    intro: "Xin chào! Tôi là Rachel thuộc đội ngũ tiệc cưới của Floating Island. Cảm ơn anh chị đã liên hệ về lễ cưới. Bảng báo giá anh chị đã lập được gửi dưới dạng tệp Excel.",
    xlsx: "Tải bảng báo giá (Excel, tiếng Anh)",
    recheck: "※ Bộ phận đặt chỗ sẽ kiểm tra lại xem ngày và giờ anh chị mong muốn còn trống hay không và sẽ thông báo cho anh chị.",
    visitTitle: "■ Đặt lịch tham quan và tư vấn", visitReq: "Thời gian anh chị đề nghị", visitTbd: "chưa xác định ngày",
    visitConfirm: "Khi lịch tư vấn được xác nhận, chúng tôi sẽ gửi lại ngày giờ chính thức qua điện thoại hoặc email.",
    date: "Ngày cưới", dateTbd: "chưa xác định",
    allIn: "Tất cả hạng mục, số tiền, tiền đặt cọc và tài khoản chuyển khoản đều có trong bảng báo giá Excel. Nhân viên phụ trách sẽ liên hệ với anh chị trong vòng một ngày làm việc.",
    noQuote: "Chúng tôi sẽ lập bảng báo giá theo nội dung anh chị mong muốn và nhân viên phụ trách sẽ liên hệ trong vòng một ngày làm việc.",
    questions: "Liên hệ", sign: "Rachel | Đội ngũ tiệc cưới", subject: "Bảng báo giá tự lập",
  },
  ms: {
    greet: (g, b) => `Kepada ${g} & ${b},`,
    intro: "Salam sejahtera. Saya Rachel daripada pasukan perkahwinan Floating Island. Terima kasih atas pertanyaan anda mengenai majlis perkahwinan. Sebut harga yang anda sediakan disertakan dalam bentuk fail Excel.",
    xlsx: "Muat turun sebut harga (Excel, bahasa Inggeris)",
    recheck: "※ Pejabat tempahan kami akan menyemak semula sama ada tarikh dan masa pilihan anda masih tersedia dan akan memaklumkan kepada anda.",
    visitTitle: "■ Tempahan lawatan dan konsultasi", visitReq: "Tarikh dan masa yang dimohon", visitTbd: "tarikh belum ditetapkan",
    visitConfirm: "Setelah konsultasi anda disahkan, kami akan menghantar semula tarikh dan masa yang disahkan melalui telefon bimbit atau e-mel.",
    date: "Tarikh majlis", dateTbd: "belum ditetapkan",
    allIn: "Semua butiran, jumlah, deposit dan akaun bank terdapat dalam fail sebut harga Excel. Penyelaras anda akan menghubungi anda dalam masa satu hari bekerja.",
    noQuote: "Kami akan menyediakan sebut harga mengikut apa yang anda rancangkan, dan penyelaras anda akan menghubungi anda dalam masa satu hari bekerja.",
    questions: "Pertanyaan", sign: "Rachel | Pasukan Perkahwinan", subject: "Sebut harga kendiri",
  },
  fr: {
    greet: (g, b) => `Bonjour ${g} et ${b},`,
    intro: "Je suis Rachel, de l'équipe mariage de Floating Island. Nous vous remercions de votre demande concernant votre mariage. Vous trouverez ci-dessous le devis que vous avez établi, au format Excel.",
    xlsx: "Télécharger le devis (Excel, en anglais)",
    recheck: "※ Notre service des réservations vérifiera de nouveau la disponibilité de la date et de l'horaire souhaités et vous en informera.",
    visitTitle: "■ Visite et rendez-vous de conseil", visitReq: "Date et heure souhaitées", visitTbd: "date à définir",
    visitConfirm: "Dès que votre rendez-vous sera confirmé, nous vous communiquerons de nouveau la date et l'heure définitives par téléphone ou par e-mail.",
    date: "Date du mariage", dateTbd: "à définir",
    allIn: "Toutes les prestations, les montants, l'acompte et les coordonnées bancaires figurent dans le devis Excel. Votre coordinatrice vous contactera sous un jour ouvré.",
    noQuote: "Nous établirons un devis selon vos souhaits et votre coordinatrice vous contactera sous un jour ouvré.",
    questions: "Contact", sign: "Rachel | Équipe mariage", subject: "Votre devis en ligne",
  },
  de: {
    greet: (g, b) => `Guten Tag ${g} und ${b},`,
    intro: "mein Name ist Rachel vom Hochzeitsteam von Floating Island. Vielen Dank für Ihre Anfrage zu Ihrer Hochzeit. Das von Ihnen erstellte Angebot erhalten Sie nachstehend als Excel-Datei.",
    xlsx: "Angebot herunterladen (Excel, auf Englisch)",
    recheck: "※ Unser Reservierungsbüro prüft noch einmal, ob Ihr Wunschtermin und Ihre Wunschzeit verfügbar sind, und gibt Ihnen Bescheid.",
    visitTitle: "■ Besichtigung und Beratungstermin", visitReq: "Gewünschter Termin", visitTbd: "Datum noch offen",
    visitConfirm: "Sobald Ihr Beratungstermin bestätigt ist, teilen wir Ihnen Datum und Uhrzeit nochmals telefonisch oder per E-Mail mit.",
    date: "Hochzeitstermin", dateTbd: "noch offen",
    allIn: "Alle Positionen, Beträge, die Anzahlung und die Bankverbindung finden Sie im Excel-Angebot. Ihre Ansprechpartnerin meldet sich innerhalb eines Werktags bei Ihnen.",
    noQuote: "Wir erstellen ein Angebot nach Ihren Wünschen; Ihre Ansprechpartnerin meldet sich innerhalb eines Werktags bei Ihnen.",
    questions: "Kontakt", sign: "Rachel | Hochzeitsteam", subject: "Ihr Online-Angebot",
  },
  it: {
    greet: (g, b) => `Gentili ${g} e ${b},`,
    intro: "sono Rachel, del team matrimoni di Floating Island. Vi ringraziamo per la richiesta relativa al vostro matrimonio. Di seguito trovate il preventivo che avete compilato, in formato Excel.",
    xlsx: "Scarica il preventivo (Excel, in inglese)",
    recheck: "※ Il nostro ufficio prenotazioni verificherà nuovamente la disponibilità della data e dell'orario desiderati e vi informerà.",
    visitTitle: "■ Visita e consulenza", visitReq: "Data e ora richieste", visitTbd: "data da definire",
    visitConfirm: "Non appena la consulenza sarà confermata, vi comunicheremo nuovamente la data e l'ora definitive per telefono o via e-mail.",
    date: "Data del matrimonio", dateTbd: "da definire",
    allIn: "Tutte le voci, gli importi, l'acconto e le coordinate bancarie sono riportati nel preventivo Excel. La vostra coordinatrice vi contatterà entro un giorno lavorativo.",
    noQuote: "Prepareremo un preventivo in base ai vostri desideri e la vostra coordinatrice vi contatterà entro un giorno lavorativo.",
    questions: "Contatti", sign: "Rachel | Team matrimoni", subject: "Il vostro preventivo online",
  },
  hi: {
    greet: (g, b) => `प्रिय ${g} और ${b},`,
    intro: "नमस्ते! मैं फ़्लोटिंग आइलैंड की वेडिंग टीम से रेचल हूँ। अपने विवाह के बारे में पूछताछ करने के लिए धन्यवाद। आपके द्वारा तैयार किया गया कोटेशन एक्सेल फ़ाइल के रूप में भेज रही हूँ।",
    xlsx: "कोटेशन डाउनलोड करें (एक्सेल, अंग्रेज़ी में)",
    recheck: "※ आपकी पसंद की तारीख़ और समय उपलब्ध है या नहीं, इसकी हमारा आरक्षण कार्यालय दोबारा जाँच करके आपको सूचित करेगा।",
    visitTitle: "■ भेंट और परामर्श की बुकिंग", visitReq: "आपके द्वारा चुना गया समय", visitTbd: "तारीख़ तय नहीं",
    visitConfirm: "परामर्श की पुष्टि होते ही हम मोबाइल या ईमेल से पक्की तारीख़ और समय दोबारा भेजेंगे।",
    date: "विवाह की तारीख़", dateTbd: "तय नहीं",
    allIn: "सभी मदें, राशि, अग्रिम राशि और बैंक खाते का विवरण एक्सेल कोटेशन में दिया गया है। हमारे समन्वयक एक कार्यदिवस के भीतर आपसे संपर्क करेंगे।",
    noQuote: "आपकी योजना के अनुसार हम कोटेशन तैयार करेंगे और हमारे समन्वयक एक कार्यदिवस के भीतर आपसे संपर्क करेंगे।",
    questions: "संपर्क", sign: "रेचल | वेडिंग टीम", subject: "आपका सेल्फ़ कोटेशन",
  },
};
const MAIL_LANG_KO: Record<string, string> = { ko: "한국어", en: "영어", zh: "중국어", ja: "일본어", vi: "베트남어", ms: "말레이어", fr: "프랑스어", de: "독일어", it: "이탈리아어", hi: "힌디어" };

/** 고객에게 보내는 견적서 메일 본문 (견적 + 계약금·계좌 + 계약 규정) */
export function buildCustomerText(q: Quote, estimate: Estimate | null): string {
  const en = q.lang === "en";
  // 컨벤션·루프탑 가든: 견적서 엑셀을 받는 링크 (선택 내용과 신랑·신부 이름만 담고, 연락처·메일은 넣지 않는다)
  const xlsxLink = usesXlsxTemplate(q.venueKey)
    ? `https://www.floatingislandwedding.com/api/quote/xlsx?${new URLSearchParams(
        Object.fromEntries(
          (["venueKey", "guests", "date", "time", "flower", "menu", "video", "wine", "champagne", "cake", "bouquet", "mc", "maleQuartet", "stringQuartet", "drink", "noodles", "riceCake", "canape", "afterGuests", "groom", "bride"] as const)
            .map((k) => [k, q[k]] as [string, string])
            .concat([["docLang", q.lang]])
            .filter(([, v]) => v),
        ),
      ).toString()}`
    : "";
  const c = siteConfig.contact;
  const T = MAIL_TEXT[q.mailLang];
  if (T) {
    return [
      T.greet(q.groom, q.bride),
      "",
      T.intro,
      ...(xlsxLink ? ["", `${T.xlsx}: ${xlsxLink}`] : []),
      "",
      T.recheck,
      "",
      ...(q.visitDate || q.visitTime
        ? [T.visitTitle, `${T.visitReq}: ${q.visitDate || T.visitTbd} ${q.visitTime || ""}`.trim(), T.visitConfirm, ""]
        : []),
      `${T.date}: ${q.date || T.dateTbd}${q.time ? ` ${q.time}` : ""} · ${q.venue}`,
      xlsxLink ? T.allIn : T.noQuote,
      "",
      `${T.questions}: ${c.phoneIntl} · ${c.email} · WhatsApp ${c.whatsappDisplay}`,
      "",
      T.sign,
      "Floating Island Wedding — https://www.floatingislandwedding.com",
    ].join("\n");
  }
  return [
    en ? `Dear ${q.groom} & ${q.bride},` : `${q.groom} · ${q.bride} 님께,`,
    "",
    en
      ? xlsxLink
        ? "Hello, this is Rachel from the Floating Island wedding team. Thank you for your wedding inquiry. Please find your quote in the Excel sheet below."
        : "Hello, this is Rachel from the Floating Island wedding team. Thank you for your inquiry. Here is a summary of what you sent us."
      : xlsxLink
        ? "안녕하세요? 플로팅아일랜드의 웨딩팀 레이첼입니다. 예식 문의해 주셔서 감사합니다. 작성하신 견적서를 엑셀 파일로 보내 드립니다."
        : "안녕하세요? 플로팅아일랜드의 웨딩팀 레이첼입니다. 문의해 주셔서 감사합니다. 보내 주신 내용을 아래와 같이 확인했습니다.",
    ...(xlsxLink ? ["", en ? `Quote sheet (Excel): ${xlsxLink}` : `견적서 엑셀 파일 받기: ${xlsxLink}`] : []),
    "",
    en
      ? "※ Whether your preferred date and time are still available will be checked again by our reservations office, who will let you know."
      : "※ 원하신 날짜와 시간대의 예약 마감 여부는 예약실에서 다시 확인해 안내해 드립니다.",
    "",
    ...(q.visitDate || q.visitTime
      ? [
          en ? "■ Visit and consultation" : "■ 방문 상담 예약",
          en
            ? `Requested: ${q.visitDate || "date to be decided"} ${q.visitTime || ""}`.trim()
            : `신청하신 방문 일시: ${q.visitDate || "날짜 미정"} ${q.visitTime || ""}`.trim(),
          en
            ? "Once your consultation is confirmed, we will send the confirmed date and time again by mobile or email."
            : "예식 상담이 확정되면 핸드폰이나 메일로 상담 시간과 확정 날짜를 다시 보내 드립니다.",
          "",
        ]
      : []),
    en ? `Date: ${q.date || "undecided"}${q.time ? ` ${q.time}` : ""} · ${q.venue}` : `예식 일시: ${q.date || "미정"}${q.time ? ` ${q.time}` : ""} · ${q.venue}`,
    en
      ? xlsxLink
        ? "All items, amounts, the deposit and the account are in the Excel quote sheet. Your coordinator will contact you within one business day."
        : "We will prepare a quotation for what you have in mind, and your coordinator will contact you within one business day."
      : xlsxLink
        ? "항목·금액·계약금·입금 계좌는 엑셀 견적서에 모두 들어 있습니다. 담당자가 영업일 기준 1일 안에 연락드립니다."
        : "원하시는 내용에 맞춰 견적서를 만들어, 담당자가 영업일 기준 1일 안에 연락드립니다.",
    "",
    en
      ? `Questions: ${c.phoneIntl} · ${c.email} · WhatsApp ${c.whatsappDisplay}`
      : `문의: ${c.phone} · ${c.email} · WhatsApp ${c.whatsappDisplay}`,
    "",
    en ? "Rachel | Wedding Team" : "레이첼 | 웨딩팀",
    "Floating Island Wedding — https://www.floatingislandwedding.com",
  ].join("\n");
}

/**
 * 견적 요청 접수. 전송 경로(순서대로 시도):
 * 1) RESEND_API_KEY 가 있으면 Resend API 로 QUOTE_TO(기본: site.config contact.email)에 메일 발송
 * 2) 없으면 FormSubmit(formsubmit.co) AJAX 엔드포인트로 같은 주소에 발송 — 첫 수신 시 받은편지함에서 1회 활성화 필요
 * 3) 둘 다 실패하면 클라이언트가 mailto 로 폴백할 수 있도록 { ok:false, mailto } 반환
 */
export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }
  // 허니팟(봇 차단)
  if (clean(raw.website)) return NextResponse.json({ ok: true, via: "honeypot" });

  const q = Object.fromEntries(FIELDS.map((k) => [k, clean(raw[k], k === "message" ? 2000 : 200)])) as Quote;
  // 답변 메일과 견적서의 언어: 영문 이름·해외 전화번호면 영문, 한글 이름이면 국문
  const siteLang = q.lang;
  q.nationality = asNationality(q.nationality);
  // 견적서(엑셀)는 국문·영문 두 가지, 메일은 한국어·영어·중국어 세 가지
  q.lang = docLangFor(q.nationality, q.groom, q.bride, q.phone, siteLang);
  q.mailLang = mailLangFor(q.nationality, q.groom, q.bride, q.phone, siteLang);
  if (!q.groom || !q.bride || !q.phone || !EMAIL_RE.test(q.email)) {
    return NextResponse.json({ ok: false, error: "missing required" }, { status: 400 });
  }

  const to = process.env.QUOTE_TO || siteConfig.contact.email;
  // 자동 예상 견적: 단가를 알고 있는 공간(플로팅아일랜드 컨벤션·마리나파크)만 계산한다.
  const estimate = calcEstimate({
    venueKey: q.venueKey, guests: q.guests, date: q.date, time: q.time, flower: q.flower, menu: q.menu,
    video: q.video === "on", wine: q.wine === "on", champagne: q.champagne === "on", cake: q.cake === "on", bridalFlower: q.bridalFlower === "on", bouquet: q.bouquet === "on", mc: q.mc, maleQuartet: q.maleQuartet === "on", stringQuartet: q.stringQuartet === "on", drink: q.drink === "on", noodles: q.noodles === "on", canape: q.canape, afterGuests: q.afterGuests, riceCake: q.riceCake === "on", lang: q.lang,
  });
  const subject = buildSubject(q);
  const text = buildBody(q) + (estimate ? `\n\n${estimateToText(estimate)}` : "");
  const wantsCopy = q.sendCopy === "on" && EMAIL_RE.test(q.email);
  const MT = MAIL_TEXT[q.mailLang];
  const customerSubject = MT
    ? `[Floating Island Wedding] ${MT.subject} — ${q.date || MT.dateTbd}`
    : q.lang === "en"
    ? `[Floating Island Wedding] Your self quote — ${q.date || "date undecided"}`
    : `[Floating Island Wedding] 셀프 견적서 — ${q.date || "날짜 미정"}`;
  const customerText = buildCustomerText(q, estimate);
  const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

  // 1) Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.QUOTE_FROM || "Floating Island Wedding <onboarding@resend.dev>",
          to: [to],
          reply_to: q.email || undefined,
          subject,
          text,
        }),
      });
      if (r.ok) {
        let copy: "sent" | "failed" | "none" = "none";
        if (wantsCopy) {
          const c = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from: process.env.QUOTE_FROM || "Floating Island Wedding <onboarding@resend.dev>",
              to: [q.email],
              reply_to: to,
              subject: customerSubject,
              text: customerText,
            }),
          }).catch(() => null);
          copy = c?.ok ? "sent" : "failed";
        }
        return NextResponse.json({ ok: true, via: "resend", copy, estimate });
      }
    } catch {
      /* fall through */
    }
  }

  // 2) FormSubmit — 서버에서 보내면 FormSubmit 이 거절하므로(브라우저 요청만 허용),
  //    보낼 내용을 만들어 돌려주고 브라우저(QuoteForm)가 직접 전송한다.
  const relay = {
    url: `https://formsubmit.co/ajax/${to}`,
    payload: {
      _subject: subject,
      _template: "box",
      _replyto: q.email || undefined,
      ...(wantsCopy ? { _cc: q.email } : {}),
      희망날짜: q.date, 신랑: q.groom, 신부: q.bride, 전화: q.phone, 이메일: q.email, 국적: nationalityLabel(q), 예상하객: q.guests,
      선호시간: q.time, 관심공간: q.venue, 연락방법: q.method, 예산: q.budget, 방문상담희망: `${q.visitDate} ${q.visitTime}`.trim() || "신청 안 함", 추가내용: q.message, 답변메일언어: MAIL_LANG_KO[q.mailLang] || q.mailLang, 견적서언어: q.lang,
      자동견적: estimate ? estimateToText(estimate) : "해당 없음",
      ...(wantsCopy ? { 견적서_및_계약규정: customerText } : {}),
      // 웨딩팀(레이첼)이 엑셀 견적서를 다시 만들어 첨부 답장할 때 쓰는 원본 선택값
      견적데이터: JSON.stringify({
        venueKey: q.venueKey, guests: q.guests, date: q.date, time: q.time, flower: q.flower, menu: q.menu,
        video: q.video, wine: q.wine, champagne: q.champagne, cake: q.cake, bouquet: q.bouquet, mc: q.mc,
        maleQuartet: q.maleQuartet, stringQuartet: q.stringQuartet, drink: q.drink, noodles: q.noodles, riceCake: q.riceCake,
        canape: q.canape, afterGuests: q.afterGuests, groom: q.groom, bride: q.bride, phone: q.phone, email: q.email, lang: q.lang, visitDate: q.visitDate, visitTime: q.visitTime,
      }),
    },
    copy: wantsCopy ? "requested" : "none",
  };
  return NextResponse.json({ ok: false, relay, mailto, estimate });
}
