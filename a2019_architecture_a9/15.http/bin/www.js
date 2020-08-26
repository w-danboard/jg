#! /usr/bin/env node

// 启动服务
let Server = require('../src/server.js');
let program = require('commander');

let commander = {
    port:{
        descriptor:'set default port',
        option:'-p,--port <val>',
        example:['ms --port <port>']
    },
    d:{
        descriptor:'change show directory',
        option:'-d,--directory <dirname>',
        example:['ms --directory <dirname>']
    }
}
Object.entries(commander).forEach(([key,value]) => {
    program
    .option(value.option, value.descriptor) 
}); 
program.on('--help',function () {
    let r = Object.values(commander).reduce((memo,obj) => {
        return memo.concat(obj.example)
    },[]); 
    console.log('Examples:')
    r.forEach(example=>{
        console.log('  '+example)
    })
})
let result = program.parse(process.argv)

let defaultConfig = {
    port:3000,
    directory:process.cwd(),
    ...result
}


let server = new Server(defaultConfig); // 根据用户输入的内容启动对应的服务

// 当前的指定目录 
server.start(defaultConfig.port,function () {
    console.log('server start ' + defaultConfig.port)
});
