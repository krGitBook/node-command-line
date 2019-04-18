const fs = require('fs-extra')
const slog = require('single-line-log').stdout;
const util = require('../util');
const path = require('path');
const targetpath = path.join(__dirname,'../../src/js/index.js');
const prod = path.join(__dirname,'../../prod');
const filenum = util.getfile(targetpath).num;
var crypto = require('crypto');
var isok = false;
const icon = ['|','/','——','\\','|','/','——','\\'];
var num = 0;
// console.log()
// util.getfile(targetpath);
//读取一个Buffer
var buffer = fs.readFileSync(targetpath);
var fsHash = crypto.createHash('md5');
fsHash.update(buffer);
var md5 = fsHash.digest('hex');
console.log("文件的MD5是：%s", md5);
return ;
const render = ()=>{
  if(isok){
    return ;
  }
  
  slog(icon[num%8])
  num++;
  setTimeout(render,100)
}
render();

fs.copy(targetpath, prod)
  .then(() =>{
    isok= true;
    console.log('success!')
  })
  .catch(err => console.error(err))