# new operator

todo:

const obj = new Foo;

const obj = new Foo();

这两者是相同的，但是

TL;DR: Beware that new a.b() is different from new a().b(), in that, in the former case, a.b is first accessed, whereas in the latter case, a new a is created first.

> As a special case, for the new operator only, JavaScript simplifies the grammar by allowing the parenthesis to be omitted if there are no arguments in the function call. Here are some examples using the new operator:

o = new Object; // Optional parenthesis omitted here d = new Date();

...

JavaScript the Definitive Guide: 4th Edition
