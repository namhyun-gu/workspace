export type Room = { n: string; s: number | null; o: number; b: string; p: number };

export type Hotel = {
  lat: number; lng: number; short: string; name: string; en: string; star: number;
  price: number; score: number; rev: number; loc: number; sold: number; avail: number;
  rooms: Room[]; area: number[]; areaTxt: string; station: string; stationM: number;
  kokusai: number; market: number; marketSrc: string;
  opened: string; reno: string; bath: string; pool: string; bf: string; laundry: string;
  parking: string; agoda: string; cond: string; condLv: string; note: string;
};

export const HOTELS: Hotel[] = [
 {lat:26.21951, lng:127.682261, short:"네스트", name:"네스트 호텔 나하 구모지", en:"Nest Hotel Naha Kumoji", star:3.5, price:136311, score:8.9, rev:8224, loc:9.0, sold:4, avail:3,
  rooms:[{n:"디럭스 트윈",s:21,o:3,b:"싱글베드 2개",p:136311},{n:"더블 (금연)",s:20,o:2,b:"더블베드 1개",p:140031},{n:"트윈룸",s:19,o:2,b:"싱글베드 2개",p:136311}],
  area:[19,21], areaTxt:"19~21㎡", station:"미에바시역", stationM:216, kokusai:10, market:9, marketSrc:"",
  opened:"확인 불가", reno:"확인 불가", bath:"없음", pool:"없음", bf:"뉴페 (지역 식재료 중심)", laundry:"관내 코인세탁기 (유료)", parking:"40대 (요금 미표기)",
  agoda:"Sachiko Nakada Theater 140m · Union 230m · Midorigaoka Park 370m",
  cond:"전 객실 금연 · 120실", condLv:"g", note:"디럭스 트윈(21㎡, 최대 3명)과 트윈룸(19㎡)이 <b>가격이 ₩136,311로 동일</b>합니다 — 디럭스를 잡는 게 무조건 낫습니다. 후기 8,224건에 8.9점으로 평가가 안정적이고 전 객실 금연입니다. 다만 공식 안내 기준 <b>국제거리 도보 10분</b>으로 이번 목록에서 가장 먼 축이고, 대욕장·수영장은 없습니다."},

 {lat:26.21723, lng:127.69162, short:"더 큐브", name:"호텔 더 큐브 나하 국제 스트리트", en:"HOTEL THE CUBE Naha Kokusai St.", star:3, price:55176, score:8.6, rev:5831, loc:9.3, sold:1, avail:2,
  rooms:[{n:"스탠다드 더블 (금연)",s:null,o:2,b:"더블베드 1개",p:55176},{n:"룸 (벙크베드)",s:null,o:2,b:"벙크베드",p:60144}],
  area:[5,6], areaTxt:"면적 미표기 (캐빈형)", station:"마키시역", stationM:93, kokusai:0, market:8, marketSrc:"",
  opened:"2016", reno:"확인 불가", bath:"없음 (층별 공용 샤워룸)", pool:"없음", bf:"간단 양식 조식", laundry:"코인세탁기", parking:"없음",
  agoda:"Nabbie Sanshin 20m권 · Tenbusu Naha 260m",
  cond:"캐빈형 초소형", condLv:"b", note:"아고다 상세에 면적 표기가 없는 캐빈형. 국제거리에 면해 가장 싸지만 2인이 캐리어를 펼치기엔 매우 좁고 문틈 소음이 큽니다."},

 {lat:26.21549, lng:127.68603, short:"란타나", name:"호텔 란타나 나하 고쿠사이 스트리트", en:"Hotel Lantana Naha Kokusai-dori", star:3, price:65846, score:8.5, rev:11711, loc:9.2, sold:4, avail:2,
  rooms:[{n:"트윈룸",s:19,o:2,b:"싱글베드 2개",p:68503},{n:"스탠다드룸",s:null,o:2,b:"싱글베드 2개",p:65846}],
  area:[19,19], areaTxt:"19㎡", station:"미에바시역", stationM:447, kokusai:1, market:2, marketSrc:"◆ 150m",
  opened:"2019", reno:"확인 불가", bath:"없음", pool:"없음", bf:"유료 뷔페", laundry:"없음", parking:"없음",
  agoda:"제1마키시 공설시장 150m · 국제거리 130m · 돈키호테 인근",
  cond:"신축급 (2019)", condLv:"g", note:"아고다 도보 명소에 공설시장이 150m로 찍힌 유일한 저가 호텔. 스탠다드와 19㎡ 트윈 차액이 2,657원이라 트윈이 낫습니다. 주차장·세탁기 없음."},

 {lat:26.21557, lng:127.69109, short:"비비", name:"비비 호텔 고쿠사이도리", en:"BiBi Hotel Kokusaidori", star:3, price:73220, score:8.5, rev:1300, loc:8.7, sold:0, avail:1,
  rooms:[{n:"더블룸",s:15,o:2,b:"더블베드 1개",p:73220}],
  area:[15,15], areaTxt:"15㎡", station:"마키시역", stationM:238, kokusai:2, market:9, marketSrc:"",
  opened:"확인 불가", reno:"확인 불가", bath:"없음 (욕조 없이 샤워부스)", pool:"없음", bf:"없음 (객실 IH·전자레인지)", laundry:"전 객실 내 세탁기", parking:"1박 1,500엔 · 3대",
  agoda:"Tenbusu Naha 180m · Fukurasha 130m",
  cond:"신축급 · 협소", condLv:"w", note:"원래 더블룸 한 종류만 운영하는 24실 아파트먼트형이라 판매 완료 0종. 주방·세탁기는 좋지만 15㎡에 욕조가 없습니다."},

 {lat:26.215666, lng:127.6907, short:"콘도미니오", name:"콘도미니오 마키시", en:"Condominio MAKISHI", star:3, price:87960, score:8.7, rev:3616, loc:9.3, sold:4, avail:2,
  rooms:[{n:"트윈 - 금연",s:27,o:3,b:"싱글베드 2개",p:87960},{n:"트윈 - 흡연",s:27,o:2,b:"싱글베드 2개",p:87960}],
  area:[27,27], areaTxt:"27㎡", station:"마키시역", stationM:255, kokusai:1, market:5, marketSrc:"",
  opened:"2013.11", reno:"확인 불가", bath:"없음 (욕실·화장실 분리)", pool:"없음", bf:"없음 (전 객실 주방)", laundry:"전 객실 내 세탁기+건조기", parking:"1박 1,500엔 · 2~3대",
  agoda:"Tenbusu Naha 140m · Grand Blue Naha 100m",
  cond:"양호 · 넓은 객실", condLv:"g", note:"9만 원 이하에서 27㎡가 남은 유일한 곳. 금연 트윈은 최대 3명. 주방·세탁기·건조기가 객실에 있어 시장에서 사와 해먹기 좋습니다."},

 {lat:26.2205658, lng:127.682259, short:"프린스", name:"프린스 스마트 인 나하", en:"Prince Smart Inn Naha", star:3, price:92785, score:9.0, rev:9619, loc:9.0, sold:4, avail:2,
  rooms:[{n:"트윈룸",s:17,o:2,b:"싱글베드 2개",p:93816},{n:"게스트룸 (더블)",s:14,o:2,b:"더블베드 1개",p:92785}],
  area:[14,17], areaTxt:"14~17㎡", station:"미에바시역", stationM:260, kokusai:10, market:13, marketSrc:"",
  opened:"2022.11", reno:"해당 없음", bath:"없음", pool:"없음", bf:"무료 경조식 (베이글 중심)", laundry:"5층 유료 2대", parking:"1박 1,500엔 · 26대",
  agoda:"미에바시역 260m · Sachiko Nakada Theater 160m",
  cond:"신축 (2022)", condLv:"g", note:"2022년 신축이라 청결·조용함 평이 높지만 남은 방이 14·17㎡로 가장 좁은 축. 국제거리까지 도보 10분으로 접근성도 이번 후보 중 하위."},

 {lat:26.216833, lng:127.687469, short:"아트스테이", name:"호텔 아트 스테이 나하 고쿠사이 스트리트", en:"HOTEL ART STAY Naha Kokusai St.", star:3.5, price:97296, score:8.8, rev:11314, loc:9.4, sold:4, avail:1,
  rooms:[{n:"더블 (금연)",s:16,o:2,b:"싱글베드 2개",p:97296}],
  area:[16,16], areaTxt:"16㎡", station:"미에바시역", stationM:407, kokusai:1, market:3, marketSrc:"◆ 230m",
  opened:"확인 불가 (기존 건물 전환)", reno:"리뉴얼 완료 (연도 미공개)", bath:"없음", pool:"없음", bf:"뷔페 (오키나와 요리 중심)", laundry:"1층 세탁 서비스", parking:"제휴 1,200엔 · 17대",
  agoda:"돈키호테 110m · 제1마키시 공설시장 230m · Peace Street 140m",
  cond:"리뉴얼했으나 연식 있음", condLv:"w", note:"돈키호테 110m·공설시장 230m로 쇼핑 접근성 최상위. 라운지 프리드링크와 생맥주·아와모리 무제한이 강점이지만 남은 방은 16㎡ 한 종류뿐입니다."},

 {lat:26.213978, lng:127.680779, short:"아베스트", name:"호텔 아베스트 나하 고쿠사이 스트리트", en:"Hotel Abest Naha Kokusai-dori", star:3, price:97686, score:8.2, rev:4328, loc:9.2, sold:2, avail:2,
  rooms:[{n:"더블 (금연)",s:15,o:2,b:"더블베드 1개",p:97686},{n:"더블 (흡연)",s:15,o:2,b:"더블베드 1개",p:106607}],
  area:[15,15], areaTxt:"15㎡", station:"겐초마에역", stationM:149, kokusai:6, market:11, marketSrc:"",
  opened:"확인 불가", reno:"확인 불가", bath:"없음", pool:"없음", bf:"유료 뷔페", laundry:"확인 불가", parking:"제휴 1,000엔",
  agoda:"Naha City Centre 60m · Ryubo 110m",
  cond:"노후 · 청소는 양호", condLv:"w", note:"15㎡에 10만 원 가까이라 가격 대비 넓이가 가장 아쉽습니다. 건물 노후 지적이 많지만 청소 상태는 좋다는 평."},

 {lat:26.216488, lng:127.689919, short:"팜 로얄", name:"호텔 팜 로얄 리조트 고쿠사이 스트리트", en:"Hotel Palm Royal Resort Kokusai Street", star:3, price:98047, score:8.7, rev:7576, loc:9.3, sold:4, avail:13,
  rooms:[{n:"프리미어 트윈룸 (신관, 금연)",s:30,o:2,b:"싱글베드 2개",p:196778},{n:"RAM 디럭스 트윈",s:30,o:2,b:"더블베드 2개",p:171533},{n:"슈페리어 트윈",s:28,o:2,b:"더블베드 2개",p:152278},{n:"RAM 트윈",s:26,o:2,b:"더블베드 2개",p:158035},{n:"그랜드 트윈",s:22,o:2,b:"더블베드 2개",p:137697},{n:"컴포트 더블룸 (성인 2)",s:14,o:2,b:"더블베드 1개",p:98047}],
  area:[14,30], areaTxt:"14~30㎡", station:"마키시역", stationM:276, kokusai:0, market:4, marketSrc:"",
  opened:"확인 불가", reno:"신관 있음", bath:"온천 스타일 욕탕 (후기 다수)", pool:"야외 수영장 · 아동용 수영장 · 풀사이드 바", bf:"조식 이용 가능", laundry:"확인 불가", parking:"주차장 있음",
  agoda:"Nabbie Sanshin 20m · Grand Blue Naha 40m · Tenbusu Naha 70m · Peace Street 110m · 돈키호테 220m",
  cond:"선택지 최다 · 리조트형", condLv:"g", note:"선택지가 가장 넓습니다. 국제거리 한복판인데 <b>2인 객실만 13종</b>으로 압도적이고, 14㎡부터 30㎡까지 예산에 맞춰 고를 수 있습니다. 22㎡ 그랜드 트윈 ₩137,697, 28㎡ 슈페리어 트윈 ₩152,278. 야외 수영장과 온천탕까지 있어 같은 가격대에서 만족도가 높습니다."},

 {lat:26.220308, lng:127.682838, short:"리치먼드", name:"리치먼드 호텔 나하 쿠모지", en:"Richmond Hotel Naha Kumoji", star:3, price:102003, score:8.6, rev:6600, loc:8.6, sold:4, avail:3,
  rooms:[{n:"디럭스 더블룸 (금연)",s:26,o:2,b:"퀸베드 1개",p:123482},{n:"코너 스탠다드 더블",s:19,o:2,b:"더블베드 1개",p:119071},{n:"스탠다드 더블 (금연)",s:18,o:2,b:"더블베드 1개",p:102003}],
  area:[18,26], areaTxt:"18~26㎡", station:"미에바시역", stationM:196, kokusai:9, market:9, marketSrc:"",
  opened:"확인 불가", reno:"확인 불가", bath:"없음", pool:"없음", bf:"조식 있음", laundry:"세탁 서비스", parking:"주차장 있음",
  agoda:"Union 150m · Sachiko Nakada Theater 200m · 미에바시역 200m",
  cond:"비즈니스 · 넓은 객실", condLv:"g", note:"전체 10종 중 <b>2인 객실은 3종</b>입니다(나머지는 트리플·쿼드·3~4인 트윈). 26㎡ 디럭스 더블이 ₩123,482로, 2인 기준 이 목록에서 26㎡를 잡을 수 있는 몇 안 되는 곳입니다. 국제거리는 도보 9~10분으로 떨어져 있고(바로 옆 블록 네스트 구모지 공식 안내가 도보 10분) 위치 평점도 8.6으로 낮은 편입니다."},

 {lat:26.217394, lng:127.692055, short:"난세이", name:"난세이 칸코 호텔", en:"Nansei Kanko Hotel", star:3, price:105251, score:8.2, rev:3497, loc:9.3, sold:4, avail:2,
  rooms:[{n:"스탠다드 트윈룸",s:20,o:2,b:"싱글베드 2개",p:105251},{n:"스탠다드룸",s:null,o:2,b:"싱글베드 2개",p:121560}],
  area:[20,20], areaTxt:"20㎡", station:"마키시역", stationM:52, kokusai:0, market:8, marketSrc:"",
  opened:"쇼와기 (미상)", reno:"2011.08 전 객실", bath:"없음 (공식 FAQ 확인)", pool:"없음", bf:"11층 뷔페", laundry:"1층 코인세탁기", parking:"없음",
  agoda:"Chura Bijin 170m · Tenbusu Naha 300m",
  cond:"노후 · 방음 약함", condLv:"b", note:"마키시역 52m로 역 접근성 1위이고 20㎡ 트윈이 남아 있지만, 쇼와기 건물이라 옆방 대화가 들릴 정도로 방음이 약합니다."},

 {lat:26.218807, lng:127.684307, short:"스트라타", name:"호텔 스트라타 나하", en:"HOTEL STRATA Naha", star:3.5, price:106631, score:8.9, rev:3856, loc:9.1, sold:4, avail:2,
  rooms:[{n:"컴팩트룸",s:16,o:2,b:"더블베드 1개",p:106631},{n:"컴팩트 더블룸",s:16,o:2,b:"더블베드 1개",p:119945}],
  area:[16,16], areaTxt:"16㎡", station:"미에바시역", stationM:49, kokusai:7, market:9, marketSrc:"",
  opened:"2020.04", reno:"확인 불가", bath:"없음 (욕실·화장실 분리형)", pool:"야외 가든풀(4~10월) · 24h 피트니스", bf:"뷔페", laundry:"관내 코인세탁기", parking:"1박 1,500엔 · 48대",
  agoda:"Midorigaoka Park 190m · Union 190m",
  cond:"신축급 (2020)", condLv:"g", note:"미에바시역 49m. 22~37㎡ 객실도 있는 호텔이지만 이 날짜엔 16㎡ 컴팩트룸 2종만 남았습니다. 1월이라 야외 풀은 시즌 오프."},

 {lat:26.213367, lng:127.678146, short:"알몬트", name:"알몬트 호텔 나하-겐초마에", en:"Almont Hotel Naha Kenchomae", star:3.5, price:115314, score:9.0, rev:23125, loc:9.3, sold:4, avail:1,
  rooms:[{n:"컴팩트 더블룸 (금연)",s:15,o:2,b:"더블베드 1개",p:115314}],
  area:[15,15], areaTxt:"15㎡", station:"겐초마에역", stationM:165, kokusai:3, market:14, marketSrc:"",
  opened:"2016 (추정)", reno:"확인 불가", bath:"12층 대욕장 '욘나~노유' 인공온천 · 무료", pool:"없음", bf:"뷔페 (오키나와 향토요리)", laundry:"있음 (유료)", parking:"1박 1,500엔 · 32대",
  agoda:"겐초마에역 160m · Ryubo 160m",
  cond:"청결도 최상위", condLv:"g", note:"후기 2.3만 건에 9.0점으로 가장 검증된 곳이고 12층 대욕장이 강점. 다만 남은 방이 15㎡ 하나뿐인데 11.5만 원이라 넓이만 보면 비쌉니다."},

 {lat:26.212385, lng:127.682243, short:"그랜드콘소트", name:"호텔 그랜드 콘소트 나하", en:"Hotel Grand Consort Naha", star:4, price:121403, score:9.1, rev:8311, loc:9.1, sold:0, avail:2,
  rooms:[{n:"스탠다드 트윈룸",s:23,o:2,b:"",p:138000},{n:"STANDARD DOUBLE (2PAX)",s:16,o:2,b:"",p:121403}],
  area:[16,23], areaTxt:"16·23㎡", station:"겐초마에역", stationM:364, kokusai:3, market:10, marketSrc:"",
  opened:"2022.09", reno:"해당 없음 (신축)", bath:"없음 (전 객실 욕실·화장실 분리)", pool:"없음", bf:"뷔페 + 무료 드링크 라운지", laundry:"1층 코인세탁기", parking:"1박 1,650엔",
  agoda:"Public Square 190m · Washita Shop 220m",
  cond:"신축 (2022) · 최상", condLv:"g", note:"판매 완료 0종. 2022년 신축에 전 객실 욕실·화장실 분리, 무료 라운지 드링크. 23㎡ 트윈을 잡을 수 있는 몇 안 되는 곳이지만 진입로 오르막이 있습니다."},

 {lat:26.218119, lng:127.695892, short:"휴잇", name:"Hewitt Resort Naha", en:"Hewitt Resort Naha", star:5, price:130618, score:8.6, rev:14037, loc:8.7, sold:4, avail:4,
  rooms:[{n:"스탠다드 트윈룸",s:25,o:2,b:"싱글베드 2개",p:140516},{n:"스탠다드 트윈",s:25,o:2,b:"싱글베드 2개",p:159473},{n:"유니버셜룸",s:25,o:2,b:"더블베드 1개",p:130618},{n:"스탠다드 더블",s:20,o:2,b:"더블베드 1개",p:136487}],
  area:[20,25], areaTxt:"20~25㎡", station:"아사토역", stationM:154, kokusai:9, market:11, marketSrc:"",
  opened:"확인 불가", reno:"확인 불가", bath:"없음", pool:"옥상 인피니티풀 · 아동용 수영장", bf:"조식 뷔페", laundry:"확인 불가", parking:"주차장 있음",
  agoda:"San-A V21 Food Hall Asato 80m · Cargoes 100m · 사카에마치 시장 120m · 아사토역 150m",
  cond:"5성 · 넓은 객실", condLv:"g", note:"2인 객실 4종이 모두 20~25㎡로, <b>가장 좁은 방이 20㎡</b>인 유일한 호텔입니다. 25㎡ 유니버셜룸이 ₩130,618. 다만 아사토역 쪽이라 국제거리는 도보 9분 정도이고 위치 평점 8.7로 상대적으로 낮습니다."},

 {lat:26.21422, lng:127.68247, short:"그레이스리", name:"호텔 그레이스리 나하", en:"HOTEL GRACERY Naha", star:4, price:130308, score:8.9, rev:12543, loc:9.4, sold:4, avail:2,
  rooms:[{n:"트윈룸 A",s:22,o:2,b:"",p:135000},{n:"더블룸 (흡연)",s:18,o:2,b:"더블베드 1개",p:130308}],
  area:[18,22], areaTxt:"18·22㎡", station:"겐초마에역", stationM:311, kokusai:2, market:6, marketSrc:"◆ 480m",
  opened:"2016.04", reno:"확인 불가", bath:"없음 (욕조·세면 분리형)", pool:"없음", bf:"뷔페", laundry:"유료 세탁실", parking:"자체 없음 (제휴)",
  agoda:"제1마키시 공설시장 480m · Washita Shop 110m",
  cond:"양호 (2016)", condLv:"g", note:"유닛배스가 아닌 욕조·세면 분리형 욕실이 강점(욕실 평점 9.2). 남은 최저가가 흡연 더블이라는 점은 확인이 필요하고, 22㎡ 트윈 A는 조금 더 내면 잡힙니다."},

 {lat:26.216021, lng:127.685852, short:"JAL 시티", name:"호텔 JAL 시티 나하", en:"Hotel JAL City Naha", star:4, price:136674, score:8.7, rev:20798, loc:9.4, sold:4, avail:3,
  rooms:[{n:"와이드 트윈룸",s:25,o:2,b:"싱글 2 + 소파베드",p:194841},{n:"트윈룸 (18~23㎡)",s:23,o:2,b:"싱글베드 2개",p:161116},{n:"트윈",s:null,o:2,b:"싱글베드 2개",p:136674}],
  area:[18,25], areaTxt:"18~25㎡", station:"미에바시역", stationM:386, kokusai:0, market:5, marketSrc:"",
  opened:"2006", reno:"확인 불가", bath:"없음 (전 객실 유닛배스)", pool:"없음", bf:"뷔페 (와·양·류큐 약 50종)", laundry:"4·8층", parking:"1박 1,800엔 · 85대",
  agoda:"국제거리 150m ◆ · Chindami Sanshin Shop 40m",
  cond:"연식 있음 (2006)", condLv:"w", note:"국제거리 한복판의 4성으로 조식 평가가 꾸준히 높습니다. 2인 객실은 3종이고 25㎡ 와이드 트윈이 ₩194,841로 뛰어, 실속은 ₩136,674 트윈 쪽입니다. 2006년 건물이라 욕실은 좁은 유닛배스."},

 {lat:26.217981, lng:127.693886, short:"다이와", name:"다이와 로이넷 호텔 나하 코쿠사이도리", en:"Daiwa Roynet Hotel Naha Kokusai-dori", star:3.5, price:137724, score:8.8, rev:11136, loc:9.4, sold:4, avail:1,
  rooms:[{n:"스탠다드 더블룸 (2인, 금연)",s:18,o:2,b:"더블베드 1개",p:137724}],
  area:[18,18], areaTxt:"18㎡", station:"마키시역", stationM:156, kokusai:1, market:10, marketSrc:"",
  opened:"2011.07", reno:"2025.02 전면 리뉴얼", bath:"없음 (유닛형 욕실)", pool:"없음", bf:"뷔페 (오키나와 요리 약 50종)", laundry:"4·6층 각 4대 · 24시간", parking:"제휴 1,500엔 · 60대",
  agoda:"Sakaemachi Ichiba Market 290m · Chura Bijin 50m",
  cond:"2025년 리뉴얼 · 신축급", condLv:"g", note:"2025년 2월 리뉴얼로 컨디션은 신축급이고 마키시역 직결. 다만 27~30㎡ 트윈은 다 빠지고 18㎡ 하나만 13.8만 원에 남아 넓이 기준으로는 추천하기 어렵습니다."},

 {lat:26.216213, lng:127.693267, short:"히노데", name:"오키나와 히노데 온천 리조트", en:"Okinawa Hinode Resort & Hot Spring", star:4, price:169174, score:9.2, rev:9774, loc:9.3, sold:4, avail:2,
  rooms:[{n:"트윈룸",s:20,o:2,b:"",p:187000},{n:"더블룸",s:16,o:2,b:"더블베드 1개",p:169174}],
  area:[16,20], areaTxt:"16·20㎡", station:"마키시역", stationM:136, kokusai:3, market:10, marketSrc:"",
  opened:"2020.12", reno:"해당 없음", bath:"야외 심층수 천연온천 (수영복) · 무료", pool:"야외 수영장", bf:"뷔페 + 알코올·아이스크림 무제한", laundry:"코인세탁기·건조기 각 5대", parking:"1박 1,500엔 · 약 10대",
  agoda:"Chura Bijin 230m · Tsuboya Pottery Museum 350m",
  cond:"신축 (2020) · 협소", condLv:"w", note:"나하 시내에서 드물게 천연온천 + 수영장 + 술·야식 무제한. 다만 16㎡ 더블에 16.9만 원으로 면적당 가격이 가장 비쌉니다."},

 {lat:26.215097, lng:127.685539, short:"컬렉티브", name:"호텔 컬렉티브", en:"HOTEL COLLECTIVE", star:5, price:285688, score:9.2, rev:11017, loc:9.7, sold:4, avail:2,
  rooms:[{n:"슈페리어 트윈룸 (2인)",s:30,o:2,b:"더블베드 2개",p:285688},{n:"고층 슈페리어 트윈룸",s:30,o:2,b:"더블베드 2개",p:290126}],
  area:[30,30], areaTxt:"30㎡", station:"미에바시역", stationM:475, kokusai:1, market:2, marketSrc:"◆ 180m",
  opened:"2019.12", reno:"확인 불가", bath:"대욕장 + 드라이·스팀 사우나 · 무료", pool:"야외 25m 수영장(4~10월) · 피트니스", bf:"뷔페", laundry:"코인세탁기 없음", parking:"지하 150대",
  agoda:"국제거리 80m ◆ · 제1마키시 공설시장 180m · Tohodo 70m",
  cond:"최상 (2019 신축급)", condLv:"g", note:"아고다 기준 국제거리 80m·공설시장 180m로 위치가 압도적이고 남은 방이 30㎡ 트윈. 대욕장·사우나까지 있는 유일한 5성이지만 가격이 3배입니다."}
];

export type Landmark = { n: string; lat: number; lng: number };

export const LANDMARKS: Landmark[] =[{n:"제1마키시 공설시장",lat:26.2145927,lng:127.6883013},
           {n:"국제거리 서쪽 입구 (겐초키타구치)",lat:26.2128604,lng:127.6785495}];

/* ===== 검색 스윕에서 통과한 9곳 =====
   sold:-1 = 판매 완료 객실 종류 미확인, rev:0 / loc:0 = 아고다 표기 없음 */
export const HOTELS_NEW: Hotel[] = [
 {lat:26.214615, lng:127.685364, short:"류진", name:"류진 호텔 우키시마 나하", en:"Ryuujin Hotel Ukishima Naha", star:5, price:85354, score:9.3, rev:76, loc:9.5,
  sold:-1, avail:3,
  rooms:[{n:"스탠다드 더블 (간이주방 없음)",s:25,o:2,b:"더블베드 1개",p:85354},{n:"트윈룸 (Cozy Twin Nest)",s:25,o:2,b:"싱글베드 2개",p:98569},{n:"퀸 더블룸",s:25,o:2,b:"퀸베드 1개",p:108361}],
  area:[25,25], areaTxt:"25㎡", station:"미에바시역", stationM:523,
  kokusai:1, market:3, marketSrc:"◆",
  opened:"확인 불가", reno:"확인 불가", bath:"확인 불가", pool:"없음",
  bf:"확인 불가", laundry:"확인 불가", parking:"확인 불가",
  agoda:"국제거리 90m · 제1마키시 공설시장 190m · Tohodo 70m · 진다미 산신점 160m",
  cond:"5성급 · 25㎡ 균일", condLv:"g",
  note:"29곳 중 <b>가장 강한 후보</b>입니다. 아고다가 상세페이지에 <b>국제거리 90m · 제1마키시 공설시장 190m</b>로 직접 표기했고, 남은 3종이 <b>전부 25㎡ 2인실</b>이며 최저가가 ₩85,354입니다. 평점 9.3인데 <b>이용후기가 76건</b>뿐이라 표본이 작은 점만 감안하세요."},

 {lat:26.214571, lng:127.683456, short:"나하 시티", name:"호텔 나하 시티 -국제 거리-", en:"Hotel Naha City -Kokusai Street-", star:2, price:87127, score:8.5, rev:3794, loc:9.1,
  sold:-1, avail:3,
  rooms:[{n:"세미 더블룸 (금연)",s:10,o:2,b:"싱글베드 1개",p:87127},{n:"트윈룸",s:18,o:2,b:"싱글베드 2개",p:101912},{n:"트윈",s:18,o:2,b:"싱글베드 2개",p:102228}],
  area:[10,18], areaTxt:"10~18㎡", station:"겐초마에역", stationM:410,
  kokusai:1, market:6, marketSrc:"",
  opened:"확인 불가", reno:"확인 불가", bath:"확인 불가", pool:"없음",
  bf:"오키나와식 조식 제공(아고다 표기)", laundry:"확인 불가", parking:"확인 불가",
  agoda:"아고다 배지: 국제거리 중심부 위치 · 세븐일레븐 바로 연결",
  cond:"2성급 · 후기 3,794건", condLv:"w",
  note:"국제거리 위에 바로 있고 후기도 3,794건으로 두껍습니다. 다만 최저가 방이 <b>10㎡ 세미더블(싱글베드 1개)</b>이라 2인이 쓰기엔 좁고, 18㎡ 트윈은 ₩101,912로 올라갑니다."},

 {lat:26.213532, lng:127.681118, short:"몬트레이", name:"호텔 몬트레이 라 수르 나하", en:"Hotel Monterey La Soeur Naha", star:4, price:124441, score:9.1, rev:429, loc:9.5,
  sold:-1, avail:3,
  rooms:[{n:"킹베드 더블 - B",s:19,o:2,b:"킹베드 1개",p:124441},{n:"스탠다드 트윈룸 (2인, 금연)",s:19,o:2,b:"싱글베드 2개",p:124441},{n:"코너 트윈 (금연)",s:27,o:2,b:"싱글베드 2개",p:163040}],
  area:[19,27], areaTxt:"19~27㎡", station:"겐초마에역", stationM:200,
  kokusai:1, market:10, marketSrc:"",
  opened:"확인 불가", reno:"확인 불가", bath:"확인 불가", pool:"없음",
  bf:"확인 불가", laundry:"확인 불가", parking:"확인 불가",
  agoda:"위치 평점 9.5 · 겐초마에역 200m",
  cond:"위치 평점 9.5", condLv:"g",
  note:"위치 평점 9.5로 20곳+9곳 중 최상위권입니다. 국제거리 서쪽 구간 바로 위, 27㎡ 코너 트윈이 ₩163,040. 19㎡ 킹·트윈이 같은 ₩124,441이라 <b>트윈을 잡는 게 이득</b>입니다."},

 {lat:26.21448, lng:127.67864, short:"로열 파크", name:"더 로열 파크 호텔 아이코닉 나하", en:"The Royal Park Hotel Iconic Naha", star:4, price:148796, score:9.2, rev:0, loc:9.2,
  sold:-1, avail:4,
  rooms:[{n:"코너 킹",s:25,o:2,b:"킹베드 1개",p:148796},{n:"슈페리어 킹",s:30,o:2,b:"킹베드 1개",p:152152},{n:"스탠다드 플로어 코너 (금연)",s:25,o:2,b:"확인 불가",p:158764},{n:"스탠다드 킹",s:25,o:2,b:"킹베드 1개",p:173796}],
  area:[25,30], areaTxt:"25~30㎡", station:"겐초마에역", stationM:63,
  kokusai:2, market:13, marketSrc:"",
  opened:"확인 불가", reno:"확인 불가", bath:"확인 불가", pool:"확인 불가",
  bf:"확인 불가", laundry:"확인 불가", parking:"확인 불가",
  agoda:"겐초마에역 63m · 위치 평점 9.2",
  cond:"프리미엄 · 25㎡ 이상", condLv:"g",
  note:"예산을 올릴 수 있으면 여기가 상단입니다. <b>전 객실 25~30㎡</b>, 겐초마에역 63m, 평점 9.2. 30㎡ 슈페리어 킹이 ₩152,152로 25㎡ 스탠다드 킹(₩173,796)보다 싸다는 점이 특이합니다."},

 {lat:26.213453, lng:127.677734, short:"컴포트", name:"컴포트 호텔 나하 프리펙추얼 오피스", en:"Comfort Hotel Naha Prefectural Office", star:3, price:98132, score:8.8, rev:1024, loc:9.0,
  sold:-1, avail:4,
  rooms:[{n:"더블침대룸",s:null,o:2,b:"더블베드 1개",p:98132},{n:"룸 (더블베드 1개, 금연)",s:13,o:2,b:"더블베드 1개",p:103060},{n:"이코노미 더블룸",s:13,o:2,b:"킹베드 1개",p:121036},{n:"이코노미 트윈 (금연)",s:19,o:2,b:"싱글베드 2개",p:142496}],
  area:[13,19], areaTxt:"13~19㎡", station:"겐초마에역", stationM:191,
  kokusai:2, market:14, marketSrc:"",
  opened:"확인 불가", reno:"확인 불가", bath:"확인 불가", pool:"없음",
  bf:"컴포트 체인 무료 조식(확인 필요)", laundry:"확인 불가", parking:"확인 불가",
  agoda:"겐초마에역 191m · 위치 평점 9.0",
  cond:"체인 표준 · 객실 협소", condLv:"w",
  note:"국제거리 서쪽 입구·겐초마에역 근처의 안정적인 체인입니다. 대신 <b>13㎡</b>가 주력이고 19㎡ 트윈은 ₩142,496까지 올라가서, 넓이를 원하면 값이 급하게 뜁니다."},

 {lat:26.2121, lng:127.689095, short:"LESTEL", name:"LESTEL NAHA", en:"LESTEL NAHA", star:2, price:52078, score:8.4, rev:0, loc:8.4,
  sold:-1, avail:2,
  rooms:[{n:"더블 B",s:12,o:2,b:"더블베드 1개",p:52078},{n:"더블 A",s:12,o:2,b:"더블베드 1개",p:59522}],
  area:[12,12], areaTxt:"12㎡", station:"마키시역", stationM:668,
  kokusai:5, market:4, marketSrc:"",
  opened:"확인 불가", reno:"확인 불가", bath:"확인 불가", pool:"없음",
  bf:"확인 불가", laundry:"확인 불가", parking:"확인 불가",
  agoda:"마키시역 668m · 제1마키시 공설시장 남쪽",
  cond:"최저가 · 12㎡", condLv:"b",
  note:"<b>전체 최저가(₩52,078)</b>입니다. 시장 쪽으로 가깝지만 방이 <b>12㎡</b>라 캐리어 2개를 펴기 어렵습니다. 잠만 자고 나갈 계획일 때만 후보."},

 {lat:26.217413, lng:127.679924, short:"OMO5", name:"OMO5 오키나와 나하 바이 호시노 리조트", en:"OMO5 Okinawa Naha by Hoshino Resorts", star:4, price:80744, score:8.6, rev:442, loc:8.9,
  sold:-1, avail:2,
  rooms:[{n:"퀸룸",s:19,o:2,b:"퀸베드 1개",p:80744},{n:"트윈룸",s:19,o:2,b:"싱글베드 2개",p:86766}],
  area:[19,19], areaTxt:"19㎡", station:"겐초마에역", stationM:341,
  kokusai:6, market:12, marketSrc:"",
  opened:"확인 불가", reno:"확인 불가", bath:"확인 불가", pool:"없음",
  bf:"확인 불가", laundry:"확인 불가", parking:"확인 불가",
  agoda:"겐초마에역 341m · 위치 평점 8.9",
  cond:"호시노 리조트 계열", condLv:"g",
  note:"₩80,744에 19㎡ 퀸, ₩86,766에 19㎡ 트윈. 호시노 리조트 계열의 <b>OMO 레인저 동네 투어</b>가 있는 브랜드로 서비스 만족도가 높은 편입니다. 국제거리까지는 도보 6분 정도."},

 {lat:26.219105, lng:127.682915, short:"인피니티", name:"인피니티 호텔 나하 쿠모지", en:"Infinity Hotel Naha Kumoji", star:3, price:53302, score:8.4, rev:1067, loc:9.0,
  sold:-1, avail:4,
  rooms:[{n:"스탠다드 더블",s:20,o:2,b:"더블베드 1개",p:53302},{n:"스탠다드 트윈",s:20,o:2,b:"싱글베드 2개",p:68292},{n:"슈페리어 트윈룸",s:30,o:2,b:"싱글베드 2개",p:79547},{n:"슈페리어룸 침대 2개",s:30,o:2,b:"싱글베드 2개",p:134571}],
  area:[20,30], areaTxt:"20~30㎡", station:"미에바시역", stationM:149,
  kokusai:7, market:10, marketSrc:"",
  opened:"확인 불가", reno:"확인 불가", bath:"확인 불가", pool:"없음",
  bf:"확인 불가", laundry:"확인 불가", parking:"확인 불가",
  agoda:"미에바시역 149m · 위치 평점 9.0",
  cond:"넓이 대비 최저가", condLv:"g",
  note:"<b>넓이 대비 가성비 1위</b>입니다. <b>30㎡ 슈페리어 트윈이 ₩79,547</b>로, 27㎡ ₩87,960인 콘도미니오보다 넓고 쌉니다. 20㎡ 더블은 ₩53,302. 대신 쿠모지라 국제거리까지 도보 7분."},

 {lat:26.219864, lng:127.680092, short:"그린 리치", name:"그린 리치 호텔 앤 캡슐 나하", en:"Green Rich Hotel & Capsule Naha", star:3, price:79870, score:8.1, rev:0, loc:0,
  sold:-1, avail:3,
  rooms:[{n:"컴팩트 트윈룸 (금연)",s:16,o:2,b:"싱글베드 2개",p:79870},{n:"소형 트윈룸 (흡연)",s:16,o:2,b:"싱글베드 2개",p:79870},{n:"더블룸 (흡연)",s:16,o:2,b:"더블베드 1개",p:87477}],
  area:[16,16], areaTxt:"16㎡", station:"미에바시역", stationM:436,
  kokusai:9, market:13, marketSrc:"",
  opened:"확인 불가", reno:"확인 불가", bath:"인공온천 대욕장 (후타마타 유노하나)", pool:"없음",
  bf:"확인 불가", laundry:"확인 불가", parking:"확인 불가",
  agoda:"미에바시역 436m · 인공온천 후타마타 유노하나",
  cond:"대욕장 보유", condLv:"w",
  note:"29곳 중 드물게 <b>인공온천 대욕장</b>이 있습니다. ₩79,870에 16㎡ 트윈. 금연·흡연 트윈이 같은 값이라 <b>금연을 지정</b>해야 합니다. 국제거리까지는 도보 9분."}
];

/* ===== 스크리닝에서 제외한 대표 사례 =====
   아고다 나하 검색(2027-01-19~22, 성인 2명, 1실) 1페이지 81곳을 훑고 남긴 기록 */
export type Screened = { n: string; why: string; num: string };
export const SCREENED: Screened[] = [
  {n:"머큐어 오키나와 나하", num:"₩74,043 · 8.7", why:"요금·평점은 좋지만 좌표가 국제거리에서 800m 남쪽(도보 14분)"},
  {n:"호텔 리빙 인 켄초에키마에", num:"₩81,230 · 8.9", why:"2인 객실이 12㎡ 한 종류뿐"},
  {n:"알몬트 호텔 나하-겐초마에", num:"₩115,781 · 9.0", why:"좌표가 목록의 알몬트 호텔 나하와 동일 — 같은 호텔"},
  {n:"사우스웨스트 그랜드 호텔", num:"₩392,757 · 9.0", why:"이 날짜 남은 객실이 최고가 등급뿐"},
  {n:"프로스타일 테라스 나하", num:"₩237,054 · 8.6", why:"같은 가격대에서 넓이·위치 우위가 없음"},
  {n:"르와지르 / 르와지르 스파 타워 나하", num:"₩108,275~172,963 · 8.0~8.3", why:"온천은 있지만 아사히바시역 970m, 국제거리 도보 20분권"},
  {n:"패시픽 호텔 오키나와", num:"₩81,968 · 7.9", why:"평점 8.0 미만 + 국제거리 원거리"},
  {n:"호텔 라이브맥스 버짓 나하 / 마츠야마", num:"₩38,546~39,535 · 6.9~7.0", why:"최저가지만 평점 7점대 초반"},
  {n:"캐빈 앤 호텔 콘스탄트 나하", num:"₩48,453 · 8.1", why:"캐빈형 객실 위주 — 2인 일반 객실 확보 불확실"},
  {n:"더 키친 호스텔 AO / Santiago Guesthouse", num:"₩38,547~73,059 · 8.1~8.9", why:"호스텔·게스트하우스"},
  {n:"나하의 아파트먼트 / 스튜디오 / 프라이빗 하우스 류", num:"₩97,147~130,338", why:"아파트·주택 통대여 — 호텔 비교 대상에서 제외"},
  {n:"와이즈 인 나하 오로쿠에키마에 · 호텔 오록스", num:"₩57,891~87,716 · 7.7~9.0", why:"오로쿠·오노야마코엔 — 공항 쪽으로 국제거리와 반대 방향"},
  {n:"도요코인 2곳 · GRG 2곳 · APA 나하마츠야마 · 호텔 루트 인", num:"₩78,591~99,624 · 7.7~8.6", why:"아사히바시 주변 비즈니스 호텔 — 요금 대비 넓이·위치 이점 없음"},
  {n:"호텔 브릭 · 호텔 타이라 · 호텔 야마노우치 · 빅토리아 호텔", num:"₩60,424~68,272 · 7.2~7.7", why:"평점 8.0 미만"},
  {n:"솔비타 호텔 나하 · Minshuku Getto · 토요코인 아사히바시", num:"—", why:"이 날짜 2인 객실 전량 판매 완료"}
];
