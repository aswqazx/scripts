# 云闪付

## 配置
```properties
[MITM]
youhui.95516.com

[Script]
http-request ^https:\/\/youhui\.95516\.com\/newsign\/public\/app\/index script-path=https://raw.githubusercontent.com/aswqazx/scripts/main/unipay/unipay.cookie.js
cron "10 0 0 * * *" script-path=https://raw.githubusercontent.com/aswqazx/scripts/main/unipay/unipay.js
```