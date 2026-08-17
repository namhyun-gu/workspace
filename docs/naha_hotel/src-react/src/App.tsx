import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SCREENED, type Hotel } from "@/data/hotels";
import {
  ALL, FILTERS, GC, PICKS, SORTS, agodaUrl, areaCell, gmapDir, gmapSearch, grp, walkTxt, won,
  type FilterKey, view,
} from "@/lib/hotel";
import ScanTable from "@/components/ScanTable";
import HotelMap from "@/components/HotelMap";
import ValueChart from "@/components/ValueChart";
import HotelCard from "@/components/HotelCard";

function Sec({ t, s }: { t: string; s?: string }) {
  return (
    <>
      <h3 className="mb-1 mt-8 text-[17px] font-bold tracking-[-0.02em]">{t}</h3>
      {s && <p className="mb-2.5 mt-0 text-[12.5px] leading-relaxed text-ink-3">{s}</p>}
    </>
  );
}

export default function App() {
  const [dark, setDark] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [sortKey, setSortKey] = useState("price-asc");
  const [sel, setSel] = useState<Hotel | null>(null);
  const [showOut, setShowOut] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  /* 맨 위로 버튼은 "위로 스크롤할 때"만 띄운다. 고정 버튼이 카드의 금액을
     계속 가리는 걸 막으면서, 되돌아가려는 순간에는 바로 손에 잡힌다. */
  useEffect(() => {
    let last = window.scrollY;
    const sync = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) > 4) setShowTop(y > 700 && y < last);
      last = y;
    };
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  useEffect(() => {
    const sync = () => {
      const h = bar.current?.offsetHeight ?? 56;
      document.documentElement.style.setProperty("--bar-h", h + "px");
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const rows = useMemo(() => view(filter, sortKey), [filter, sortKey]);
  const idOf = (h: Hotel) => "h" + ALL.findIndex((x) => x.name === h.name);
  const jump = useCallback((h: Hotel) => {
    document.getElementById("h" + ALL.findIndex((x) => x.name === h.name))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);
  const pick = useCallback((h: Hotel) => setSel(h), []);

  const cheapest = ALL.reduce((a, b) => (a.price < b.price ? a : b));
  const widest = ALL.reduce((a, b) => (a.area[1] > b.area[1] ? a : b));
  /* 도보 3구간(3분 이내 / 4~8분 / 9분 이상) 분포 */
  const dist = useMemo(() => {
    const d = [0, 0, 0];
    ALL.forEach((h) => d[grp(h)]++);
    return d;
  }, []);

  return (
    <>
      <div
        ref={bar}
        className="sticky top-0 z-40 border-b border-hair bg-surface-0/90 px-4 py-2.5 backdrop-blur-md"
        style={{ paddingTop: "calc(9px + env(safe-area-inset-top))" }}
      >
        <div className="mx-auto flex max-w-[1180px] items-center gap-2">
          <h1 className="m-0 flex-1 truncate text-[16.5px] font-bold tracking-[-0.025em]">
            나하 호텔 29곳 · 2인 실측
          </h1>
          <span className="num hidden flex-none text-[12.5px] text-ink-3 sm:inline">1/19–22 · 3박</span>
          <button
            onClick={() => setDark((v) => !v)}
            aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
            className="-mr-1 flex h-9 w-9 flex-none items-center justify-center rounded-full text-ink-2"
          >
            {dark ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 2.6v2M12 19.4v2M2.6 12h2M19.4 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                <path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1Z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-[1180px] px-4 pb-9">
        <section className="pt-5">
          <div className="lbl text-s1">아고다 상세페이지 실측</div>
          <h2 className="mb-2 mt-1.5 text-[26px] font-extrabold leading-[1.15] tracking-[-0.035em] md:text-[32px]">
            후보 81곳을 훑어
            <br />
            29곳만 남겼습니다
          </h2>
          <p className="m-0 max-w-[52ch] text-[14.5px] leading-relaxed text-ink-2">
            2인이 실제로 잡을 수 있는 객실이 있고, 국제거리·제1마키시 공설시장에서 걸어갈 수 있는 곳만 상세페이지까지 들어가
            직접 재었습니다. 트리플·쿼드·패밀리룸은 제외했습니다.
          </p>

          {/* 이 문서의 논지: 29곳이 3분 선을 기준으로 어떻게 갈리는가 */}
          <div className="mt-5 rounded-[14px] border border-hair bg-surface-1 p-3.5 shadow-[var(--shadow)]">
            <div className="lbl">국제거리 도보 분포</div>
            <p className="m-0 mt-1.5 text-[15px] leading-snug">
              29곳 중 <b className="num text-[19px] text-s1">{dist[0]}곳</b>이 국제거리 <b>3분</b> 안에 있습니다.
            </p>
            <div className="mt-3 flex h-2 gap-0.5 overflow-hidden rounded-full">
              {dist.map((n, i) => (
                <i key={i} style={{ flex: n, background: GC[i] }} className="block" />
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-3.5 gap-y-1 text-[11.5px] text-ink-2">
              {["3분 이내", "4~8분", "9분 이상"].map((t, i) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <i className="inline-block h-2 w-2 flex-none rounded-full" style={{ background: GC[i] }} />
                  {t}
                  <b className="num text-ink-1">{dist[i]}</b>
                  <span className="u">곳</span>
                </span>
              ))}
            </div>
          </div>

          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[12.5px] sm:grid-cols-4">
            {[
              ["일정", "1/19(화)→1/22(금) · 3박"],
              ["인원", "성인 2명 · 객실 1개"],
              ["최저 1박", won(cheapest.price)],
              ["최대 넓이", widest.area[1] + "㎡"],
            ].map(([l, v]) => (
              <div key={l} className="border-t border-hair-soft pt-1.5">
                <dt className="text-[11px] text-ink-3">{l}</dt>
                <dd className="num m-0 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2.5 text-[11.5px] text-ink-3">세금·수수료 포함 · 아고다 조회 2026. 8. 17</p>
        </section>

        <Sec t="한눈에 보기" s="아래 필터·정렬이 그대로 적용됩니다. 줄을 누르면 상세로 이동합니다. 가로 자는 국제거리까지의 도보 시간이고, 세로 눈금이 3분 지점입니다." />
        <ScanTable rows={rows} onJump={jump} />

        <Sec t="지도" s="아고다 좌표 기준 실제 위치입니다. 핀 안의 숫자는 위 표의 순번과 같습니다. 지도는 Google Maps로 그립니다." />
        <div className="rounded-[14px] border border-hair bg-surface-1 p-3 shadow-[var(--shadow)]">
          <HotelMap rows={rows} onPick={pick} dark={dark} />
          <p className="mt-2 text-[12px] text-ink-2">
            {sel ? (
              <>
                <b>{sel.short}</b> · {won(sel.price)} · {areaCell(sel)} · 국제거리 {walkTxt(sel)} · 시장 {sel.market}분
              </>
            ) : (
              "핀을 누르면 호텔이 선택됩니다."
            )}
          </p>
          <a
            className="mt-1.5 block rounded-[10px] border border-link bg-link py-2.5 text-center text-[13px] font-semibold text-surface-0 no-underline"
            href={agodaUrl(sel ?? ALL[0])}
            target="_blank"
            rel="noopener"
          >
            {sel ? `${sel.short} 아고다에서 보기` : "아고다에서 요금 보기"}
          </a>
          <div className="mt-1.5 flex gap-2">
            <a
              className="flex-1 rounded-[10px] border border-hair bg-surface-2 py-2.5 text-center text-[13px] font-semibold text-ink-1 no-underline"
              href={gmapSearch(sel ?? ALL[0])}
              target="_blank"
              rel="noopener"
            >
              구글 지도에서 열기
            </a>
            <a
              className="flex-1 rounded-[10px] border border-hair bg-surface-2 py-2.5 text-center text-[13px] font-semibold text-ink-1 no-underline"
              href={gmapDir(sel ?? ALL[0])}
              target="_blank"
              rel="noopener"
            >
              길찾기
            </a>
          </div>
        </div>

        <Sec t="먼저 볼 4곳" s="국제거리·시장 접근성 + 지금 잡히는 2인 객실 기준" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {PICKS.map((p) => {
            const h = ALL.find((x) => x.name === p.n)!;
            return (
              <article
                key={p.n}
                className="rounded-[14px] border border-hair border-l-[3px] bg-surface-1 px-4 py-3.5 shadow-[var(--shadow)]"
                style={{ borderLeftColor: p.c }}
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.05em]" style={{ color: p.c }}>
                  {p.tag}
                </div>
                <h4 className="mb-2 mt-1 text-[15.5px] font-bold leading-tight">{h.name}</h4>
                <div className="mb-2 grid grid-cols-2 gap-y-1 text-[12px] text-ink-3">
                  {[
                    ["1박", won(h.price)],
                    ["넓이", areaCell(h)],
                    ["국제거리", walkTxt(h)],
                    ["2인", h.avail + "종"],
                  ].map(([l, v]) => (
                    <span key={l}>
                      {l}
                      <b className="num ml-1 text-ink-1">{v}</b>
                    </span>
                  ))}
                </div>
                <p className="m-0 text-[12.5px] leading-relaxed text-ink-2">{p.why}</p>
              </article>
            );
          })}
        </div>

        <Sec t="가격 대비 만족도" s="필터·정렬이 그대로 반영됩니다." />
        <ValueChart rows={rows} />

        <Sec t="호텔별 상세" s="네 가지 지표(넓이·국제거리·시장·2인 객실)가 항상 같은 자리에 있습니다." />
        <div className="chiprow -mx-4 mb-2 flex gap-1.5 px-4 pb-2">
          {FILTERS.map((f) => (
            <button
              key={f.k}
              onClick={() => setFilter(f.k)}
              aria-pressed={filter === f.k}
              className={`min-h-[40px] flex-none whitespace-nowrap rounded-full border px-3.5 text-[13.5px] ${
                filter === f.k
                  ? "border-link bg-link font-semibold text-surface-0"
                  : "border-hair bg-surface-1 text-ink-2"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <label htmlFor="sortsel" className="flex-none text-[12.5px] text-ink-3">
            정렬
          </label>
          <select
            id="sortsel"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="min-h-[42px] flex-1 rounded-[10px] border border-hair bg-surface-1 px-2.5 text-[14.5px] text-ink-1"
          >
            {SORTS.map((s) => (
              <option key={s.k} value={s.k}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <p className="num my-2.5 text-[12.5px] text-ink-3">
          {rows.length}곳 표시 중 (전체 {ALL.length}곳)
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((h, i) => (
            <HotelCard key={h.name} h={h} rank={i + 1} id={idOf(h)} />
          ))}
        </div>

        <Sec t="제외한 후보" s="같은 조건으로 훑은 81곳 중 상세 실측에서 뺀 이유입니다." />
        <div className="rounded-[14px] border border-hair bg-surface-1 shadow-[var(--shadow)]">
          <button
            onClick={() => setShowOut((v) => !v)}
            className="flex min-h-[44px] w-full items-center justify-between px-4 text-left text-[13.5px] font-medium text-link"
          >
            제외 사유 {SCREENED.length}건 보기 <span className="text-[10px]">{showOut ? "▴" : "▾"}</span>
          </button>
          {showOut && (
            <ul className="m-0 list-none border-t border-hair-soft p-0">
              {SCREENED.map((s) => (
                <li key={s.n} className="border-b border-hair-soft px-4 py-2.5 last:border-0">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <b className="text-[13px]">{s.n}</b>
                    <span className="num text-[11.5px] text-ink-3">{s.num}</span>
                  </div>
                  <div className="text-[12.5px] text-ink-2">{s.why}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="mt-9 border-t border-hair pt-4 text-[12px] text-ink-3">
          <b className="text-ink-2">데이터 출처와 주의사항</b>
          <ul className="mb-0 mt-2 list-disc pl-4">
            <li className="mb-1.5">
              <b>수집 방법</b>: 아고다 나하 검색(2027-01-19~22, 성인 2명, 1실) <b>81곳</b>을 훑어 이름·요금·평점·위치 평점·역
              거리를 모은 뒤, 국제거리 접근성과 2인 객실 조건을 통과한 <b>29곳</b>만 상세페이지에서 객실명·면적·침대·최대 인원·1박
              총액(세금·수수료 포함)을 직접 확인했습니다.
            </li>
            <li className="mb-1.5">
              항목이 <b>확인 불가</b>인 곳은 부대시설(연식·목욕·조식·세탁·주차)을 외부 교차 확인하지 않은 곳이고, 판매 완료 객실
              종류 수도 함께 비워 두었습니다. 나머지는 호텔 공식 홈페이지·라쿠텐·자란·JTB로 교차 확인했습니다.
            </li>
            <li className="mb-1.5">
              면적·요금·객실 수는 <b>성인 2명이 쓸 수 있는 객실</b>만 집계했습니다. 트리플·쿼드·패밀리·4인실은 제외했습니다.
            </li>
            <li className="mb-1.5">
              거리 중 <b>◆</b>는 아고다가 상세페이지에 직접 표기한 값입니다. 나머지는 좌표 기반 추정치이고, 구모지 지역(네스트·리치먼드)은
              네스트 공식 안내(국제거리 도보 10분)에 맞췄습니다. 추정치는 아고다 좌표에서 국제거리 축·시장까지의 직선거리를
              걷는 속도로 환산한 값입니다.
            </li>
            <li className="mb-1.5">
              <b>지도</b>: 호텔 좌표는 아고다 상세페이지 표기값입니다. 지도는 <b>Google Maps</b>로 그리며, 배포된
              웹페이지(github.io)에서만 표시되도록 API 키에 리퍼러 제한을 걸어 두었습니다. 따라서 이 파일을 내려받아
              로컬에서 열면 지도 영역이 비어 보일 수 있고, 그때는 아래 <b>구글 지도에서 열기</b>를 쓰면 됩니다.
              마름모 두 개는 제1마키시 공설시장·국제거리 서쪽 입구입니다. 휴대폰에서는 지도를 한 번 탭해야
              이동·확대가 켜집니다.
            </li>
            <li>
              <b>아고다 요금은 실시간으로 변합니다.</b> 예약 직전에 반드시 다시 확인하세요. 이용후기 수가 적은 곳(류진 76건 등)은
              평점의 표본이 작습니다.
            </li>
          </ul>
        </footer>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="맨 위로"
        className={`totop${showTop ? " on" : ""}`}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
        </svg>
      </button>
    </>
  );
}
