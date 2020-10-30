# 韩剧TV

## 配置
```properties
[MITM]
api.hanju.koudaibaobao.com

[Script]
http-request ^http:\/\/api\.hanju\.koudaibaobao\.com\/api\/mediaBlock\/stat script-path=https://raw.githubusercontent.com/aswqazx/scripts/main/js/checkin/hjtv/hjtv.cookie.js
cron "10 0 0 * * *" script-path=https://raw.githubusercontent.com/aswqazx/scripts/main/js/checkin/hjtv/hjtv.js
```