import { HOTELS, HOTELS_NEW, type Hotel } from "@/data/hotels";

/** 상세 실측을 마친 29곳 */
export const ALL: Hotel[] = [...HOTELS, ...HOTELS_NEW];

export const won = (n: number) => "₩" + n.toLocaleString("ko-KR");
export const grp = (h: Hotel) => (h.kokusai <= 3 ? 0 : h.kokusai <= 8 ? 1 : 2);
export const GC = ["var(--s1)", "var(--s2)", "var(--s3)"];
export const walkTxt = (h: Hotel) => (h.kokusai === 0 ? "바로 앞" : h.kokusai + "분");
export const noArea = (h: Hotel) => /미표기/.test(h.areaTxt);
export const areaCell = (h: Hotel) =>
  noArea(h) ? "미표기" : h.area[0] === h.area[1] ? h.area[1] + "㎡" : h.area[0] + "~" + h.area[1] + "㎡";
export const areaTop = Math.max(...ALL.map((h) => h.area[1]));
export const revTxt = (h: Hotel) => (h.rev ? h.rev.toLocaleString() + "건" : "후기 수 미표기");
export const locTxt = (h: Hotel) => (h.loc ? h.loc.toFixed(1) : "—");
/** 국제거리 도보 0~10분을 자 위의 0~100% 위치로. 3분 임계선이 30% 지점에 온다. */
export const walkPct = (h: Hotel) => Math.min(100, Math.max(0, (h.kokusai / 10) * 100));
export const gmapSearch = (h: Hotel) =>
  `https://www.google.com/maps/search/?api=1&query=${h.lat},${h.lng}`;
export const gmapDir = (h: Hotel) =>
  `https://www.google.com/maps/dir/?api=1&destination=${h.lat},${h.lng}`;

export type FilterKey = "all" | "close" | "wide" | "choice" | "cheap" | "bath";
export const FILTERS: { k: FilterKey; label: string }[] = [
  { k: "all", label: "전체" },
  { k: "close", label: "국제거리 3분 이내" },
  { k: "wide", label: "20㎡ 이상" },
  { k: "choice", label: "2인 3종+" },
  { k: "cheap", label: "10만원 이하" },
  { k: "bath", label: "온천·대욕장" },
];

export const SORTS: { k: string; label: string }[] = [
  { k: "price-asc", label: "요금 낮은 순" },
  { k: "price-desc", label: "요금 높은 순" },
  { k: "score-desc", label: "평점 높은 순" },
  { k: "area-desc", label: "객실 넓은 순" },
  { k: "avail-desc", label: "2인 객실 많은 순" },
  { k: "kokusai-asc", label: "국제거리 가까운 순" },
  { k: "market-asc", label: "마키시 시장 가까운 순" },
];

export function passes(h: Hotel, f: FilterKey) {
  if (f === "close") return h.kokusai <= 3;
  if (f === "wide") return h.area[1] >= 20;
  if (f === "choice") return h.avail >= 3;
  if (f === "cheap") return h.price <= 100000;
  if (f === "bath") return /대욕장|온천|욕탕/.test(h.bath);
  return true;
}

export function view(f: FilterKey, sortKey: string) {
  const [k, dir] = sortKey.split("-");
  const sign = dir === "asc" ? 1 : -1;
  const val = (h: Hotel) => (k === "area" ? h.area[1] : (h as unknown as Record<string, number>)[k]);
  return ALL.filter((h) => passes(h, f)).sort((a, b) => (val(a) - val(b)) * sign);
}

export const PICKS = [
  {
    n: "류진 호텔 우키시마 나하",
    tag: "종합 1위",
    c: "var(--s1)",
    why: "아고다 상세페이지 표기로 국제거리 90m · 제1마키시 공설시장 190m. 남은 3종이 전부 25㎡ 2인실이고 최저 ₩85,354, 평점 9.3. 후기가 76건뿐인 점만 감안하세요.",
  },
  {
    n: "인피니티 호텔 나하 쿠모지",
    tag: "넓이 대비 최저가",
    c: "var(--s3)",
    why: "30㎡ 슈페리어 트윈 ₩79,547. 29곳 중 같은 값에 가장 넓은 2인실입니다. 국제거리까지는 도보 7분.",
  },
  {
    n: "호텔 팜 로얄 리조트 고쿠사이 스트리트",
    tag: "선택폭 · 부대시설",
    c: "var(--s2)",
    why: "국제거리 한복판(텐부스나하 70m)에 2인 객실만 13종. 22㎡ 그랜드 트윈 ₩137,697. 야외 수영장·온천탕 보유.",
  },
  {
    n: "콘도미니오 마키시",
    tag: "9만원 이하 최대 넓이",
    c: "var(--s1)",
    why: "27㎡ 트윈 ₩87,960. 객실에 주방·세탁기·가스건조기가 있어 3박 이상이면 체감이 큽니다.",
  },
];
