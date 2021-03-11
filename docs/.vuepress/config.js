const path = require('path')
const webpack = require('webpack')
// const sidebarConfig = require('./sidebar-config')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  // baseConfig
  title: "Geoffrey's blog",
  description: "Geoffrey's blog",
  base: '/',
  dest: 'public',
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    repo: 'https://github.com/geoffrey-ne/geoffrey-ne.github.io/',
    repoLabel: 'GitHub',
    nav: [
      { text: '面试', link: '/interview/' },
      { text: '学习笔记', link: '/note/' },
    ],
    lastUpdated: '最后更新于',
    sidebarDepth: 2,
    sidebar: {
      '/note/': [
        {
          title: 'JavaScript',
          path: '/note/javascript/professional-javascript-3/04-var-scope-memory',
          collapsable: true,
          sidebarDepth: 2,
          children: [
            {
              title: 'Javascript高级程序设计（第三版）',
              path: '/note/javascript/professional-javascript-3/04-var-scope-memory',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                {
                  title: '4. 变量、作用域和内存问题',
                  path: '/note/javascript/professional-javascript-3/04-var-scope-memory',
                },
                {
                  title: '5. 引用类型',
                  path: '/note/javascript/professional-javascript-3/05-object',
                },
              ],
            },
            {
              title: '33个js概念（翻译）',
              path: '/note/javascript/33-js-expression-statement/expression-statement-1',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                {
                  title: '表达式和语句（1）',
                  path: '/note/javascript/33-js-expression-statement/expression-statement-1',
                },
                {
                  title: '表达式和语句（2）',
                  path: '/note/javascript/33-js-expression-statement/expression-statement-2',
                },
                {
                  title: '值类型 vs 引用类型（1）',
                  path: '/note/javascript/33-js-expression-statement/value-vs-reference-1.md',
                },
              ],
            },
          ],
        },
        {
          title: 'Typescript',
          path: '/note/typescript/01-base',
          collapsable: true,
          sidebarDepth: 2,
          children: [
            {
              title: '1. 基础',
              path: '/note/typescript/01-base',
            },
            {
              title: '2. 声明文件',
              path: '/note/typescript/02-declare-file',
            },
            {
              title: '3. 进阶',
              path: '/note/typescript/03-advance',
            },
          ],
        },
      ],
    },
  },
}
