console.log(process.memoryUsage()) // 当前进程的内容使用情况

/**
  {
    rss: 17,866,752, 17M         [rss(resident set size): 所有内存占用，包括指令区和堆栈]
    heapTotal: 4,243,456, 4.2M     [heapToral: '堆'占用的内存，包括用到的和没用到的]
    heapUsed: 2,150,176, 2.1M      [heapUsed: 用到的堆的部分。判断内存泄露，以heapUsed字段为准]
    external: 682,155  682K       [external: V8引擎部分的C++对象占用的内存]
  }
 */