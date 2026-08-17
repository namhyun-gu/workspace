import { useEffect, useRef, useState } from "react";
import { LANDMARKS, type Hotel } from "@/data/hotels";
import { GC, grp, walkTxt, won, areaCell, gmapSearch, gmapDir } from "@/lib/hotel";
import { gmapsKey, gmapsMapId, loadGmaps } from "@/lib/gmaps";

type Props = { rows: Hotel[]; onPick: (h: Hotel) => void; dark: boolean };
type Status = "loading" | "ready" | "nokey" | "error";

const NAHA = { lat: 26.2155, lng: 127.6855 };

const popupHTML = (h: Hotel) =>
  `<b>${h.name}</b>${won(h.price)} · 3박 ${won(h.price * 3)}<br>` +
  `${areaCell(h)} · 2인 ${h.avail}종 · 평점 ${h.score.toFixed(1)}<br>` +
  `국제거리 ${walkTxt(h)} · 시장 ${h.market}분`;

/** 번호 핀. AdvancedMarkerElement는 content의 하단 중앙을 좌표에 맞추므로 wrap에서 절반 내린다. */
function pinEl(h: Hotel, n: number) {
  const wrap = document.createElement("div");
  wrap.className = "pinwrap";
  const pin = document.createElement("div");
  pin.className = `pin g${grp(h) + 1}`;
  pin.textContent = String(n);
  pin.dataset.label = h.short;
  wrap.appendChild(pin);
  return wrap;
}

function landmarkEl(name: string) {
  const wrap = document.createElement("div");
  wrap.className = "lmkwrap";
  wrap.dataset.label = name;
  const dia = document.createElement("div");
  dia.className = "lmk-dia";
  wrap.appendChild(dia);
  return wrap;
}

export default function HotelMap({ rows, onPick, dark }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const marks = useRef(new Map<string, google.maps.marker.AdvancedMarkerElement>());
  const info = useRef<google.maps.InfoWindow | null>(null);
  const pickRef = useRef(onPick);
  pickRef.current = onPick;

  const [status, setStatus] = useState<Status>("loading");
  const [armed, setArmed] = useState(false);
  const [touch] = useState(() => window.matchMedia("(hover: none)").matches);

  /* 지도 생성. colorScheme은 생성 시점에만 먹으므로 테마가 바뀌면 다시 만든다. */
  useEffect(() => {
    let dead = false;
    const key = gmapsKey();
    if (!key) {
      setStatus("nokey");
      return;
    }
    setStatus("loading");
    loadGmaps(key)
      .then(() => {
        if (dead || !box.current) return;
        const m = new google.maps.Map(box.current, {
          center: NAHA,
          zoom: 15,
          minZoom: 13,
          maxZoom: 19,
          mapId: gmapsMapId(),
          colorScheme: dark ? "DARK" : "LIGHT",
          gestureHandling: "none",
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          clickableIcons: false,
        });
        info.current = new google.maps.InfoWindow({ maxWidth: 250 });
        LANDMARKS.forEach((l) => {
          new google.maps.marker.AdvancedMarkerElement({
            map: m,
            position: { lat: l.lat, lng: l.lng },
            content: landmarkEl(l.n.split(" (")[0]),
            zIndex: 1,
          });
        });
        /* 이전 지도에 붙어 있던 핀은 재사용할 수 없다 */
        marks.current.clear();
        map.current = m;
        setArmed(false);
        setStatus("ready");
      })
      .catch(() => {
        if (!dead) setStatus("error");
      });
    return () => {
      dead = true;
      map.current = null;
      marks.current.clear();
      info.current = null;
    };
  }, [dark]);

  /* 표시 대상이 바뀔 때마다 핀을 갈아끼우고 번호를 다시 매긴다 */
  useEffect(() => {
    const m = map.current;
    if (!m || status !== "ready") return;

    const live = new Set(rows.map((h) => h.name));
    marks.current.forEach((mk, name) => {
      if (!live.has(name)) mk.map = null;
    });

    const bounds = new google.maps.LatLngBounds();
    rows.forEach((h, i) => {
      let mk = marks.current.get(h.name);
      if (!mk) {
        mk = new google.maps.marker.AdvancedMarkerElement({
          position: { lat: h.lat, lng: h.lng },
          content: pinEl(h, i + 1),
          gmpClickable: true,
        });
        const self = mk;
        /* AdvancedMarkerElement는 커스텀 엘리먼트라 'click'이 아니라 'gmp-click'을 쓴다 */
        mk.addEventListener("gmp-click", () => {
          info.current?.setContent(popupHTML(h));
          if (map.current) info.current?.open({ map: map.current, anchor: self });
          pickRef.current(h);
        });
        marks.current.set(h.name, mk);
      } else {
        const pin = (mk.content as HTMLElement | null)?.firstElementChild as HTMLElement | null;
        if (pin) pin.textContent = String(i + 1);
      }
      mk.zIndex = 900 - i;
      mk.map = m;
      bounds.extend({ lat: h.lat, lng: h.lng });
    });

    if (rows.length) {
      LANDMARKS.forEach((l) => bounds.extend({ lat: l.lat, lng: l.lng }));
      m.fitBounds(bounds, 26);
      /* fitBounds는 maxZoom(19)까지 당길 수 있으므로 첫 정착 후 16으로 눌러 준다 */
      google.maps.event.addListenerOnce(m, "idle", () => {
        const z = m.getZoom();
        if (z != null && z > 16) m.setZoom(16);
      });
    }
  }, [rows, status]);

  const arm = () => {
    map.current?.setOptions({ gestureHandling: "greedy" });
    setArmed(true);
  };

  return (
    <div className="relative">
      <div ref={box} id="lmap" />

      {status === "ready" && !armed && (
        <button
          onClick={arm}
          className="absolute inset-0 z-[500] flex items-center justify-center rounded-[11px] bg-black/20"
        >
          <span className="rounded-full bg-black/70 px-4 py-2 text-[13.5px] font-semibold text-white">
            {touch ? "지도를 탭하면 이동·확대" : "지도를 클릭하면 휠 확대"}
          </span>
        </button>
      )}

      {status !== "ready" && (
        <div className="absolute inset-0 flex items-center justify-center rounded-[11px] px-6 text-center text-[12.5px] leading-relaxed text-ink-3">
          {status === "loading" && "지도를 불러오는 중…"}
          {status === "nokey" && (
            <span>
              지도를 표시하려면 Google Maps API 키가 필요합니다.
              <br />
              아래 <b>구글 지도에서 열기</b>로도 같은 위치를 볼 수 있습니다.
            </span>
          )}
          {status === "error" && (
            <span>
              지도를 불러오지 못했습니다. 키 제한(리퍼러)이나 네트워크를 확인하세요.
              <br />
              아래 <b>구글 지도에서 열기</b>로도 같은 위치를 볼 수 있습니다.
            </span>
          )}
        </div>
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
