(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{429:function(t,s,e){"use strict";e.r(s);var a=e(45),n=Object(a.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"typescript-学习"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#typescript-学习"}},[t._v("#")]),t._v(" typescript 学习")]),t._v(" "),e("p",[t._v("核心作用：")]),t._v(" "),e("ul",[e("li",[t._v("静态类型系统：js 本身具有的类型，比如："),e("code",[t._v("string")]),t._v("、"),e("code",[t._v("string[]")]),t._v("等；使用"),e("code",[t._v("interface")]),t._v("自定义的复杂类型")])]),t._v(" "),e("h2",{attrs:{id:"基本语法"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#基本语法"}},[t._v("#")]),t._v(" 基本语法")]),t._v(" "),e("p",[t._v("类型注解方式："),e("code",[t._v(":TypeAnnotation")])]),t._v(" "),e("div",{staticClass:"language-typescript line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-typescript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" num"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("123")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br")])]),e("p",[t._v("都有哪些类型：")]),t._v(" "),e("p",[t._v("基础类型：")]),t._v(" "),e("ul",[e("li",[t._v("原始类型："),e("code",[t._v("string")]),t._v("、"),e("code",[t._v("number")]),t._v("、"),e("code",[t._v("boolean")]),t._v("；")]),t._v(" "),e("li",[t._v("数组："),e("code",[t._v("string[]")]),t._v("；")]),t._v(" "),e("li",[t._v("接口："),e("code",[t._v("interface Name { first: string; second: string }")]),t._v("；可以使用内联语法注释内容："),e("code",[t._v(":{ /*Structure*/ }")])]),t._v(" "),e("li",[t._v("特殊类型：\n"),e("ul",[e("li",[e("code",[t._v("any")]),t._v("：能够兼容所有类型，包括 "),e("code",[t._v("any")]),t._v(" 本身，它会关闭 ts 检查，慎用；")]),t._v(" "),e("li",[e("code",[t._v("null")]),t._v("和"),e("code",[t._v("undefined")]),t._v("："),e("code",[t._v("null")]),t._v("和"),e("code",[t._v("undefined")]),t._v("字面量可以赋值给任意类型变量；")]),t._v(" "),e("li",[e("code",[t._v("void")]),t._v("：仅用来表示函数没有返回值。")])])])]),t._v(" "),e("p",[t._v("复合类型：")]),t._v(" "),e("ul",[e("li",[t._v("联合类型："),e("code",[t._v("|")]),t._v("标记属性为多种类型之一，例如："),e("code",[t._v("const strOrNum: string | number")]),t._v("；")]),t._v(" "),e("li",[t._v("交叉类型："),e("code",[t._v("&")]),t._v("标记属性具有两种类型的所有功能。例如："),e("code",[t._v("function extend<T extends object, U extends object>(first: T, second: U): T & U { }")]),t._v("；")])]),t._v(" "),e("p",[t._v("类型别名 —— "),e("code",[t._v("type")])]),t._v(" "),e("p",[e("code",[t._v("type SomeName = someValidTypeAnnotation")])]),t._v(" "),e("div",{staticClass:"language-typescript line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-typescript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Text")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" text"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Coordinates")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Callback")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br")])]),e("h2",{attrs:{id:"keyof"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#keyof"}},[t._v("#")]),t._v(" keyof")])])}),[],!1,null,null,null);s.default=n.exports}}]);