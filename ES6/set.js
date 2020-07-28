// es6中的set和map (方法中的东西都是唯一的)

let arr = [1, 2, 3, 4, 5, 1, 2]

let s = new Set(arr)

// console.log('s===>', s)  // Set { 1, 2, 3, 4, 5 }

// console.log('s.entries()===>', s.entries())

// for of 语法只能迭代数组 或者有Symbol.iterator的方法
for (let a of s.entries()) {  // Object.entries Object.keys Object.values
  // console.log(a)
}

let obj = { a:1, b:2, c:3 }
// console.log(Object.entries(obj))

// set的应用 可以去重 求数组的并集 交集 差集

let arr1 = [1,2,3,1,2]
let arr2 = [3,4,5,3,1]

function union () {
  let s1 = new Set(arr1)
  let s2 = new Set(arr2)
  let all = [...s1, ...s2]
  return all
}
console.log(union())