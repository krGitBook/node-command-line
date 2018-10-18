const  axios = require('axios')
const loginurl = ` http://rap.krspace.cn/account/doLogin.do`
const projectIDurl = `http://rap.krspace.cn/workspace/loadWorkspace.do`
const querystring = require('querystring');
const fs = require('fs')
axios.defaults.withCredentials=true
function login(projectId,username,password) {

        const loginaccess = querystring.stringify({ 'account': username,'password': password })
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded',
            'Cookie': 'JSESSIONID=A186C5ADF5FE27A48E93A4A16BBC62A6;'
        },
                    data: loginaccess,
                url:loginurl,
        };
        axios(options).then(res => {
            console.log(res.request)
           getJSONdata(projectId)

        })

}

function getJSONdata(projectId,cook) {

        const projectIDstr = querystring.stringify({projectId})
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Cookie': 'JSESSIONID=A186C5ADF5FE27A48E93A4A16BBC62A6;'
            },
            data: projectIDstr,
            url: projectIDurl,
            responseType: 'json'
        };
        axios(options).then(res => {
            fs.writeFile('./data.json', JSON.stringify(eval('('+res.data+')'),null,2), function (err) {
                if (err) throw err;
                console.log('获取数据成功');
            });
        })

}


module.exports = {login}