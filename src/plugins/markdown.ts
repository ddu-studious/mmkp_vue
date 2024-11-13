import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-toc-done-right'
import taskLists from 'markdown-it-task-lists'
import container from 'markdown-it-container'
import type { PluginWithOptions } from 'markdown-it'

// 创建 Markdown 实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str: string, lang: string): string => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
      } catch (__) {}
    }
    return md.utils.escapeHtml(str)
  }
})

// 配置锚点插件
md.use(anchor as PluginWithOptions, {
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: '#',
  permalinkClass: 'header-anchor',
  level: [2, 3, 4],
  slugify: (s: string) => 
    encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'))
})

// 配置目录插件
md.use(toc, {
  level: [2, 3],
  slugify: (s: string) => 
    encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-')),
  containerClass: 'table-of-contents',
  listType: 'ul'
})

// 配置任务列表插件
md.use(taskLists, {
  enabled: true,
  label: true,
  labelAfter: true
})

// 配置自定义容器
const createContainer = (name: string, defaultTitle: string) => {
  return [
    container,
    name,
    {
      validate: (params: string) => params.trim().match(/^[a-zA-Z]+\s+(.*)$/),
      render: (tokens: any[], idx: number) => {
        const m = tokens[idx].info.trim().match(/^[a-zA-Z]+\s+(.*)$/)
        if (tokens[idx].nesting === 1) {
          const title = m ? m[1] : defaultTitle
          return `<div class="${name} custom-block">\n<p class="custom-block-title">${md.utils.escapeHtml(title)}</p>\n`
        }
        return '</div>\n'
      }
    }
  ] as [PluginWithOptions, string, any]
}

// 添加自定义容器
md.use(...createContainer('tip', '提示'))
md.use(...createContainer('warning', '警告'))
md.use(...createContainer('danger', '危险'))
md.use(...createContainer('info', '信息'))

// 导出渲染函数
export function renderMarkdown(content: string): string {
  return md.render(content)
}

export function renderInline(content: string): string {
  return md.renderInline(content)
}

// 导出 Markdown 实例
export { md } 