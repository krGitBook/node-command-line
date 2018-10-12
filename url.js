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
            headers: { 'content-type': 'application/x-www-form-urlencoded','Cookie':'UM_distinctid=16420318da2a9-05542a3a49c7f3-514b2f1f-100200-16420318da3583; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22164cbc435d15-0c04d68fa36766-514b2f1f-1049088-164cbc435d31c%22%2C%22%24device_id%22%3A%22164cbc435d15-0c04d68fa36766-514b2f1f-1049088-164cbc435d31c%22%2C%22props%22%3A%7B%7D%7D; Qs_lvt_245782=1532426990%2C1532503054; Qs_pv_245782=229461569734546400%2C2063765959821758500%2C159046603151632350; JSESSIONID=0EC3ECE26F18D729551D26975DEE0ABE; CNZZDATA5879641=cnzz_eid%3D139547970-1539307509-%26ntime%3D1539317246' },
            data: loginaccess,
            url:loginurl,
        };
        axios(options).then(res => {
           getJSONdata(projectId)

        })

}

function getJSONdata(projectId) {

        const projectIDstr = querystring.stringify({projectId})
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Cookie': 'UM_distinctid=16420318da2a9-05542a3a49c7f3-514b2f1f-100200-16420318da3583; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22164cbc435d15-0c04d68fa36766-514b2f1f-1049088-164cbc435d31c%22%2C%22%24device_id%22%3A%22164cbc435d15-0c04d68fa36766-514b2f1f-1049088-164cbc435d31c%22%2C%22props%22%3A%7B%7D%7D; Qs_lvt_245782=1532426990%2C1532503054; Qs_pv_245782=229461569734546400%2C2063765959821758500%2C159046603151632350; JSESSIONID=0EC3ECE26F18D729551D26975DEE0ABE; CNZZDATA5879641=cnzz_eid%3D139547970-1539307509-%26ntime%3D1539317246'
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