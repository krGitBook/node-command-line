/*
 * @description 将rap导出的html接口转化为json格式
 * @author mori
 * @createTime 20180824
 */

const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');
var yapiGroups = [];
var actionPath = '';
var activeName = '';

const RapDataDir = path.resolve(__dirname, './rap-data');

const dataJson = fs.readdirSync(RapDataDir);

foreachRapData();

function foreachRapData() {

  dataJson.forEach((dirPath) => {
    let jsonDir = '';
    yapiGroups = []
    if (checkDirExist(RapDataDir + "/" + dirPath)) {
      actionPath = dirPath;
      jsonDir = path.resolve(__dirname, `./api-json/${actionPath}`);
      if (!checkDirExist(jsonDir)) {
        fs.mkdirSync(jsonDir);
      }
      var groupArr = fs.readdirSync(RapDataDir + "/" + dirPath)
      groupArr.forEach((groupPath) => {
        let oldPath = groupPath.split('.json')[0];
        groupPath = RapDataDir + "/" + dirPath + '/' + groupPath
        var jsonData = fs.readFileSync(groupPath, 'utf-8');
        // console.log(oldPath,"kkk")
        yapiGroups.push({
          name:oldPath,
          list:getEveryRapData(JSON.parse(jsonData))
        });
      })
      fs.writeFileSync(`${jsonDir}/${activeName}.json`, JSON.stringify(yapiGroups))
    } else {

    }

  })

}
function getEveryRapData(data) {
  var modulesList = data.projectData.moduleList;
  var list = [];
  modulesList.forEach((modulesItem) => {
    var name = '';

    var pageList = modulesItem.pageList;

    pageList.forEach((pageItem) => {
      actionList = pageItem.actionList;
      name = pageItem.name
      if(name.indexOf('某页面')!=-1){
        name = '';
      }
      actionList.forEach((actionItem) => {
        var method = getMethod(actionItem.requestType)
        var obj = {
          type: "static",
          'res_body_is_json_schema': true,
          'req_body_is_json_schema': true,
          'res_body_type': 'json',
          
          'req_headers': [
            {
              "required": "1",
              "name": "Content-Type",
              "value": "application/x-www-form-urlencoded"
            }
          ],
          'res_body': JSON.stringify({
            type: 'object',
            properties: getBody(actionItem.responseParameterList)
          }),
          // 'res_body': '',
          method: getMethod(actionItem.requestType),
          title: name?`${name}-${actionItem.name}`:actionItem.name,
          path:getpath(actionItem.requestUrl) ,
        }
        if(method == 'get'||method == 'delete'){
          obj['req_query'] = getReqQuery(actionItem.requestParameterList);
        }else{
          obj['req_body_form'] = getReqQuery(actionItem.requestParameterList);
          obj['req_body_type'] = "form";
        }
        if('/api/op/order-seat/data-adjust/list' == actionItem.requestUrl){
          // console.log(actionItem.responseParameterList,"kkk")c
        }
        list.push(obj)
        activeName = `${trim(modulesItem.name)}--${trim(pageItem.name)}--${trim(actionItem.name)}`
      })
    })



    // console.log(modulesItem,"kkkk")

  })
  return list;

}

function trim(str) {
  return str.replace(/\//g, '').trim()
}
function getMethod(type) {
  if (type == 1) {
    return 'get'
  } else if (type == 2) {
    return 'post'
  } else if (type == 3) {
    return 'put'
  } else if (type == 4) {
    return 'delete'
  } else {
    return 'get'
  }
}

function getBody(data) {

  var properties = {};

  data.map((item) => {
    if (item.parameterList) {
      let name = getname(item.identifier);
      let type = getType(item.dataType);
      properties[name] = {
        type: type.mainType,
        description: item.remark||item.name,
        
      }
      if(type.mainType == 'array'){
        properties[name].items = {
          type:type.childrenType,
          properties:getBody(item.parameterList)
        }
      }else{
        properties[name].properties = getBody(item.parameterList)
      }
      if (JSON.stringify(properties[name].properties) == '{}') {
        delete properties[name].properties
      }
    } else {
      properties[item.identifier] = { type:type.mainType , description: item.remark }
    }

  })
  return properties;

}
function getpath(path){
  if(path[0]!='/'){
    return '/'+path;
  }
  return path;
}
//获取字段名
function getname(name){
  if(name.indexOf('|')!=-1){
    // console.log(name,"kkkkkkkk")
    return name.split('|')[0]
  }

  return name;
}
// 获取字段数据类型
function getType(type){
  if(type.indexOf('array<')!=-1){
     return {
      mainType:type.split('<')[0],
      childrenType:type.split('<')[1].replace('>','')
     }
  }
  return {
    mainType:type,
    childrenType:''
  };
}

function getReqQuery(data) {
  var queryArr = [];
  data.map((item) => {
    queryArr.push({
      name: item.identifier,
      desc: item.remark||item.name,
      type: 'text',
      example: '',
      required: '1'
    })
  })
  return queryArr;
}

function checkDirExist(pathinit) {
  try {
    return fs.statSync(pathinit).isDirectory();
  }
  catch (e) {

    if (e.code == 'ENOENT') { // no such file or directory. File really does not exist
      console.log("File does not exist.");
      return false;
    }

    console.log("Exception fs.statSync (" + pathinit + "): " + e);
    throw e; // something else went wrong, we don't have rights, ...
  }
}
