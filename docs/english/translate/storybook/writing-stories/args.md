---
title: 'Args'
---

> title: '参数'

A story is a component with a set of arguments that define how the component should render. “Args” are Storybook’s mechanism for defining those arguments in a single JavaScript object. Args can be used to dynamically change props, slots, styles, inputs, etc. It allows Storybook and its addons to live edit components. You _do not_ need to modify your underlying component code to use args.

一个 story 是由组件 + 一系列参数来定义组件如何渲染的。在 Storybook 中，“参数”是用一个 js 对象定义组件的参数。参数可以用来动态修改 props、slots、styles、inputs 等等。它允许 Storybook 及其插件动态编辑组件。你不需要修改核心组件就可以使用这些参数。

When an arg’s value changes, the component re-renders, allowing you to interact with components in Storybook’s UI via addons that affect args.

当参数更新时，组件重新渲染。通过插件修改参数，然后在 Storybook 的 UI 界面展示效果。

Learn how and why to write stories in [the introduction](./introduction.md#using-args). For details on how args work, read on.

在 [介绍](./introduction.md#using-args)中了解如何及为什么要写 story。学习参数生效的细节，请继续读下去。

## Args object

> 参数对象

The `args` object can be defined at the [story](#story-args) and [component level](#component-args). It is a JSON serializable object composed of string keys with matching valid value types that can be passed into a component for your framework.

`args`参数对象可以在[story 级别](#story-args)定义，也可以在[组件级别](#component-args)定义。它是一个 JSON 可序列化对象，由可以正确匹配参数类型的 string 键值组成，可以传递给框架的组件。

## Story args

> Story 级别参数

To define the args of a single story, use the `args` CSF story key:

使用 CSF 的`args`属性来定义 Story 级别参数：

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/button-story-with-args.js.mdx',
    'react/button-story-with-args.ts.mdx',
    'react/button-story-with-args.mdx.mdx',
    'vue/button-story-with-args.2.js.mdx',
    'vue/button-story-with-args.mdx-2.mdx.mdx',
    'vue/button-story-with-args.3.js.mdx',
    'vue/button-story-with-args.mdx-3.mdx.mdx',
    'angular/button-story-with-args.ts.mdx',
    'angular/button-story-with-args.mdx.mdx',
    'svelte/button-story-with-args.js.mdx',
    'svelte/button-story-with-args.native-format.mdx',
    'svelte/button-story-with-args.mdx.mdx',
    'web-components/button-story-with-args.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

These args will only apply to the story for which they are attached, although you can [reuse](../workflows/build-pages-with-storybook.md#args-composition-for-presentational-screens) them via JavaScript object reuse:

这些参数只会在它绑定的 story 上生效，你也可以使用 js 对象的复用来复用这些参数。

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/button-story-primary-long-name.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

In the above example, we use the [object spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) feature of ES 2015.

在上面的示例中，我们使用了 ES 2015 的[展开运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)。

## Component args

> 组件级别参数

You can also define args at the component level; they will apply to all the component's stories unless you overwrite them. To do so, use the `args` key on the `default` CSF export:

你也可以在组件级别来定义参数；参数会在所有的 story 上生效，除非你覆盖它们。使用`exports default`的`args`参数来定义组件级别参数。

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/button-story-component-args-primary.js.mdx',
    'react/button-story-component-args-primary.ts.mdx',
    'react/button-story-component-args-primary.mdx.mdx',
    'vue/button-story-component-args-primary.js.mdx',
    'vue/button-story-component-args-primary.mdx.mdx',
    'angular/button-story-component-args-primary.ts.mdx',
    'angular/button-story-component-args-primary.mdx.mdx',
    'svelte/button-story-component-args-primary.js.mdx',
    'svelte/button-story-component-args-primary.native-format.mdx',
    'svelte/button-story-component-args-primary.mdx.mdx',
    'web-components/button-story-component-args-primary.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

## Args composition

> 参数组合

You can separate the arguments to a story to compose in other stories. Here's how you can combine args for multiple stories of the same component.

你可以将一个 story 的参数拆出组合到别的 story 当中去。下面示例展示了如何由同一组件的多个 story 组合参数。

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/button-story-primary-composition.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

<div class="aside">

💡<strong>Note:</strong> If you find yourself re-using the same args for most of a component's stories, you should consider using [component-level args](#component-args).

💡<strong>注意:</strong> 如果你发现自己的绝大多数 story 都复用了同样参数，你应该考虑使用[组件级别参数](#component-args)。

</div>

Args are useful when writing stories for composite components that are assembled from other components. Composite components often pass their arguments unchanged to their child components, and similarly, their stories can be compositions of their child components stories. With args, you can directly compose the arguments:

当书写由其它组件组成的组合组件的 story 时，参数十分有用。组合组件经常不改变的传递参数给子组件，同样的，他们的 story 也能由子组件的 story 组合而成。通过参数，你可以直接组成子组件参数：

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/page-story.js.mdx',
    'react/page-story.ts.mdx',
    'angular/page-story.ts.mdx',
    'vue/page-story.2.js.mdx',
    'vue/page-story.3.js.mdx',
    'svelte/page-story.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

## Args can modify any aspect of your component

> 参数可以修改组件的任何

You can use args in your stories to configure the component's appearance, similar to what you would do in an application. For example, here's how you could use a `footer` arg to populate a child component:

你可以使用参数在 story 中配置组件的外观，与你将会在应用中配置的一样。例如，这里展示了如何通过`footer`参数去渲染子组件：

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/page-story-slots.js.mdx',
    'react/page-story-slots.ts.mdx',
    'react/page-story-slots.mdx.mdx',
    'vue/page-story-slots.2.js.mdx',
    'vue/page-story-slots.mdx-2.mdx.mdx',
    'vue/page-story-slots.3.js.mdx',
    'vue/page-story-slots.mdx-3.mdx.mdx',
    'angular/page-story-slots.ts.mdx',
    'angular/page-story-slots.mdx.mdx',
    'svelte/page-story-slots.native-format.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

## Setting args through the URL

> 通过 URL 配置参数

You can also override the set of initial args for the active story by adding an `args` query parameter to the URL. Typically you would use the [Controls addon](../essentials/controls.md) to handle this. For example, here's how you could set a `size` and `style` arg in the Storybook's URL:

你可以通过在 URL 参数中添加`args`，来覆盖当前 story 的初始参数。通常也会使用[Controls 插件](../essentials/controls.md)来处理这些。例如，这里展示了如何在 storybook 的 url 中配置`size`和`style`：

```
?path=/story/avatar--default&args=style:rounded;size:100
```

As a safeguard against [XSS](https://owasp.org/www-community/attacks/xss/) attacks, the arg's keys and values provided in the URL are limited to alphanumeric characters, spaces, underscores, and dashes. Any other types will be ignored and removed from the URL, but you can still use them with the Controls addon and [within your story](#mapping-to-complex-arg-values).

为了抵御[XSS](https://owasp.org/www-community/attacks/xss/)攻击，URL 中的 arg 参数的键值被限制，仅能使用字母，空格，下划线和横线。所有其它类型都会被忽略，并且从 URL 中移除，但你仍然可以在 Controls 插件和[story](#mapping-to-complex-arg-values)中使用特殊字符。

The `args` param is always a set of `key: value` pairs delimited with a semicolon `;`. Values will be coerced (cast) to their respective `argTypes` (which may have been automatically inferred). Objects and arrays are supported. Special values `null` and `undefined` can be set by prefixing with a bang `!`. For example, `args=obj.key:val;arr[0]:one;arr[1]:two;nil:!null` will be interpreted as:

`args`参数通过是使用分号`;`分割的`key: value`键值对。值会被转化为他们各自的类型（可能通过自动推断）。支持对象和数组。`null`和`undefined`这种特殊值，可以通过在前面添加叹号`!`表示。例如`args=obj.key:val;arr[0]:one;arr[1]:two;nil:!null`，将会被推断为：

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
   'common/storybook-args-url-params-converted.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

Similarly, special formats are available for dates and colors. Date objects will be encoded as `!date(value)` with value represented as an ISO date string. Colors are encoded as `!hex(value)`, `!rgba(value)` or `!hsla(value)`. Note that rgb(a) and hsl(a) should not contain spaces or percentage signs in the URL.

同样的，特殊格式例如`dates`日期和`colors`颜色都是支持的。`date`日期对象编写为`!date(value)`其中 value 代表 ISO 日期字符串。颜色编写为`!hex(value)`, `!rgba(value)` 或者 `!hsla(value)`。注意 rgb(a) 和 hsl(a)在 URL 中不应该包括空格和百分号。

Args specified through the URL will extend and override any default values of args set on the story.

通过 URL 声明的参数将会扩展以及覆盖所有在 story 中配置的默认值。

## Mapping to complex arg values

> 映射复杂参数的值

Complex values such as JSX elements cannot be serialized to the manager (e.g., the Controls addon) or synced with the URL. Arg values can be "mapped" from a simple string to a complex type using the `mapping` property in `argTypes` to work around this limitation. It works in any arg but makes the most sense when used with the `select` control type.

复杂的值类型，如 JSX 元素，不能通过`manager`（例如，`Controls`插件）或者 URL 声明。使用`argTypes`中的`mapping`属性，可以将参数的值从简单的 string 类型"映射"到一个复杂类型，来解决上述限制。它适用于所有参数，但是对于`select`控制类型尤其适用。

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/my-component-argtypes-with-mapping.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

Note that `mapping` does not have to be exhaustive. If the arg value is not a property of `mapping`, the value will be used directly. Keys in `mapping` always correspond to arg _values_, not their index in the `options` array.

注意`mapping`无需覆盖所有类型。如果参数的值不是`mapping`的属性，那就会直接使用这个值。`mapping`中的键，经常对应`options`参数中的值，不是索引(index)。

<details>
<summary>Using args in addons</summary>

> 在插件中使用参数

If you are [writing an addon](../addons/writing-addons.md) that wants to read or update args, use the `useArgs` hook exported by `@storybook/api`:

如果你在实现插件时，需要读取或者更新参数，使用`@storybook/api`暴露的`useArgs`hook。

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/args-usage-with-addons.js.mdx'
  ]}
/>

<!-- prettier-ignore-end -->

</details>

<details>
<summary>parameters.passArgsFirst</summary>

In Storybook 6+, we pass the args as the first argument to the story function. The second argument is the “context”, which includes story parameters, globals, argTypes, and other information.

在 6+版本的 Storybook，story 函数第一个参数是`args`，第二个参数是`context`，上下文包括 story 的参数，全局配置，参数类型，以及一些其它信息。

In Storybook 5 and before we passed the context as the first argument. If you’d like to revert to that functionality set the `parameters.passArgsFirst` parameter in [`.storybook/preview.js`](../configure/overview.md#configure-story-rendering):

在 Storybook 5 及之前的版本中，story 函数第一个参数是`context`。如果你需要翻转函数参数，在[`.storybook/preview.js`](../configure/overview.md#configure-story-rendering)中配置`parameters.passArgsFirst`:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-preview-parameters-old-format.js.mdx'
  ]}
/>

<!-- prettier-ignore-end -->

  <div class="aside">
  💡 Note that `args` is still available as a key in the context.

💡 注意，上下文中的`args`参数始终有效。

  </div>
</details>
