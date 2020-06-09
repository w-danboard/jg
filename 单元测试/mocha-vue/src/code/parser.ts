export let parser = (str: string): object => { // name=wl
  let obj: any = {};
  let newStr = str.replace(/([^&=]*)=([^&=]*)/g, '$1,$2')
  let arr = newStr.split(',')
  obj[arr[0]] = arr[1]
  return obj; // {name: 'wl'}
}

export let stringify = (obj: any) => { // {name: 'wl'}
  let arr = [];
  for (let key in obj) {
    arr.push(`${key} = ${obj[key]}`)
  }
  return arr.join('&'); // name=wl
}

// 前端测试的时候 1) 去自测 不会保留测试代码 测试代码会混在源码中
// console.log(parser('name=wl'))
// console.log(parser('name=1'))

// console.log(stringify({name: 'wl'})) // name=wl