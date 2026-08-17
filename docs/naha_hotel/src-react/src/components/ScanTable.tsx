import type { Hotel } from "@/data/hotels";
import { GC, areaCell, areaTop, grp, noArea, revTxt, walkTxt, won } from "@/lib/hotel";

const pill: Record<string, string> = {
  g: "text-good border-good/35",
  w: "text-warn border-warn/35",
  b: "text-bad border-bad/35",
};

export default function ScanTable({ rows, onJump }: { rows: Hotel[]; onJump: (h: Hotel) => void }) {
  return (
    <div className="rounded-[14px] border border-hair bg-surface-1 shadow-[var(--shadow)]">
      <div className="flex items-center justify-between px-3 py-2 text-[11.5px] text-ink-3">
        <span>← 좌우로 밀어 더 많은 항목 보기 →</span>
        <span className="num">{rows.length}곳</span>
      </div>
      <div className="scanscroll rounded-b-[14px]">
        <table className="sc">
          <thead>
            <tr>
              <th className="nm">호텔</th>
              <th>1박</th>
              <th>3박 총액</th>
              <th>넓이</th>
              <th>평점</th>
              <th>국제거리</th>
              <th>마키시 시장</th>
              <th>2인 객실</th>
              <th className="!text-left">컨디션</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((h, i) => (
              <tr key={h.name} onClick={() => onJump(h)}>
                <td className="nm">
                  <div className="flex items-center gap-2">
                    <span className="num flex h-[19px] w-[19px] flex-none items-center justify-center rounded-full bg-surface-3 text-[10.5px] font-bold text-ink-2">
                      {i + 1}
                    </span>
                    <b className="truncate">{h.short}</b>
                  </div>
                  <span className="areabar">
                    <i style={{ width: noArea(h) ? 0 : `${Math.round((h.area[1] / areaTop) * 100)}%` }} />
                  </span>
                </td>
                <td className="num">
                  <b>{won(h.price)}</b>
                </td>
                <td className="num text-ink-2">{won(h.price * 3)}</td>
                <td className="num">
                  <b>{areaCell(h)}</b>
                </td>
                <td className="num">
                  {h.score.toFixed(1)}
                  <span className="ml-1 text-[10.5px] text-ink-3">{revTxt(h)}</span>
                </td>
                <td className="num">
                  <span
                    className="mr-1.5 inline-block h-[7px] w-[7px] rounded-full align-middle"
                    style={{ background: GC[grp(h)] }}
                  />
                  {walkTxt(h)}
                </td>
                <td className="num text-ink-2">
                  {h.market}분{h.marketSrc ? ` ${h.marketSrc}` : ""}
                </td>
                <td className="num">
                  <b>{h.avail}종</b>
                </td>
                <td className="!text-left">
                  <span
                    className={`inline-block whitespace-nowrap rounded-full border bg-surface-2 px-2 py-px text-[11px] ${
                      pill[h.condLv] ?? "border-hair text-ink-2"
                    }`}
                  >
                    {h.cond}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
