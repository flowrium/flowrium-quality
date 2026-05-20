# ISO 9001:2015 追溯矩阵

## 说明

本矩阵将 ISO 9001:2015 各条款映射到质量管理体系的流程环节、规程文档和度量指标，确保每个条款都有落地物，每个流程环节都有条款覆盖。

## 追溯矩阵

| ISO 9001 条款 | 条款名称 | L2 流程环节 | L3 规程/标准 | L4 度量指标 |
|--------------|---------|------------|-------------|------------|
| 4.3 | 质量管理体系范围 | 质量承诺 | quality-principles.md | — |
| 5.1 | 领导作用与承诺 | 质量承诺 | quality-principles.md | — |
| 5.2 | 质量方针 | 质量承诺 | quality-principles.md | — |
| 5.3 | 组织角色与职责 | 质量承诺 | quality-principles.md | — |
| 6.1 | 应对风险和机遇的措施 | 方案设计 | threat-modeling-guide.md | 架构违规数 |
| 6.2 | 质量目标 | 质量承诺 | quality-principles.md, quality-metrics-definition.md | 全局指标 |
| 7.1.3 | 基础设施 | 开发构建 | ci-standard.md | 构建失败率 |
| 7.1.4 | 过程运行环境 | 开发构建 | coding-standard.md, ci-standard.md | 构建失败率 |
| 7.1.5 | 监视和测量资源 | 质量确认 | test-strategy.md | 测试用例通过率 |
| 7.2 | 能力 | 质量承诺 | quality-principles.md（原则一：全员责任） | — |
| 7.3 | 意识 | 质量承诺 | quality-principles.md | — |
| 7.5 | 成文信息 | 各环节 | 各环节规程/标准 | — |
| 8.1 | 运行策划和控制 | 各环节 | 各环节 README.md | — |
| 8.2 | 产品和服务的要求 | 需求定义 | requirement-writing-procedure.md, requirement-review-checklist.md | 需求评审通过率 |
| 8.3 | 产品和服务的设计和开发 | 方案设计 | domain-modeling-procedure.md, architecture-review-procedure.md, design-review-checklist.md | 设计评审通过率 |
| 8.3.2 | 设计和开发输入 | 需求定义 | requirement-writing-procedure.md | 需求变更率 |
| 8.3.3 | 设计和开发控制 | 方案设计 | architecture-review-procedure.md, design-review-checklist.md | 设计评审通过率 |
| 8.3.4 | 设计和开发输出 | 方案设计 | ui-design-standard.md | — |
| 8.3.5 | 设计和开发更改 | 需求定义 | requirement-traceability-standard.md | 需求变更率 |
| 8.4 | 外部提供过程控制 | 开发构建 | secure-coding-guide.md（第三方依赖管理） | SCA 高危漏洞数 |
| 8.5 | 生产和服务提供 | 开发构建 | coding-standard.md, code-review-procedure.md, ci-standard.md | 单元测试覆盖率 |
| 8.5.2 | 标识和可追溯性 | 需求定义 | requirement-traceability-standard.md | — |
| 8.5.3 | 顾客或外部供方财产 | 需求定义 | requirement-writing-procedure.md（隐私数据识别） | — |
| 8.6 | 产品和服务的放行 | 质量确认 | quality-gate-checklist.md | P0/P1 缺陷清零 |
| 8.7 | 不合格输出的控制 | 质量确认 | defect-management-procedure.md | 缺陷逃逸率 |
| 9.1 | 监视、测量、分析和评价 | 度量 | quality-metrics-definition.md | 全局指标 |
| 9.1.2 | 顾客满意 | 度量 | quality-metrics-definition.md | 客户满意度 |
| 9.2 | 内部审核 | 改进 | internal-audit-procedure.md | — |
| 9.3 | 管理评审 | 改进 | management-review-procedure.md | — |
| 10.1 | 总则 | 改进 | postmortem-procedure.md | — |
| 10.2 | 不合格和纠正措施 | 改进 | postmortem-procedure.md | 缺陷修复时效 |
| 10.3 | 持续改进 | 改进 | management-review-procedure.md | 各指标趋势 |

## 条款覆盖检查

| ISO 9001 章节 | 条款数 | 已覆盖 | 覆盖率 |
|--------------|--------|--------|--------|
| 4 组织环境 | 1 | 1 | 100% |
| 5 领导作用 | 3 | 3 | 100% |
| 6 策划 | 2 | 2 | 100% |
| 7 支持 | 5 | 5 | 100% |
| 8 运行 | 9 | 9 | 100% |
| 9 绩效评价 | 3 | 3 | 100% |
| 10 改进 | 3 | 3 | 100% |
| **合计** | **26** | **26** | **100%** |

注：本矩阵仅覆盖与软件开发企业相关的条款，不适用于组织的条款已排除并在质量手册中说明。
