# Create Codex Automations Agent Guide

这是一份写给 Codex Agent 的安装说明，用于在复制了本目录的仓库中创建同样的宏观经济报告 automations。

用户可以对 Agent 说：

```text
请读取 macro-reports/create-codex-automations-agent-guide.md，并按里面的说明在当前 repo 创建 Codex Automations。
```

## Agent 任务

在当前仓库中创建或更新 3 个 Codex cron automations，用于定期检查并生成宏观经济月报、季报和年报。

不要把本文档当成报告生成 prompt。真正的报告生成规则在：

- `macro-reports/prompts/monthly-economic-pulse-report-prompt.md`
- `macro-reports/prompts/quarterly-deep-macro-report-prompt.md`
- `macro-reports/prompts/annual-strategic-economic-report-prompt.md`

## 安装协议

### 1. 前置检查

1. 确认当前工作目录是用户希望运行 automations 的 repo root。
2. 确认上述 3 个 prompt 文件都存在。
3. 使用 Codex app 的 automation 工具创建或更新 automations。不要手工编辑 automation 配置文件。
4. 如果同名或同 id automation 已经存在，优先更新现有 automation，不要创建重复项。

### 2. 时区确认

Agent 应先尝试检测当前系统时区，然后询问用户是否使用该时区。

推荐检测方式：

- macOS: `systemsetup -gettimezone`
- Linux: `timedatectl show -p Timezone --value`
- 通用兜底: `date +%Z` 和 `date +%z`

如果只能拿到缩写或 UTC offset，例如 `EDT` 或 `-0400`，不要直接把它当成 IANA 时区。请让用户确认一个 IANA 时区，例如 `America/New_York`、`Asia/Shanghai`、`Europe/London`。

向用户确认时使用类似问题：

```text
我检测到当前系统时区可能是 <DETECTED_TIMEZONE>。是否使用这个时区创建 automations？如果不是，请指定一个 IANA 时区，例如 Asia/Shanghai。
```

后续创建 automation 时，把用户确认的时区作为 `<TIMEZONE>`，并在每个 automation prompt 中明确写入：`Use <TIMEZONE> as the automation timezone.`

### 3. 模型和 reasoning effort 确认

不要在安装时硬编码某个历史模型。

Agent 应按以下顺序选择模型：

1. 检查当前 Codex automation 工具实际支持的模型和 reasoning effort。
2. 如果用户没有指定模型，查询当前官方 OpenAI/Codex 文档，确认面向 Codex 复杂知识工作和研究任务的推荐模型。
3. 在官方推荐和当前 automation 工具可用模型之间取交集，选择当前可创建的最高能力模型。
4. reasoning effort 选择当前 automation 工具支持的最高档。
5. 如果官方文档里的最新模型无法被当前 automation 工具创建，以当前工具实际支持的模型为准，并向用户说明。
6. 如果官方文档暂时不可用，不要猜测最新模型；使用当前 automation 工具可用的最高能力模型，并在确认问题中说明“未能实时验证官方推荐模型”。

向用户确认时使用类似问题：

```text
我当前准备使用的配置是 model: <MODEL>，reasoning effort: <REASONING_EFFORT>，时区: <TIMEZONE>。是否用这个配置创建 3 个 automations？
```

只有用户确认后再创建或更新 automations。

### 4. 通用配置

- 类型：cron automation
- 执行环境：local
- 工作目录：当前 repo root
- 状态：ACTIVE，除非用户要求先创建为 PAUSED
- 模型：使用用户确认的 `<MODEL>`
- reasoning effort：使用用户确认的 `<REASONING_EFFORT>`
- 时区：使用用户确认的 `<TIMEZONE>`

## Automations

### 1. Monthly Economic Pulse Report

- 名称：`Monthly Economic Pulse Report`
- 建议 id：`monthly-economic-pulse-report`
- 运行频率：每周五 09:30，按 `<TIMEZONE>` 理解
- Prompt，创建时把 `<TIMEZONE>` 替换成用户确认的 IANA 时区：

```text
Use <TIMEZONE> as the automation timezone. Execute the monthly macro report automation by reading and following `macro-reports/prompts/monthly-economic-pulse-report-prompt.md` exactly. It contains the run-window, dedupe, report-generation, file-writing, commit, and push rules. If the prompt says to generate a report, produce the complete sourced Chinese Markdown report, write it to the specified file, commit only that new report file, and push. If the prompt says not to generate because the window is closed or the target file already exists, make no file changes, no commit, and no push.
```

### 2. Quarterly Deep Macro Report

- 名称：`Quarterly Deep Macro Report`
- 建议 id：`quarterly-deep-macro-report`
- 运行频率：每周五 10:30，按 `<TIMEZONE>` 理解
- Prompt，创建时把 `<TIMEZONE>` 替换成用户确认的 IANA 时区：

```text
Use <TIMEZONE> as the automation timezone. Execute the quarterly macro report automation by reading and following `macro-reports/prompts/quarterly-deep-macro-report-prompt.md` exactly. It contains the run-window, target-quarter, dedupe, report-generation, file-writing, commit, and push rules. If the prompt says to generate a report, produce the complete sourced Chinese Markdown report, write it to the specified file, commit only that new report file, and push. If the prompt says not to generate because the window is closed or the target file already exists, make no file changes, no commit, and no push.
```

### 3. Annual Strategic Economic Report

- 名称：`Annual Strategic Economic Report`
- 建议 id：`annual-strategic-economic-report`
- 运行频率：每周五 11:30，按 `<TIMEZONE>` 理解
- Prompt，创建时把 `<TIMEZONE>` 替换成用户确认的 IANA 时区：

```text
Use <TIMEZONE> as the automation timezone. Execute the annual macro report automation by reading and following `macro-reports/prompts/annual-strategic-economic-report-prompt.md` exactly. It contains the run-window, target-year, dedupe, report-generation, file-writing, commit, and push rules. If the prompt says to generate a report, produce the complete sourced Chinese Markdown report, write it to the specified file, commit only that new report file, and push. If the prompt says not to generate because the window is closed or the target file already exists, make no file changes, no commit, and no push.
```

## 创建后校验

创建或更新后，查看 3 个 automations，确认：

- 都是 ACTIVE，除非用户要求 PAUSED。
- 都使用用户确认的 model。
- 都使用用户确认的 reasoning effort。
- 工作目录都是当前 repo root。
- 三个 automation 的运行时间分别是周五 09:30、10:30、11:30，并按用户确认的时区解释。
- prompt 指向的是当前 repo 内的 `macro-reports/prompts/` 文件。

最后向用户简短报告创建或更新结果、automation id、时区、模型和 reasoning effort。
