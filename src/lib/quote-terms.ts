/**
 * 결혼식 계약 규정 — 회사 계약서 뒷면 「결혼식 계약 규정」 원문.
 * 조항 번호는 계약서 원문을 따릅니다(원문에 3번 조항 없음).
 * 영문은 안내용 번역이며, 해석이 다를 때는 한국어 원문이 우선합니다.
 */
export const DEPOSIT = 2_000_000;

export type Clause = { title: string; body: string[] };

export const TERMS_KO: Clause[] = [
  { title: "1. 이용 시간", body: [
    "식장 이용은 결혼식 시작부터 피로연이 끝나는 시간을 포함하여 계약된 시간 내에 종료하여야 하며, 총 이용시간은 식전 리셉션을 포함하여 3시간을 원칙으로 하되 사전 협의하에 조정할 수 있습니다.",
  ] },
  { title: "2. 계약금 및 지불조건", body: [
    "계약 시 200만원을 계약금으로 지불하고, 시설·연출·상품 비용 등의 사용료는 결혼식 1일 전까지 중도금으로 입금하며, 식·음료 비용은 식 종료 후 당일 지불 완료되어야 합니다.",
    "또한 아래와 같이 행사일로부터 취소한 날을 기준으로 하여 계약금 외 별도의 위약금을 배상하셔야 합니다.",
    "- 행사일로부터 150일 이내: 계약서상 총액의 10%",
    "- 행사일로부터 120일 이내: 계약서상 총액의 20%",
    "- 행사일로부터 90일 이내: 계약서상 총액의 30%",
    "- 행사일로부터 60일 이내: 계약서상 총액의 50%",
    "- 행사일로부터 30일 이내: 계약서상 총액의 70%",
    "- 행사일로부터 10일 이내: 계약서상 총액의 90%",
  ] },
  { title: "4. 계약의 해지", body: [
    "해지는 계약일로부터 2주 이내 가능하며, 이후 취소한 경우에는 계약금을 일체 반환하지 않습니다. (계약금 환불은 취소일부터 익월 말에 일괄 환불됩니다)",
  ] },
  { title: "5. 계약의 변경", body: [
    "결혼식 진행일 기준 5개월 이전에 한하여 일자 및 일시 변경이 1회 가능하며, 미정으로 일정 연기 시 날짜 확정은 6개월 이내에 하여야 하고, 6개월 안에 날짜를 확정하지 않을 경우 자동 취소됩니다.",
    "다만, 1회 변경된 결혼식을 취소한 경우에는 계약금을 일체 반환하지 않습니다.",
    "또한 변경 전 계약 시 서비스된 내역은 무효하며, 변경한 날짜에 따라 당사의 정계약 기준을 준수하게 됩니다.",
  ] },
  { title: "6. 고객 수의 확인", body: [
    "참석 인원수 및 식음료 관련 수량 변경은 10일 이전까지 ㈜FIC의 담당 웨딩 프로듀서와 협의하여 서면으로 조정하며, 그 이후에는 모든 변경이 불가합니다.",
    "계약 인원보다 참석 인원수가 적을 경우에도 계약 인원수에 의해 지불하여야 하고, 계약 인원을 초과한 인원에 대해서는 10%까지 음식 준비가 가능하며, 초과분에 대해서도 지불하여야 합니다.",
    "초과 인원에 대해서 ㈜FIC는 책임이 없으며 웨딩 프로듀서와 협의하여 대처하기로 합니다.",
  ] },
  { title: "7. 고객 반입 물품", body: [
    "고객은 ㈜FIC의 동의 없이 식장 내부에 임의대로 어떠한 물품도 반입할 수 없으며, 결혼식에 관련된 물건은 ㈜FIC의 담당 웨딩 프로듀서와 협의하여 준비되어야 합니다.",
    "또한 ㈜FIC의 사전 양해를 구하여 고객이 직접 물품을 반입하는 경우에 물품의 반입·반출 시간, 설치 장소 및 시간 등을 ㈜FIC의 담당 웨딩 프로듀서와 행사 7일 전까지 협의 완료하여야 합니다.",
    "단, 식·음료 및 주류는 일체 반입이 금지되어 있습니다.",
  ] },
  { title: "8. 부대서비스 및 물품에 대한 손해배상", body: [
    "㈜FIC는 계약된 부대서비스 또는 부대 물품을 ㈜FIC의 고의 또는 과실로 고객이 이용하지 못한 경우 해당 서비스 또는 물품의 이용료 내에서 과실의 경중에 따라 환불하는 것으로써 배상하도록 합니다.",
  ] },
  { title: "9. 천재지변 등에 의한 면책사항", body: [
    "천재지변, 국가의 중요사항 발생, 정부의 시책 변경, 식장의 예기치 못한 사정 발생 등의 사유로 인하여 계약조건을 이행하지 못하게 될 때에는 ㈜FIC 및 고객은 책임을 면제받게 됩니다.",
  ] },
  { title: "10. 기타 금기사항", body: [
    "풍기문란 행위 또는 타인에게 폐를 끼치는 행위는 금지하여야 합니다.",
    "발화·인화성 물품 등 위험물 반입을 삼가야 합니다.",
    "사전 협의된 이용 목적 이외의 식장 이용은 삼가야 합니다.",
    "식장 내의 기물 및 집기류가 고객에 의해 파손 및 분실되었을 시에는 고객이 손해배상을 하여야 합니다.",
  ] },
];

export const TERMS_EN: Clause[] = [
  { title: "1. Hours of use", body: [
    "Use of the venue must end within the contracted time, counted from the start of the ceremony to the end of the reception. Total use is three hours in principle, including the pre-ceremony reception, and may be adjusted by prior agreement.",
  ] },
  { title: "2. Deposit and payment", body: [
    "A deposit of KRW 2,000,000 is paid on signing. Charges for facilities, staging and products are paid as an interim payment no later than one day before the wedding, and food and beverage charges are settled in full on the day, after the event.",
    "If the event is cancelled, a cancellation charge is payable in addition to the deposit, according to the date of cancellation:",
    "- within 150 days of the event: 10% of the contract total",
    "- within 120 days of the event: 20% of the contract total",
    "- within 90 days of the event: 30% of the contract total",
    "- within 60 days of the event: 50% of the contract total",
    "- within 30 days of the event: 70% of the contract total",
    "- within 10 days of the event: 90% of the contract total",
  ] },
  { title: "4. Termination", body: [
    "The contract may be terminated within two weeks of the contract date. After that the deposit is not refunded. (Deposit refunds are paid together at the end of the month following cancellation.)",
  ] },
  { title: "5. Changes", body: [
    "The date and time may be changed once, no later than five months before the wedding. If the wedding is postponed without a date, a new date must be fixed within six months, otherwise the contract is cancelled automatically.",
    "If a wedding that has already been changed once is cancelled, the deposit is not refunded.",
    "Complimentary items granted under the original contract become void, and the standard contract terms for the new date apply.",
  ] },
  { title: "6. Guest numbers", body: [
    "Changes to guest numbers and food and beverage quantities are agreed in writing with your FIC wedding producer no later than 10 days before the event. No changes are possible after that.",
    "If fewer guests attend than contracted, payment is still based on the contracted number. Food can be prepared for up to 10% above the contracted number, and the additional guests are also charged.",
    "FIC is not responsible for guests beyond that margin, and they are handled in consultation with the wedding producer.",
  ] },
  { title: "7. Items brought in by the client", body: [
    "No items may be brought into the venue without FIC's consent. Items for the wedding are prepared in consultation with your FIC wedding producer.",
    "Where FIC has agreed in advance to items being brought in, the delivery and collection times, location and set-up time must be agreed with the wedding producer no later than seven days before the event.",
    "Food, beverages and alcohol may not be brought in under any circumstances.",
  ] },
  { title: "8. Compensation for additional services and items", body: [
    "If a contracted additional service or item cannot be used because of FIC's intent or negligence, FIC compensates by refunding within the charge for that service or item, according to the degree of fault.",
  ] },
  { title: "9. Force majeure", body: [
    "Where the contract cannot be performed because of natural disaster, a matter of national importance, a change in government policy or unforeseen circumstances at the venue, both FIC and the client are released from liability.",
  ] },
  { title: "10. Other prohibitions", body: [
    "Indecent behaviour and behaviour that disturbs others are prohibited.",
    "Flammable or other dangerous items may not be brought in.",
    "The venue may not be used for any purpose other than the one agreed in advance.",
    "The client is liable for venue fixtures and equipment damaged or lost by the client or guests.",
  ] },
];

export const TERMS_TITLE = { ko: "결혼식 계약 규정", en: "Wedding contract conditions" };
export const TERMS_EN_NOTE = "This English text is a courtesy translation. The Korean text of the contract prevails.";

export function termsToText(lang: string): string {
  const en = lang === "en";
  const clauses = en ? TERMS_EN : TERMS_KO;
  return [
    `■ ${en ? TERMS_TITLE.en : TERMS_TITLE.ko}`,
    ...clauses.flatMap((c) => ["", c.title, ...c.body]),
    ...(en ? ["", TERMS_EN_NOTE] : []),
  ].join("\n");
}
