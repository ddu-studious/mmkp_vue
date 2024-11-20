<template>
  <div class="git-guide-page">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <h1 class="text-3xl font-bold text-center mb-8 text-gray-900">
        Git 常用命令指南
      </h1>

      <div class="space-y-8">
        <!-- 基础命令部分 -->
        <section class="command-section">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">基础配置与初始化</h2>
          <div class="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <div v-for="(command, index) in basicCommands" :key="index" class="command-item">
              <div class="flex items-start">
                <code class="bg-gray-100 px-3 py-1 rounded text-sm font-mono">{{ command.command }}</code>
                <span class="ml-4 text-gray-600">{{ command.description }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 日常工作流程 -->
        <section class="command-section">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">日常工作流程</h2>
          <div class="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <div v-for="(command, index) in workflowCommands" :key="index" class="command-item">
              <div class="flex items-start">
                <code class="bg-gray-100 px-3 py-1 rounded text-sm font-mono">{{ command.command }}</code>
                <span class="ml-4 text-gray-600">{{ command.description }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 分支操作 -->
        <section class="command-section">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">分支操作</h2>
          <div class="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <div v-for="(command, index) in branchCommands" :key="index" class="command-item">
              <div class="flex items-start">
                <code class="bg-gray-100 px-3 py-1 rounded text-sm font-mono">{{ command.command }}</code>
                <span class="ml-4 text-gray-600">{{ command.description }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 最佳实践提示 -->
        <section class="command-section">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">最佳实践提示</h2>
          <div class="bg-white rounded-lg shadow-sm p-6">
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li v-for="(tip, index) in bestPractices" :key="index">
                {{ tip }}
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const basicCommands = [
  {
    command: 'git config --global user.name "你的名字"',
    description: '设置全局用户名'
  },
  {
    command: 'git config --global user.email "你的邮箱"',
    description: '设置全局邮箱'
  },
  {
    command: 'git init',
    description: '初始化一个新的 Git 仓库'
  },
  {
    command: 'git clone <远程仓库地址>',
    description: '克隆远程仓库到本地'
  }
]

const workflowCommands = [
  {
    command: 'git status',
    description: '查看工作区状态'
  },
  {
    command: 'git add .',
    description: '添加所有改动到暂存区'
  },
  {
    command: 'git commit -m "提交信息"',
    description: '提交暂存区到本地仓库'
  },
  {
    command: 'git push',
    description: '推送到远程仓库'
  },
  {
    command: 'git pull',
    description: '拉取远程仓库最新代码'
  }
]

const branchCommands = [
  {
    command: 'git checkout -b feature/new-branch',
    description: '创建并切换到新分支'
  },
  {
    command: 'git push -u origin feature/new-branch',
    description: '推送新分支到远程并建立关联'
  },
  {
    command: 'git checkout -b local_branch origin/remote_branch',
    description: '拉取远程分支并在本地创建同名分支'
  },
  {
    command: 'git branch --set-upstream-to=origin/remote_branch local_branch',
    description: '建立本地分支与远程分支的关联'
  }
]

const bestPractices = [
  '经常使用 git status 查看当前状态',
  '养成小步提交的习惯，每个提交都应该是完整的功能或修复',
  '提交信息要清晰明了，建议使用约定式提交规范',
  '重要操作前先确保代码已提交',
  '定期推送到远程备份，避免代码丢失',
  '分支命名要有意义，建议使用 feature/、fix/、hotfix/ 等前缀'
]
</script>

<style scoped>
.git-guide-page {
  @apply min-h-screen bg-gray-50;
}

.command-item {
  @apply hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors;
}

.command-item code {
  @apply min-w-[280px] inline-block;
}
</style> 