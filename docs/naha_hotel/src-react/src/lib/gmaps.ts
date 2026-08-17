/**
 * Google Maps 키 조달 + 스크립트 로더.
 *
 * 키는 소스에 넣지 않는다. `index.html`의 <meta>에 플레이스홀더로만 두고,
 * 번들 후 `scripts/postbundle.mjs`가 GitHub Actions Secret 값으로 치환한다.
 * 로컬 개발에서는 플레이스홀더가 그대로 남으므로 localStorage로 대체한다:
 *
 *   localStorage.gmapsKey = "AIza..."      // 개인 개발용 키
 *   localStorage.gmapsMapId = "..."        // 선택. 없으면 DEMO_MAP_ID
 *
 * 브라우저에 노출되는 것은 어쩔 수 없다(Maps JS API의 구조상 불가피).
 * 실제 보호막은 Cloud Console의 HTTP 리퍼러 제한 + API 제한 + 할당량 상한이다.
 */

const DEV_MAP_ID = "DEMO_MAP_ID";

const meta = (name: string) =>
  document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)?.content?.trim() ?? "";

/** 치환 전 플레이스홀더인지 판별. 런타임 값이라 번들러가 상수 폴딩하지 못한다. */
const isPlaceholder = (v: string) => v.startsWith("__") && v.endsWith("__");

const fromStorage = (k: string) => {
  try {
    return localStorage.getItem(k) ?? "";
  } catch {
    return "";
  }
};

export function gmapsKey(): string {
  const v = meta("gmaps-key");
  return v && !isPlaceholder(v) ? v : fromStorage("gmapsKey");
}

export function gmapsMapId(): string {
  const v = meta("gmaps-map-id");
  if (v && !isPlaceholder(v)) return v;
  return fromStorage("gmapsMapId") || DEV_MAP_ID;
}

let pending: Promise<void> | null = null;

/**
 * Maps JS API를 한 번만 로드한다. 이미 떠 있으면 즉시 resolve.
 *
 * 키가 틀리거나 망이 막힌 경우 구글 스크립트는 200으로 내려오면서 콜백을 부르지 않는
 * 경우가 있어 onerror만으로는 잡히지 않는다. 그래서 타임아웃을 함께 건다.
 */
export function loadGmaps(key: string, timeoutMs = 10_000): Promise<void> {
  if (pending) return pending;
  pending = new Promise<void>((resolve, reject) => {
    if (typeof google !== "undefined" && google.maps?.Map) return resolve();
    if (!key) return reject(new Error("NO_KEY"));

    const timer = setTimeout(() => reject(new Error("TIMEOUT")), timeoutMs);
    const done = () => {
      clearTimeout(timer);
      resolve();
    };
    const fail = () => {
      clearTimeout(timer);
      reject(new Error("LOAD_FAILED"));
    };

    const cb = "__gmapsReady";
    (window as unknown as Record<string, unknown>)[cb] = done;

    const params = new URLSearchParams({
      key,
      v: "weekly",
      libraries: "marker",
      language: "ko",
      region: "JP",
      loading: "async",
      callback: cb,
    });
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://maps.googleapis.com/maps/api/js?${params}`;
    s.onerror = fail;
    document.head.appendChild(s);
  });
  return pending;
}
