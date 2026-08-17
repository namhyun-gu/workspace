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

/* ── 외부 링크 ────────────────────────────────────────────────────────────
   이 문서의 조회 조건. 아고다 링크에 그대로 실어 보낸다. */
const TRIP = "checkIn=2027-01-19&los=3&adults=2&rooms=1&currencyCode=KRW";

/**
 * 아고다 숙소 상세 URL.
 *
 * 기본 규칙은 영문명을 소문자·하이픈 슬러그로 바꾸고 `okinawa-main-island-jp`를 붙이는 것이다.
 * 29곳 중 24곳이 이 규칙으로 맞는다. 아래 5곳만 아고다가 다른 이름으로 등록해 두어 예외로 둔다.
 * 2026-08-17에 29곳 전부 실제 응답(HTTP 200 / 404)으로 확인했다.
 *
 * 지역이 틀려도 아고다가 카노니컬로 리다이렉트하므로 슬러그만 맞으면 된다
 * (예: lestel-naha는 okinawa-main-island로 요청해도 tokashiki-jp로 넘어간다).
 * 다만 류진은 슬러그 자체가 달라 지역까지 같이 지정한다.
 *
 * 검증 방법: 아고다 페이지에서 fetch로 상태 코드를 본다. 잘못된 슬러그는 404다.
 * 서버가 200을 주면서 클라이언트에서 not-found로 넘기는 경우가 있어,
 * 응답 본문의 문자열만 보고 판단하면 안 된다.
 */
const AGODA_PATH: Record<string, string> = {
  "HOTEL THE CUBE Naha Kokusai St.": "abest-cube-naha-kokusai-street/hotel/okinawa-main-island-jp",
  "HOTEL ART STAY Naha Kokusai St.": "hotel-wbf-art-stay-naha-kokusai-dori/hotel/okinawa-main-island-jp",
  "Hotel Abest Naha Kokusai-dori": "hotel-abest-naha-kokusai-street/hotel/okinawa-main-island-jp",
  "Ryuujin Hotel Ukishima Naha": "ryujin-hotel-ukishima/hotel/zamami-jp",
  "Green Rich Hotel & Capsule Naha": "green-rich-hotel-naha_2/hotel/okinawa-main-island-jp",
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const agodaUrl = (h: Hotel) =>
  `https://www.agoda.com/ko-kr/${AGODA_PATH[h.en] ?? `${slugify(h.en)}/hotel/okinawa-main-island-jp`}.html?${TRIP}`;

/**
 * 구글 지도에서 호텔 장소를 연다.
 *
 * 예전에는 `?api=1&query=위도,경도`라 이름 없는 핀만 찍혔다. 이름으로 검색해야
 * 사진·리뷰가 있는 실제 장소 페이지가 열린다. 다만 이름만 넘기면 보는 사람의
 * 위치에 따라 엉뚱한 도시의 동명 호텔이 잡힐 수 있어, 좌표로 화면을 고정하는
 * `/@위도,경도,17z` 형식을 쓴다. 구글 지도 자신이 검색 결과 URL로 쓰는 형식이다.
 */
export const gmapSearch = (h: Hotel) =>
  `https://www.google.com/maps/search/${encodeURIComponent(h.en)}/@${h.lat},${h.lng},17z`;

/** 길찾기는 좌표를 쓴다. 목적지를 이름으로 넘기면 출발지 근처에서 찾아 엉뚱한 곳으로 갈 수 있다. */
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
