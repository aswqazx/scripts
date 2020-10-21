surge配置
[MITM]
youhui.95516.com

[Script]
http-request ^https:\/\/youhui\.95516\.com\/newsign\/public\/app\/index\.html script-path=https://raw.githubusercontent.com/aswqazx/scripts/main/unipay/unipay.cookie.js
cron "10 0 0 * * *" script-path=https://raw.githubusercontent.com/aswqazx/scripts/main/unipay/unipay.cookie.js