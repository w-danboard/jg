const zlib = require('zlib');
const fs = require('fs');
// let data = fs.readFileSync('1.txt.gz');
// xxx.gz
// zlib.gzip(data,function (err,data) {
//     fs.writeFileSync('1.txt.gz',data);
// });

// 根据文件内容来压缩 

// zlib.unzip(data,function (err,data) {
//     fs.writeFileSync('2.txt',data);
// })

fs.createReadStream('./1.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('2.txt.gz'));