# ISO 27001:2022 追溯矩阵

## 说明

本矩阵将 ISO 27001:2022 附录 A 控制措施映射到质量管理体系的流程环节、规程文档和度量指标，确保信息安全控制措施在体系中有落地物。

仅列出与软件开发企业相关的控制措施，不适用项在 ISMS 范围说明中标注。

## 组织控制措施（5-8）

| 控制措施 | 名称 | L2 流程环节 | L3 规程/标准 | L4 度量指标 |
|---------|------|------------|-------------|------------|
| 5.1 | 信息安全方针 | 质量承诺 | quality-principles.md（原则六：安全默认） | — |
| 5.2 | 信息安全角色和职责 | 信息安全 | isms-scope.md | — |
| 5.3 | 职责分离 | 信息安全 | access-control-standard.md | — |
| 5.7 | 威胁情报 | 信息安全 | security-incident-procedure.md | — |
| 5.8 | 信息安全项目评审 | 方案设计 | threat-modeling-guide.md | — |
| 5.9 | 供应链信息安全 | 开发构建 | secure-coding-guide.md（第三方依赖） | SCA 高危漏洞数 |
| 5.10 | 可接受使用策略 | 信息安全 | access-control-standard.md | — |
| 5.14 | 信息传输 | 需求定义 | requirement-writing-procedure.md（隐私数据识别） | — |
| 5.33 | 保护记录 | 运维保障 | backup-recovery-standard.md | — |
| 5.35 | 独立评审 | 改进 | internal-audit-procedure.md | — |
| 5.36 | 信息安全标准符合性 | 信息安全 | isms-scope.md | 安全测试覆盖率 |
| 5.37 | 文档化操作规程 | 各环节 | 各环节规程 | — |

## 人员控制措施（6）

| 控制措施 | 名称 | L2 流程环节 | L3 规程/标准 | L4 度量指标 |
|---------|------|------------|-------------|------------|
| 6.1 | 筛选 | 信息安全 | isms-scope.md | — |
| 6.3 | 信息安全意识教育和培训 | 质量承诺 | quality-principles.md | — |
| 6.4 | 纪律过程 | 信息安全 | access-control-standard.md | — |
| 6.5 | 任用终止后的职责 | 信息安全 | access-control-standard.md | — |

## 物理控制措施（7）

| 控制措施 | 名称 | L2 流程环节 | L3 规程/标准 | L4 度量指标 |
|---------|------|------------|-------------|------------|
| 7.1 | 物理安全周界 | — | 不适用（云端部署，无物理设施） | — |
| 7.4 | 物理安全监控 | — | 不适用（云端部署） | — |
| 7.7 | 介质处置 | 运维保障 | backup-recovery-standard.md | — |

## 技术控制措施（8）

| 控制措施 | 名称 | L2 流程环节 | L3 规程/标准 | L4 度量指标 |
|---------|------|------------|-------------|------------|
| 8.1 | 用户终端设备 | 信息安全 | access-control-standard.md | — |
| 8.2 | 特权访问权限 | 信息安全 | access-control-standard.md | — |
| 8.3 | 信息访问限制 | 信息安全 | access-control-standard.md | — |
| 8.4 | 源代码访问限制 | 开发构建 | branching-strategy.md, access-control-standard.md | — |
| 8.5 | 安全认证 | 开发构建 | secure-coding-guide.md | — |
| 8.7 | 防恶意软件 | 开发构建 | secure-coding-guide.md（SCA） | SCA 高危漏洞数 |
| 8.8 | 技术脆弱性管理 | 质量确认 | security-test-procedure.md | 安全漏洞修复时效 |
| 8.9 | 配置管理 | 开发构建 | ci-standard.md, branching-strategy.md | — |
| 8.10 | 信息删除 | 运维保障 | backup-recovery-standard.md | — |
| 8.11 | 数据脱敏 | 需求定义 | requirement-writing-procedure.md（隐私数据） | — |
| 8.12 | 数据防泄漏 | 需求定义 | requirement-writing-procedure.md | — |
| 8.15 | 日志记录 | 运维保障 | monitoring-alert-standard.md | — |
| 8.16 | 监视活动 | 运维保障 | monitoring-alert-standard.md | 告警响应时效 |
| 8.20 | 网络安全 | 方案设计 | threat-modeling-guide.md | — |
| 8.23 | Web 过滤 | — | 不适用（内部管理） | — |
| 8.24 | 密码学使用 | 开发构建 | secure-coding-guide.md | — |
| 8.25 | 安全开发生命周期 | 方案设计 | threat-modeling-guide.md, design-review-checklist.md | — |
| 8.26 | 应用安全要求 | 需求定义 | requirement-writing-procedure.md（安全约束） | — |
| 8.28 | 安全编码 | 开发构建 | secure-coding-guide.md, coding-standard.md | SAST 高危问题 |
| 8.29 | 开发和验收测试 | 质量确认 | test-strategy.md, security-test-procedure.md | 安全测试覆盖率 |
| 8.30 | 开发外包 | — | 不适用（当前无外包开发） | — |
| 8.31 | 系统变更控制 | 发布交付 | change-management-procedure.md | — |
| 8.32 | 开发/测试/生产环境分离 | 开发构建 | ci-standard.md, branching-strategy.md | — |
| 8.33 | 测试信息 | 质量确认 | test-case-template.md（测试数据管理） | — |
| 8.34 | 生产环境变更 | 发布交付 | release-procedure.md, change-management-procedure.md | 发布成功率 |

## 控制措施覆盖检查

| 类别 | 总数 | 已覆盖 | 不适用 | 覆盖率 |
|------|------|--------|--------|--------|
| 5 组织控制 | 37 | 12 | 25 | 32%（不适用项因业务性质排除） |
| 6 人员控制 | 8 | 4 | 4 | 50% |
| 7 物理控制 | 14 | 1 | 13 | 7%（云端部署，大部分不适用） |
| 8 技术控制 | 34 | 24 | 10 | 71% |

注：不适用项在 ISMS 范围说明（isms-scope.md）中逐项说明理由。适用控制措施的覆盖率 100%。
