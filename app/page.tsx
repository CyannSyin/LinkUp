'use client';

import { useState } from 'react';

type View = 'home' | 'analysis' | 'results' | 'graph';
type Person = {
  id: string; initials: string; name: string; role: string; team: string; color: string;
  title: string; tags: string[]; reasons: string[]; projects: { name: string; type: string; date: string; note: string }[];
};

const people: Person[] = [
  { id:'alex', initials:'AX', name:'Alex Xu', role:'模型路由与成本优化', team:'AI Infrastructure', color:'#dce9ff', title:'负责成本归因与路由策略', tags:['LLM Routing','Cost Optimization','Gateway'], reasons:['主导 LLM Gateway 的成本路由设计','最近 2 个月持续参与模型成本优化','与你在 Token Governance 上形成能力互补'], projects:[{name:'LLM Gateway Routing',type:'技术方案',date:'2026/07',note:'负责动态路由与模型成本归因模块'},{name:'Model Cost Review',type:'复盘文档',date:'2026/06',note:'整理 6 类成本异常及诊断路径'}] },
  { id:'maya', initials:'MY', name:'Maya Yu', role:'监控指标与异常定位', team:'Data Platform', color:'#ffe3de', title:'搭建指标体系与异常检测', tags:['Observability','Anomaly Detection','Metrics'], reasons:['构建过 Agent 调用链路的观测指标','熟悉异常检测与根因定位','能补足团队的数据分析能力'], projects:[{name:'Agent Observability',type:'项目文档',date:'2026/08',note:'设计 Token、延迟、错误率核心指标'},{name:'Usage Anomaly v2',type:'需求单',date:'2026/05',note:'负责异常规则与告警降噪'}] },
  { id:'jason', initials:'JS', name:'Jason Sun', role:'企业权限与系统接入', team:'Enterprise Platform', color:'#e6e2ff', title:'保障数据权限与企业接入', tags:['Enterprise Auth','MCP','Permission'], reasons:['负责企业级权限体系和审计能力','有 MCP 数据源接入经验','曾与 Alex 共同交付 Gateway 项目'], projects:[{name:'Enterprise Permission',type:'PRD',date:'2026/07',note:'定义文档检索权限与审计机制'},{name:'MCP Connector Hub',type:'技术方案',date:'2026/04',note:'负责企业工具连接与鉴权'}] },
];

const discoverPeople = people.map((p) => ({ ...p, shortTags:p.tags.slice(0,2) }));
const projects = [
  { kicker:'AI PLATFORM', title:'LLM Gateway Routing', copy:'统一模型接入、路由策略与成本观测', meta:'Alex 等 4 人 · 3 份产出', tint:'#fff0ec' },
  { kicker:'GOVERNANCE', title:'Token Governance 2.0', copy:'Agent Token 用量分析与治理策略升级', meta:'Nicole 等 3 人 · 5 份产出', tint:'#eef4ff' },
  { kicker:'AGENT OPS', title:'Context Optimization', copy:'长上下文场景的稳定性与成本优化', meta:'Maya 等 5 人 · 4 份产出', tint:'#f3efff' },
];

const graphNodes = [
  { id:'nicole', label:'Nicole', sub:'Agent Product', x:50, y:49, kind:'self', initials:'NW' },
  { id:'alex', label:'Alex', sub:'LLM Routing', x:28, y:23, kind:'person', initials:'AX' },
  { id:'maya', label:'Maya', sub:'Observability', x:73, y:24, kind:'person', initials:'MY' },
  { id:'jason', label:'Jason', sub:'Enterprise Auth', x:77, y:68, kind:'person', initials:'JS' },
  { id:'barry', label:'Barry', sub:'MCP Platform', x:28, y:76, kind:'person', initials:'BY' },
  { id:'emma', label:'Emma', sub:'Finance AI', x:11, y:46, kind:'person', initials:'EM' },
  { id:'leo', label:'Leo', sub:'Agent Workflow', x:91, y:43, kind:'person', initials:'LO' },
  { id:'gateway', label:'LLM Gateway', sub:'项目', x:49, y:15, kind:'project', initials:'P1' },
  { id:'token', label:'Token Gov 2.0', sub:'项目', x:49, y:84, kind:'project', initials:'P2' },
];

function Sidebar({ view, setView }:{ view:View; setView:(view:View)=>void }) {
  return <aside className="sidebar">
    <div className="brand"><span className="brand-mark">L</span><span>LinkUp</span></div>
    <nav className="nav-list" aria-label="主导航">
      <button onClick={()=>setView('home')} className={`nav-item ${view !== 'graph' ? 'active':''}`}><span>⌁</span>Ask LinkUp</button>
      <button onClick={()=>setView('graph')} className={`nav-item ${view === 'graph' ? 'active':''}`}><span>⌘</span>People Graph</button>
    </nav>
    <div className="sidebar-section"><p>工作空间</p><button className="nav-item"><span>◫</span>最近任务</button><button className="nav-item"><span>◇</span>保存的团队</button></div>
    <div className="sync-card"><div className="sync-top"><span className="sync-dot" />工作图谱已更新</div><strong>24 份工作产出</strong><span>今天 10:30 同步</span></div>
    <div className="profile"><span className="avatar avatar-nicole">NW</span><div><strong>Nicole Wang</strong><span>Agent Product</span></div><span className="more">•••</span></div>
  </aside>;
}

function Topbar({ view }:{view:View}) {
  const labels:Record<View,string> = { home:'发现', analysis:'任务理解', results:'协作方案', graph:'People Graph' };
  return <header className="topbar"><div className="crumb"><span>工作空间</span><b>/</b><strong>{labels[view]}</strong></div><div className="top-actions"><button aria-label="帮助">?</button><button aria-label="通知">•</button></div></header>;
}

function HomeView({ query, setQuery, analyze, openPerson, openGraph }:{query:string;setQuery:(v:string)=>void;analyze:()=>void;openPerson:(p:Person)=>void;openGraph:()=>void}) {
  return <div className="content home-content">
    <section className="hero">
      <p className="eyebrow">GOOD AFTERNOON, NICOLE</p>
      <h1>你想完成什么？<br /><em>LinkUp 帮你找到对的人。</em></h1>
      <p className="hero-copy">基于真实工作产出，找到做过类似事情的人、互补能力与可复用经验。</p>
      <div className="ask-box"><textarea aria-label="描述你的任务" value={query} onChange={(e)=>setQuery(e.target.value)} /><div className="ask-toolbar"><div><button className="tool-button">＋</button><span>仅检索我有权访问的内容</span></div><button onClick={analyze} className="primary-button">开始分析 <span>↗</span></button></div></div>
      <div className="suggestions"><span>试试：</span>{['企业新人 Agent','金融场景权限方案','模型成本优化'].map(x=><button key={x} onClick={()=>setQuery(`我准备做${x}，应该找谁合作？`)}>{x}</button>)}</div>
    </section>
    <section className="section-block"><div className="section-head"><div><span className="section-index">01</span><h2>可能与你有关的人</h2></div><button onClick={openGraph}>查看全部 →</button></div>
      <div className="people-grid">{discoverPeople.map(person=><article className="person-card clickable" key={person.name} onClick={()=>openPerson(person)}><div className="person-top"><span className="avatar large" style={{background:person.color}}>{person.initials}</span><button aria-label="更多">•••</button></div><h3>{person.name}</h3><p>{person.team}</p><div className="tag-row">{person.shortTags.map(t=><span key={t}>{t}</span>)}</div><div className="match-note"><b>与你的关联</b><span>近期有 2 个共同领域</span></div></article>)}</div>
    </section>
    <section className="section-block projects-section"><div className="section-head"><div><span className="section-index">02</span><h2>近期活跃项目</h2></div><button onClick={openGraph}>在图谱中探索 →</button></div><div className="project-grid">{projects.map(project=><article className="project-card" key={project.title} style={{background:project.tint}}><span className="project-kicker">{project.kicker}</span><h3>{project.title}</h3><p>{project.copy}</p><footer>{project.meta}<span>↗</span></footer></article>)}</div></section>
  </div>;
}

function Progress({ active }:{active:number}) {
  return <div className="progress-steps">{['理解任务','组建团队','开始协作'].map((s,i)=><div className={i<=active?'done':''} key={s}><span>{i<active?'✓':i+1}</span><b>{s}</b>{i<2&&<i />}</div>)}</div>;
}

function AnalysisView({ query, setView }:{query:string;setView:(v:View)=>void}) {
  const [objective,setObjective]=useState('定位 Agent Token 成本异常，建立从发现、归因到治理的完整诊断能力');
  const [skills,setSkills]=useState(['模型路由','成本分析','异常检测','可观测性','企业权限']);
  return <div className="flow-content">
    <Progress active={0}/>
    <button className="back-button" onClick={()=>setView('home')}>← 返回修改任务</button>
    <div className="flow-title"><p className="eyebrow">TASK BRIEF · AI GENERATED</p><h1>我这样理解你的任务</h1><p>确认或修改后，LinkUp 将从你有权访问的工作产出中寻找最佳协作者。</p></div>
    <div className="analysis-layout">
      <section className="analysis-main panel"><div className="panel-label"><span>01</span>任务目标 <button>编辑</button></div><textarea value={objective} onChange={e=>setObjective(e.target.value)} />
        <div className="divider"/><div className="panel-label"><span>02</span>需要的能力</div><div className="editable-tags">{skills.map(s=><button key={s} onClick={()=>setSkills(skills.filter(x=>x!==s))}>{s}<span>×</span></button>)}<button className="add-tag" onClick={()=>!skills.includes('数据治理')&&setSkills([...skills,'数据治理'])}>＋ 添加能力</button></div>
        <div className="divider"/><div className="panel-label"><span>03</span>预期产出</div><div className="outputs"><label><input type="checkbox" defaultChecked/>异常指标与告警规则</label><label><input type="checkbox" defaultChecked/>成本归因与诊断路径</label><label><input type="checkbox" defaultChecked/>治理策略与协作机制</label></div>
      </section>
      <aside className="analysis-side">
        <div className="context-card"><span className="context-icon">⌕</span><div><b>检索范围</b><p>AI Platform · 最近 12 个月</p></div><button>调整</button></div>
        <div className="context-card"><span className="context-icon">▤</span><div><b>可用工作产出</b><p>10 个项目 · 24 份文档</p></div></div>
        <div className="privacy-note"><b>权限安全</b><p>仅分析你有权访问的内容，推荐结果不用于绩效评价。</p></div>
        <button className="primary-button wide" onClick={()=>setView('results')}>确认并生成团队 <span>↗</span></button>
      </aside>
    </div>
    <div className="source-task"><span>原始任务</span><p>{query}</p></div>
  </div>;
}

function ResultsView({ setView, openPerson, openMessage }:{setView:(v:View)=>void;openPerson:(p:Person)=>void;openMessage:()=>void}) {
  const [feedback,setFeedback]=useState('');
  return <div className="flow-content results-content">
    <Progress active={1}/><button className="back-button" onClick={()=>setView('analysis')}>← 返回任务理解</button>
    <div className="results-hero"><div><p className="eyebrow">COLLABORATION PLAN</p><h1>为你补齐 3 个关键角色</h1><p>基于 10 个历史项目与 24 份工作产出生成。每项推荐都可追溯。</p></div><button className="outline-button" onClick={()=>setView('graph')}>在图谱中查看 ⌘</button></div>
    <section className="you-bring"><span className="avatar avatar-nicole">NW</span><div><small>你已经带来的能力</small><h3>Nicole · Agent 产品与 Token 治理</h3></div><div className="tag-row"><span>Token Governance</span><span>Agent Product</span><span>Context</span></div></section>
    <div className="connector-label"><span/>团队需要补齐<span/></div>
    <div className="team-grid">{people.map((person,i)=><article className="team-card" key={person.id}><div className="team-number">0{i+1}</div><div className="person-top"><span className="avatar team-avatar" style={{background:person.color}}>{person.initials}</span><span className="recommend-label">高度推荐</span></div><h2>{person.name}</h2><p className="team-name">{person.team}</p><h3>{person.title}</h3><div className="evidence-summary"><span><b>{person.tags.length}</b> 项能力匹配</span><span><b>{person.projects.length}</b> 个相关项目</span><span><b>2</b> 个月内经验</span></div><ul>{person.reasons.slice(0,2).map(r=><li key={r}>{r}</li>)}</ul><button className="card-action" onClick={()=>openPerson(person)}>查看推荐依据 <span>→</span></button></article>)}</div>
    <section className="team-actions"><div><span className="action-icon">↗</span><div><h3>准备开始协作？</h3><p>LinkUp 会根据任务和每个人的经验，生成一条有上下文的沟通消息。</p></div></div><button className="primary-button" onClick={openMessage}>生成沟通消息 <span>↗</span></button></section>
    <section className="feedback-bar"><div><b>这组推荐对你有帮助吗？</b><span>你的反馈会用于改善后续推荐</span></div><div>{feedback?<strong>感谢反馈 · 已记录</strong>:<><button onClick={()=>setFeedback('yes')}>有帮助</button><button onClick={()=>setFeedback('no')}>不太合适</button></>}</div></section>
  </div>;
}

function GraphView({ openPerson }:{openPerson:(p:Person)=>void}) {
  const [filter,setFilter]=useState('综合关系');
  const [focus,setFocus]=useState('alex');
  const focusPerson=people.find(p=>p.id===focus) || people[0];
  return <div className="graph-page">
    <div className="graph-header"><div><p className="eyebrow">PEOPLE GRAPH</p><h1>组织能力与协作图谱</h1><p>从工作产出中持续更新，发现人、项目与能力之间的真实联系。</p></div><div className="graph-stat"><b>8</b><span>同事</span><b>10</b><span>项目</span><b>24</b><span>工作产出</span></div></div>
    <div className="graph-toolbar"><div className="filter-tabs">{['综合关系','相似经验','互补能力','历史协作'].map(f=><button className={filter===f?'active':''} onClick={()=>setFilter(f)} key={f}>{f}</button>)}</div><div className="graph-legend"><span><i className="blue"/>相似</span><span><i className="coral"/>互补</span><span><i/>协作</span></div></div>
    <div className="graph-layout">
      <section className={`graph-canvas filter-${filter}`}>
        <div className="task-focus">当前聚焦 · Token 成本异常诊断</div>
        <div className="edge e1"/><div className="edge e2 coral"/><div className="edge e3 coral"/><div className="edge e4"/><div className="edge e5 muted"/><div className="edge e6 blue"/><div className="edge e7 muted"/><div className="edge e8 blue"/>
        {graphNodes.map(n=><button key={n.id} style={{left:`${n.x}%`,top:`${n.y}%`}} className={`graph-node ${n.kind} ${focus===n.id?'selected':''}`} onClick={()=>{setFocus(n.id); const p=people.find(x=>x.id===n.id); if(p) setFocus(p.id)}}><span>{n.initials}</span><b>{n.label}</b><small>{n.sub}</small></button>)}
      </section>
      <aside className="graph-detail"><div className="detail-overline">当前选中</div><div className="detail-profile"><span className="avatar team-avatar" style={{background:focusPerson.color}}>{focusPerson.initials}</span><div><h2>{focusPerson.name}</h2><p>{focusPerson.team}</p></div></div><div className="relationship-callout"><b>为什么与你相关</b><p>{focusPerson.reasons[2]}</p></div><h3 className="minor-title">共同与互补领域</h3><div className="tag-row">{focusPerson.tags.map(t=><span key={t}>{t}</span>)}</div><h3 className="minor-title">最近相关项目</h3>{focusPerson.projects.map(p=><div className="mini-project" key={p.name}><span>◫</span><div><b>{p.name}</b><small>{p.type} · {p.date}</small></div></div>)}<button className="card-action" onClick={()=>openPerson(focusPerson)}>查看完整档案 <span>→</span></button></aside>
    </div>
  </div>;
}

function PersonDrawer({ person, close }:{person:Person;close:()=>void}) {
  const [reported,setReported]=useState(false);
  return <div className="overlay" onClick={close}><aside className="person-drawer" onClick={e=>e.stopPropagation()}><button className="close-button" onClick={close}>×</button><div className="drawer-head"><span className="avatar drawer-avatar" style={{background:person.color}}>{person.initials}</span><div><p>{person.team}</p><h2>{person.name}</h2><span>{person.role}</span></div></div><div className="drawer-section"><small>推荐角色</small><h3>{person.title}</h3><p>{person.reasons.join('；')}。</p></div><div className="drawer-section"><div className="drawer-title"><small>能力标签</small><button onClick={()=>setReported(true)}>{reported?'已收到反馈':'不准确？'}</button></div><div className="tag-row big">{person.tags.map(t=><span key={t}>{t}</span>)}</div></div><div className="drawer-section"><small>推荐证据 · 你有权访问</small><div className="evidence-list">{person.projects.map(project=><article key={project.name}><div><span>◫</span><b>{project.name}</b><em>{project.type}</em></div><p>{project.note}</p><footer>{project.date}<button>查看来源 ↗</button></footer></article>)}</div></div><div className="drawer-trust"><b>基于工作产出，而非自我标签</b><p>LinkUp 只展示你有权访问的证据，且不用于绩效评价。</p></div></aside></div>;
}

function MessageModal({ close }:{close:()=>void}) {
  const [copied,setCopied]=useState(false);
  const message='Hi Alex、Maya、Jason，我正在推进 Agent Token 成本异常诊断。LinkUp 发现你们在模型路由、可观测性和企业权限方面有互补经验，尤其与 LLM Gateway 和 Agent Observability 项目高度相关。想邀请大家一起用 30 分钟对齐异常归因方案和分工，明天下午方便吗？';
  return <div className="overlay modal-overlay" onClick={close}><section className="message-modal" onClick={e=>e.stopPropagation()}><button className="close-button" onClick={close}>×</button><p className="eyebrow">READY TO CONNECT</p><h2>把发现变成一次协作</h2><p className="modal-sub">已结合任务背景与每位成员的相关经验生成，你可以直接修改。</p><div className="recipient-row"><span>发送给</span>{people.map(p=><div key={p.id}><span className="avatar mini" style={{background:p.color}}>{p.initials}</span>{p.name.split(' ')[0]}</div>)}</div><textarea defaultValue={message}/><div className="message-context"><span>引用了 3 个相关项目</span><span>仅包含可访问的信息</span></div><div className="modal-actions"><button className="outline-button" onClick={close}>返回</button><button className="primary-button" onClick={()=>setCopied(true)}>{copied?'已复制到剪贴板 ✓':'复制消息'} <span>↗</span></button></div></section></div>;
}

export default function Home() {
  const [view,setView]=useState<View>('home');
  const [query,setQuery]=useState('我准备做一个 Agent Token 成本异常诊断能力，应该找谁合作？');
  const [selectedPerson,setSelectedPerson]=useState<Person|null>(null);
  const [messageOpen,setMessageOpen]=useState(false);
  return <main className="app-shell"><Sidebar view={view} setView={setView}/><section className="workspace"><Topbar view={view}/>{view==='home'&&<HomeView query={query} setQuery={setQuery} analyze={()=>setView('analysis')} openPerson={setSelectedPerson} openGraph={()=>setView('graph')}/>} {view==='analysis'&&<AnalysisView query={query} setView={setView}/>} {view==='results'&&<ResultsView setView={setView} openPerson={setSelectedPerson} openMessage={()=>setMessageOpen(true)}/>} {view==='graph'&&<GraphView openPerson={setSelectedPerson}/>}</section>{selectedPerson&&<PersonDrawer person={selectedPerson} close={()=>setSelectedPerson(null)}/>} {messageOpen&&<MessageModal close={()=>setMessageOpen(false)}/>}</main>;
}
