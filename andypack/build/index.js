const fs = require('fs-extra')
const slog = require('single-line-log').stdout;
const util = require('../util');
const path = require('path');
const targetpath = path.join(__dirname,'../../src');
const prod = path.join(__dirname,'../../prod');
const filenum = util.getfile(targetpath).num;
var isok = false;
const icon = ['|','/','——','\\','|','/','——','\\'];
var num = 0;
// console.log()
// util.getfile(targetpath);
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