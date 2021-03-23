(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{355:function(s,t,a){s.exports=a.p+"assets/img/insertSort.c1acb4e0.gif"},366:function(s,t,a){"use strict";a.r(t);var n=a(45),r=Object(n.a)({},(function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h1",{attrs:{id:"排序算法-js-实现"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#排序算法-js-实现"}},[s._v("#")]),s._v(" 排序算法 js 实现")]),s._v(" "),n("h2",{attrs:{id:"_1-插入排序"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-插入排序"}},[s._v("#")]),s._v(" 1. 插入排序")]),s._v(" "),n("p",[s._v("概述：")]),s._v(" "),n("p",[s._v("Insertion Sort 和打扑克牌时，从牌桌上逐一拿起扑克牌，在手上排序的过程相同。")]),s._v(" "),n("p",[s._v("举例：")]),s._v(" "),n("p",[s._v("Input: {5 2 4 6 1 3}。")]),s._v(" "),n("p",[s._v("首先拿起第一张牌, 手上有 {5}。")]),s._v(" "),n("p",[s._v("拿起第二张牌 2, 把 2 insert 到手上的牌 {5}, 得到 {2 5}。")]),s._v(" "),n("p",[s._v("拿起第三张牌 4, 把 4 insert 到手上的牌 {2 5}, 得到 {2 4 5}。")]),s._v(" "),n("p",[s._v("以此类推。")]),s._v(" "),n("p",[n("img",{attrs:{src:a(355),alt:"快排"}})]),s._v(" "),n("ul",[n("li",[s._v("最佳情况就是，数组已经是正序排列了，在这种情况下，需要进行的比较操作是 （n-1）次即可；")]),s._v(" "),n("li",[s._v("最坏情况就是，数组是反序排列，那么此时需要进行的比较共有 n(n-1)/2 次；")]),s._v(" "),n("li",[s._v("时间复杂度 O(n^2)；")])]),s._v(" "),n("div",{staticClass:"language-javascript line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-javascript"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 插入排序")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("insertionSort")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("arr")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" i "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" i "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v(" arr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("length"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" i"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("++")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" value "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" arr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("i"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" j "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" i "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("while")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("j "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" arr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("j"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" value"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      arr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("j "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" arr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("j"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n      j"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    arr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("j "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" value\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br")])])])}),[],!1,null,null,null);t.default=r.exports}}]);