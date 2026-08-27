class QualityFlow extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; color: #152033; font-family: "Microsoft YaHei", "Noto Sans CJK SC", Arial, sans-serif; }
        * { box-sizing: border-box; }
        .topbar { display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 18px 20px; border-bottom: 1px solid #d9e2ed; background: #fff; }
        .summary { display: grid; grid-template-columns: repeat(4, auto); gap: 7px; }
        .summary-item { min-width: 84px; padding: 7px 9px; border: 1px solid #d9e2ed; border-top: 3px solid var(--status); color: #66758a; font-size: 12px; }
        .summary-item strong { display: block; color: #152033; font-size: 18px; }
        .toolbar { display: flex; align-items: center; justify-content: space-between; gap: 15px; padding: 13px 20px; background: #f8fafc; }
        .toolbar-title { color: #66758a; font-size: 13px; }
        .toolbar-actions, .filters, .view-controls { display: flex; flex-wrap: wrap; gap: 7px; align-items: center; }
        .filter { display: inline-flex; align-items: center; gap: 7px; min-height: 30px; padding: 0 10px; border: 1px solid #d9e2ed; background: #fff; color: #435168; cursor: pointer; font: inherit; font-size: 12px; }
        .filter[aria-pressed="true"] { border-color: #607b98; background: #eaf0f7; color: #152033; }
        .dot, .state { width: 8px; height: 8px; border-radius: 50%; background: var(--status); flex: none; }
        .workspace { display: grid; grid-template-columns: minmax(0, 1fr) 340px; align-items: stretch; }
        .diagram-scroll { min-width: 0; overflow-x: auto; overflow-y: hidden; }
        .diagram-scaler { position: relative; width: 1600px; height: 1040px; }
        .diagram { position: relative; width: 1600px; height: 1040px; overflow: hidden; transform-origin: top left; background: linear-gradient(#f8fafc 1px, transparent 1px), linear-gradient(90deg, #f8fafc 1px, transparent 1px), #f4f7fb; background-size: 30px 30px; }
        .connection-layer { position: absolute; inset: 0; width: 1600px; height: 1040px; pointer-events: none; overflow: visible; }
        .flow-line { fill: none; stroke: #456d97; stroke-width: 2.5; marker-end: url(#flow-arrow); }
        .measure-line { fill: none; stroke: #adb8c7; stroke-width: 1.5; stroke-dasharray: 5 4; }
        .measure-line.implemented { stroke: #5fae85; stroke-dasharray: none; }
        .measure-line.in-progress { stroke: #dfa831; stroke-dasharray: none; }
        .measure-line.gap { stroke: #d97777; }
        .quality-core { position: absolute; top: 476px; left: 585px; width: 390px; color: #64748a; text-align: center; pointer-events: none; }
        .core-title { display: flex; align-items: center; justify-content: center; gap: 10px; margin: 0; color: #506d8a; font-size: 13px; font-weight: 700; }
        .core-title::before, .core-title::after { width: 38px; height: 1px; background: #b9d7d0; content: ""; }
        .core-controls { display: flex; justify-content: center; gap: 18px; margin-top: 10px; font-size: 12px; }
        .core-controls span + span::before { margin-right: 18px; color: #9aa7b8; content: "·"; }
        .node { position: absolute; width: 178px; min-height: 76px; padding: 13px 15px 11px; border: 2px solid var(--node-color); border-radius: 6px; background: #fff; box-shadow: 0 2px 8px rgba(22,39,62,.10); text-align: center; }
        .node::before { position: absolute; top: -13px; left: 50%; display: grid; width: 24px; height: 24px; place-items: center; transform: translateX(-50%); border-radius: 50%; background: var(--node-color); color: #fff; content: attr(data-step); font-size: 12px; font-weight: 700; }
        .node-name { display: block; font-size: 17px; font-weight: 700; }
        .node-code { display: block; margin-top: 5px; color: #66758a; font-size: 11px; }
        .measure-group { position: absolute; width: 226px; }
        .measure-group-label { margin: 0 0 6px 2px; color: #617087; font-size: 12px; font-weight: 700; }
        .measure { display: flex; align-items: center; width: 100%; min-height: 38px; margin-top: 6px; padding: 8px 10px 8px 13px; border: 1px solid #d9e2ed; border-left: 4px solid var(--status); border-radius: 4px; background: #fff; color: #152033; cursor: pointer; font: inherit; font-size: 13px; line-height: 1.35; text-align: left; box-shadow: 0 1px 2px rgba(22,39,62,.06); }
        .measure:hover, .measure:focus-visible { outline: none; border-color: #607b98; box-shadow: 0 0 0 3px rgba(47,111,172,.18); }
        .measure.is-muted { opacity: .2; }
        .measure.is-selected { border-color: #2f6fac; box-shadow: 0 0 0 3px rgba(47,111,172,.18); }
        .measure .state { width: 7px; height: 7px; margin-right: 8px; }
        .implemented { --status: #1b9a61; }
        .in-progress { --status: #d89111; }
        .unimplemented { --status: #9aa7b8; }
        .gap { --status: #cc4b4b; }
        .detail { min-height: 100%; padding: 22px; border-left: 1px solid #d9e2ed; border-top: 4px solid #2f6fac; background: #fff; }
        .detail-label, .detail-status, .detail-meta { color: #66758a; font-size: 13px; }
        .detail-name { margin-top: 4px; font-size: 17px; font-weight: 700; }
        .detail-meta { margin-top: 10px; padding-top: 10px; border-top: 1px solid #e4e9f0; }
        .detail-copy { margin-top: 22px; color: #47566c; font-size: 14px; line-height: 1.7; }
        .detail-status { margin-top: 22px; padding-top: 12px; border-top: 1px solid #e4e9f0; line-height: 1.6; }
        @media (max-width: 1450px) { .workspace { grid-template-columns: 1fr; } .detail { min-height: auto; border-top: 1px solid #d9e2ed; border-left: 4px solid #2f6fac; } }
        @media (max-width: 700px) { .topbar, .toolbar { align-items: flex-start; flex-direction: column; } .summary { width: 100%; grid-template-columns: repeat(4, 1fr); } .summary-item { min-width: 0; } }
      </style>
      <div class="topbar">
        <div class="summary" aria-label="措施状态汇总">
          <div class="summary-item implemented"><strong id="implemented-count">0</strong>已实施</div>
          <div class="summary-item in-progress"><strong id="in-progress-count">0</strong>实施中</div>
          <div class="summary-item unimplemented"><strong id="unimplemented-count">0</strong>未实现</div>
          <div class="summary-item gap"><strong id="gap-count">0</strong>关键缺口</div>
        </div>
      </div>
      <div class="toolbar">
        <span class="toolbar-title">筛选措施状态</span>
        <div class="toolbar-actions">
          <div class="filters" role="group" aria-label="按状态筛选措施">
            <button class="filter" type="button" data-filter="all" aria-pressed="true">全部</button>
            <button class="filter implemented" type="button" data-filter="implemented" aria-pressed="false"><span class="dot"></span>已实施</button>
            <button class="filter in-progress" type="button" data-filter="in-progress" aria-pressed="false"><span class="dot"></span>实施中</button>
            <button class="filter unimplemented" type="button" data-filter="unimplemented" aria-pressed="false"><span class="dot"></span>未实现</button>
            <button class="filter gap" type="button" data-filter="gap" aria-pressed="false"><span class="dot"></span>关键缺口</button>
          </div>
          <div class="view-controls" role="group" aria-label="流程图显示方式">
            <button class="filter" type="button" data-view="fit" aria-pressed="true">适应窗口</button>
            <button class="filter" type="button" data-view="original" aria-pressed="false">原始尺寸</button>
          </div>
        </div>
      </div>
      <div class="workspace">
      <div class="diagram-scroll">
        <div class="diagram-scaler" id="diagram-scaler"><div class="diagram" id="diagram">
          <svg class="connection-layer" id="connections" viewBox="0 0 1600 1040" aria-hidden="true"><defs><marker id="flow-arrow" markerWidth="11" markerHeight="11" refX="8" refY="5.5" orient="auto"><path d="M0,0 L10,5.5 L0,11 z" fill="#456d97"/></marker></defs><path class="flow-line" d="M335 362 L435 285"/><path class="flow-line" d="M613 265 L705 265"/><path class="flow-line" d="M883 285 L995 362"/><path class="flow-line" d="M1085 420 L1085 620"/><path class="flow-line" d="M995 697 L883 775"/><path class="flow-line" d="M705 795 L613 795"/><path class="flow-line" d="M435 793 H180 V363 H246"/></svg>
          <section class="quality-core" aria-label="贯穿交付流程的质量机制"><h3 class="core-title">质量内建</h3><div class="core-controls"><span>风险前置</span><span>自动验证</span><span>证据追溯</span></div></section>
          <article class="node" id="node-plan" data-step="01" style="left:246px;top:325px;--node-color:#356ca5"><span class="node-name">规划与变更</span><span class="node-code">PLAN &amp; CHANGE</span></article>
          <article class="node" id="node-design" data-step="02" style="left:435px;top:225px;--node-color:#2f7d50"><span class="node-name">设计与实现</span><span class="node-code">DESIGN &amp; IMPLEMENT</span></article>
          <article class="node" id="node-build" data-step="03" style="left:705px;top:225px;--node-color:#b27713"><span class="node-name">集成与构建</span><span class="node-code">INTEGRATE &amp; BUILD</span></article>
          <article class="node" id="node-gate" data-step="04" style="left:995px;top:325px;--node-color:#7050a8"><span class="node-name">验证与准入</span><span class="node-code">VERIFY &amp; GATE</span></article>
          <article class="node" id="node-release" data-step="05" style="left:995px;top:620px;--node-color:#b85d37"><span class="node-name">发布与部署</span><span class="node-code">RELEASE &amp; DEPLOY</span></article>
          <article class="node" id="node-observe" data-step="06" style="left:705px;top:755px;--node-color:#2d7b85"><span class="node-name">运行与观测</span><span class="node-code">OPERATE &amp; OBSERVE</span></article>
          <article class="node" id="node-improve" data-step="07" style="left:435px;top:755px;--node-color:#4b6499"><span class="node-name">反馈与改进</span><span class="node-code">FEEDBACK &amp; IMPROVE</span></article>
          <section class="measure-group" style="left:40px;top:155px"><p class="measure-group-label">规划与变更的质量措施</p><button class="measure unimplemented" type="button" data-node="node-plan" data-name="需求编写规范" data-detail="需求应具有明确业务目标、范围、验收标准和变更记录。" data-evidence="需求条目、评审记录、验收标准"><span class="state"></span>需求编写规范</button><button class="measure unimplemented" type="button" data-node="node-plan" data-name="需求评审" data-detail="对关键需求进行完整性、可测试性和影响范围评审。" data-evidence="需求评审清单、评审结论"><span class="state"></span>需求评审</button><button class="measure unimplemented" type="button" data-node="node-plan" data-name="变更影响评估" data-detail="在实施前识别变更对架构、测试、运行和合规的影响。" data-evidence="变更申请、影响分析"><span class="state"></span>变更影响评估</button></section>
          <section class="measure-group" style="left:390px;top:62px"><p class="measure-group-label">设计与实现的质量措施</p><button class="measure unimplemented" type="button" data-node="node-design" data-name="方案与架构评审" data-detail="关键方案在编码前完成可行性、边界和风险评审。" data-evidence="设计文档、评审记录"><span class="state"></span>方案与架构评审</button><button class="measure unimplemented" type="button" data-node="node-design" data-name="代码评审" data-detail="代码合并前由具备相应能力的人员进行可维护性、正确性和安全性复核。" data-evidence="合并请求、评审记录"><span class="state"></span>代码评审</button><button class="measure unimplemented" type="button" data-node="node-design" data-name="单元测试" data-detail="核心逻辑应通过自动化单元测试验证，并保留执行结果。" data-evidence="单元测试报告、覆盖率数据"><span class="state"></span>单元测试</button></section>
          <section class="measure-group" style="left:690px;top:62px"><p class="measure-group-label">集成与构建的质量措施</p><button class="measure unimplemented" type="button" data-node="node-build" data-name="可重复构建与制品管理" data-detail="构建过程、依赖和输出制品应可复现、可识别、可追溯。" data-evidence="构建流水线、制品仓库记录"><span class="state"></span>可重复构建与制品管理</button><button class="measure unimplemented" type="button" data-node="node-build" data-name="静态分析" data-detail="通过规则检查识别代码缺陷、复杂度问题和已知风险。" data-evidence="静态分析报告、整改记录"><span class="state"></span>静态分析</button><button class="measure unimplemented" type="button" data-node="node-build" data-name="集成验证" data-detail="在集成环境验证接口、依赖组件和关键业务链路。" data-evidence="集成测试报告、环境记录"><span class="state"></span>集成验证</button></section>
          <section class="measure-group" style="left:1310px;top:155px"><p class="measure-group-label">验证与准入的质量措施</p><button class="measure unimplemented" type="button" data-node="node-gate" data-name="测试策略" data-detail="按风险定义测试范围、测试层级、环境和退出准则。" data-evidence="测试策略、测试计划"><span class="state"></span>测试策略</button><button class="measure unimplemented" type="button" data-node="node-gate" data-name="端到端测试" data-detail="对关键用户旅程和业务流程执行自动化或受控验证。" data-evidence="E2E 报告、测试记录"><span class="state"></span>端到端测试</button><button class="measure unimplemented" type="button" data-node="node-gate" data-name="安全与性能测试" data-detail="按风险实施安全和性能验证，并处理不可接受的问题。" data-evidence="安全报告、性能报告"><span class="state"></span>安全与性能测试</button></section>
          <section class="measure-group" style="left:1310px;top:585px"><p class="measure-group-label">发布与部署的质量措施</p><button class="measure unimplemented" type="button" data-node="node-release" data-name="发布检查与审批" data-detail="发布前确认准入结论、发布范围和责任人，保留审批证据。" data-evidence="发布清单、审批记录"><span class="state"></span>发布检查与审批</button><button class="measure unimplemented" type="button" data-node="node-release" data-name="配置与回滚预案" data-detail="变更配置应可控，异常时可按预案回滚或止损。" data-evidence="配置记录、回滚预案"><span class="state"></span>配置与回滚预案</button><button class="measure unimplemented" type="button" data-node="node-release" data-name="部署后自动核验" data-detail="部署完成后自动检查服务可用性、关键指标和版本一致性。" data-evidence="部署验证报告、监控快照"><span class="state"></span>部署后自动核验</button></section>
          <section class="measure-group" style="left:690px;top:850px"><p class="measure-group-label">运行与观测的质量措施</p><button class="measure unimplemented" type="button" data-node="node-observe" data-name="监控与告警" data-detail="基于日志、指标和链路数据发现异常，并设置响应阈值。" data-evidence="监控面板、告警规则"><span class="state"></span>监控与告警</button><button class="measure unimplemented" type="button" data-node="node-observe" data-name="事件响应" data-detail="明确事件分级、响应责任、升级路径和处置记录。" data-evidence="事件单、响应记录"><span class="state"></span>事件响应</button><button class="measure unimplemented" type="button" data-node="node-observe" data-name="备份恢复" data-detail="关键数据和服务具备备份、恢复要求及定期演练。" data-evidence="备份记录、恢复演练报告"><span class="state"></span>备份恢复</button></section>
          <section class="measure-group" style="left:390px;top:850px"><p class="measure-group-label">反馈与改进的质量措施</p><button class="measure unimplemented" type="button" data-node="node-improve" data-name="故障复盘" data-detail="对重要问题识别根因、改进措施和复发防止机制。" data-evidence="复盘报告、行动项"><span class="state"></span>故障复盘</button><button class="measure unimplemented" type="button" data-node="node-improve" data-name="内部审核" data-detail="定期检查质量体系是否按要求运行，并跟踪发现项。" data-evidence="审核计划、审核报告"><span class="state"></span>内部审核</button><button class="measure unimplemented" type="button" data-node="node-improve" data-name="管理评审" data-detail="管理层评估质量目标、风险、资源和改进结果。" data-evidence="评审会议记录、决策项"><span class="state"></span>管理评审</button></section>
        </div></div>
      </div>
      <aside class="detail" aria-live="polite"><div class="detail-label">当前措施</div><div class="detail-name" id="detail-name">选择一项质量措施</div><div class="detail-meta" id="detail-meta">所属阶段将在此显示</div><div class="detail-copy" id="detail-copy">点击流程图外围的任一措施，查看该措施的质量要求，以及台账中应维护的证据类型。</div><div class="detail-status" id="detail-status">措施状态将在此显示</div></aside>
      </div>
    `;
    this.setup();
  }

  setup() {
    const root = this.shadowRoot;
    this.diagram = root.getElementById('diagram');
    this.layer = root.getElementById('connections');
    this.scroller = root.querySelector('.diagram-scroll');
    this.scaler = root.getElementById('diagram-scaler');
    this.measures = [...root.querySelectorAll('.measure')];
    this.statusNames = { implemented: '已实施', 'in-progress': '实施中', unimplemented: '未实现', gap: '关键缺口' };
    this.nodeNames = { 'node-plan': '01 规划与变更', 'node-design': '02 设计与实现', 'node-build': '03 集成与构建', 'node-gate': '04 验证与准入', 'node-release': '05 发布与部署', 'node-observe': '06 运行与观测', 'node-improve': '07 反馈与改进' };
    root.querySelectorAll('.filter').forEach((filter) => filter.addEventListener('click', () => this.filter(filter)));
    root.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => this.setView(button.dataset.view)));
    this.measures.forEach((measure) => measure.addEventListener('click', () => this.select(measure)));
    Object.keys(this.statusNames).forEach((status) => root.getElementById(status + '-count').textContent = this.measures.filter((measure) => this.statusOf(measure) === status).length);
    this.resizeObserver = new ResizeObserver(() => this.setView(this.view || 'fit'));
    this.resizeObserver.observe(this);
    requestAnimationFrame(() => this.setView('fit'));
  }

  disconnectedCallback() { this.resizeObserver?.disconnect(); }
  refresh() { requestAnimationFrame(() => this.setView(this.view || 'fit')); }
  statusOf(element) { return Object.keys(this.statusNames).find((status) => element.classList.contains(status)); }

  rectInDiagram(element) {
    const rect = element.getBoundingClientRect();
    const base = this.diagram.getBoundingClientRect();
    const scale = this.scale || 1;
    return { left: (rect.left - base.left) / scale, top: (rect.top - base.top) / scale, width: rect.width / scale, height: rect.height / scale };
  }

  edge(from, to) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const horizontal = Math.abs(dx) > Math.abs(dy);
    const half = horizontal ? from.width / 2 : from.height / 2;
    const distance = horizontal ? Math.abs(dx) : Math.abs(dy);
    const scale = distance / half || 1;
    return { x: from.x + dx / scale, y: from.y + dy / scale };
  }

  drawLinks() {
    if (!this.diagram || !this.diagram.offsetWidth) return;
    this.layer.querySelectorAll('.measure-line').forEach((line) => line.remove());
    this.measures.forEach((measure) => {
      const sourceRect = this.rectInDiagram(measure);
      const targetRect = this.rectInDiagram(this.shadowRoot.getElementById(measure.dataset.node));
      const source = { x: sourceRect.left + sourceRect.width / 2, y: sourceRect.top + sourceRect.height / 2, width: sourceRect.width, height: sourceRect.height };
      const target = { x: targetRect.left + targetRect.width / 2, y: targetRect.top + targetRect.height / 2, width: targetRect.width, height: targetRect.height };
      const start = this.edge(source, target);
      const end = this.edge(target, source);
      const bend = (start.x + end.x) / 2;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      line.setAttribute('class', 'measure-line ' + this.statusOf(measure));
      line.dataset.status = this.statusOf(measure);
      line.setAttribute('d', 'M ' + start.x + ' ' + start.y + ' C ' + bend + ' ' + start.y + ', ' + bend + ' ' + end.y + ', ' + end.x + ' ' + end.y);
      this.layer.appendChild(line);
    });
  }

  setView(view) {
    if (!this.scroller) return;
    this.view = view;
    const availableWidth = this.scroller.clientWidth;
    const requestedScale = availableWidth / 1600;
    this.scale = view === 'fit' ? Math.max(.68, Math.min(1, requestedScale || 1)) : 1;
    this.diagram.style.transform = 'scale(' + this.scale + ')';
    this.scaler.style.width = (1600 * this.scale) + 'px';
    this.scaler.style.height = (1040 * this.scale) + 'px';
    this.scroller.style.height = (1040 * this.scale) + 'px';
    this.scroller.style.overflowX = (1600 * this.scale) > availableWidth + 1 ? 'auto' : 'hidden';
    this.shadowRoot.querySelectorAll('[data-view]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.view === view)));
    requestAnimationFrame(() => this.drawLinks());
  }

  filter(filter) {
    const selected = filter.dataset.filter;
    this.shadowRoot.querySelectorAll('.filter').forEach((button) => button.setAttribute('aria-pressed', String(button === filter)));
    this.measures.forEach((measure) => measure.classList.toggle('is-muted', selected !== 'all' && this.statusOf(measure) !== selected));
    this.layer.querySelectorAll('.measure-line').forEach((line) => line.style.opacity = selected === 'all' || line.dataset.status === selected ? '1' : '.15');
  }

  select(measure) {
    this.measures.forEach((item) => item.classList.toggle('is-selected', item === measure));
    const status = this.statusOf(measure);
    this.shadowRoot.getElementById('detail-name').textContent = measure.dataset.name;
    this.shadowRoot.getElementById('detail-meta').textContent = '所属阶段：' + this.nodeNames[measure.dataset.node];
    this.shadowRoot.getElementById('detail-copy').textContent = measure.dataset.detail;
    this.shadowRoot.getElementById('detail-status').textContent = this.statusNames[status] + ' | 建议证据：' + measure.dataset.evidence;
  }
}

customElements.define('quality-flow', QualityFlow);
