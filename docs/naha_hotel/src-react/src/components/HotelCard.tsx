import { useState } from "react";
import type { Hotel } from "@/data/hotels";
import {
  GC, areaCell, gmapDir, gmapSearch, grp, locTxt, noArea, revTxt, walkTxt, won,
} from "@/lib/hotel";

const pill: Record<string, string> = {
  g: "text-good border-good/35",
  w: "text-warn border-warn/35",
  b: "text-bad border-bad/35",
};

function Metric({ l, v, color }: { l: string; v: React.ReactNode; color?: string }) {
  return (
    <div className="bg-surface-1 px-1.5 py-2 text-center">
      <span className="block text-[10.5px] text-ink-3">{l}</span>
      <span className="num mt-0.5 block text-[14.5px] font-bold leading-tight" style={color ? { color } : undefined}>
        {v}
      </span>
    </div>
  );
}

export default function HotelCard({ h, rank, id }: { h: Hotel; rank: number; id: string }) {
  const [open, setOpen] = useState(false);
  return (
    <article
      id={id}
      className="rounded-[14px] border border-hair bg-surface-1 p-3.5 shadow-[var(--shadow)]"
      style={{ scrollMarginTop: "calc(var(--bar-h, 56px) + 12px)" }}
    >
      <div className="flex items-start gap-2.5">
        <span className="num mt-0.5 flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full bg-surface-3 text-[11.5px] font-bold text-ink-2">
          {rank}
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="m-0 text-[16px] leading-tight tracking-[-0.015em]">
            {h.name}
          </h4>
          <span className="mt-0.5 block text-[11px] text-ink-3">{h.en}</span>
        </div>
        <div className="flex-none text-right">
          <b className="num block text-[16.5px] leading-tight">{won(h.price)}</b>
          <span className="num text-[11px] text-ink-3">3박 {won(h.price * 3)}</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-px overflow-hidden rounded-[10px] border border-hair-soft bg-hair-soft">
        <Metric l="넓이" v={noArea(h) ? <span className="text-[12.5px] font-normal text-ink-3">미표기</span> : areaCell(h)} />
        <Metric l="국제거리" v={walkTxt(h)} color={GC[grp(h)]} />
        <Metric l="마키시 시장" v={<>{h.market}<small className="text-[10.5px] font-normal text-ink-3">분</small></>} />
        <Metric l="2인 객실" v={<>{h.avail}<small className="text-[10.5px] font-normal text-ink-3">종</small></>} />
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
        <span className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-2">
          평점 <b className="num">{h.score.toFixed(1)}</b>
          <span className="relative h-1 w-[52px] overflow-hidden rounded-sm bg-hair-soft">
            <i
              className="absolute inset-y-0 left-0 rounded-sm bg-[var(--bar)]"
              style={{ width: `${Math.max(0, Math.min(100, ((h.score - 7.5) / 2) * 100))}%` }}
            />
          </span>
          <span className="text-ink-3">{revTxt(h)}</span>
        </span>
        <span
          className={`inline-block whitespace-nowrap rounded-full border bg-surface-2 px-2.5 py-px text-[11.5px] ${
            pill[h.condLv] ?? "border-hair text-ink-2"
          }`}
        >
          {h.cond}
        </span>
      </div>

      <p className="mt-2.5 text-[13.5px] text-ink-2" dangerouslySetInnerHTML={{ __html: h.note }} />

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-2 flex min-h-[38px] w-full items-center gap-1.5 border-t border-hair-soft pt-2 text-left text-[13px] font-medium text-link"
      >
        2인 객실 {h.avail}종 · 시설 보기 <span className="text-[10px]">{open ? "▴" : "▾"}</span>
      </button>

      {open && (
        <div>
          <table className="my-1 w-full border-collapse text-[12.5px]">
            <tbody>
              <tr className="border-b border-hair-soft text-[11px] font-semibold text-ink-3">
                <th className="py-1 text-left font-semibold">2인 객실{h.avail > 6 ? " (넓은 순 6종)" : ""}</th>
                <th className="py-1 text-right font-semibold">면적</th>
                <th className="py-1 text-right font-semibold">정원</th>
                <th className="py-1 text-right font-semibold">1박</th>
              </tr>
              {h.rooms.map((r, i) => (
                <tr key={i} className="border-b border-hair-soft align-top text-ink-2 last:border-0">
                  <td className="py-1.5 pr-2">
                    {r.n}
                    {r.b && <small className="block text-[11px] text-ink-3">{r.b}</small>}
                  </td>
                  <td className="num py-1.5 text-right">{r.s ? r.s + "㎡" : "–"}</td>
                  <td className="num py-1.5 text-right">{r.o}명</td>
                  <td className="num py-1.5 text-right">{r.p ? won(r.p) : "–"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={`mb-2.5 text-[12px] ${h.sold > 0 ? "text-warn" : h.sold === 0 ? "text-good" : "text-ink-3"}`}>
            {h.sold > 0
              ? `이 날짜에 ${h.sold}종은 이미 판매 완료`
              : h.sold === 0
              ? "판매 완료된 객실 타입 없음"
              : "판매 완료 객실 종류는 확인하지 않았습니다"}
          </p>
          <dl className="mb-1 grid grid-cols-[64px_1fr] gap-x-2.5 gap-y-1.5 text-[12.5px]">
            {[
              ["아고다", h.agoda],
              ["교통", `${h.station} ${h.stationM}m · ${h.star}성 · 위치 평점 ${locTxt(h)}`],
              ["연식", `개업 ${h.opened} / 리뉴얼 ${h.reno}`],
              ["목욕", h.bath],
              ["수영장", h.pool],
              ["조식", h.bf],
              ["세탁", h.laundry],
              ["주차", h.parking],
            ].map(([k, v]) => (
              <div key={k} className="col-span-2 grid grid-cols-[64px_1fr] gap-x-2.5">
                <dt className="break-keep text-[11.5px] text-ink-3">{k}</dt>
                <dd className="m-0 text-ink-2">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex gap-2">
            <a
              className="flex-1 rounded-[10px] border border-hair bg-surface-2 py-2 text-center text-[12.5px] font-semibold text-ink-1 no-underline"
              href={gmapSearch(h)}
              target="_blank"
              rel="noopener"
            >
              구글 지도
            </a>
            <a
              className="flex-1 rounded-[10px] border border-hair bg-surface-2 py-2 text-center text-[12.5px] font-semibold text-ink-1 no-underline"
              href={gmapDir(h)}
              target="_blank"
              rel="noopener"
            >
              길찾기
            </a>
          </div>
        </div>
      )}
    </article>
  );
}
