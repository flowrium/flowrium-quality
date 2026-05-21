#  交付环节层 (Delivery Stages)

02-delivery-stages 是软件质量管理体系的第二层，表示端到端交付过程中的关键质量控制环节。

本层不直接采用传统的“需求、设计、开发、测试、发布、运维”阶段命名，而是采用更适合现代研发模式的交付环节划分：

- 01-plan-change（规划与变更）
- 02-design-implement（设计与实现）
- 03-integrate-build（集成与构建）
- 04-verify-gate（验证与准入）
- 05-release-deploy（发布与部署）
- 06-operate-observe（运行与观察）
- 07-feedback-improve（反馈与改进）

这 7 个环节覆盖软件从需求进入、设计实现、集成构建、验证准入、发布部署、运行观察到反馈改进的完整闭环。

它吸收 DevOps 的持续集成、持续验证、持续交付和运行反馈思想，但不把体系命名为 DevOps 体系，以便兼容传统软件工程、敏捷研发、AI Coding 和未来的 AI 原生研发模式。

## 索引

从本页可快速跳转到每个交付环节的定义与规程：

| 环节 | 说明 | 环节 README | 环节定义 | 规程（procedures/） |
| --- | --- | --- | --- | --- |
| `01-plan-change` | 规划与变更 | [README](./01-plan-change/README.md) | [stage-definition](./01-plan-change/stage-definition.md) | [requirement-writing-procedure](./01-plan-change/procedures/requirement-writing-procedure.md) |
| `02-design-implement` | 设计与实现 | [README](./02-design-implement/README.md) | [stage-definition](./02-design-implement/stage-definition.md) | [unit-test-procedure](./02-design-implement/procedures/unit-test-procedure.md) |
| `03-integrate-build` | 集成与构建 | [README](./03-integrate-build/README.md) | [stage-definition](./03-integrate-build/stage-definition.md) | [static-analysis-procedure](./03-integrate-build/procedures/static-analysis-procedure.md) |
| `04-verify-gate` | 验证与准入 | [README](./04-verify-gate/README.md) | [stage-definition](./04-verify-gate/stage-definition.md) | [test-strategy](./04-verify-gate/procedures/test-strategy.md), [integration-test-procedure](./04-verify-gate/procedures/integration-test-procedure.md), [e2e-test-procedure](./04-verify-gate/procedures/e2e-test-procedure.md), [performance-test-procedure](./04-verify-gate/procedures/performance-test-procedure.md), [security-test-procedure](./04-verify-gate/procedures/security-test-procedure.md) |
| `05-release-deploy` | 发布与部署 | [README](./05-release-deploy/README.md) | [stage-definition](./05-release-deploy/stage-definition.md) | [release-procedure](./05-release-deploy/procedures/release-procedure.md) |
| `06-operate-observe` | 运行与观察 | [README](./06-operate-observe/README.md) | [stage-definition](./06-operate-observe/stage-definition.md) | [monitoring-alert-standard](./06-operate-observe/procedures/monitoring-alert-standard.md), [incident-response-procedure](./06-operate-observe/procedures/incident-response-procedure.md), [backup-recovery-standard](./06-operate-observe/procedures/backup-recovery-standard.md) |
| `07-feedback-improve` | 反馈与改进 | [README](./07-feedback-improve/README.md) | [stage-definition](./07-feedback-improve/stage-definition.md) | [postmortem-procedure](./07-feedback-improve/procedures/postmortem-procedure.md), [internal-audit-procedure](./07-feedback-improve/procedures/internal-audit-procedure.md), [management-review-procedure](./07-feedback-improve/procedures/management-review-procedure.md) |

## 简版一句话解释

| 环节 | 一句话解释 |
| --- | --- |
| 01-plan-change | 保证进入研发的事情是清楚、可测、受控的 |
| 02-design-implement | 保证方案和代码在构建过程中内建质量 |
| 03-integrate-build | 保证代码可以安全集成并生成可追溯制品 |
| 04-verify-gate | 保证版本候选经过验证并满足发布准入 |
| 05-release-deploy | 保证版本以受控方式发布、部署和回滚 |
| 06-operate-observe | 保证上线后系统状态可观测、问题可响应 |
| 07-feedback-improve | 保证问题、数据和经验可以反哺体系改进 |

## 7 个环节的整体关系

可以这样理解：

```text
Plan & Change
  ↓
Design & Implement
  ↓
Integrate & Build
  ↓
Verify & Gate
  ↓
Release & Deploy
  ↓
Operate & Observe
  ↓
Feedback & Improve
  ↺ 回流到 Plan & Change
```

也就是：
规划变更 → 设计实现 → 集成构建 → 验证准入 → 发布部署 → 运行观察 → 反馈改进 → 新一轮规划变更

它不是一次性瀑布流程，而是持续循环的质量闭环。

## 与三层结构的关系

- **01-concepts/**：定义为什么要这样做。
- **02-delivery-stages/**：定义软件交付过程分成哪些质量环节。
- **02-delivery-stages/*/stage-definition.md**：定义每个环节是什么、边界在哪里、进入退出条件是什么。
- **02-delivery-stages/*/procedures/**：定义每个环节必须做哪些动作。
- **04-pipeline-verification/**：定义哪些动作可以通过流水线验证。


## 七个环节的划分逻辑

### `01-plan-change`：规划与变更

软件质量从需求和变更进入时开始。

如果需求不清楚、验收标准不明确、风险未识别，后续设计、开发、测试和发布都会产生偏差。

因此，需要单独设置“规划与变更”环节，用于保证进入研发的事项是清晰、可测、可追溯、风险可控的。

### `02-design-implement`：设计与实现

质量不是最后测试出来的，而是在设计和实现过程中内建出来的。

因此，需要将方案设计、架构评审、任务拆解、代码实现、代码评审、单元测试等活动放在同一个环节中，强调开发过程中的内建质量。

### `03-integrate-build`：集成与构建

现代软件交付依赖持续集成和可追溯制品。

代码写完不代表可以交付，必须经过合并准入、持续集成、静态分析、构建打包和制品归档，才能形成稳定的版本候选基础。

因此，需要单独设置“集成与构建”环节。

### `04-verify-gate`：验证与准入

测试不是孤立阶段，而是版本候选进入发布前的质量准入判断。

本环节用于执行集成测试、回归测试、E2E 测试、非功能测试、安全验证、缺陷分级和质量门禁判断。

因此，该环节命名为“验证与准入”，而不是简单命名为“测试”。

### `05-release-deploy`：发布与部署

通过测试不等于可以安全上线。

发布需要审批、发布说明、部署执行、冒烟验证、回滚准备和发布归档。

因此，需要单独设置“发布与部署”环节，用于保证变更以受控方式进入目标环境。

### `06-operate-observe`：运行与观察

软件上线不是质量活动的结束。

系统在真实环境中的运行状态、稳定性、告警、SLO、用户影响和事件响应，都是质量的重要组成部分。

因此，需要设置“运行与观察”环节，将运行中质量纳入质量体系。

### `07-feedback-improve`：反馈与改进

质量体系不能停留在静态文档。

缺陷、事故、用户反馈、运行指标和复盘结果需要反哺需求、规程、模板、检查项和质量门禁。

因此，需要设置“反馈与改进”环节，让质量体系形成自演进闭环。

## 与传统软件工程阶段的关系

本体系没有否定传统软件工程阶段，而是对传统阶段进行了面向现代交付的重组。

| 传统阶段 | 本体系对应环节 |
|---|---|
| 需求 | `01-plan-change` |
| 设计 | `02-design-implement` |
| 开发 | `02-design-implement` + `03-integrate-build` |
| 测试 | `04-verify-gate` |
| 发布 | `05-release-deploy` |
| 运维 | `06-operate-observe` |
| 改进 | `07-feedback-improve` |

这种划分能够保留传统软件工程的可理解性，同时更适合持续集成、持续验证、持续交付和运行反馈。

## 与 DevOps 的关系

本体系吸收 DevOps 的思想，但不直接使用 DevOps 作为目录名称。

原因是：

1. DevOps 是一种方法论和协作模式，不是质量体系的唯一边界。
2. 公司级质量体系需要兼容不同成熟度、不同技术栈、不同交付模式的项目。
3. `delivery-stages` 更强调端到端价值交付，适合作为长期稳定的质量体系主干。
4. DevOps 的持续集成、持续交付、运行反馈思想已经体现在本体系的七个交付环节中。

对应关系如下：

| DevOps 思想 | 本体系体现 |
|---|---|
| Plan | `01-plan-change` |
| Code | `02-design-implement` |
| Build | `03-integrate-build` |
| Test | `04-verify-gate` |
| Release / Deploy | `05-release-deploy` |
| Operate / Monitor | `06-operate-observe` |
| Feedback / Improve | `07-feedback-improve` |

## 与流水线验证的关系

七个交付环节不仅用于组织文档，也用于承接流水线验证。

质量体系中需要区分：

```text
交付环节 = 质量活动发生在哪里
规程动作 = 每个环节必须做什么
流水线验证 = 如何证明动作已经发生并满足要求
```
