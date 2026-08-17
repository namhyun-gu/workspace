import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LANDMARKS, type Hotel } from "@/data/hotels";
import { GC, grp, walkTxt, won, areaCell, gmapSearch, gmapDir } from "@/lib/hotel";

type Props = { rows: Hotel[]; onPick: (h: Hotel) => void };

const popupHTML = (h: Hotel) =>
  `<b>${h.name}</b>${won(h.price)} · 3박 ${won(h.price * 3)}<br>` +
  `${areaCell(h)} · 2인 ${h.avail}종 · 평점 ${h.score.toFixed(1)}<br>` +
  `국제거리 ${walkTxt(h)} · 시장 ${h.market}분`;

export default function HotelMap({ rows, onPick }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const group = useRef<L.LayerGroup | null>(null);
  const marks = useRef<Map<string, L.Marker>>(new Map());
  const [armed, setArmed] = useState(false);
  const [touch] = useState(() => window.matchMedia("(hover: none)").matches);

  useEffect(() => {
    if (!box.current || map.current) return;
    const m = L.map(box.current, {
      scrollWheelZoom: false,
      dragging: !touch,
      zoomControl: true,
    }).setView([26.2155, 127.6855], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      minZoom: 13,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> 기여자',
    }).addTo(m);
    LANDMARKS.forEach((l) => {
      L.marker([l.lat, l.lng], {
        icon: L.divIcon({ className: "", html: '<div class="lmk-dia"></div>', iconSize: [11, 11], iconAnchor: [6, 6] }),
      })
        .addTo(m)
        .bindTooltip(l.n.split(" (")[0], { direction: "top" });
    });
    group.current = L.layerGroup().addTo(m);
    map.current = m;
    const onResize = () => m.invalidateSize();
    window.addEventListener("resize", onResize);
    setTimeout(() => m.invalidateSize(), 200);
    return () => window.removeEventListener("resize", onResize);
  }, [touch]);

  useEffect(() => {
    const m = map.current,
      g = group.current;
    if (!m || !g) return;
    g.clearLayers();
    rows.forEach((h, i) => {
      let mk = marks.current.get(h.name);
      if (!mk) {
        mk = L.marker([h.lat, h.lng], {
          icon: L.divIcon({
            className: "pinwrap",
            html: `<div class="pin g${grp(h) + 1}">·</div>`,
            iconSize: [26, 26],
            iconAnchor: [13, 13],
          }),
          riseOnHover: true,
        });
        mk.bindPopup(popupHTML(h), { maxWidth: 250 });
        mk.bindTooltip(h.short, { direction: "top", offset: [0, -14], className: "mklab" });
        mk.on("click", () => onPick(h));
        marks.current.set(h.name, mk);
      }
      mk.setZIndexOffset(900 - i);
      g.addLayer(mk);
    });
    if (rows.length) {
      const b = L.latLngBounds(rows.map((h) => [h.lat, h.lng] as [number, number]));
      LANDMARKS.forEach((l) => b.extend([l.lat, l.lng]));
      m.fitBounds(b, { padding: [26, 26], maxZoom: 16 });
    }
    /* 지도가 ready 된 뒤에 아이콘 DOM이 생기므로 번호는 마지막에 찍는다 */
    const label = () =>
      rows.forEach((h, i) => {
        const el = marks.current.get(h.name)?.getElement();
        const pin = el?.firstChild as HTMLElement | undefined;
        if (pin) pin.textContent = String(i + 1);
      });
    label();
    const t = setTimeout(label, 60);
    return () => clearTimeout(t);
  }, [rows, onPick]);

  const arm = () => {
    const m = map.current;
    if (!m) return;
    m.dragging.enable();
    m.scrollWheelZoom.enable();
    setArmed(true);
  };

  return (
    <div className="relative">
      <div ref={box} id="lmap" />
      {!armed && (
        <button
          onClick={arm}
          className="absolute inset-0 z-[500] flex items-center justify-center rounded-[11px] bg-black/20"
        >
          <span className="rounded-full bg-black/70 px-4 py-2 text-[13.5px] font-semibold text-white">
            {touch ? "지도를 탭하면 이동·확대" : "지도를 클릭하면 휠 확대"}
          </span>
        </button>
      )}
      <div className="mt-2 flex flex-wrap gap-2 text-[11.5px] text-ink-3">
        {["국제거리 3분 이내", "4~8분", "9분 이상"].map((t, i) => (
          <span key={t} className="inline-flex items-center gap-1.5">
            <i className="inline-block h-2 w-2 flex-none rounded-full" style={{ background: GC[i] }} />
            {t}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block h-2 w-2 flex-none rotate-45 bg-ink-3" />
          기준점(시장·국제거리 서쪽 입구)
        </span>
      </div>
    </div>
  );
}

export { gmapSearch, gmapDir };
