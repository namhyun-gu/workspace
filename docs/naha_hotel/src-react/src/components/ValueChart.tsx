import { useState } from "react";
import type { Hotel } from "@/data/hotels";
import { GC, areaCell, grp, walkTxt, won } from "@/lib/hotel";

const XS = [40000, 300000];
const YS = [8.0, 9.4];

export default function ValueChart({ rows }: { rows: Hotel[] }) {
  const [sel, setSel] = useState<Hotel | null>(null);
  const W = 860,
    H = 420,
    M = { t: 14, r: 34, b: 42, l: 46 };
  const pw = W - M.l - M.r,
    ph = H - M.t - M.b;
  const X = (v: number) => M.l + ((Math.min(v, XS[1]) - XS[0]) / (XS[1] - XS[0])) * pw;
  const Y = (v: number) => M.t + ph - ((Math.max(Math.min(v, YS[1]), YS[0]) - YS[0]) / (YS[1] - YS[0])) * ph;
  const yTicks = [8.0, 8.2, 8.4, 8.6, 8.8, 9.0, 9.2, 9.4];
  const xTicks = [50000, 100000, 150000, 200000, 250000, 300000];

  return (
    <div className="rounded-[14px] border border-hair bg-surface-1 px-3 pb-2 pt-3 shadow-[var(--shadow)]">
      <div className="mb-1.5 flex flex-wrap gap-3 text-[12px] text-ink-2">
        {["국제거리 3분 이내", "4~8분", "9분 이상"].map((t, i) => (
          <span key={t} className="inline-flex items-center gap-1.5">
            <i className="inline-block h-2 w-2 flex-none rounded-full" style={{ background: GC[i] }} />
            {t}
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" role="img"
        aria-label="호텔별 1박 총액 대비 아고다 평점 산점도. 같은 수치가 위 표에 있습니다.">
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={M.l} x2={W - M.r} y1={Y(v)} y2={Y(v)} stroke="var(--line-soft)" />
            <text x={M.l - 7} y={Y(v) + 4} textAnchor="end" fill="var(--ink-3)" fontSize="11">
              {v.toFixed(1)}
            </text>
          </g>
        ))}
        <line x1={M.l} x2={W - M.r} y1={M.t + ph} y2={M.t + ph} stroke="var(--line)" />
        {xTicks.map((v) => (
          <text key={v} x={X(v)} y={M.t + ph + 17} textAnchor="middle" fill="var(--ink-3)" fontSize="11">
            {v / 10000}만
          </text>
        ))}
        <text x={M.l + pw / 2} y={H - 5} textAnchor="middle" fill="var(--ink-3)" fontSize="11">
          1박 총액 (원, 세금 포함)
        </text>
        {rows.map((h) => (
          <circle
            key={h.name}
            cx={X(h.price)}
            cy={Y(h.score)}
            r={sel?.name === h.name ? 9 : 6.5}
            fill={GC[grp(h)]}
            stroke={sel?.name === h.name ? "var(--ink-1)" : "var(--surface-1)"}
            strokeWidth={sel?.name === h.name ? 2.5 : 2}
          />
        ))}
        {rows.map((h) => (
          <circle
            key={h.name + "hit"}
            cx={X(h.price)}
            cy={Y(h.score)}
            r={15}
            fill="transparent"
            className="cursor-pointer"
            onMouseEnter={() => setSel(h)}
            onClick={() => setSel(h)}
          >
            <title>{h.name}</title>
          </circle>
        ))}
      </svg>
      <p className="mb-1 mt-1.5 min-h-[18px] text-[11.5px] text-ink-3">
        {sel ? (
          <>
            <b className="text-ink-1">{sel.short}</b> · {won(sel.price)}/박 · {areaCell(sel)} · 평점{" "}
            {sel.score.toFixed(1)} · 국제거리 {walkTxt(sel)}
          </>
        ) : (
          "점을 누르면 호텔 정보가 표시됩니다. 왼쪽 위일수록 가성비가 좋습니다."
        )}
      </p>
    </div>
  );
}
