
```js
clearInput: function (e) {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: ''
        });
        break;
      case 'clear-password':
        this.setData({
          password: ''
        });
        break;
      case 'clear-code':
        this.setData({
          code: ''
        });
        break;
    }
  }
```

```js
  openSortFilter: function (event) {
    let currentId = event.currentTarget.id;
    switch (currentId) {
      case 'categoryFilter':
        this.setData({
          'categoryFilter': !this.data.categoryFilter,
          'currentSortType': 'category',
          'currentSortOrder': 'asc'
        });
        break;
      case 'priceSort':
        let tmpSortOrder = 'asc';
        if (this.data.currentSortOrder == 'asc') {
          tmpSortOrder = 'desc';
        }
        this.setData({
          'currentSortType': 'price',
          'currentSortOrder': tmpSortOrder,
          'categoryFilter': false
        });

        this.getData();
        break;
      default:
        //综合排序
        this.setData({
          'currentSortType': 'default',
          'currentSortOrder': 'desc',
          'categoryFilter': false
        });
        this.getData();
    }
  }
```

- switch -> object

```js
// Switch
let createType = null;
switch (contentType) {
  case "post":
    createType = () => console.log("creating a post...");
    break;
  case "video":
    createType = () => console.log("creating a post...");
    break;
  default:
    createType = () => console.log('unrecognized content type');
}
// object
const contentType = {
  post: () => console.log("creating a post...");
  video: () => console.log("creating a post...");
  default: () => console.log('unrecognized content type')
}
const CreateType = contentTypes[contentType] || contentTypes['default']
```

- reduce + 解构

> https://30secondsofcode.org/#bifurcate

```js
const bifurcate = (arr, filter) =>
  arr.reduce((acc, val, i) => (acc[filter[i] ? 0 : 1].push(val), acc), [[], []]);
```

```js
const exampleValues = [2, 15, 8, 23, 1, 32];
const [truthyValues, falseyValues] = examplesValues.reduce((arrays, exampleValue) => {
  if (exampleValue > 10) {
    arrays[0].push(exampleValue)
    return arrays
  }
  arrays[1].push(exampleValue)
  return arrays
}, [[], []])
```js

```js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classic: {
      type: Object,
      observer: function(newVal) {
        if (newVal) {
          var typeText = {
            100: "电影",
            200: "音乐",
            300: "句子"
          }[newVal.type]
        }
        this.setData({
          typeText
        })
      }
    }
  },
```