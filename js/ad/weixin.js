/*
[Script]
http-response https:\/\/mp\.weixin\.qq\.com\/mp\/(getappmsgext|getappmsgad),requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/aswqazx/scripts/main/js/ad/weixin.js
[MITM]
hostname = mp.weixin.qq.com
*/
let resp = $response.body;
try {
    resp = JSON.parse(resp);
    resp.advertisement_num=0;
    resp.advertisement_info=[];
    delete resp.appid;
    resp = JSON.stringify(resp);
} catch (e) {
    console.log(`weixin ad error:\n${e.message}`);
}

$done({body: resp});