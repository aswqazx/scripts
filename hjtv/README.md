surge配置
[MITM]
api.hanju.koudaibaobao.com

[Script]
http-request ^http:\/\/api\.hanju\.koudaibaobao\.com\/api\/mediaBlock\/stat script-path=https://raw.githubusercontent.com/aswqazx/scripts/main/hjtv/hjtv.cookie.js
cron "10 0 0 * * *" script-path=https://raw.githubusercontent.com/aswqazx/scripts/main/hjtv/hjtv.js