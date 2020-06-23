let objB = {

}

let objC = {

}

let objF = {

}

// windows 是代理global的
// 看图 从根节点 objF objD objE都没有被引用 所以会被回收
globalThis.objA = {
  objB,
  objC
}