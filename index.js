//初始化命令，人机交互控制
var newInit=[
    {
        title:'initConfirm',
        description:'初始化createDOC,生成doc.json.确认？(y/n)  ',
        defaults: 'y'
    },
    {
        title:'defaultConfirm',
        description:'是否使用默认配置.(y/n)  ',
        defaults: 'y'
    },
    {
        title:'showConfig',
        description:'是否显示doc.json当前配置？(y/n)  ',
        defaults: 'y'
    }
];

var initRepl = function (func) {
    var i = 1;
    var len = newInit.length;
    process.stdout.write(newInit[0].description);
    process.stdin.resume();
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', (chunk) => {
      chunk = chunk.replace(/[\s\n]/, '');
      console.log('chukkk',chunk);
      if(chunk === 'n' || chunk === 'N'){
        newInit= [
            {
                title:'showConfig',
                description:'2？(y/n)  ',
                defaults: 'y'
            },
            {
                title:'showConfig',
                description:'4？(y/n)  ',
                defaults: 'y'
            }
        ]

        len = newInit.length;
        i=0;
      }
      if ((len--) > 1) {
        process.stdout.write(newInit[i++].description)
      } else {
          len = newInit.length;
          i=0
          process.stdout.write(newInit[i++].description)
      }
    });
  }
  
  module.exports=initRepl;

 
initRepl(arr => {
    console.log('arrr',arr);
})