const axios = require('axios')
const loginurl = ` http://rap.krspace.cn/account/doLogin.do`
const projectIDurl = `http://rap.krspace.cn/workspace/loadWorkspace.do`
const downUrl = `http://rap.krspace.cn/workspace/export.do?projectId=`
const projectUrl = 'http://rap.krspace.cn/org/group/all.do?productlineId='
const querystring = require('querystring');
const fs = require('fs')
const path = require('path');

var doemNum = 0;
var doemNum2 = 0;
const groups = [7,8,9,10,11,13]
// const groups = [7]
var projectsArr = []
axios.defaults.withCredentials = true
var cookie = 'JSESSIONID=338040BFD6FEC9AD5AAA7AA9D88BDF6F';
function login(projectId, username, password, callback) {

    // const loginaccess = querystring.stringify({ 'account': username, 'password': password })
    // const options = {
    //     method: 'POST',
    //     headers: {
    //         'content-type': 'application/x-www-form-urlencoded',
    //         'Cookie': cookie
    //     },
    //     data: loginaccess,
    //     url: loginurl,
    // };
    // axios(options).then(res => {
        for (let i = 0; i < groups.length; i++) {
            (function(j){
                setTimeout(function () {
                    getProject(groups[j], function (arr) {
                        arr.map((item) => {
                            getJSONdata(item, callback)
                        })
                    });
                }, j * 100)
            })(i)
            
        }
    // })

}
// 获取项目
function getProject(groupId, callback) {
    axios({
        method: 'get',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': cookie
        },
        url: projectUrl + groupId
    }).then(res => {
        if(typeof res.data == 'string'){
            console.log(projectUrl + groupId, res.data,"kk")
        }
        let groups = res.data.groups;
        
        // return ;
        var arr = [];
        for (let i = 0; i < groups.length; i++) {
            var projects = groups[i].projects;
            for (let j = 0; j < projects.length; j++) {
                arr.push({ id: projects[j].id, name: groups[i].name });
            }
        }
        callback(arr)
    })
}

function downHtml(projectId, name, groupName) {
    doemNum++;

    axios(downUrl + projectId).then(res => {
        fs.writeFileSync(`./api-html/${groupName}-${name.replace('/', '')}.html`, res.data, function (err) {
            if (err) {
                console.log('失败', pageName, err)
                return
            }
        });

    })
}
function getJSONdata(obj, callback) {
    const projectIDstr = querystring.stringify({ projectId: obj.id })
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': cookie
        },
        data: projectIDstr,
        url: projectIDurl,
        responseType: 'json'
    };
    axios(options).then(res => {
        var data = {};
        if (typeof res.data == 'string') {
            data = eval('(' + res.data + ')')
        } else {
            data = res.data
        }

        var modeldir = path.resolve(__dirname, `./rap-data/${obj.name.trim()}`)
        if(!checkDirExist(modeldir) ){
            fs.mkdirSync(modeldir);
        }
        // downHtml(obj.id,data.projectData.name,obj.name)
    //    console.log(checkDirExist( path.resolve(__dirname, `./api-html${obj.name}`)))


        fs.writeFileSync(`./rap-data/${obj.name.trim()}/${data.projectData.name.replace('/','').trim()}.json`, JSON.stringify(data), function (err) {
            if (err) throw err;
            console.log('获取数据成功');
        });



    })
    // })(projectId)
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

(function () {
    const username = 'admin'
    const password = '123456'
    const projectId = 3
    login(projectId, username, password)
})()
