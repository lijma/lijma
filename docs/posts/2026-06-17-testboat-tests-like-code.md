---
title: "AI 把开发变快以后，测试不能继续靠 Excel 硬扛"
date: 2026-06-17
author: Marvin
categories:
  - AI工程
  - 测试工程
  - 开发者工具
tags:
  - testboat
  - AI Agent
  - QA
  - 测试管理
  - 发布治理
---

太长不读：

AI 正在把开发速度拉高，但很多团队的测试管理还停在 Excel、会议纪要和口头确认。

结果就是：开发越来越快，测试越来越像最后一道人工防线，QA 背锅，Tech Lead 心里没底，老板只听到一句“应该测过了”。

testboat 想解决的不是“让 AI 多写几条测试用例”，而是让测试策略、用例、执行、缺陷、报告和版本进入同一套可追溯的工程系统。

<!-- more -->

---

## 最危险的不是没测试，而是不知道测没测

我见过很多团队，上线前最常见的一句话不是“没测”。

而是：

> 这个应该测过了吧？

这句话很可怕。

因为它听起来像一个确认，实际上是一个猜测。

QA 说测过，是因为他记得上周点过一遍。

开发说应该没问题，是因为这次只改了一个“小逻辑”。

Tech Lead 说风险不大，是因为相关模块以前很稳定。

老板问能不能发版，大家沉默两秒，然后有人说：

> 要不再跑一遍主流程？

这不是某个人不专业。

这是测试资产没有进入工程系统导致的必然结果。

需求在需求文档里。

用例在 Excel 里。

自动化脚本在仓库某个角落。

执行结果在群消息里。

缺陷在 issue 系统里。

测试报告是上线前手写出来的。

每个东西都存在，但它们彼此之间没有稳定连接。

所以到了关键时刻，没人能用十秒钟回答：

- 哪些需求没有测试覆盖？
- 哪些用例准备好了但没执行？
- 哪些失败用例已经复测通过？
- 当前还有多少 P0/P1 缺陷没关闭？
- 这次发布是否满足 exit criteria？

testboat 要解决的，就是这些现实问题。

## AI 让这个问题更急了

以前开发慢，测试流程粗一点，大家还能靠会议、记忆和加班补上。

现在不一样了。

AI agent 加进开发流程以后，产品迭代速度明显变快：

- 一个需求拆得更快
- 代码生成更快
- 修 bug 更快
- 页面和接口改得更频繁

听起来都是好事。

但质量体系如果没跟上，开发速度越快，测试压力越大。

QA 会变成最后的人工缓冲区。

Tech Lead 会变成风险解释器。

老板会变成不确定性的买单人。

这也是我为什么不满足于“AI 帮我生成测试用例”。

生成用例只是中间一小段。

真正的痛点是：当 AI 每天帮你改十几个地方时，你的测试系统能不能跟上变化？

一个 bug 修了，哪些 case 要回归？

一个模块改了，哪些用例受影响？

一个 case 失败了，缺陷有没有关联到执行结果？

一个缺陷修复了，是否经历了 pending retest 和 verified？

这些问题靠聊天记录解决不了。

它们需要被结构化。

## 对 QA 来说：别再当“人工记忆库”

QA 最痛的地方，往往不是写用例。

而是一直在替系统记东西。

这个需求测过没有？

这个缺陷当时怎么复现？

这个失败是环境问题还是产品问题？

上次自动化跑失败后，人工有没有复核？

哪个版本开始出现这个问题？

这些信息如果只存在 QA 的脑子里，团队越依赖 QA，风险越大。

testboat 的做法是把这些信息落到文件系统里。

比如一个测试用例不只是标题，而是 `TC-001.yaml`：

```yaml
id: TC-001
title: Login with wrong password returns 401
status: ready
priority: P1
automation: to-automate
tags:
  sprint: v1.0
  type: functional
  module: auth
req_id: STORY-001
preconditions: []
steps:
  - action: Enter wrong password
    expected: API returns 401
expected_result: User sees a clear error message
```

它能被 Git diff。

能被 code review。

能被 AI 读取。

能被 CLI 校验。

更重要的是，它不是一行静态记录，而是有状态的：

```text
draft -> ready -> pass / fail / blocked / skipped
```

这对 QA 很重要。

因为 QA 终于不用只靠口头说“这个 case 还没准备好”“这个 case 上次失败了”“这个 case 需要重跑”。

状态本身就写在资产里。

QA 的工作从“到处补信息”变成“维护一套可信的测试事实”。

这才是专业性。

## 对 Tech Lead 来说：质量不能只靠 code review

Tech Lead 关心的不是每条测试步骤怎么写。

Tech Lead 关心的是工程系统有没有质量闭环。

现实中很多团队的质量门禁长这样：

```text
PR review 过了
CI 绿了
QA 说主流程没问题
上线
```

听起来合理。

但这里缺了几件事。

CI 绿了，不代表需求被覆盖。

自动化过了，不代表手工探索发现的 bug 已经闭环。

QA 说主流程没问题，不代表 exit criteria 满足。

testboat 里我最看重的是 `validate`。

它不是格式检查那么简单。

它在报告前做四道 gate：

1. Format validation：策略和用例结构是否有效
2. Requirements coverage：用例是否关联 `req_id`
3. Execution completeness：非 draft 用例是否有执行记录
4. Exit criteria：缺陷和通过率是否满足策略要求

这对 Tech Lead 来说，是一个可以接进工程流程的质量门。

比如团队可以约定：

```bash
testboat validate
```

不过，就不能生成 closure report。

或者更进一步，在发布分支上把它接进 CI。

这样质量不再只是“大家感觉差不多了”。

它变成一个可以失败的工程检查。

能失败的流程，才有改进空间。

## 对老板来说：你真正买的是确定性

老板未必关心 `TC-001.yaml` 长什么样。

老板关心的是：

- 这个版本能不能发？
- 发了会不会出大事故？
- 如果出事，团队能不能快速定位？
- 为什么测试花这么多时间？
- AI 提效以后，质量风险有没有同步下降？

很多时候，老板听到的是情绪化汇报：

> 这个版本风险不大。

> 主要流程都测了。

> 还有几个小问题，不影响上线。

这些话不是没价值。

但它们缺少证据链。

testboat 试图把“风险不大”变成可检查的报告：

- 多少用例
- 多少通过
- 多少失败
- 多少没执行
- 多少开放缺陷
- P0/P1 是否为 0
- exit criteria 是否满足
- 哪些需求有覆盖，哪些没有

最后生成 strategy / sprint / closure 三类 HTML 报告。

报告不是靠人临时写一份漂亮总结。

报告从 `.testboat/` 里的测试资产生成。

这对管理者很重要。

因为企业里真正贵的不是“多写几个测试”。

真正贵的是发布决策的不确定性。

如果每次发版都靠几个核心同事的经验兜底，那团队规模一上来，风险一定爆。

你需要的不是更多会议。

你需要的是一套能留下证据、能复盘、能追溯的质量系统。

## testboat 的核心不是 YAML，而是连接

我之前写浅了，容易让人以为 testboat 只是“把测试用 YAML 管起来”。

这不准确。

YAML 只是载体。

testboat 真正做的是把测试生命周期里断掉的连接补回来。

需求和用例通过 `req_id` 连接。

用例和执行计划通过 `TC-001-plan.yaml` 连接。

执行计划和自动化脚本通过 `automation_path` 连接。

执行结果和用例通过 `RES-001.yaml` 连接。

最新执行状态通过 `execution-matrix.yaml` 汇总。

缺陷可以关联 `tc_id` 和 `result_id`。

策略里的 severity rule 和 exit criteria 会在 `validate` 阶段参与判断。

版本通过 `.active` 和 named version 管理。

这些连接合起来，才让测试从“资料堆”变成“系统”。

## 一个真实场景：登录模块改了

假设今天 AI agent 帮你改了登录模块。

在没有 testboat 的团队里，流程可能是：

> “登录改了，麻烦 QA 回归一下。”

QA 问：

> “回归哪些？”

开发说：

> “登录相关都看一下吧。”

这句话非常真实，也非常昂贵。

因为“相关”是模糊的。

有 testboat 以后，至少可以把这个问题变得具体。

先看 module：

```bash
testboat case list --module auth
```

再看执行计划：

```bash
testboat plan list --status approved
```

对有自动化脚本的 case，AI 可以读取 plan 里的 automation path 去执行。

执行后记录结果：

```bash
testboat result record TC-001 pass --type automated --by "AI"
```

如果失败，创建缺陷：

```bash
testboat bug add \
  --title "Wrong password returns 500 instead of 401" \
  --tc TC-001 \
  --severity major \
  --priority P1
```

修复后，这个 bug 不能直接 closed。

它应该走：

```text
fixed -> pending-retest -> verified -> closed
```

这才叫回归闭环。

不是“我觉得修好了”。

而是“这个缺陷对应的用例重新执行并通过了”。

## AI agent 在这里扮演什么角色？

如果把 testboat 只当 CLI，用起来也可以。

但它真正适合 AI 时代，是因为它给 agent 提供了 SOP。

运行：

```bash
testboat enable claude
testboat enable copilot
testboat enable cursor
testboat enable kiro
```

会生成对应 agent 能识别的规则文件和 skill 文件。

这样 AI 不再是靠你每次提醒：

> 记得更新测试用例。

而是进入一套固定工作流：

1. 先检查 active version
2. 读 strategy
3. 查 tag registry
4. 创建或更新 TC
5. 校验 case
6. 创建 execution plan
7. 执行自动化或引导人工验证
8. 记录 result
9. 失败则建 bug
10. bug 修复后强制回归
11. validate 通过后生成报告

AI 最擅长做重复、结构化、跨文件的工作。

但前提是你给它一条轨道。

testboat 就是这条轨道。

## 为什么这事现在值得做？

因为 AI 正在改变软件交付节奏。

以前一周做一个需求，现在可能一天就能做完原型。

以前两个开发改一个模块，现在一个人带三个 agent 同时推进。

以前测试可以靠“经验覆盖”，现在变化速度已经超过人脑记忆的上限。

如果测试系统不升级，团队会出现一个很尴尬的局面：

开发效率被 AI 放大。

质量风险也被 AI 放大。

老板以为自己买到了更快的交付。

实际上只是把风险更快地推到了上线前。

所以 testboat 不是为了让测试流程变得更复杂。

恰恰相反，它是为了让复杂现实有一个可执行的骨架。

QA 不用靠记忆兜底。

Tech Lead 可以把质量 gate 接进工程流。

老板能看到可追溯的发布证据。

AI agent 也不再是到处乱写，而是按测试生命周期推进。

## 最后

我越来越觉得，AI 时代的工程工具不能只追求“更快生成”。

更快生成只是第一阶段。

第二阶段一定是：

> 如何让 AI 生成的东西进入团队原有的责任体系、质量体系和决策体系？

testboat 的答案是：把测试生命周期变成一套文件化、状态化、可验证、可报告、可版本化的系统。

它不是替代 QA。

它是帮 QA 从人肉记忆库变成质量系统的维护者。

它不是替代 Tech Lead。

它是给 Tech Lead 一个可以落地的质量门禁。

它也不是给老板看的又一张仪表盘。

它是让发布决策从“大家感觉可以”变成“证据显示可以”。

项目地址：

[https://github.com/lijma/testboat](https://github.com/lijma/testboat)

文档：

[https://lijma.github.io/testboat/](https://lijma.github.io/testboat/)
