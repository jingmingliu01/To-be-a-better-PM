# Macro Reports

这个目录用于维护宏观经济定时报告体系。

- `prompts/`: 放月度、季度、年度报告的 automation prompt。
- `create-codex-automations-agent-guide.md`: 给 Codex Agent 的安装说明，用于在复制本目录后创建同样的 automations。
- 生成后的报告文件直接放在 `macro-reports/` 下，不放进 `prompts/`。
- 如需发布到 GitHub Pages，再从这里挑选已经复核过的内容整理到 `docs/`。

## Automation Rules

- 时区：安装时由 Agent 检测系统时区并询问用户确认；如果 automation 外层 prompt 未指定时区，报告 prompt 默认使用 `America/New_York`。
- 模型和 reasoning effort：安装时由 Agent 查询当前 Codex automation 工具和官方 OpenAI/Codex 文档后推荐，并经用户确认。
- 月报：每周五 09:30 检查；仅在每月 22-28 日生成 `YYYY-MM-monthly-economic-pulse-report.md`。
- 季报：每周五 10:30 检查；仅在 1/4/7/10 月 22 日至月末生成对应季度报告。
- 年报：每周五 11:30 检查；仅在每年 3 月 1-15 日生成上一年度报告。
- 如果进入窗口但关键数据尚未发布，仍生成报告，并在报告中明确标注“尚未发布”。
- 每次 automation 只提交新创建的报告文件，并在 commit 成功后 push 当前分支。
