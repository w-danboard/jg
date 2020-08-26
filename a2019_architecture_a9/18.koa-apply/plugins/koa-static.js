let fs = require('fs').promises;
let mime = require('mime')
let {createReadStream} = require('fs');
const path = require('path');
module.exports = (root) =>{
    return async (ctx,next)=>{
        let absPath = path.join(root,ctx.path);
        try{
            let statObj = await fs.stat(absPath);
            if(statObj.isDirectory()){
                absPath = path.join(absPath,'index.html');
                await fs.access(absPath);
            }
            ctx.set('Content-Type',mime.getType(absPath)+';charset=utf-8')
            ctx.body = createReadStream(absPath)
        }catch(e){
            await next();
        }
    }
}