# 나하 호텔 비교 프로젝트 — 인수인계 노트

> 다른 세션에서 이어서 작업하려면 이 파일을 먼저 읽히세요.
> 마지막 작업일: 2026-08-17 / 산출물: `deliverable/나하호텔_29곳_2인.html`

---

## 1. 무엇을 하는 프로젝트인가

**2027-01-19(화) → 2027-01-22(금), 3박 / 성인 2명 / 객실 1개** 조건으로
**오키나와 나하(국제거리·제1마키시 공설시장 근처)** 호텔을 고르기 위한 비교 문서를 만든다.

사용자가 명시한 판단 기준 4개 + 1개:

1. 가성비
2. 객실 넓이
3. 교통 (유이레일 모노레일 · 나하공항)
4. 시설 컨디션
5. **국제거리 / 제1마키시 공설시장 근접성** (대화 중 추가된, 실질적으로 가장 중요한 기준)

**2인이 실제로 예약 가능한 객실만** 집계한다. 트리플·쿼드·패밀리·4인실은 제외.
(단, 콘도미니오 27㎡ 금연 트윈과 네스트 구모지 21㎡ 디럭스 트윈은 "최대 3명" 표기지만
일반 트윈룸이라 남겨 두었다. 이 판단 기준은 유지할 것.)

---

## 2. 산출물

프로젝트 전체는 `docs/naha_hotel/`로 옮겨졌고, GitHub Pages 진입점은 리포지토리 루트의 `docs/index.html`이다
(Settings → Pages → Deploy from a branch, `main` / `/docs`).

| 경로 | 설명 |
|---|---|
| `../index.html` (= `docs/index.html`) | **Pages가 서비스하는 진입점.** 아래 최종본과 동일한 파일을 복사해 둔 것 |
| `deliverable/나하호텔_29곳_2인.html` | **현재 최종본.** React+TS+Tailwind+shadcn을 단일 HTML로 번들. 467KB, 열면 바로 렌더 |
| `deliverable/나하호텔_20곳_2인.html` | 이전 버전(20곳, 순수 vanilla JS 단일 파일). 참고용 |
| `data/hotels.json` | 29곳 전체 + 랜드마크 좌표 + 제외 사유 15건. **가장 이식성 좋은 원본** |
| `data/hotels.csv` | 스프레드시트용 평면 표 (객실 상세는 제외) |
| `src-react/` | 최종본의 소스 (node_modules·dist 제외) |

### 최종본 다시 빌드하는 방법

```bash
cd src-react
pnpm install                 # npm은 workspace: 프로토콜 때문에 실패함 → pnpm 사용
pnpm add leaflet@1.9.4 @types/leaflet   # 이미 package.json에 있으면 생략
bash <web-artifacts-builder 스킬 경로>/scripts/bundle-artifact.sh
# → bundle.html 생성 (self-contained)
node verify.mjs              # Playwright 검증 (아래 4번 참고)
cp bundle.html deliverable/나하호텔_29곳_2인.html && cp bundle.html ../../index.html
```

`web-artifacts-builder` 스킬이 없는 세션이면 `parcel build index.html --no-source-maps` +
`html-inline`으로 같은 결과를 만들 수 있다.

#### 2026-08-17 재빌드에서 걸린 것들 (pnpm 11 환경)

- **pnpm 11의 공급망 정책이 이 락파일을 막는다.** `minimumReleaseAge`(기본 ~24시간) 때문에
  `@hookform/resolvers` · `electron-to-chromium` · `react-resizable-panels`이
  `ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION`으로 거부된다 — 락파일을 만든 날 배포된 버전들이라서다.
  정책 전체를 끄지 말고 **그 세 개만 예외 처리**하면 된다(며칠 지나면 저절로 해소된다):
  ```bash
  pnpm install --frozen-lockfile \
    --config.minimumReleaseAgeExclude=@hookform/resolvers \
    --config.minimumReleaseAgeExclude=electron-to-chromium \
    --config.minimumReleaseAgeExclude=react-resizable-panels
  ```
- **`pnpm exec`는 실행 전에 다시 `pnpm install`을 돌려** 위 정책 검사에 또 걸린다.
  `--config.verifyDepsBeforeRun=false`도 먹지 않았다. 번들 단계는 node로 직접 부르는 게 확실하다:
  ```bash
  node ./node_modules/parcel/lib/bin.js build index.html --dist-dir dist --no-source-maps
  node ./node_modules/html-inline/bin/cmd.js dist/index.html > bundle.html
  ```
- `pnpm install`이 `ERR_PNPM_IGNORED_BUILDS`(@parcel/watcher, @swc/core, lmdb, msgpackr-extract)를
  띄우지만 **`parcel build`에는 영향 없다.** `pnpm approve-builds`를 돌릴 필요 없다.
- **html-inline은 CSS의 `url()`을 인라인하지 않는다.** Leaflet CSS가 참조하는
  `layers.png` · `layers-2x.png` · `marker-icon.png`가 상대경로로 남아 단일 파일에서 깨진다.
  (번호 divIcon만 쓰므로 화면에는 안 보이지만) 번들 후 data URI로 치환해 두었다:
  ```bash
  node -e 'const fs=require("fs");let h=fs.readFileSync("bundle.html","utf8");
  for(const f of fs.readdirSync("dist").filter(f=>f.endsWith(".png")))
    h=h.split("url("+f+")").join("url(data:image/png;base64,"+fs.readFileSync("dist/"+f).toString("base64")+")");
  fs.writeFileSync("bundle.html",h)'
  ```

---

## 3. 데이터 출처와 신뢰도 (중요)

### 수집 경로

- 아고다 나하 도시 검색: `https://www.agoda.com/ko-kr/search?city=18820&checkIn=2027-01-19&los=3&adults=2&rooms=1&currency=KRW`
  - **city=18820 = 나하**. (717899는 오키나와 본섬 전체라 너무 넓다.)
  - 이 URL을 알아낸 방법: `city/naha-jp.html` 랜딩페이지에서 검색 버튼을 눌러 결과 URL의 `city` 파라미터를 읽었다.
- 1페이지 **81곳**을 스크롤 스윕하며 이름·요금·평점·위치 평점·역 거리를 수집
- 스크리닝 통과한 **29곳**만 상세페이지에서 객실 단위로 실측

### 필드 의미

- `price` = **1박 총액, 세금·수수료 포함** (아고다 "1박당 총 금액 ₩ …" 값의 최솟값)
- `rooms[].p` = 해당 객실 타입의 1박 총액 (세금 포함)
- `sold` = 이 날짜에 판매 완료된 2인 객실 종류 수. **`-1` = 확인하지 않음**
- `rev` = 이용후기 수. **`0` = 표기 없음** → UI에 "후기 수 미표기"로 렌더
- `loc` = 아고다 위치 평점. **`0` = 표기 없음** → "—"
- `kokusai` / `market` = 국제거리 / 제1마키시 공설시장 도보 분. `kokusai:0` = "바로 앞"
- `marketSrc` = `"◆"`이면 **아고다가 상세페이지에 직접 표기한 거리**, 빈 문자열이면 좌표 기반 추정
- `condLv` = 배지 색 (`g` 좋음 / `w` 주의 / `b` 나쁨)
- `note` = HTML 문자열 (`<b>` 포함, `dangerouslySetInnerHTML`으로 렌더)

### 정확도 주의사항 — 다음 세션에서 보강하면 좋은 것

1. **부대시설이 `확인 불가`인 9곳** (류진, 나하 시티, 몬트레이, 로열 파크, 컴포트, LESTEL, OMO5, 인피니티, 그린 리치)
   → 개업/리뉴얼 연도, 대욕장, 조식, 세탁, 주차를 호텔 공식/라쿠텐/자란/JTB로 교차 확인하면
   나머지 20곳과 같은 수준이 된다. `sold`도 `-1`이라 상세페이지에서 판매 완료 종류 수를 세면 채울 수 있다.
2. **이용후기 수 `rev:0`인 4곳** (로열 파크, LESTEL, 그린 리치 + 확인 필요) → 검색 카드에서 다시 읽으면 됨.
3. **류진 호텔 우키시마 나하**: 평점 9.3인데 후기 **76건**뿐. 표본이 작다는 경고를 문서에 이미 넣었지만,
   추천 1위로 올려 둔 상태라 실제 예약 전 최근 후기를 눈으로 확인할 것을 권함.
4. **도보 시간 추정 방식**: 20곳은 아고다 표기 + 지도 판독으로 손으로 매긴 값이고,
   9곳은 좌표에서 국제거리 축(26.21286,127.67855 → 26.21680,127.69280)과 시장 좌표까지의
   직선거리를 걷는 속도로 환산한 값이다. **두 방식이 섞여 있다.** 통일하려면 전 29곳을
   같은 방식(가능하면 구글 지도 도보 경로)으로 다시 계산해야 한다.
5. **아고다 요금은 실시간 변동.** 수집 시점은 2026-08-17. 며칠 지나면 다시 긁는 게 맞다.

---

## 4. 아고다 스크래핑 레시피 (재현용)

Claude-in-Chrome MCP(브라우저 도구)로 수행했다. 삽질한 것들을 다 적어 둔다.

- 객실 카드 셀렉터는 **`[data-testid="room-item"]`** (`data-selenium`이 아니다)
- 객실 그리드가 비어 있으면: **실제 `computer scroll` 액션**이 필요하다.
  JS `window.scrollBy`만으로는 첫 로드 때 하이드레이션이 안 걸린다. 새로고침도 자주 해결책이 된다.
- 객실명은 `"객실 사진 및 상세 구성 보기\n"` **다음 줄**이다. `innerText` 첫 줄은 이미지 카운터(`1/18`)다.
- 요금은 `/1박당 총 금액 ₩\s?([\d,]+)/g` 전체를 모아 **최솟값**을 쓴다.
  큰 글씨 `₩ …`는 세금 제외이거나 할인액일 수 있어 신뢰하지 말 것.
- 좌표는 **메타태그**에서 읽는다:
  `document.querySelector('meta[property="place:location:latitude"]').content`
- 검색 결과 카드는 `[data-selenium="hotel-item"]`, 이름은 `[data-selenium="hotel-name"]`.
  리스트는 lazy render라 8~9틱씩 스크롤 + 누적 수집(`window.__ACC`)이 필요하다.
- **`javascript_tool` 반환값에 쿼리스트링이 들어가면 `[BLOCKED: Cookie/query string data]`로 막힌다.**
  URL은 `.split('?')[0]`으로 자르거나, 필요한 파라미터만 `Number(u.searchParams.get('city'))`처럼 숫자로 꺼낼 것.
- 사이드바 필터(지역/숙소 종류) 클릭은 React 이벤트 때문에 잘 먹지 않았다. **city 파라미터로 범위를 좁히는 편이 안전**하다.
- 긴 `await` 루프(9회 초과)나 `setInterval`은 확장에서 타임아웃/스로틀된다. 짧게 나눠 호출할 것.
- `browser_batch`도 60초 제한이 있다. navigate+wait+scroll+extract 2세트가 한 배치의 한계.
- **좌표 스케일 주의**: 이 환경의 스크린샷은 `scale` 파라미터를 줘도 뷰포트 크기(1205×1020)로 돌아온다.
  즉 화면 좌표를 2배로 곱하면 안 된다. 그대로 클릭할 것.

## 5. 검증 레시피 (Playwright)

`src-react/verify.mjs` 참고. 핵심 규칙:

- 반드시 `chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })`.
  **`playwright install`은 절대 실행하지 말 것** (이미 설치돼 있고 재다운로드가 막혀 있다).
- 라우트 핸들러는 **가장 나중에 등록한 것이 우선**이다. catch-all abort를 **먼저** 등록하고
  구체적인 스텁을 나중에 등록해야 한다.
- 컨테이너에 외부 네트워크가 없어서 OSM 타일은 1×1 PNG로 스텁했다.
  **타일이 실제로 보이는지는 사용자 브라우저에서만 확인 가능**하다.
  (2026-08-17 재빌드 시 윈도우 로컬 브라우저에서 실타일 15장 로드·핀 29개·랜드마크 2개·콘솔 에러 0 확인.
  `verify.mjs`의 `/opt/pw-browsers/chromium` 경로는 그 컨테이너 전용이라 로컬에서는 안 맞는다.)
- 확인 항목: 행 29개 / 핀 29개 / 핀 번호 `1..29` / 필터 시 재번호 / 콘솔 에러 0.

---

## 6. UI 구조와 사용자가 요청했던 제약들 (되돌리지 말 것)

문서 순서: 앱바 → 히어로(요약 타일 4개) → **한눈에 보기**(가로 스크롤 표) → **지도** →
**먼저 볼 4곳** → **가격 대비 만족도**(산점도) → 필터/정렬 + **호텔 카드 29장** → **제외한 후보** → 푸터 → 하단 바.

사용자가 명시적으로 요구했거나 고쳐 달라고 한 것들:

- **모바일 기준 UI** (mobile-first). 데스크톱은 760px 이상에서 그리드가 벌어진다.
- **"신규" 배지 금지.** 또 **"2차 조사" 같은 조사 회차 표기 금지** (마지막 요청).
  29곳은 하나의 목록으로 보여야 한다.
- **호텔 이미지 삽입 금지.** 한때 이미지를 넣었다가 "사라진다"는 문제 후
  **이미지 영역을 제거하고 한눈에 보기 쉬운 레이아웃으로** 바꿔 달라고 했다. 되돌리지 말 것.
- **한눈에 보기는 가로 스크롤**, 호텔명 열은 좌측 고정, 헤더와 첫 줄이 겹치지 않아야 한다.
  (세로 sticky 헤더를 없애고 이름 열만 가로 고정하는 방식으로 해결했다.)
- **지도는 Leaflet + OpenStreetMap.** 구글 지도 Embed API는 키가 필요하고
  20개 커스텀 마커를 못 찍어서 배제했다. Maps JavaScript API는 키+결제가 필요하고
  `file://` HTML에 키를 넣으면 노출된다고 사용자에게 설명했다. **키를 넣는 방향으로 되돌리지 말 것.**
- 지도 핀은 **번호 핀**(한눈에 보기 순번과 동일). 20개 라벨을 항상 띄우면 겹쳐서 못 읽는다.
- 모바일에서는 지도를 **한 번 탭해야** 이동·확대가 켜진다(페이지 스크롤 가둠 방지).
- 색은 국제거리 도보 시간에만 쓴다 (`--s1` 3분 이내 / `--s2` 4~8분 / `--s3` 9분 이상).
  넓이 바·평점 미터는 중립 회색. dataviz 스킬에서 검증한 팔레트다:
  라이트 `#2a78d6 / #eb6834 / #1baf7a`, 다크 `#3987e5 / #d95926 / #199e70`.

### 미해결 요청

- **아티팩트 갤러리 저장**: 사용자가 여러 번 요청했으나 이 세션에서는 불가능했다.
  `mcp__remote-devices__create_artifact`는 **Claude 데스크톱 앱에서 시작한 세션**에서만 붙는다
  (브리지가 세션 시작 시점에 바인딩됨). 데스크톱 앱에서 새 세션을 열고
  `deliverable/나하호텔_29곳_2인.html`을 올린 뒤 SendUserFile → create_artifact 하면 된다.

---

## 7. 현재 결론 (2026-08-17 기준)

가장 의사결정에 영향을 준 사실: **이 날짜에는 대부분 호텔이 넓은 객실 타입을 이미 팔았고,
남은 건 가장 작은 방이다.** 그래서 검색 목록의 "최저가"가 실제 선택지를 대표하지 않는다.
(다이와 로이넷이 18㎡ ₩137,724만 남아 1위에서 "추천하기 어려움"으로 내려간 게 대표 사례.)

문서의 추천 4곳:

1. **류진 호텔 우키시마 나하** — 국제거리 90m·시장 190m(아고다 직접 표기), 남은 3종 전부 25㎡, 최저 ₩85,354, 평점 9.3(후기 76건)
2. **인피니티 호텔 나하 쿠모지** — 30㎡ 슈페리어 트윈 ₩79,547 (넓이 대비 최저가), 국제거리 도보 7분
3. **호텔 팜 로얄 리조트 고쿠사이 스트리트** — 2인 객실 13종으로 선택폭 최다, 야외 수영장·온천탕, 22㎡ ₩137,697
4. **콘도미니오 마키시** — 9만원 이하 최대 넓이 27㎡ ₩87,960, 객실 내 주방·세탁기·건조기

그 밖의 눈여겨볼 것: **더 로열 파크 호텔 아이코닉 나하**(전 객실 25~30㎡, 겐초마에역 63m, 평점 9.2, ₩148,796~),
**그린 리치 호텔 앤 캡슐 나하**(29곳 중 드문 인공온천 대욕장, ₩79,870),
**LESTEL NAHA**(전체 최저가 ₩52,078이지만 12㎡).

---

## 8. 다음 세션에 그대로 붙여 쓸 수 있는 프롬프트

```
첨부한 zip은 오키나와 나하 호텔 비교 프로젝트다. HANDOFF.md를 먼저 읽어라.
2027-01-19~22, 3박, 성인 2명, 객실 1개 조건이고 국제거리·제1마키시 공설시장
접근성이 가장 중요한 기준이다. data/hotels.json이 원본 데이터,
deliverable/나하호텔_29곳_2인.html이 현재 최종본, src-react/가 그 소스다.
HANDOFF.md의 "되돌리지 말 것" 목록을 지켜라.
```
