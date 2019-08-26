/* 
以下数据结构中，id 代表部门编号，name 是部门名称，parentId 是父部门编号，为 0 代表一级部门，现在要求实现一个 convert 方法，把原始 list 转换成树形结构，parentId 为多少就挂载在该 id 的属性 children 数组下，结构如下：
*/

// 原始 list 如下
let list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
];
const result = convert(list, ...);

// 转换后的结果如下
let result = [{
    id: 1,
    name: '部门A',
    parentId: 0,
    children: [{
        id: 3,
        name: '部门C',
        parentId: 1,
        children: [{
          id: 6,
          name: '部门F',
          parentId: 3
        }, {
          id: 16,
          name: '部门L',
          parentId: 3
        }]
      },
      {
        id: 4,
        name: '部门D',
        parentId: 1,
        children: [{
          id: 8,
          name: '部门H',
          parentId: 4
        }]
      }
    ]
  },
  // ···
];

/**
 * listToThree
 * @param {Array} list 
 * 时间复杂度O(n)
 */
function convert(list) {
  const res = []
  const map = list.reduce((res, v) => (res[v.id] = v, res), {})
  for (const item of list) {
    if (item.parentId === 0) {
      res.push(item)
      continue
    }
    if (item.parentId in map) {
      const parent = map[item.parentId]
      parent.children = parent.children || []
      parent.children.push(item)
    }
  }
  return res
}

/**
 * 时间复杂度 O(n^2)
 * @param {*} arr 
 */
function convert(arr) {
  let tree = [];

  arr.map((it, idx, array) => {
    let parent = it.parentId;

    if (parent === 0) { // 根节点        
      tree.push(it);
    } else {
      array.map(item => {
        if (item.id === parent) {
          if (!item.children) {
            item.children = [];
          }

          item.children.push(it);
        }
      });
    }
  });

  return tree;
}

/**
 * 树转换
 * @param  {Array} 
 * @return {Array}  树形嵌套数组
 */
const toThree = (data, pid = 'pid') => {
  let map = {}
  let result = []
  let mapData = deepClone(data)

  mapData.map(item => (map[item.id] = item))

  mapData.map(item => {
    let parent = map[item[pid]]
    parent ? (parent.children || (parent.children = [])).push(item) : result.push(item)
  })
  return result
}

var entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd'
      }
    },
    d: {
      xx: 'adxx'
    },
    e: 'ae'
  }
}

// 要求转换成如下对象
var output = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae'
}
function flatObj(obj, parentKey = "", result = {}) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let keyName = `${parentKey}${key}`;
      if (typeof obj[key] === 'object')
        flatObj(obj[key], keyName+".", result)
      else
        result[keyName] = obj[key];
    }
  }
  return result;
}
console.log(flatObj(entry)); 