function anonymous(obj) {
    let str = ''
    with (obj) {
        str = `<!DOCTYPE html>
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
            str += `
        <h1>1</h1>
    `
        })
        str += `
</body>
</html>`
    }
    return str
}