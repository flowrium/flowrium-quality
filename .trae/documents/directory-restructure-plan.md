# 软件质量管理体系目录重构与迁移设计文档

## 1. 文档目的

本文档用于指导 `flowrium-quality` 项目中的 `quality-system` 目录重构。

本次重构的目标不是简单调整目录名称，而是将原有偏传统软件工程阶段的质量体系，升级为更适合现代研发模式的分层递进式质量体系。

新的质量体系需要同时满足：

1. 顶层质量价值观和质量原则清晰。
2. 中层交付环节能够覆盖端到端软件交付过程。
3. 规程层能够定义每个环节必须执行的动作。
4. 后续可以通过流水线验证部分规程是否执行。
5. 可以兼容传统软件工程、DevOps、AI Coding 和后续 AI 系统治理。
6. 为量化指标层预留扩展空间。

---

## 2. 当前背景

`flowrium-quality` 是一个面向软件质量管理、质量规程、流水线验证与质量度量的工程化项目。

当前已有 `quality-system` 目录，原始结构主要按照传统软件工程阶段进行组织，例如：

```text
quality-system/
  00-quality-commitment/
  01-requirements/
  02-solution-design/
  03-development/
  04-quality-assurance/
  05-release/
  06-operations/
  07-improvement/
  08-information-security/
  09-metrics/
  10-iso-traceability/
```

该结构具有清晰、易懂、符合传统软件生命周期认知的优点。

但是，在面向现代研发模式时，它存在一些问题：

1. 容易把质量活动理解为阶段性活动，而不是端到端持续活动。
2. 开发、测试、运维容易被目录割裂。
3. 单元测试、静态扫描、集成测试、E2E 测试等活动容易产生归属争议。
4. 流水线验证点没有独立建模，不利于自动化质量门禁。
5. 信息安全、指标、标准追踪属于横切能力，不适合放在主生命周期尾部。
6. AI Coding 相关质量活动无法自然嵌入原有传统目录。
7. 未来如果引入质量检查器、证据模型、质量门禁 Schema、示例项目，根目录扩展空间不足。

因此，需要对 `quality-system` 进行结构性调整。

---

## 3. 总体重构原则

### 3.1 保留 `quality-system` 目录

建议继续保留 `quality-system` 文件夹。

原因是：

```text
flowrium-quality = 质量工程项目
quality-system   = 软件质量管理体系文档主体
```

`flowrium-quality` 未来不应只承载文档，还可以承载：

```text
质量体系文档
流水线验证脚本
质量门禁配置
证据模型 Schema
质量检查器工具
示例项目
报告生成器
```

因此，推荐整体仓库结构为：

```text
flowrium-quality/
  README.md
  quality-system/
  schemas/
  tools/
  examples/
  .github/
```

其中：

```text
quality-system/
```

专门存放软件质量管理体系文档。

---

### 3.2 使用 `delivery-stages` 而不是 `devops-stages`

不建议使用：

```text
02-devops-stages/
```

推荐使用：

```text
02-delivery-stages/
```

原因是：

1. DevOps 是一种方法论和组织协作思想，不应成为质量体系的唯一边界。
2. 软件质量管理体系应保持方法论中立。
3. `delivery-stages` 更强调从需求进入到上线运行再到反馈改进的端到端价值交付。
4. 未来即使研发方法从 DevOps 演进到 AI-Native Delivery，也不需要再次调整主目录名称。
5. 该名称可以兼容传统软件工程、敏捷、DevOps、AI Coding、MLOps 等不同模式。

因此，本体系采用：

> 以 Delivery Stages 作为主目录名称，以 DevOps 的持续集成、持续验证、持续交付和运行反馈思想作为划分依据之一。

---

### 3.3 三层结构主线

质量体系核心采用三层结构：

```text
第一层：概念层
第二层：交付环节层
第三层：规程层
```

对应目录如下：

```text
第一层：概念层
  00-overview/
  01-concepts/

第二层：交付环节层
  02-delivery-stages/

第三层：规程层
  02-delivery-stages/*/procedures/
```

除此之外，增加辅助支撑层：

```text
03-cross-cutting/          横切治理能力
04-pipeline-verification/  流水线验证能力
05-ai-coding-extension/    AI Coding 扩展能力
06-metrics-reserved/       指标层预留
07-standard-traceability/  标准追踪映射
templates/                 文档模板
```

---

## 4. 推荐目标目录结构

```text
flowrium-quality/
  README.md

  quality-system/
    README.md

    00-overview/
      README.md
      01-system-positioning.md
      02-layered-architecture.md
      03-scope-and-applicability.md
      04-roles-and-responsibilities.md
      05-terminology.md
      06-directory-restructure-plan.md

    01-concepts/
      README.md
      01-quality-values.md
      02-quality-principles.md
      03-quality-policy.md
      04-governance-rules.md
      05-exception-and-waiver.md

    02-delivery-stages/
      README.md

      01-plan-change/
        README.md
        stage-definition.md
        procedures/
          01-requirement-registration.md
          02-requirement-review.md
          03-acceptance-criteria-definition.md
          04-risk-impact-assessment.md
          05-change-baseline.md

      02-design-implement/
        README.md
        stage-definition.md
        procedures/
          01-solution-design-review.md
          02-architecture-review.md
          03-task-breakdown.md
          04-code-implementation.md
          05-code-review.md
          06-unit-test.md
          07-dependency-change-record.md

      03-integrate-build/
        README.md
        stage-definition.md
        procedures/
          01-merge-readiness-check.md
          02-continuous-integration.md
          03-static-analysis.md
          04-build-and-package.md
          05-artifact-versioning.md
          06-artifact-archive.md

      04-verify-gate/
        README.md
        stage-definition.md
        procedures/
          01-test-scope-confirmation.md
          02-integration-test.md
          03-regression-test.md
          04-e2e-test.md
          05-non-functional-test.md
          06-security-verification.md
          07-defect-triage.md
          08-quality-gate-decision.md

      05-release-deploy/
        README.md
        stage-definition.md
        procedures/
          01-release-approval.md
          02-release-note.md
          03-deployment-execution.md
          04-smoke-test.md
          05-rollback-preparation.md
          06-release-archive.md

      06-operate-observe/
        README.md
        stage-definition.md
        procedures/
          01-runtime-health-monitoring.md
          02-log-metric-trace-collection.md
          03-alert-classification.md
          04-incident-response.md
          05-post-release-observation.md
          06-slo-verification.md

      07-feedback-improve/
        README.md
        stage-definition.md
        procedures/
          01-user-feedback-collection.md
          02-defect-review.md
          03-incident-review.md
          04-metric-review.md
          05-capa.md
          06-process-update.md
          07-knowledge-base-update.md

    03-cross-cutting/
      README.md

      01-security/
        README.md
        01-security-policy.md
        02-secure-design.md
        03-secure-coding.md
        04-vulnerability-management.md
        05-data-privacy.md

      02-configuration-management/
        README.md
        01-branch-strategy.md
        02-versioning-strategy.md
        03-dependency-management.md
        04-environment-management.md

      03-traceability/
        README.md
        01-requirement-code-test-release-traceability.md
        02-evidence-management.md
        03-record-retention.md

      04-review-governance/
        README.md
        01-review-policy.md
        02-approval-policy.md
        03-waiver-policy.md

    04-pipeline-verification/
      README.md
      01-verification-points.md
      02-quality-gates.md
      03-evidence-schema.md
      04-pipeline-stage-mapping.md

      checks/
        README.md
        vp-req-change-readiness.md
        vp-pr-merge-readiness.md
        vp-build-readiness.md
        vp-test-quality-gate.md
        vp-sec-security-gate.md
        vp-rel-release-approval.md
        vp-dep-deployment-verification.md
        vp-obs-runtime-observation.md
        vp-imp-improvement-closure.md

    05-ai-coding-extension/
      README.md
      01-ai-coding-quality-policy.md
      02-ai-assisted-requirement.md
      03-ai-assisted-design.md
      04-ai-code-review.md
      05-ai-test-generation.md
      06-prompt-and-context-management.md
      07-model-evaluation.md
      08-ai-risk-review.md

    06-metrics-reserved/
      README.md
      01-metric-taxonomy.md
      02-quality-metrics.md
      03-delivery-metrics.md
      04-process-metrics.md
      05-security-metrics.md
      06-business-metrics.md

    07-standard-traceability/
      README.md
      01-iso9001-mapping.md
      02-cmmi-mapping.md
      03-istqb-mapping.md
      04-devops-dora-mapping.md
      05-ai-governance-mapping.md

    templates/
      stage-template.md
      procedure-template.md
      checklist-template.md
      evidence-template.md
      quality-gate-template.md

  schemas/
    evidence-schema.json
    quality-gate-schema.json
    verification-point-schema.json

  tools/
    quality-checker/
    evidence-validator/

  examples/
    demo-project/
    demo-pipeline/

  .github/
    workflows/
      quality-system-check.yml
```

---

## 5. 核心目录定位

### 5.1 `00-overview`

用于说明质量体系的整体定位、适用范围、分层架构、角色职责和术语。

该目录回答：

> 这个质量体系是什么？为什么存在？适用于谁？如何阅读和使用？

建议包含：

```text
01-system-positioning.md
02-layered-architecture.md
03-scope-and-applicability.md
04-roles-and-responsibilities.md
05-terminology.md
06-directory-restructure-plan.md
```

---

### 5.2 `01-concepts`

概念层，承载质量价值观、质量原则、质量政策、治理规则和例外机制。

该目录回答：

> 我们相信什么？坚持什么？哪些事情必须遵守？

当前已定义的质量价值观包括：

1. 内建质量
2. 持续精进
3. 流程服务产品
4. 领域驱动

当前已定义的质量九原则包括：

1. 质量是全团队的责任
2. 领域认知是质量的根基
3. 需求是质量的起点
4. 简单设计优于过度设计
5. 验证前置
6. 安全是默认属性
7. 变更与发布受控
8. 度量驱动改进
9. 体系自演进

---

### 5.3 `02-delivery-stages`

交付环节层，是质量体系主干。

该目录承载端到端交付过程，包含七个环节：

```text
01-plan-change
02-design-implement
03-integrate-build
04-verify-gate
05-release-deploy
06-operate-observe
07-feedback-improve
```

七个环节的含义如下：

| 环节 | 中文含义 | 核心质量目标 |
|---|---|---|
| `01-plan-change` | 规划与变更 | 保证需求清晰、可测、受控 |
| `02-design-implement` | 设计与实现 | 保证设计合理、实现规范、质量内建 |
| `03-integrate-build` | 集成与构建 | 保证代码可集成、可构建、制品可追溯 |
| `04-verify-gate` | 验证与准入 | 保证版本候选达到测试、安全、质量门禁要求 |
| `05-release-deploy` | 发布与部署 | 保证发布受控、部署可靠、可回滚 |
| `06-operate-observe` | 运行与观察 | 保证系统运行状态可观测、问题可响应 |
| `07-feedback-improve` | 反馈与改进 | 保证缺陷、事故、用户反馈能反哺体系改进 |

---

### 5.4 `03-cross-cutting`

横切治理能力。

安全、配置管理、追溯、审批、豁免等内容不属于某一个单独阶段，而是贯穿整个交付过程。

例如，安全应同时出现在：

```text
01-concepts/                         安全是默认属性
03-cross-cutting/01-security/         安全治理要求
02-delivery-stages/*                  各环节中的安全动作
04-pipeline-verification/checks/      安全门禁验证
```

---

### 5.5 `04-pipeline-verification`

流水线验证层。

该目录用于定义规程如何被流水线验证。

需要区分两个概念：

```text
规程动作 = 要做什么
流水线验证 = 如何证明做了，并且是否通过
```

例如：

```text
单元测试规程
```

应放在：

```text
02-delivery-stages/02-design-implement/procedures/06-unit-test.md
```

而流水线中验证单元测试是否执行、是否通过、是否产出报告，则放在：

```text
04-pipeline-verification/checks/vp-test-quality-gate.md
```

---

### 5.6 `05-ai-coding-extension`

AI Coding 扩展层。

该目录不作为主流程，而是作为扩展能力存在。

原因是：

1. 并非所有项目都是 AI 原生项目。
2. AI Coding 是研发方式增强，不应替代完整质量体系。
3. AI 相关质量活动应嵌入现有交付环节，而不是另起一套割裂体系。

该目录可覆盖：

```text
AI 辅助需求
AI 辅助设计
AI 代码评审
AI 测试生成
Prompt 与上下文管理
模型评估
AI 风险评审
```

---

### 5.7 `06-metrics-reserved`

指标层预留目录。

当前阶段先不重点展开量化层，但需要预留位置，避免后续再调整目录结构。

后续可细化为：

```text
质量指标
交付指标
流程指标
安全指标
业务指标
AI 指标
```

---

### 5.8 `07-standard-traceability`

标准追踪目录。

用于维护质量体系与外部标准、模型、参考框架之间的映射关系。

包括：

```text
ISO 9001
CMMI
ISTQB
DORA / DevOps
AI Governance
```

该目录主要服务于：

1. 内部审计
2. 外部认证
3. 客户问询
4. 体系合理性证明
5. 后续标准化演进

---

## 6. 原目录迁移关系

| 原目录 | 新目录 | 说明 |
|---|---|---|
| `00-quality-commitment` | `01-concepts/` | 质量承诺、价值观、原则归入概念层 |
| `01-requirements` | `02-delivery-stages/01-plan-change/` | 需求与变更统一纳入规划与变更环节 |
| `02-solution-design` | `02-delivery-stages/02-design-implement/` | 方案设计、架构设计进入设计与实现环节 |
| `03-development` | `02-delivery-stages/02-design-implement/` + `02-delivery-stages/03-integrate-build/` | 编码、单元测试归入设计实现；构建、集成归入集成构建 |
| `04-quality-assurance` | `02-delivery-stages/04-verify-gate/` | 测试、质量门禁、准入判断归入验证与准入 |
| `05-release` | `02-delivery-stages/05-release-deploy/` | 发布审批、部署、冒烟、回滚归入发布部署 |
| `06-operations` | `02-delivery-stages/06-operate-observe/` | 运维、监控、告警、SLO 归入运行观察 |
| `07-improvement` | `02-delivery-stages/07-feedback-improve/` | 复盘、CAPA、体系更新归入反馈改进 |
| `08-information-security` | `03-cross-cutting/01-security/` | 安全作为横切能力管理 |
| `09-metrics` | `06-metrics-reserved/` | 指标层暂时预留 |
| `10-iso-traceability` | `07-standard-traceability/` | 标准映射统一管理 |

---

## 7. 关键设计决策

### 7.1 不再使用传统阶段作为主目录

传统阶段如下：

```text
requirements
solution-design
development
quality-assurance
release
operations
improvement
```

这套结构适合理解软件工程过程，但不适合作为现代质量体系主干。

原因是：

1. 容易导致开发、测试、运维分段割裂。
2. 不利于持续集成、持续验证和持续交付。
3. 不利于把质量要求转化为流水线质量门禁。
4. 不利于表达运行反馈对需求和规程的反哺。
5. 不利于 AI Coding、MLOps 等新模式扩展。

---

### 7.2 使用 `delivery-stages` 而不是 `devops-stages`

不建议使用：

```text
02-devops-stages/
```

推荐使用：

```text
02-delivery-stages/
```

原因：

1. DevOps 是方法论，不是质量体系唯一边界。
2. 质量体系应该兼容传统软件工程、敏捷、DevOps、AI Coding。
3. `delivery-stages` 更强调端到端价值交付。
4. 未来如果研发方式变化，不需要再次改目录名。
5. 该命名更适合作为公司级质量体系主干目录。

---

### 7.3 单元测试归属开发环节，流水线执行归属验证点

单元测试容易产生争议：它到底属于开发还是测试？

本体系采用如下划分：

```text
单元测试动作 -> 02-design-implement
单元测试验证 -> 04-pipeline-verification
```

也就是说：

```text
02-delivery-stages/02-design-implement/procedures/06-unit-test.md
```

定义：

> 开发人员需要编写和维护单元测试。

而：

```text
04-pipeline-verification/checks/vp-test-quality-gate.md
```

定义：

> 流水线需要执行单元测试，并根据结果判断是否通过质量门禁。

---

### 7.4 集成测试、E2E 测试归属验证准入环节

集成测试、回归测试、E2E 测试虽然可能由开发人员编写，也可能进入代码仓库，但它们的质量体系归属应放在：

```text
02-delivery-stages/04-verify-gate/
```

原因是它们主要承担的是：

```text
版本候选是否可以进入发布
```

而不是单个开发任务是否完成。

---

### 7.5 安全是横切能力，不是单独阶段

安全不是最后检查项，也不是独立尾部阶段。

安全应同时出现在：

```text
01-concepts/                         安全是默认属性
03-cross-cutting/01-security/         安全治理要求
02-delivery-stages/*                  各环节中的安全动作
04-pipeline-verification/checks/      安全门禁验证
```

---

### 7.6 指标层暂时保留，不混入规程层

规程层回答：

```text
必须做什么？
```

指标层回答：

```text
做得怎么样？
```

两者不应混写。

因此当前先保留：

```text
06-metrics-reserved/
```

后续再单独建设量化层。

---

## 8. 目录命名规范

### 8.1 目录命名

目录统一使用英文小写和中划线：

```text
delivery-stages
plan-change
design-implement
pipeline-verification
standard-traceability
```

不建议使用：

```text
DeliveryStages
delivery_stages
交付环节
02-交付环节
```

原因：

1. 对 Git、URL、脚本、CI 更友好。
2. 便于跨平台维护。
3. 便于未来工具读取和自动校验。
4. 避免中文路径在不同系统和脚本中出现兼容性问题。

---

### 8.2 文件命名

文件使用：

```text
序号-英文短名.md
```

例如：

```text
01-requirement-review.md
02-architecture-review.md
03-static-analysis.md
04-e2e-test.md
```

对于特殊模板文件，可以使用固定名称：

```text
README.md
stage-definition.md
procedure-template.md
quality-gate-template.md
```

---

### 8.3 文档标题

文件名使用英文，文档标题可以使用中文。

例如文件：

```text
02-delivery-stages/04-verify-gate/procedures/04-e2e-test.md
```

文档标题：

```md
# E2E 测试规程
```

---

## 9. 环节层文档模板

每个交付环节目录中的 `stage-definition.md` 建议使用以下模板：

```md
# 环节名称

## 1. 环节定位

说明该环节在端到端交付流中的位置。

## 2. 环节目标

说明该环节要解决什么质量问题。

## 3. 进入条件

说明进入该环节前必须满足的条件。

## 4. 退出条件

说明完成该环节的判断标准。

## 5. 必须规程

列出本环节下必须执行的规程。

## 6. 主要证据

列出该环节应产生或保留的证据。

## 7. 责任角色

列出主要参与角色。

## 8. 流水线验证点

列出该环节对应的验证点。

## 9. 横切能力关联

说明与安全、配置管理、追溯、审批、豁免等横切能力的关系。

## 10. 指标预留

说明该环节未来可能关联的指标。
```

---

## 10. 规程层文档模板

每个规程文档建议使用统一模板：

```md
# 规程名称

## 1. 目的

说明该规程为什么存在。

## 2. 适用范围

说明适用于哪些项目、团队、系统或场景。

## 3. 触发条件

说明什么时候必须执行该规程。

## 4. 输入

列出执行该规程前需要具备的输入。

## 5. 必须动作

只说明必须做什么，不绑定具体技术或工具。

## 6. 输出与证据

说明执行后需要留下哪些记录、报告或证据。

## 7. 责任角色

说明谁负责执行，谁负责审核，谁负责批准。

## 8. 流水线验证点

说明该规程是否可以被流水线验证，以及对应的 VP 编码。

## 9. 例外与豁免

说明什么情况下可以豁免，以及豁免需要什么审批和记录。

## 10. 关联文档

列出关联的原则、环节、检查项或标准映射。
```

---

## 11. 流水线验证点建议

建议定义以下验证点：

| 验证点 | 名称 | 说明 |
|---|---|---|
| `VP-REQ` | 变更就绪验证 | 验证需求、变更、风险、验收标准是否就绪 |
| `VP-PR` | 合并准入验证 | 验证 PR/MR 是否满足合并条件 |
| `VP-BLD` | 构建验证 | 验证代码是否可以成功构建并产生制品 |
| `VP-TST` | 测试验证 | 验证测试是否执行并通过 |
| `VP-SEC` | 安全验证 | 验证安全扫描、依赖风险、敏感信息等 |
| `VP-QG` | 质量门禁 | 综合判断版本候选是否达到准入条件 |
| `VP-REL` | 发布审批验证 | 验证发布审批、发布说明、风险记录是否完整 |
| `VP-DEP` | 部署后验证 | 验证部署是否成功、冒烟测试是否通过 |
| `VP-OBS` | 运行观察验证 | 验证上线后运行状态是否稳定 |
| `VP-IMP` | 改进闭环验证 | 验证复盘和改进项是否闭环 |

---

## 12. 推荐实施步骤

### 12.1 第一阶段：目录重构

1. 保留 `quality-system` 目录。
2. 创建新的主目录结构。
3. 将原有文档按迁移关系移动到新目录。
4. 为每个目录补充 `README.md`。
5. 为每个交付环节补充 `stage-definition.md`。

---

### 12.2 第二阶段：规程补齐

1. 按七个交付环节补齐规程。
2. 每个规程只定义“必须动作”，不绑定具体工具。
3. 为每个规程定义输入、输出、证据和责任角色。
4. 标记是否可被流水线验证。

---

### 12.3 第三阶段：流水线验证接入

1. 定义 `verification-points.md`。
2. 定义 `quality-gates.md`。
3. 定义 `evidence-schema.md`。
4. 为 PR、构建、测试、安全、发布建立基础检查。
5. 在 `.github/workflows/quality-system-check.yml` 中验证文档结构和关键字段完整性。

---

### 12.4 第四阶段：AI Coding 扩展

1. 定义 AI 辅助研发质量政策。
2. 定义 Prompt 与上下文管理要求。
3. 定义 AI 生成代码评审要求。
4. 定义 AI 生成测试用例要求。
5. 定义 AI 风险评审和模型评估要求。

---

### 12.5 第五阶段：指标层建设

1. 建立指标分类。
2. 明确指标口径。
3. 明确采集来源。
4. 明确统计周期。
5. 明确改进触发条件。

---

## 13. 最终结论

本次调整建议采用以下总体结构：

```text
quality-system/
  00-overview/
  01-concepts/
  02-delivery-stages/
  03-cross-cutting/
  04-pipeline-verification/
  05-ai-coding-extension/
  06-metrics-reserved/
  07-standard-traceability/
  templates/
```

其中：

```text
01-concepts
```

承载质量价值观、质量原则和治理规则。

```text
02-delivery-stages
```

承载端到端交付主流程，是质量体系核心主干。

```text
02-delivery-stages/*/procedures
```

承载第三层规程动作。

```text
03-cross-cutting
```

承载安全、配置、追溯、审批、豁免等横切治理能力。

```text
04-pipeline-verification
```

承载规程到流水线验证的映射。

```text
05-ai-coding-extension
```

承载 AI Coding 时代的质量扩展。

```text
06-metrics-reserved
```

为后续量化层预留。

```text
07-standard-traceability
```

承载 ISO、CMMI、ISTQB、DORA、AI 治理等标准映射。

最终原则是：

> 用概念层统一思想，用交付环节层组织质量活动，用规程层定义必须动作，用流水线验证层证明动作发生并达到标准，用横切治理层保障安全、追溯和受控，用指标层驱动持续改进。
