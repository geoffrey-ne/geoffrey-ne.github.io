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
  head: [['link', { rel: 'icon', href: 'https://github.githubassets.com/favicons/favicon.png' }]],
  base: '/',
  dest: 'public',
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    repo: 'https://github.com/geoffrey-ne/',
    repoLabel: 'GitHub',
    nav: [
      { text: '学习笔记', link: '/note/' },
      { text: '算法学习', link: '/algorithm/' },
      { text: 'FE-Interview', link: '/fe-interview/' },
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
                {
                  title: '6. 面向对象的程序设计',
                  path: '/note/javascript/professional-javascript-3/06-OOP',
                },
                {
                  title: '8. BOM',
                  path: '/note/javascript/professional-javascript-3/08-BOM',
                },
                {
                  title: '15. Canvas绘图',
                  path: '/note/javascript/professional-javascript-3/15-Canvas',
                },
                {
                  title: '20. JSON',
                  path: '/note/javascript/professional-javascript-3/20-JSON',
                },
                {
                  title: '21. Ajax与Comet',
                  path: '/note/javascript/professional-javascript-3/21-Ajax-Comet',
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
        {
          title: 'CS',
          path: '/note/cs/http/qwzn-1',
          collapsable: true,
          sidebarDepth: 2,
          children: [
            {
              title: 'HTTP',
              path: '/note/cs/http/qwzn-1',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                {
                  title: 'http权威指南：第一部分 Web的基础',
                  path: '/note/cs/http/qwzn-1',
                },
                {
                  title: 'http权威指南：第二部分 HTTP结构',
                  path: '/note/cs/http/qwzn-2',
                },
              ],
            },
            {
              title: 'web 缓存',
              path: '/note/cs/web-cache',
            },
            {
              title: 'linux常用指令',
              path: '/note/cs/linux',
            },
          ],
        },
      ],
      '/algorithm/': [
        {
          title: '排序算法 js 实现',
          path: '/algorithm/sort',
        },
      ],
      '/fe-interview/': [
        {
          title: '计算机基础',
          path: '/fe-interview/cs/',
          collapsable: true,
          sidebarDepth: 2,
          children: [
            {
              title: '操作系统',
              path: '/fe-interview/cs/os',
            },
            {
              title: '计算机网络',
              path: '/fe-interview/cs/network',
            },
          ],
        },
        {
          title: 'web浏览器',
          path: '/fe-interview/browser',
        },
        {
          title: 'js手写代码',
          path: '/fe-interview/javascript-coding',
        },
        {
          title: 'snap 及 一些 js 细节',
          path: '/fe-interview/javascript-snap',
        },
        {
          title: 'vue',
          path: '/fe-interview/vue/',
          collapsable: true,
          sidebarDepth: 2,
          children: [
            {
              title: 'vue',
              path: '/fe-interview/vue/vue',
            },
            {
              title: 'vue-router',
              path: '/fe-interview/vue/vue-router',
            },
            {
              title: 'vuex',
              path: '/fe-interview/vue/vuex',
            },
            {
              title: 'vue-ssr',
              path: '/fe-interview/vue/vue-ssr',
            },
          ],
        },
      ],
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@images': path.join(__dirname, '/images'),
      },
    },
  },
}
