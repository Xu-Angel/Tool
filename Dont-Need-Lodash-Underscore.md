## Quick Links

**[Array](#array)**

1. [_.chunk](#_chunk)
1. [_.compact](#_compact)
1. [_.concat](#_concat)
1. [_.fill](#_fill)
1. [_.find](#_find)
1. [_.findIndex](#_findindex)
1. [_.first](#_first)
1. [_.flatten](#_flatten)
1. [_.flattenDeep](#_flattendeep)
1. [_.fromPairs](#_frompairs)
1. [_.head and _.tail](#_head-and-_tail)
1. [_.indexOf](#_indexof)
1. [_.join](#_join)
1. [_.last](#_last)
1. [_.lastIndexOf](#_lastindexof)
1. [_.reverse](#_reverse)
1. [_.without](#_without)
1. [_.slice](#_slice)
1. [_.isArray](#_isarray)
1. [_.isArrayBuffer](#_isarraybuffer)

**[Collection*](#collection*)**

*:heavy_exclamation_mark:<b>Important:</b> Note that the native equivalents are array methods,
and will not work with objects. If this functionality is needed,
then Lodash/Underscore is the better option.*

1. [_.each](#_each)
1. [_.every](#_every)
1. [_.filter](#_filter)
1. [_.groupBy](#_groupby)
1. [_.includes](#_includes)
1. [_.map](#_map)
1. [_.minBy and _.maxBy](#_minby-and-_maxby)
1. [_.orderBy](#_sortby-and-_orderby)
1. [_.pluck](#_pluck)
1. [_.range](#_range)
1. [_.reduce](#_reduce)
1. [_.reduceRight](#_reduceright)
1. [_.size](#_size)
1. [_.some](#_some)
1. [_.sortBy](#_sortby-and-_orderby)
1. [_.uniq](#_uniq)

**[Function](#function)**

1. [_.after](#_after)
1. [_.bind](#_bind)
1. [_.partial](#_partial)

**[Lang](#lang)**

1. [_.isNaN](#_isnan)
1. [_.isUndefined](#_isundefined)
1. [_.gt](#_gt)
1. [_.gte](#_gte)

**[Object](#object)**

1. [_.assign](#_assign)
1. [_.keys](#_keys)
1. [_.toPairs](#_topairs)
1. [_.values](#_values)
1. [_.get](#_get)
1. [_.omit](#_omit)

**[String](#string)**

1. [_.repeat](#_repeat)
1. [_.template](#_template)
1. [_.toLower](#_tolower)
1. [_.toUpper](#_toupper)
1. [_.trim](#_trim)
1. [_.replace](#_replace)

## Array

### _.chunk

Creates an array of elements split into groups the length of size.
```js
// Underscore/Lodash
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]

_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]


// Native

const chunk = (input, size) => {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
};

chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]

chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]

```

#### Browser Support

![Chrome][chrome-image] | ![Firefox][firefox-image] | ![IE][ie-image] | ![Opera][opera-image] | ![Safari][safari-image]
:-: | :-: | :-: | :-: | :-: |
   ✔  |  ✔ |  Not Supported |  ✔ |  ✔  |

**[⬆ back to top](#quick-links)**

### _.compact

Creates an array with all falsy values removed.

  ```js
  // Underscore/Lodash
  _.compact([0, 1, false, 2, '', 3]);

  // Native
  [0, 1, false, 2, '', 3].filter(Boolean)
  ```

#### Browser Support

![Chrome][chrome-image] | ![Firefox][firefox-image] | ![IE][ie-image] | ![Opera][opera-image] | ![Safari][safari-image]
:-: | :-: | :-: | :-: | :-: |
   ✔  |  1.5 ✔ |  9 ✔ |  ✔ |  ✔  |

**[⬆ back to top](#quick-links)**

### _.concat

Creates a new array concatenating array with any additional arrays and/or values.

  ```js
  // Underscore/Lodash
  var array = [1]
  var other = _.concat(array, 2, [3], [[4]])

  console.log(other)
  // output: [1, 2, 3, [4]]

  // Native
  var array = [1]
  var other = array.concat(2, [3], [[4]])

  console.log(other)
  // output: [1, 2, 3, [4]]
  ```

#### Browser Support

![Chrome][chrome-image] | ![Firefox][firefox-image] | ![IE][ie-image] | ![Opera][opera-image] | ![Safari][safari-image]
:-: | :-: | :-: | :-: | :-: |
1.0  ✔  | 1.0 ✔ |  5.5 ✔  |  ✔  |  ✔  |

**[⬆ back to top](#quick-links)**

**[⬆ back to top](#quick-links)**

### _.find

Returns the value of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned.

  ```js
  // Underscore/Lodash
  var users = [
    { 'user': 'barney',  'age': 36, 'active': true },
    { 'user': 'fred',    'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1,  'active': true }
  ]

  _.find(users, function (o) { return o.age < 40; })
  // output: object for 'barney'

  // Native
  var users = [
    { 'user': 'barney',  'age': 36, 'active': true },
    { 'user': 'fred',    'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1,  'active': true }
  ]

  users.find(function (o) { return o.age < 40; })
  // output: object for 'barney'
  ```

#### Browser Support

![Chrome][chrome-image] | ![Firefox][firefox-image] | ![IE][ie-image] | ![Opera][opera-image] | ![Safari][safari-image]
:-: | :-: | :-: | :-: | :-: |
  45.0 ✔ | 25.0 ✔ |  Not supported  |  32.0 ✔ |  7.1 ✔ |

**[⬆ back to top](#quick-links)**

### _.findIndex

Returns the index of the first element in the array that satisfies the provided testing function. Otherwise -1 is returned.

  ```js
  // Underscore/Lodash
  var users = [
    { 'user': 'barney',  'age': 36, 'active': true },
    { 'user': 'fred',    'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1,  'active': true }
  ]

  var index = _.findIndex(users, function (o) { return o.age >= 40; })
  console.log(index)
  // output: 1

  // Native
  var users = [
    { 'user': 'barney',  'age': 36, 'active': true },
    { 'user': 'fred',    'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1,  'active': true }
  ]

  var index = users.findIndex(function (o) { return o.age >= 40; })
  console.log(index)
  // output: 1
  ```

#### Browser Support

![Chrome][chrome-image] | ![Firefox][firefox-image] | ![IE][ie-image] | ![Opera][opera-image] | ![Safari][safari-image]
:-: | :-: | :-: | :-: | :-: |
  45.0 ✔ | 25.0 ✔ |  Not supported  |  32.0 ✔ |  7.1 ✔ |

**[⬆ back to top](#quick-links)**

### _.fromPairs

Returns an object composed from key-value pairs.

  ```js
  // Underscore/Lodash
  _.fromPairs([['a', 1], ['b', 2]]);
  // => { 'a': 1, 'b': 2 }

  // Native
  const fromPairs = function(arr) {
    return arr.reduce(function(accumulator, value) {
      accumulator[value[0]] = value[1];
      return accumulator;
    }, {})
  }

  // Compact form
  const fromPairs = (arr) => arr.reduce((acc, val) => (acc[val[0]] = val[1], acc), {})

  fromPairs([['a', 1], ['b', 2]]);
  // => { 'a': 1, 'b': 2 }
  ```

#### Browser Support

![Chrome][chrome-image] | ![Firefox][firefox-image] | ![IE][ie-image] | ![Opera][opera-image] | ![Safari][safari-image]
:-: | :-: | :-: | :-: | :-: |
  ✔  | 3.0 ✔ |  9 ✔  |  10.5 ✔ |  4.0 ✔ |

**[⬆ back to top](#quick-links)**

## Collection*

*:heavy_exclamation_mark:<b>Important:</b> Note that the native equivalents are array methods,
and will not work with objects. If this functionality is needed,
then Lodash/Underscore is the better option.*

### _.groupBy

Group items by key.

  ```js
  // Underscore/Lodash
  var grouped = _.groupBy(['one', 'two', 'three'], 'length')
  console.log(grouped)
  // output: {3: ["one", "two"], 5: ["three"]}

  // Native
  var grouped = ['one', 'two', 'three'].reduce((r, v, i, a, k = v.length) => ((r[k] || (r[k] = [])).push(v), r), {})
  console.log(grouped)
  // output: {3: ["one", "two"], 5: ["three"]}
  ```

  ```js
  // Underscore/Lodash
  var grouped = _.groupBy([1.3, 2.1, 2.4], num => Math.floor(num))
  console.log(grouped)
  // output: {1: [1.3], 2: [2.1, 2.4]}

  // Native
  var grouped = [1.3, 2.1, 2.4].reduce((r, v, i, a, k = Math.floor(v)) => ((r[k] || (r[k] = [])).push(v), r), {})
  console.log(grouped)
  // output: {1: [1.3], 2: [2.1, 2.4]}
  ```

#### Browser Support

![Chrome][chrome-image] | ![Firefox][firefox-image] | ![IE][ie-image] | ![Opera][opera-image] | ![Safari][safari-image]
:-: | :-: | :-: | :-: | :-: |
  ✔  | 3.0 ✔ |  9 ✔  |  10.5 ✔ |  4.0 ✔ |

### _.pluck

  `array.map` or `_.map` can also be used to replace `_.pluck`. Lodash v4.0 removed `_.pluck` in favor of `_.map` with iteratee shorthand. Details can be found in [Changelog](https://github.com/lodash/lodash/wiki/Changelog)

  ```js
  // Underscore/Lodash
  var array1 = [{name: "Alice"}, {name: "Bob"}, {name: "Jeremy"}]
  var names = _.pluck(array1, "name")
  console.log(names)
  // output: ["Alice", "Bob", "Jeremy"]

  // Native
  var array1 = [{name: "Alice"}, {name: "Bob"}, {name: "Jeremy"}]
  var names = array1.map(function(x){
    return x.name
  })
  console.log(names)
  // output: ["Alice", "Bob", "Jeremy"]
  ```

#### Browser Support

![Chrome][chrome-image] | ![Firefox][firefox-image] | ![IE][ie-image] | ![Opera][opera-image] | ![Safari][safari-image]
:-: | :-: | :-: | :-: | :-: |
  ✔  | 1.5 ✔ |  9 ✔  |  ✔  |  ✔  |

**[⬆ back to top](#quick-links)**

### _.sortBy and _.orderBy

Sorts an array of object based on an object key provided by a parameter (note this is more limited than Underscore/Lodash).

  ```js
  const fruits = [
    {name:"banana", amount: 2},
    {name:"apple", amount: 4},
    {name:"pineapple", amount: 2},
    {name:"mango", amount: 1}
  ];

  // Underscore
  _.sortBy(fruits, 'name');
  // => [{name:"apple", amount: 4}, {name:"banana", amount: 2}, {name:"mango", amount: 1}, {name:"pineapple", amount: 2}]

  // Lodash
  _.orderBy(fruits, ['name'],['asc']);
  // => [{name:"apple", amount: 4}, {name:"banana", amount: 2}, {name:"mango", amount: 1}, {name:"pineapple", amount: 2}]

  // Native
  const sortBy = (key) => {
    return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
  };

  fruits.sort(sortBy("name"));
  // => [{name:"apple", amount: 4}, {name:"banana", amount: 2}, {name:"mango", amount: 1}, {name:"pineapple", amount: 2}]
  ```

## Function

### _.partial
Create a new function that calls _func_ with _args_.

  ```js
  // Lodash
  function greet(greeting, name) {
    return greeting + ' ' + name;
  }
  var sayHelloTo = _.partial(greet, 'hello');

  // Native
  function greet(greeting, name) {
    return greeting + ' ' + name;
  }
  var sayHelloTo = (...args) => greet('hello', ...args)
  ```

#### Browser Support

![Chrome][chrome-image] | ![Firefox][firefox-image] | ![IE][ie-image] | ![Opera][opera-image] | ![Safari][safari-image]
:-: | :-: | :-: | :-: | :-: |
  62 ✔  | 56 ✔ |  ✗  |  49 ✔ |  11 ✔ |

**[⬆ back to top](#quick-links)**

## Lang

### _.isNaN

Checks if a value is NaN.

  ```js
  // Underscore/Lodash
  console.log(_.isNaN(NaN))
  // output: true

  // Native
  console.log(isNaN(NaN))
  // output: true

  // ES6
  console.log(Number.isNaN(NaN))
  // output: true
  ```
MDN:
>In comparison to the global `isNaN()` function, `Number.isNaN()` doesn't suffer the problem of forcefully converting the parameter to a number. This means it is now safe to pass values that would normally convert to `NaN`, but aren't actually the same value as `NaN`. This also means that only values of the type number, that are also `NaN`, return true. [Number.isNaN()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)

Voice from the Lodash author:

>Lodash's `_.isNaN` is equiv to ES6 `Number.isNaN` which is different than the global `isNaN`.
>--- [jdalton](https://github.com/cht8687/You-Dont-Need-Lodash-Underscore/commit/b8559a603dccaaa2449b5a68a2d8325cf1fb29cd#)

#### Browser Support for `isNaN`

![Chrome][chrome-image] | ![Firefox][firefox-image] | ![IE][ie-image] | ![Opera][opera-image] | ![Safari][safari-image]
:-: | :-: | :-: | :-: | :-: |
  ✔  |  ✔ |  ✔ |  ✔ |  ✔  |

#### Browser Support for `Number.isNaN`

![Chrome][chrome-image] | ![Firefox][firefox-image] | ![IE][ie-image] | ![Opera][opera-image] | ![Safari][safari-image]
:-: | :-: | :-: | :-: | :-: |
  25 ✔ | 15 ✔ |  Not supported |  ✔ |  9 ✔ |

**[⬆ back to top](#quick-links)**

### _.gt

Checks if value is greater than other.

```js
// Lodash
console.log(_.gt(3, 1))
// output: true

// Native
console.log(3 > 1);
// output: true
```

#### Browser Support

![Chrome][chrome-image] | ![Firefox][firefox-image] | ![IE][ie-image] | ![Opera][opera-image] | ![Safari][safari-image]
:-: | :-: | :-: | :-: | :-: |
  ✔  | ✔ |  ✔  | ✔ | ✔ |

**[⬆ back to top](#quick-links)**

### _.toPairs

Retrieves all the given object's own enumerable property `[ key, value ]` pairs.

  ```js
  // Underscore - also called _.pairs
  // Lodash - also called _.entries
  var result = _.toPairs({one: 1, two: 2, three: 3})
  console.log(result)
  // output: [["one", 1], ["two", 2], ["three", 3]]

  // Native
  var result2 = Object.entries({one: 1, two: 2, three: 3})
  console.log(result2)
  // output: [["one", 1], ["two", 2], ["three", 3]]
  ```

#### Browser Support

![Chrome][chrome-image] | ![Firefox][firefox-image] | ![IE][ie-image] | ![Opera][opera-image] | ![Safari][safari-image]
:-: | :-: | :-: | :-: | :-: |
  38 ✔  | 28 ✔ |  Not supported  |  25 ✔ |  7.1 ✔ |

**[⬆ back to top](#quick-links)**

### _.get

Gets the value at path of object.
*Note: If provided path does not exists inside the object js will generate error.*

  ```js
  // Lodash
  var object = { a: [{ b: { c: 3 } }] };
  var result = _.get(object, 'a[0].b.c', 1);
  console.log(result);
  // output: 3

  // Native
  var object = { a: [{ b: { c: 3 } }] };
  var { a: [{ b: { c: result2 = 1 } }] } = object;
  console.log(result2);
  // output: 3
  ```

#### Browser Support

![Chrome][chrome-image] | ![Firefox][firefox-image] | ![IE][ie-image] | ![Opera][opera-image] | ![Safari][safari-image]
:-: | :-: | :-: | :-: | :-: |
  49 ✔  | 41 ✔ |  Not supported  |  41.0 ✔ |  8 ✔ |

## String

### _.repeat
:heavy_exclamation_mark:`Lodash only`
Repeats the given string n times.

  ```js
  // Lodash
  var result = _.repeat('abc', 2)
  // output: 'abcabc'

  // Native
  var result = 'abc'.repeat(2)
  console.log(result)
  // output: 'abcabc'
  ```

#### Browser Support

![Chrome][chrome-image] | ![Firefox][firefox-image] | ![IE][ie-image] | ![Opera][opera-image] | ![Safari][safari-image]
:-: | :-: | :-: | :-: | :-: |
  41 ✔  |  24 ✔ |  Not supported  |  28 ✔ |  9 ✔ |

**[⬆ back to top](#quick-links)**

## Reference

* [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
* [Underscore.js](http://underscorejs.org)
* [Lodash.js](https://lodash.com/docs)

[chrome-image]: https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png
[firefox-image]: https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png
[ie-image]: https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png
[opera-image]: https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png
[safari-image]: https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png
