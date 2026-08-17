# 나하 호텔 비교 프로젝트 — 인수인계 노트

> 다른 세션에서 이어서 작업하려면 이 파일을 먼저 읽히세요.
> 마지막 작업일: 2026-08-17
> 공개 URL: **https://namhyun-gu.github.io/workspace/** (GitHub Pages)
> 배포: `.github/workflows/deploy-pages.yml`가 `main` push마다 빌드해서 올린다.
> 지도는 Google Maps이고 **API 키는 Actions Secret으로만 주입한다** — 아래 "배포" 절을 먼저 읽을 것.

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

프로젝트 전체는 `docs/naha_hotel/`로 옮겨졌고, GitHub Pages 진입점은 리포지토리 루트의 `docs/index.html`이다.

| 경로 | 설명 |
|---|---|
| `../index.html` (= `docs/index.html`) | Google Maps 전환 이전의 Leaflet 번들(467,000 bytes)이 **아직 커밋돼 있다.** Pages를 Actions로 돌린 뒤 지워야 한다 (아래 "배포" 절 3단계) |
| `deliverable/나하호텔_29곳_2인.html` | 위와 같은 구버전. CI가 매 배포마다 새로 만들어 올리므로 저장소 사본은 불필요하다 |
| `data/hotels.json` | 29곳 전체 + 랜드마크 좌표 + 제외 사유 15건. **가장 이식성 좋은 원본** |
| `data/hotels.csv` | 스프레드시트용 평면 표 (객실 상세는 제외) |
| `src-react/` | 최종본의 소스. `.gitignore`로 `node_modules` · `dist` · `.parcel-cache` · `bundle.html` 제외 |
| `screenshots/v_desktop.png` · `v_mobile.png` | 이전 세션의 검증 스크린샷 |

이전 버전 `deliverable/나하호텔_20곳_2인.html`(20곳, 순수 vanilla JS)은 **이 저장소에 없다.**
`docs/`로 옮겨질 때 따라오지 않았고 복원하지 않았다. 29곳 최종본이 이를 완전히 대체한다.

### 배포 — GitHub Actions로 전환 (2026-08-17)

지도를 Google Maps로 바꾸면서 **API 키를 커밋하지 않으려고** 배포를 CI 빌드로 옮겼다.
워크플로는 `.github/workflows/deploy-pages.yml`이다.

**전환을 마치려면 저장소 설정에서 아래를 먼저 해야 한다:**

1. Settings → Pages → Source 를 **"Deploy from a branch" → "GitHub Actions"** 로 변경
2. Settings → Secrets and variables → Actions
   - Secret `GMAPS_API_KEY` — Google Maps JavaScript API 키
   - Variable `GMAPS_MAP_ID` — Cloud Console에서 만든 Map ID (없으면 `DEMO_MAP_ID`로 대체되나 워터마크가 붙는다)
3. 1번이 끝난 뒤 커밋된 빌드 산출물(`docs/index.html`, `deliverable/나하호텔_29곳_2인.html`)을 지운다.
   CI가 매번 새로 만들어 배포하므로 저장소에 둘 이유가 없다.
   **1번보다 먼저 지우면 사이트가 404가 된다.**

파이프라인: `pnpm install` → Parcel 번들 → html-inline → `scripts/postbundle.mjs`로 키 주입 →
`docs/`를 `_site/`로 복사(`src-react/` 제외)하고 `index.html`을 갓 만든 번들로 덮어씀 → `actions/deploy-pages`.

#### Google Maps 키 관리 — 반드시 읽을 것

**Maps JS API 키는 브라우저에 노출된다. 숨길 방법이 없다.** 배포된 HTML의 `<meta name="gmaps-key">`에
그대로 박혀 있다. Actions Secret으로 옮긴 것은 *git 히스토리에 남기지 않기 위함*이지 은닉이 아니다.
실제 보호막은 Cloud Console 설정 세 가지다:

- **Application restriction** → HTTP referrers → `https://namhyun-gu.github.io/*`
  (브라우저가 교차 출처 요청에서 Referer를 출처까지만 잘라 보내므로 경로 단위 제한은 신뢰하지 말 것)
- **API restriction** → Maps JavaScript API 하나만
- **할당량 상한** — Dynamic Maps는 월 10,000 로드까지 무료, 초과분은 1,000당 $7다.
  상한을 안 걸면 유일한 실질 리스크가 요금이다.

리퍼러 제한의 대가로 **`file://`로 연 단일 HTML에서는 지도가 뜨지 않는다**(Referer가 아예 안 붙는다).
그 경우 지도 자리에 안내 문구가 뜨고 "구글 지도에서 열기" 링크로 대체되도록 해 두었다.

로컬 개발에서는 플레이스홀더가 그대로 남으므로 콘솔에서 개인 키를 넣어 쓴다:

```js
localStorage.gmapsKey = "AIza...";   // 개발용 키 (리퍼러를 localhost로 열어 둔 것)
localStorage.gmapsMapId = "...";     // 선택. 없으면 DEMO_MAP_ID
```

### 이전 배포 방식 (참고)

- 저장소: `https://github.com/namhyun-gu/workspace` (공개), 기본 브랜치 `main`
- Pages: **Deploy from a branch → `main` / `/docs`**. `docs/`가 사이트 루트가 되므로
  `docs/index.html` → `/workspace/`, `docs/naha_hotel/data/hotels.json` → `/workspace/naha_hotel/data/hotels.json`
- 배포 커밋: `e41d783 docs: 나하 호텔 비교 문서를 GitHub Pages(/docs)로 배치` (80 파일)
- 확인된 라이브 경로:
  - https://namhyun-gu.github.io/workspace/ — 최종본 (HTTP 200, 467,000 bytes)
  - https://namhyun-gu.github.io/workspace/naha_hotel/data/hotels.json — 원본 데이터
  - https://namhyun-gu.github.io/workspace/naha_hotel/HANDOFF.md — 이 문서(원문)
- 푸시 후 첫 요청이 404여도 정상이다. Pages 빌드가 끝나면 뜬다(1분 내외).
- **main에 직접 푸시해야 사이트가 갱신된다.** Pages 소스가 `main`이라 브랜치를 파면 반영되지 않는다.
- 이 저장소에는 git identity가 설정돼 있지 않아 `Init commit`의 작성자
  (`Namhyun Gu <mnhan0403@gmail.com>`)를 저장소 로컬 설정(`git config user.name/email`)으로 넣었다.

### 최종본 다시 빌드하는 방법

원래 절차는 `web-artifacts-builder` 스킬의 `scripts/bundle-artifact.sh` 한 방이다.
**다만 2026-08-17 시점에는 그 스크립트가 통째로는 돌지 않는다** — 첫 단계(`pnpm add`)와
번들 단계(`pnpm exec`)가 아래 pnpm 11 정책 검사에 걸린다. 실제로 통한 순서는 이것이다.

```bash
cd src-react

# 1) 의존성 — npm은 workspace: 프로토콜 때문에 실패한다. pnpm을 쓸 것.
#    (아래 "pnpm 11의 공급망 정책" 항목 참고. 뒤의 --config 3줄이 필요한 이유가 거기 있다.)
pnpm install --frozen-lockfile \
  --config.minimumReleaseAgeExclude=@hookform/resolvers \
  --config.minimumReleaseAgeExclude=electron-to-chromium \
  --config.minimumReleaseAgeExclude=react-resizable-panels
rm -f pnpm-workspace.yaml     # pnpm이 만든 미완성 플레이스홀더. 커밋하지 말 것.

# 2) 번들 — 스킬 스크립트와 동일한 파이프라인(Parcel → html-inline)을 node로 직접 호출
rm -rf dist bundle.html .parcel-cache
node ./node_modules/parcel/lib/bin.js build index.html --dist-dir dist --no-source-maps
node ./node_modules/html-inline/bin/cmd.js dist/index.html > bundle.html

# 3) 지도 키 주입 (키가 없으면 실패한다. 지도만 안 나오는 게 아니라 스크립트가 exit 1)
GMAPS_API_KEY=AIza... GMAPS_MAP_ID=... node scripts/postbundle.mjs bundle.html

# 4) 검증 — node verify.mjs 는 컨테이너 전용이다. 로컬은 5번 절의 브라우저 스니펫을 쓸 것.

# 5) 산출물 배치 — 평소에는 필요 없다. CI가 만들어 배포한다.
#    로컬 산출물이 따로 필요할 때만:
cp bundle.html ../deliverable/나하호텔_29곳_2인.html
```

결과물 크기는 **약 306,000 bytes**다. Leaflet(+그 CSS와 인라인 PNG)이 빠지면서
Google Maps 전환 이전의 467,000 bytes에서 크게 줄었다.
지도 스크립트는 런타임에 구글 CDN에서 받아오므로 번들에 들어가지 않는다.

**예전에 있던 "Leaflet CSS의 url(*.png)을 data URI로 치환" 단계는 이제 없다.**
Leaflet을 import하지 않으므로 `dist/`에 PNG 자체가 생기지 않는다.

#### 2026-08-17 재빌드에서 걸린 것들 (윈도우 + pnpm 11 환경)

- **이 윈도우 머신에는 `node`·`npm`이 PATH에 없다.** pnpm은 자체 실행 파일이라 그냥 돌지만,
  parcel·html-inline을 부르려면 node가 필요하다. Playwright가 번들해 둔 것을 쓰면 된다:
  `C:\Users\<user>\AppData\Local\ms-playwright-go\1.50.1\node.exe` (v22.13.1).
  이 디렉터리를 PATH 앞에 붙이는 것으로 충분하고, 시스템에 node를 새로 설치할 필요는 없었다.
- **`pnpm install`이 `pnpm-workspace.yaml`을 새로 만든다.** 내용이
  `allowBuilds: {'@parcel/watcher': set this to true or false, ...}`라는 **미완성 플레이스홀더**라
  그대로 커밋하면 안 된다. 빌드에 필요 없으니 지우면 된다(`rm src-react/pnpm-workspace.yaml`).
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
- ~~html-inline은 CSS의 `url()`을 인라인하지 않는다~~ — Leaflet CSS가 참조하던 PNG 3개 문제였다.
  **Google Maps로 갈아타면서 사라졌다.** 지금은 `dist/`에 PNG가 생기지 않는다.
- **2026-08-17 현재 이 머신에 pnpm이 없다.** (예전 세션에는 있었다.) `node_modules/`는 이미 깔려 있어
  빌드는 위 node 직접 호출로 돌지만, **의존성을 추가·제거할 수 없다.** 그래서:
  - Google Maps 타입은 `@types/google.maps`를 넣는 대신 `src/types/gmaps.d.ts`에 쓰는 것만 직접 선언했다.
  - **`leaflet` · `@types/leaflet`이 package.json에 남아 있다.** 아무 데서도 import하지 않으므로
    번들에는 안 들어가고 동작에도 영향이 없다. 다음에 pnpm이 있는 환경에서 락파일을 다시 만들 때 빼면 된다.

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

### Playwright 없이 브라우저로만 확인하기

`verify.mjs`를 못 돌리는 환경(로컬 윈도우 등)에서는 파일을 열고 콘솔에 아래를 넣으면 같은 항목을 볼 수 있다.

```js
({ rows: document.querySelectorAll('table.sc tbody tr').length,          // 29
   pins: [...document.querySelectorAll('.pinwrap .pin')].map(e=>e.textContent).join(','), // 1..29
   landmarks: document.querySelectorAll('.lmk-dia').length,              // 2
   tiles: document.querySelectorAll('.leaflet-tile-loaded').length,      // >0 이면 실타일 로드
   ext: document.querySelectorAll('script[src], link[rel=stylesheet]').length }) // 0 = 단일 파일
```

- **React 상태는 비동기다.** 필터 버튼을 `.click()`한 직후 같은 스크립트에서 DOM을 읽으면
  **이전 렌더 값이 나온다.** 클릭과 검사를 별도 호출로 나눠야 한다. (이걸로 한 번 헛다리를 짚었다.)
- 2026-08-17 실측: 필터 `온천·대욕장` → 5곳/핀 1..5, `전체` → 29곳, 정렬 7종·카드 펼침·다크 모드 정상,
  콘솔 에러 0, 외부 참조 0.

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

- **아티팩트 갤러리 저장**: 사용자가 여러 번 요청했으나 그 세션에서는 불가능했다.
  `mcp__remote-devices__create_artifact`는 **Claude 데스크톱 앱에서 시작한 세션**에서만 붙는다
  (브리지가 세션 시작 시점에 바인딩됨). 데스크톱 앱에서 새 세션을 열고
  `deliverable/나하호텔_29곳_2인.html`을 올린 뒤 SendUserFile → create_artifact 하면 된다.
  단, **공유 목적이라면 이제 https://namhyun-gu.github.io/workspace/ 가 있으니 갤러리가 필수는 아니다.**

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
docs/naha_hotel/ 은 오키나와 나하 호텔 비교 프로젝트다. HANDOFF.md를 먼저 읽어라.
2027-01-19~22, 3박, 성인 2명, 객실 1개 조건이고 국제거리·제1마키시 공설시장
접근성이 가장 중요한 기준이다.

data/hotels.json이 원본 데이터, src-react/가 소스,
deliverable/나하호텔_29곳_2인.html이 현재 최종본이고
같은 파일이 docs/index.html로 복사돼 GitHub Pages(main /docs)에서
https://namhyun-gu.github.io/workspace/ 로 서비스된다.

UI를 고치면 src-react/를 고친 뒤 HANDOFF.md "2. 산출물"의 재빌드 절차대로 번들해서
deliverable/ 과 docs/index.html 두 곳에 복사하고, main에 푸시해야 사이트가 갱신된다.
HANDOFF.md의 "되돌리지 말 것" 목록을 지켜라.
```
