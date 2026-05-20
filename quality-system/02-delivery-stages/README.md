# 02 交付环节层 (Delivery Stages)

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
