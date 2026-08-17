/**
 * 번들된 단일 HTML에 Google Maps 키/Map ID를 주입한다.
 *
 *   GMAPS_API_KEY=... GMAPS_MAP_ID=... node scripts/postbundle.mjs bundle.html
 *
 * 키를 소스에 두지 않기 위한 마지막 단계다. GitHub Actions에서는
 * secrets.GMAPS_API_KEY / vars.GMAPS_MAP_ID 가 이 자리에 들어온다.
 *
 * 주의: 여기서 넣는 값은 배포된 HTML에 그대로 남는다(Maps JS API 구조상 불가피).
 * 실제 보호는 Cloud Console의 HTTP 리퍼러 제한 + API 제한 + 할당량 상한이다.
 */
import fs from "node:fs";

const file = process.argv[2] ?? "bundle.html";
const key = (process.env.GMAPS_API_KEY ?? "").trim();
const mapId = (process.env.GMAPS_MAP_ID ?? "").trim() || "DEMO_MAP_ID";

if (!key) {
  console.error("GMAPS_API_KEY가 비어 있습니다. 키 없이 번들하면 지도가 뜨지 않습니다.");
  process.exit(1);
}
if (!fs.existsSync(file)) {
  console.error(`${file} 이 없습니다. 번들 단계를 먼저 실행하세요.`);
  process.exit(1);
}

let html = fs.readFileSync(file, "utf8");

const hits = (s) => html.split(s).length - 1;
const keyHits = hits("__GMAPS_API_KEY__");
const idHits = hits("__GMAPS_MAP_ID__");

if (keyHits === 0) {
  console.error("__GMAPS_API_KEY__ 플레이스홀더를 찾지 못했습니다. index.html의 meta 태그를 확인하세요.");
  process.exit(1);
}

html = html.split("__GMAPS_API_KEY__").join(key).split("__GMAPS_MAP_ID__").join(mapId);
fs.writeFileSync(file, html);

console.log(`주입 완료: key ${keyHits}곳, mapId ${idHits}곳 (mapId=${mapId})`);
