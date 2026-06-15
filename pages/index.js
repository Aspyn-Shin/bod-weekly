import { useState, useEffect } from "react";

const C = {
  bg:'#07091C', card:'#0D1228', elevated:'#131B38', hover:'#1A2444',
  gold:'#C8983A', goldPale:'#EFD085', goldBg:'rgba(200,152,58,0.12)', goldBdr:'rgba(200,152,58,0.5)',
  white:'#EDF1FA', gray:'#7B8CAA', dim:'#3E4E6A', border:'#192038',
  red:'#E04848', orange:'#FF8E30', blue:'#3898FF', purple:'#8B70F4', green:'#3CC870',
};

const CATS = {
  all:     { label:'전체',          emoji:'⚡', color:C.gold   },
  krafton: { label:'크래프톤',      emoji:'🎮', color:C.red    },
  india:   { label:'인도 시장',     emoji:'🌏', color:C.orange },
  tech:    { label:'New Tech',      emoji:'🤖', color:C.blue   },
  global:  { label:'글로벌 동향',   emoji:'🌐', color:C.purple },
  korea:   { label:'국내 게임업계', emoji:'🏢', color:C.green  },
};

const CAT_ORDER = ['krafton','india','tech','global','korea'];

const NEWS = [
  { id:1, cat:'krafton', date:'06.08', source:'뉴시스',
    title:"크래프톤·엔비디아, '펍지'로 다진 동맹…AI 거쳐 로봇까지",
    summary:"젠슨 황 방한을 계기로 크래프톤-엔비디아 협력이 AI 게임 기술을 넘어 피지컬AI·로봇 영역으로 확대. 배틀그라운드 기반 공동 프로젝트가 미래 기술 동맹의 핵심 레퍼런스로 부상.",
    url:'https://www.newsis.com/view/NISX20260608_0003659707',
    related:[
      { title:"엔비디아, 삼성·SK·크래프톤 연속 미팅…방한 일정 확정", source:'연합뉴스', url:'#' },
      { title:"피지컬AI 스타트업 투자, 한국서 급증…게임 엔진 활용 부각", source:'매일경제', url:'#' },
      { title:"크래프톤 게임AI 기술, 로봇 시뮬레이션 적용 가능성 주목", source:'한국경제', url:'#' },
    ]
  },
  { id:2, cat:'krafton', date:'06.04', source:'연합뉴스',
    title:"젠슨 황, 크래프톤 장병규 만난다…피지컬AI·칩셋 협력 논의",
    summary:"엔비디아 젠슨 황 CEO가 크래프톤 장병규 의장을 직접 방문해 피지컬AI·차세대 칩셋 협력 방안 논의. 게임 IP 기반 AI 인프라 파트너십 구체화 기대.",
    url:'https://www.yna.co.kr/view/AKR20260604060700017?input=1195m',
    related:[
      { title:"칩셋 협력 국내 게임사 중 크래프톤 단독 선택 배경 분석", source:'IT조선', url:'#' },
      { title:"크래프톤 배그AI, 엔비디아 ACE 연동 가능성 주목", source:'디스이즈게임', url:'#' },
    ]
  },
  { id:3, cat:'krafton', date:'06.05', source:'더벨',
    title:"[더벨] 크래프톤, 지배구조 안정성 '업계최상위권' 등극",
    summary:"기업지배구조보고서 기준 크래프톤이 게임업계 지배구조 안정성 최상위권으로 평가. 이사회 중심 경영 체계 및 ESG 거버넌스 강화의 성과.",
    url:'https://www.thebell.co.kr/front/newsview.asp?click=F&key=202606011320004000102122',
    related:[
      { title:"KCGS 2026 기업지배구조 우수 기업 명단 공개", source:'KCGS', url:'#' },
      { title:"크래프톤 이사회 독립성 평가 A등급 획득", source:'IBK투자증권', url:'#' },
      { title:"게임업계 ESG 공시 경쟁 본격화…크래프톤 선도적 위치", source:'조선비즈', url:'#' },
    ]
  },
  { id:4, cat:'krafton', date:'06.05', source:'아이뉴스24',
    title:"렐루게임즈 '미메시스', 日 CEDEC 어워드 2026 게임 디자인 우수상",
    summary:"크래프톤 자회사 렐루게임즈 '미메시스'가 일본 CEDEC 어워드 2026 게임 디자인 부문 우수상 수상. 국내 독립 게임의 글로벌 수상 실적으로 크래프톤 기술 포트폴리오 대외 입증.",
    url:'https://www.inews24.com/view/1974197',
    related:[
      { title:"CEDEC 2026 전체 수상작 목록 공개", source:'Famitsu', url:'#' },
      { title:"렐루게임즈 '미메시스', 스팀 글로벌 출시 로드맵 공개", source:'Steam', url:'#' },
    ]
  },
  { id:5, cat:'india', date:'06.05', source:'TechCrunch',
    title:"AirTrunk, 인도 AI 데이터센터 5GW 구축에 $30B 투자 확약",
    summary:"AirTrunk가 인도 내 5GW 규모 AI 데이터센터 구축에 300억 달러 투자를 확약. 글로벌 빅테크의 인도 AI 인프라 집중 투자 본격화.",
    url:'https://techcrunch.com/2026/06/05/airtrunk-commits-30b-to-build-5gw-of-ai-data-centers-in-india/',
    related:[
      { title:"MS·구글도 인도 데이터센터 추가 투자 발표", source:'Reuters', url:'#' },
      { title:"인도 AI 인프라 투자 집중…AI 미션 100억 달러 목표", source:'ET Tech', url:'#' },
      { title:"아마존 AWS, 인도 클라우드 2025년 대비 2배 확장 계획", source:'Bloomberg', url:'#' },
    ]
  },
  { id:6, cat:'india', date:'06.09', source:'The Economic Times',
    title:"인도, 프랑스 VivaTech 2026 공식 파트너…AI·디지털 혁신 리더 포지셔닝",
    summary:"인도가 프랑스 VivaTech 2026의 공식 파트너 국가로 선정, AI·디지털 혁신 글로벌 리더로 포지셔닝. 모디 정부 디지털 인디아 전략과 연계한 대외 브랜딩 강화.",
    url:'https://economictimes.indiatimes.com/news/economy/foreign-trade/india-is-frances-official-partner-for-vivatech-next-week-positioning-itself-as-global-leader-in-ai-digital-innovation/articleshow/131600372.cms',
    related:[
      { title:"인도-EU 디지털 파트너십 협정 체결 본격 논의", source:'ET', url:'#' },
      { title:"VivaTech 2026 인도 스타트업 100개사 참가 역대 최다", source:'India Today', url:'#' },
    ]
  },
  { id:7, cat:'india', date:'06.09', source:'The Economic Times',
    title:"인도 GCC, IT 서비스 기업 앞질러…AI·클라우드 인재 채용 주도",
    summary:"인도 글로벌 역량 센터(GCC)가 IT 서비스 기업 대비 AI·클라우드 인재 채용 속도에서 우위. 글로벌 R&D·AI 허브로서의 인도 위상 강화.",
    url:'https://economictimes.indiatimes.com/tech/technology/gccs-outpace-it-services-in-india-tech-hiring-dominating-ai-cloud-talent/articleshow/131591257.cms',
    related:[
      { title:"GCC 인도 내 고용 150만 명 돌파, 전년比 22% 증가", source:'NASSCOM', url:'#' },
      { title:"게임 GCC 인도 진출 사례 분석…EA·Zynga 현황", source:'VentureBeat', url:'#' },
    ]
  },
  { id:8, cat:'india', date:'06.03', source:'Fortune India',
    title:"인포시스·TCS·위프로, MS Copilot 30만 시트 돌파…엔터프라이즈 AI 전환 가속",
    summary:"인포시스·TCS·위프로 등 인도 3대 IT 기업, 합산 MS Copilot 30만 시트 돌파. 인도 IT 대기업의 엔터프라이즈 AI 전환 가속화.",
    url:'https://www.fortuneindia.com/business-news/infosys-tcs-and-wipro-cross-300000-microsoft-copilot-seats-as-indias-it-giants-deepen-enterprise-ai-push/141125',
    related:[
      { title:"MS AI 솔루션, 인도 금융·제조업으로 확산 가속", source:'ET', url:'#' },
      { title:"인도 기업 생산성 AI 도입률, 아시아 최고 수준", source:'McKinsey', url:'#' },
      { title:"구글 Workspace AI, 인도 SME 시장 공략 강화", source:'Bloomberg', url:'#' },
    ]
  },
  { id:9, cat:'tech', date:'06.09', source:'연합뉴스',
    title:"젠슨 황이 남긴 선물과 숙제…한국 AI 무엇 얻었나",
    summary:"젠슨 황 방한으로 엔비디아-한국 기업 간 AI 반도체·인프라 협력 체계 구체화. 삼성전자·SK하이닉스·크래프톤 등 주요 기업과 파트너십 확인, K-AI 생태계 강화 기회.",
    url:'https://www.yna.co.kr/view/AKR20260608178500017?input=1195m',
    related:[
      { title:"엔비디아 블랙웰 칩 한국 우선 공급…삼성·SK 수혜", source:'한국경제', url:'#' },
      { title:"국내 AI 데이터센터 투자, 2026년 역대 최대 전망", source:'IT조선', url:'#' },
      { title:"젠슨 황 방한 협력 분야별 종합 분석", source:'조선비즈', url:'#' },
    ]
  },
  { id:10, cat:'tech', date:'06.05', source:'연합뉴스',
    title:"애플 '매출 상위 앱 100개 중 40개가 AI 탑재…거래액 성장률 4배'",
    summary:"애플 집계 기준 매출 상위 앱 100개 중 40개에 AI 기능 탑재, 거래액 성장률은 비AI 앱의 4배. AI 기능이 앱 수익화의 핵심 드라이버로 부상.",
    url:'https://www.yna.co.kr/view/AKR20260605004200091?input=1195m',
    related:[
      { title:"구글플레이도 AI 앱 매출 급증…게임 내 AI 비중 증가", source:'Reuters', url:'#' },
      { title:"국내 모바일 게임사, AI 기능 탑재 업데이트 경쟁 본격화", source:'게임메카', url:'#' },
    ]
  },
  { id:11, cat:'tech', date:'06.03', source:'연합뉴스',
    title:"한국인 가장 많이 쓴 AI는 챗GPT…검색 1위는 네이버",
    summary:"한국인 최다 사용 AI 서비스는 챗GPT, 검색 1위는 네이버 유지. 생성형 AI와 전통 검색 간 역할 분담 구도 형성.",
    url:'https://www.yna.co.kr/view/AKR20260602152600017?input=1195m',
    related:[
      { title:"네이버 AI 검색 'AI 브리핑' 이용률 전년比 3배 증가", source:'네이버 블로그', url:'#' },
      { title:"챗GPT 한국 MAU 500만 돌파…기업 사용 비중 확대", source:'전자신문', url:'#' },
      { title:"카카오 AI 어시스턴트, 국내 3위 진입 목표 공개", source:'디지털데일리', url:'#' },
    ]
  },
  { id:12, cat:'global', date:'06.03', source:'Game Developer',
    title:"2025년 미국 게임 소비 총액 $60B 돌파…역대 최대",
    summary:"2025년 미국 게임 소비 총액 600억 달러 돌파. 콘솔·모바일·PC 전반 증가 속 구독 및 디지털 판매 비중 확대.",
    url:'https://www.gamedeveloper.com/business/total-consumer-spending-on-games-topped-60b-in-the-us-in-2025',
    related:[
      { title:"글로벌 게임 시장 2026년 2,200억 달러 전망", source:'Newzoo', url:'#' },
      { title:"PC 게임 소비 반등…스팀 동시접속자 역대 최다 경신", source:'PC Gamer', url:'#' },
      { title:"한국 게임 수출, 대미 비중 사상 첫 30% 돌파", source:'한국콘텐츠진흥원', url:'#' },
      { title:"미국 게임 소비 연령 변화: 35세 이상 45% 돌파", source:'ESA', url:'#' },
    ]
  },
  { id:13, cat:'global', date:'06.08', source:'The Verge',
    title:"Summer Game Fest 2026, 7대 핵심 스토리라인",
    summary:"SGF 2026에서 AI 기반 게임 경험 혁신과 멀티플랫폼 신작 발표가 핵심 화두. AAA 신작 공개 경쟁 속 크래프톤 IP 포지셔닝 점검 시사.",
    url:'https://www.theverge.com/entertainment/945445/summer-game-fest-2026-biggest-stories',
    related:[
      { title:"SGF 2026 발표작 전체 목록 정리", source:'IGN', url:'#' },
      { title:"배틀그라운드 신작 티저 SGF 등장…크래프톤 확인 거부", source:'Kotaku', url:'#' },
    ]
  },
  { id:14, cat:'global', date:'06.05', source:'The Verge',
    title:"아마존의 새 게임 전략: 제임스 본드 IP와 AI 스눕독",
    summary:"아마존이 제임스 본드 IP 확보 및 AI 기반 스눕독 아바타 등 콘텐츠·AI 결합 게임 전략 공개. 빅테크의 게임 플랫폼-IP-AI 연계 경쟁 본격화.",
    url:'https://www.theverge.com/games/943147/amazon-gaming-strategy-james-bond-snoop-dogg-luna',
    related:[
      { title:"아마존 Luna 구독자 2,000만 돌파 목표 공개", source:'Bloomberg', url:'#' },
      { title:"애플·구글·아마존 게임 플랫폼 경쟁, IP 확보가 핵심", source:'WSJ', url:'#' },
      { title:"제임스 본드 IP, 게임업계 최대 라이선스 딜 중 하나", source:'GamesIndustry.biz', url:'#' },
    ]
  },
  { id:15, cat:'global', date:'06.03', source:'PC Gamer',
    title:"Embracer 신임 CEO '3년 전 붕괴 후 신뢰 회복 중'",
    summary:"30억 달러 손실과 대규모 스튜디오 폐쇄 이후 Embracer 신임 CEO가 신뢰 회복 진행 중임을 언급. 과도한 M&A에 따른 업계 구조 조정 사례의 경고등.",
    url:'https://www.pcgamer.com/gaming-industry/3-years-after-a-usd2-billion-implosion-studio-closures-and-cancellations-embracers-new-ceo-hopes-trust-is-improving/',
    related:[
      { title:"Embracer 구조조정 2년 결산: 폐쇄 스튜디오 24개", source:'GamesIndustry.biz', url:'#' },
      { title:"게임 M&A 시장 냉각…대형 인수 건수 3년 연속 감소", source:'Newzoo', url:'#' },
    ]
  },
  { id:16, cat:'korea', date:'06.07', source:'IT조선',
    title:"문 닫힌 정규직 채용…게임업계 '프로젝트 계약직' 늘린다",
    summary:"게임업계 정규직 신규 채용 감소 속 프로젝트 계약직 비중 증가. 산업 구조 조정 및 인건비 효율화 전략의 일환.",
    url:'https://it.chosun.com/news/articleView.html?idxno=2023092163384',
    related:[
      { title:"넥슨·넷마블·크래프톤 채용 공고 전년比 변화 비교", source:'잡코리아', url:'#' },
      { title:"게임업계 개발자 평균 연봉 상승세 둔화", source:'게임메카', url:'#' },
      { title:"해외 게임사 한국 개발자 직접 채용 경쟁 심화", source:'디지털타임스', url:'#' },
    ]
  },
  { id:17, cat:'korea', date:'06.04', source:'머니투데이',
    title:"'안방보단 해외인데'…무대 고민하는 게임사들",
    summary:"국내 게임사들이 내수 한계를 인식, 해외 시장 중심 전략으로 전환 가속. 글로벌 출시 전제 개발 체계와 현지화 역량 강화 추세.",
    url:'https://www.mt.co.kr/tech/2026/06/04/2026060214562198837',
    related:[
      { title:"K게임 글로벌 매출 비중 75% 돌파…3년 만에 15%p 상승", source:'한국게임산업협회', url:'#' },
      { title:"일본·동남아 현지화 투자, 국내 게임사 영업이익 개선 견인", source:'미래에셋증권', url:'#' },
    ]
  },
  { id:18, cat:'korea', date:'06.09', source:'조선비즈',
    title:"'젠슨 황은 세 번이나 찾았는데'…K-PC방 1년 새 400곳 줄폐업",
    summary:"1년 새 국내 PC방 400곳 줄폐업. 모바일·콘솔 전환 가속과 임대료·전기요금 상승이 복합 작용한 결과.",
    url:'https://biz.chosun.com/it-science/ict/2026/06/09/ZAJDTGUQVFHTHGEWUHWELE6A5A/',
    related:[
      { title:"PC방 업계 생존 전략: AI 게이밍 공간으로 전환 모색", source:'전자신문', url:'#' },
      { title:"국내 PC 게임 유저 수, 모바일에 역전된 지 3년", source:'닐슨코리아', url:'#' },
    ]
  },
  { id:19, cat:'korea', date:'06.04', source:'뉴시스',
    title:"넷마블, 지타워 6977억원 매각 완료…2028년 과천 신사옥 이전",
    summary:"넷마블, 서울 지타워 약 6,977억 원에 매각 완료. 2028년 과천 신사옥 이전 계획 연계 자산 경량화 및 재무 구조 개선 조치.",
    url:'https://www.newsis.com/view/NISX20260604_0003656960',
    related:[
      { title:"넷마블 부채비율 개선 효과, 증권가 긍정 평가", source:'한국투자증권', url:'#' },
      { title:"게임사 사옥 이전 비교: 넥슨·엔씨·크래프톤", source:'아이뉴스24', url:'#' },
      { title:"과천 테크노밸리, IT·게임사 집적지로 부상", source:'경기도청', url:'#' },
    ]
  },
  { id:20, cat:'korea', date:'06.08', source:'파이낸셜뉴스',
    title:"'P의 거짓' 이끈 박성준 그룹장, 네오위즈 새 사령탑으로",
    summary:"'P의 거짓' 프로젝트 주도 박성준 그룹장, 네오위즈 신임 대표 선임. 히트작 개발 경험 기반 개발 중심 경영 체제 전환.",
    url:'https://www.fnnews.com/news/202606081006180855',
    related:[
      { title:"'P의 거짓' 누적 판매 300만 장…네오위즈 IP 재평가", source:'한국경제', url:'#' },
      { title:"'P의 거짓 2', 2027년 출시 목표 공식화", source:'디스이즈게임', url:'#' },
    ]
  },
];

const PAST_ISSUES = [
  {id:1, label:'2026년 6월 2주차', date:'06.09', count:20, isCurrent:true},
];

function SectionHeader({ catKey }) {
  const cat = CATS[catKey];
  const count = NEWS.filter(a => a.cat === catKey).length;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, padding:'20px 4px 9px' }}>
      <span style={{ fontSize:17 }}>{cat.emoji}</span>
      <span style={{ fontSize:14, fontWeight:800, color:cat.color, letterSpacing:-0.2 }}>{cat.label}</span>
      <span style={{ background:cat.color+'22', color:cat.color, fontSize:10, fontWeight:700, padding:'2px 7px', borderRadius:10 }}>{count}건</span>
      <div style={{ flex:1, height:1, background:C.border }} />
    </div>
  );
}

function ArticleCard({ article, expanded, onToggle, bookmarked, onBookmark, ttsActive, onTTS }) {
  const cat = CATS[article.cat];
  return (
    <div style={{ background:expanded?C.elevated:C.card, border:`1px solid ${expanded?cat.color+'50':C.border}`, borderRadius:13, marginBottom:9, overflow:'hidden', transition:'all 0.18s ease' }}>
      <div style={{ padding:'13px 14px 11px' }}>
        <div style={{ fontSize:10.5, color:C.dim, marginBottom:6 }}>{article.source}&nbsp;·&nbsp;{article.date}</div>
        <div onClick={onToggle} style={{ cursor:'pointer', fontSize:14, fontWeight:700, lineHeight:1.55, color:C.white, marginBottom:6, letterSpacing:-0.2 }}>{article.title}</div>
        <div style={{ fontSize:12.5, color:C.gray, lineHeight:1.75, marginBottom:11 }}>{article.summary}</div>
        <div style={{ display:'flex', gap:6 }}>
          <button onClick={onToggle} style={{ flex:1, background:expanded?cat.color+'18':C.hover, border:`1px solid ${expanded?cat.color+'45':C.border}`, borderRadius:8, padding:'6px 10px', cursor:'pointer', color:expanded?cat.color:C.gray, fontSize:11.5, fontFamily:'inherit', fontWeight:expanded?700:400, display:'flex', alignItems:'center', justifyContent:'center', gap:5 }}>
            <span style={{ fontSize:8 }}>{expanded?'▲':'▼'}</span>연관 기사
          </button>
          <button onClick={onTTS} style={{ background:ttsActive?'rgba(255,142,48,0.18)':C.hover, border:`1px solid ${ttsActive?C.orange+'55':C.border}`, borderRadius:8, padding:'6px 11px', cursor:'pointer', color:ttsActive?C.orange:C.gray, fontSize:14, fontFamily:'inherit' }}>{ttsActive?'⏸':'🔊'}</button>
          <button onClick={onBookmark} style={{ background:bookmarked?C.goldBg:C.hover, border:`1px solid ${bookmarked?C.goldBdr:C.border}`, borderRadius:8, padding:'6px 11px', cursor:'pointer', color:bookmarked?C.goldPale:C.gray, fontSize:14, fontFamily:'inherit' }}>{bookmarked?'★':'☆'}</button>
        </div>
      </div>
      {expanded && (
        <div style={{ background:C.bg, borderTop:`1px solid ${C.border}`, padding:'10px 14px 13px' }}>
          <div style={{ fontSize:9.5, color:C.dim, fontWeight:700, letterSpacing:1.2, marginBottom:9 }}>RELATED ARTICLES</div>
          {article.related.map((r,i) => (
            <div key={i} onClick={()=>window.open(r.url,'_blank')} style={{ display:'flex', alignItems:'flex-start', gap:7, padding:'8px 0', cursor:'pointer', borderBottom:i<article.related.length-1?`1px solid ${C.border}`:'none' }}>
              <span style={{ color:cat.color, fontSize:12, marginTop:2, flexShrink:0 }}>›</span>
              <span style={{ flex:1, fontSize:12.5, color:C.white, lineHeight:1.5 }}>{r.title}</span>
              <span style={{ fontSize:10.5, color:C.dim, whiteSpace:'nowrap', flexShrink:0, paddingTop:2 }}>{r.source}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BODWeekly() {
  const [activeTab, setActiveTab]   = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [bookmarks, setBookmarks]   = useState(new Set());
  const [ttsId, setTtsId]           = useState(null);
  const [briefing, setBriefing]     = useState({open:false,content:'',loading:false,catLabel:''});
  const [search, setSearch]         = useState({open:false,query:'',results:[]});
  const [screen, setScreen]         = useState('home');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('bod-bm');
      if (stored) setBookmarks(new Set(JSON.parse(stored)));
    } catch {}
  }, []);

  const saveBookmarks = (next) => {
    setBookmarks(next);
    try { localStorage.setItem('bod-bm', JSON.stringify([...next])); } catch {}
  };
  const toggleBookmark = (id) => {
    const next = new Set(bookmarks);
    next.has(id) ? next.delete(id) : next.add(id);
    saveBookmarks(next);
  };

  const startTTS = (article) => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis?.cancel();
    if (ttsId === article.id) { setTtsId(null); return; }
    const utt = new SpeechSynthesisUtterance(`${article.title}. ${article.summary}`);
    utt.lang = 'ko-KR'; utt.rate = 0.88;
    utt.onend = () => setTtsId(null);
    window.speechSynthesis?.speak(utt);
    setTtsId(article.id);
  };
  const stopTTS = () => { window.speechSynthesis?.cancel(); setTtsId(null); };

  const fetchBriefing = async () => {
    const articles = activeTab === 'all' ? NEWS : NEWS.filter(a => a.cat === activeTab);
    const catLabel  = activeTab === 'all' ? '전체' : CATS[activeTab].emoji + ' ' + CATS[activeTab].label;
    setBriefing({open:true,content:'',loading:true,catLabel});
    try {
      const res = await fetch('/api/briefing', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ articles, catLabel })
      });
      const data = await res.json();
      setBriefing({open:true,content:data.text,loading:false,catLabel});
    } catch {
      setBriefing({open:true,content:'오류가 발생했습니다. 다시 시도해주세요.',loading:false,catLabel});
    }
  };

  const doSearch = (q) => {
    const results = q.trim() ? NEWS.filter(a => a.title.includes(q)||a.summary.includes(q)||a.source.includes(q)||CATS[a.cat].label.includes(q)) : [];
    setSearch(s => ({...s,query:q,results}));
  };

  const toggleExpanded = (id) => setExpandedId(v => v===id?null:id);
  const cardProps = (a) => ({ article:a, expanded:expandedId===a.id, onToggle:()=>toggleExpanded(a.id), bookmarked:bookmarks.has(a.id), onBookmark:()=>toggleBookmark(a.id), ttsActive:ttsId===a.id, onTTS:()=>startTTS(a) });

  const filtered   = activeTab==='all' ? NEWS : NEWS.filter(a=>a.cat===activeTab);
  const bmList     = NEWS.filter(a=>bookmarks.has(a.id));
  const playingArt = ttsId ? NEWS.find(n=>n.id===ttsId) : null;
  const briefCount = (activeTab==='all' ? NEWS : NEWS.filter(a=>a.cat===activeTab)).length;
  const catEntry   = CATS[activeTab];

  return (
    <div style={{ background:C.bg, minHeight:'100vh', fontFamily:'-apple-system,"Apple SD Gothic Neo","Noto Sans KR",sans-serif', maxWidth:430, margin:'0 auto', color:C.white, position:'relative', overflowX:'hidden' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}@keyframes slideUp{from{transform:translateY(16px);opacity:0;}to{transform:translateY(0);opacity:1;}}::-webkit-scrollbar{display:none;}*{scrollbar-width:none;}input::placeholder{color:#3E4E6A;}`}</style>

      <div style={{ background:C.bg, borderBottom:`1px solid ${C.border}`, padding:'14px 16px 12px', position:'sticky', top:0, zIndex:20 }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontSize:9, color:C.dim, letterSpacing:2.5, fontWeight:700, marginBottom:3 }}>KRAFTON BOARD</div>
            <div style={{ fontSize:20, fontWeight:900, letterSpacing:-0.8 }}>BOD <span style={{ color:C.gold }}>Weekly</span></div>
          </div>
          <div style={{ textAlign:'right', paddingTop:2 }}>
            <div style={{ fontSize:11, color:C.gold, fontWeight:700, marginBottom:3 }}>2026 · 6월 2주차</div>
            <div style={{ fontSize:10, color:C.dim }}>제 1호&nbsp;·&nbsp;06.09 (화)</div>
          </div>
        </div>
      </div>

      {screen==='home' && (
        <div style={{ background:C.bg, borderBottom:`1px solid ${C.border}`, display:'flex', gap:6, padding:'10px 14px', overflowX:'auto' }}>
          {Object.entries(CATS).map(([key,cat])=>{
            const active = activeTab===key;
            const count  = key==='all' ? NEWS.length : NEWS.filter(a=>a.cat===key).length;
            return (
              <button key={key} onClick={()=>setActiveTab(key)} style={{ flexShrink:0, background:active?cat.color+'22':C.card, border:`1px solid ${active?cat.color:C.border}`, borderRadius:20, padding:'5px 11px', color:active?cat.color:C.gray, fontSize:11.5, fontWeight:active?700:400, cursor:'pointer', fontFamily:'inherit', transition:'all 0.15s', display:'flex', alignItems:'center', gap:4 }}>
                {key!=='all' && <span style={{fontSize:13}}>{cat.emoji}</span>}
                <span>{key==='all'?'전체':cat.label}</span>
                <span style={{ background:active?cat.color+'30':C.border, color:active?cat.color:C.dim, borderRadius:10, padding:'0 5px', fontSize:9.5, fontWeight:700 }}>{count}</span>
              </button>
            );
          })}
        </div>
      )}

      {screen==='home' && (
        <div style={{ padding:'10px 12px 2px' }}>
          <button onClick={fetchBriefing} style={{ width:'100%', background:`linear-gradient(135deg,${C.goldBg},rgba(200,152,58,0.06))`, border:`1.5px solid ${C.goldBdr}`, borderRadius:10, padding:'9px 16px', color:C.goldPale, fontSize:12.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:7, boxShadow:`0 2px 12px rgba(200,152,58,0.1)` }}>
            <span style={{fontSize:12}}>✦</span>
            <span>{activeTab==='all'?'전체':catEntry.emoji+' '+catEntry.label} AI 브리핑 생성</span>
            <span style={{fontSize:10.5,color:C.gold,fontWeight:500}}>· {briefCount}건</span>
          </button>
        </div>
      )}

      <div style={{ padding:'2px 12px', paddingBottom:90 }}>
        {screen==='home' && (
          activeTab==='all'
            ? CAT_ORDER.map(k=>(<div key={k}><SectionHeader catKey={k} />{NEWS.filter(a=>a.cat===k).map(a=><ArticleCard key={a.id} {...cardProps(a)} />)}</div>))
            : <><SectionHeader catKey={activeTab} />{filtered.map(a=><ArticleCard key={a.id} {...cardProps(a)} />)}</>
        )}
        {screen==='bookmarks' && (
          <div>
            <div style={{ padding:'16px 4px 10px', fontSize:16, fontWeight:800 }}>저장한 기사 <span style={{color:C.gold}}>{bmList.length}</span></div>
            {bmList.length===0
              ? <div style={{textAlign:'center',padding:'70px 0',color:C.dim}}><div style={{fontSize:34,marginBottom:12}}>☆</div><div style={{fontSize:13,marginBottom:4}}>저장된 기사가 없습니다</div><div style={{fontSize:11}}>기사 카드의 ☆ 버튼으로 저장하세요</div></div>
              : bmList.map(a=><ArticleCard key={a.id} {...cardProps(a)} />)
            }
          </div>
        )}
        {screen==='archive' && (
          <div>
            <div style={{padding:'16px 4px 10px',fontSize:16,fontWeight:800}}>아카이브</div>
            {PAST_ISSUES.map(issue=>(
              <div key={issue.id} onClick={()=>issue.isCurrent&&setScreen('home')} style={{ background:C.card, border:`1px solid ${issue.isCurrent?C.goldBdr:C.border}`, borderRadius:12, padding:'14px 16px', marginBottom:8, display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', opacity:issue.isCurrent?1:0.6 }}>
                <div>
                  <div style={{fontSize:10.5,color:issue.isCurrent?C.gold:C.dim,fontWeight:700,marginBottom:4}}>제 {issue.id}호{issue.isCurrent?' · 최신':''}</div>
                  <div style={{fontSize:14,fontWeight:700,color:C.white,marginBottom:2}}>{issue.label}</div>
                  <div style={{fontSize:11,color:C.dim}}>{issue.date} · 기사 {issue.count}건</div>
                </div>
                <div style={{ background:issue.isCurrent?C.goldBg:C.elevated, border:`1px solid ${issue.isCurrent?C.goldBdr:C.border}`, borderRadius:8, padding:'6px 12px', fontSize:11.5, color:issue.isCurrent?C.goldPale:C.gray, fontWeight:issue.isCurrent?700:400 }}>{issue.isCurrent?'현재 호':'보기 →'}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {playingArt && (
        <div style={{ position:'fixed', bottom:62, left:'50%', transform:'translateX(-50%)', width:'calc(100% - 24px)', maxWidth:406, background:'#151E40', border:`1.5px solid ${C.goldBdr}`, borderRadius:13, padding:'10px 14px', display:'flex', alignItems:'center', gap:10, zIndex:30, boxShadow:`0 4px 24px rgba(200,152,58,0.2)`, animation:'slideUp 0.2s ease' }}>
          <div style={{ width:32,height:32,borderRadius:8,background:C.goldBg,border:`1px solid ${C.goldBdr}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,flexShrink:0 }}>🔊</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,color:C.gold,fontWeight:700,marginBottom:1}}>재생 중</div>
            <div style={{fontSize:12,color:C.white,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{playingArt.title}</div>
          </div>
          <button onClick={stopTTS} style={{ background:C.elevated,border:`1px solid ${C.border}`,borderRadius:7,padding:'5px 11px',color:C.gray,fontSize:12,cursor:'pointer',fontFamily:'inherit' }}>■ 정지</button>
        </div>
      )}

      <div style={{ position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:430,background:C.card,borderTop:`1px solid ${C.border}`,display:'flex',padding:'8px 0 10px',zIndex:20 }}>
        {[{id:'home',icon:'⌂',label:'홈'},{id:'search',icon:'🔍',label:'검색'},{id:'bookmarks',icon:'★',label:'저장'},{id:'archive',icon:'📋',label:'아카이브'}].map(tab=>{
          const isActive = tab.id!=='search' && screen===tab.id;
          return (
            <button key={tab.id} onClick={()=>{ if(tab.id==='search') setSearch(s=>({...s,open:true})); else setScreen(tab.id); }} style={{ flex:1,background:'none',border:'none',display:'flex',flexDirection:'column',alignItems:'center',gap:3,padding:'2px 0',cursor:'pointer',color:isActive?C.gold:C.dim,fontFamily:'inherit' }}>
              <div style={{fontSize:18,lineHeight:1}}>{tab.icon}</div>
              <div style={{fontSize:9,fontWeight:isActive?700:400,letterSpacing:0.2}}>{tab.label}{tab.id==='bookmarks'&&bookmarks.size>0&&<span style={{color:C.gold}}> {bookmarks.size}</span>}</div>
            </button>
          );
        })}
      </div>

      {briefing.open && (
        <div onClick={()=>!briefing.loading&&setBriefing({open:false,content:'',loading:false,catLabel:''})} style={{ position:'fixed',inset:0,background:'rgba(4,7,20,0.88)',zIndex:50,display:'flex',alignItems:'flex-end' }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:'#0C1430',border:`1px solid ${C.goldBdr}`,borderRadius:'18px 18px 0 0',padding:'22px 20px 28px',width:'100%',maxHeight:'82vh',overflowY:'auto',boxShadow:`0 -12px 48px rgba(200,152,58,0.14)`,animation:'slideUp 0.25s ease' }}>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:14}}>
              <div>
                <div style={{fontSize:9,color:C.dim,letterSpacing:2,fontWeight:700,marginBottom:4}}>AI GENERATED</div>
                <div style={{fontSize:18,fontWeight:900,color:C.goldPale,letterSpacing:-0.5}}>{briefing.catLabel} AI 브리핑</div>
                <div style={{fontSize:11,color:C.dim,marginTop:3}}>2026년 6월 2주차 · {briefCount}건 분석</div>
              </div>
              {!briefing.loading && <button onClick={()=>setBriefing({open:false,content:'',loading:false,catLabel:''})} style={{ background:C.elevated,border:`1px solid ${C.border}`,borderRadius:8,padding:'6px 12px',color:C.gray,cursor:'pointer',fontFamily:'inherit',fontSize:12 }}>닫기</button>}
            </div>
            <div style={{height:1.5,background:`linear-gradient(90deg,${C.goldBdr},transparent)`,marginBottom:18}} />
            {briefing.loading
              ? <div style={{textAlign:'center',padding:'50px 0'}}><div style={{fontSize:26,display:'inline-block',animation:'spin 1.8s linear infinite',color:C.gold,marginBottom:14}}>✦</div><div style={{color:C.goldPale,fontSize:14,fontWeight:700,marginBottom:5}}>AI 브리핑 생성 중</div><div style={{color:C.dim,fontSize:12}}>기사 {briefCount}건을 분석하고 있습니다</div></div>
              : <div style={{fontSize:13.5,lineHeight:1.9,color:C.white,whiteSpace:'pre-wrap'}}>{briefing.content}</div>
            }
          </div>
        </div>
      )}

      {search.open && (
        <div style={{ position:'fixed',inset:0,background:C.bg,zIndex:50,display:'flex',flexDirection:'column',animation:'slideUp 0.18s ease' }}>
          <div style={{ background:C.card,padding:'13px 14px',borderBottom:`1px solid ${C.border}`,display:'flex',alignItems:'center',gap:10 }}>
            <div style={{ flex:1,background:C.elevated,border:`1px solid ${C.border}`,borderRadius:10,padding:'8px 12px',display:'flex',alignItems:'center',gap:8 }}>
              <span style={{color:C.dim}}>🔍</span>
              <input autoFocus value={search.query} onChange={e=>doSearch(e.target.value)} placeholder="제목, 요약, 출처 검색..." style={{flex:1,background:'none',border:'none',outline:'none',color:C.white,fontSize:14,fontFamily:'inherit'}}/>
              {search.query && <button onClick={()=>doSearch('')} style={{background:'none',border:'none',color:C.dim,cursor:'pointer',fontSize:13}}>✕</button>}
            </div>
            <button onClick={()=>setSearch({open:false,query:'',results:[]})} style={{background:'none',border:'none',color:C.gold,fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>취소</button>
          </div>
          <div style={{flex:1,overflowY:'auto',padding:'10px 12px'}}>
            {!search.query
              ? <div style={{textAlign:'center',padding:'70px 0',color:C.dim}}><div style={{fontSize:28,marginBottom:12}}>🔍</div><div style={{fontSize:13,marginBottom:5}}>기사 검색</div><div style={{fontSize:11,lineHeight:1.7}}>제목, 요약, 출처,<br/>카테고리로 검색할 수 있습니다</div></div>
              : search.results.length===0
                ? <div style={{textAlign:'center',padding:'70px 0',color:C.dim}}><div style={{fontSize:13}}>"{search.query}" 검색 결과가 없습니다</div></div>
                : <>{<div style={{fontSize:11,color:C.dim,padding:'2px 4px 10px',letterSpacing:0.3}}>검색 결과 {search.results.length}건</div>}{search.results.map(a=><ArticleCard key={a.id} {...cardProps(a)} />)}</>
            }
          </div>
        </div>
      )}
    </div>
  );
}
