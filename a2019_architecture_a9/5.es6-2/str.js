let obj = { arr: [1, 2, 3] }
with (obj) { // 创建以当前obj 为this指向的作用域
    let str = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=q, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    `
    arr.forEach(item => {
        str += `<h1>${item}</h1>`
    })

    str += `</body>
</html>`;
    console.log(str);
}

// new Function 来执行脚本 with来实现作用域 字符串拼接拿到想要的结果
