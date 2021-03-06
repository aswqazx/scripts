const cookieName = '韩剧TV'
const cookieAuthTokenKey = 'hjtv_auth-token'
const cookieAuthUidKey = 'hjtv_auth-uid'
const cookieVcKey = 'hjtv_vc'
const chavy = init()
const resultInfo = {}

!(async () => {
  chavy.log(`${cookieName} 开始签到`)
  await checkin()
  await showNotify()
})()
.catch((e) => {
  chavy.notify(cookieName, '签到: 失败❌', `原因: ${e}`)
  chavy.log(`${cookieName}, 签到: 失败❌, 原因: ${e}`)
})
.finally(() => {
  chavy.log(`${cookieName} 结束签到`)
  chavy.done()
})


function checkin() {
  return new Promise((resolve, reject) => {
    let url = {
      url: `http://api.hanju.koudaibaobao.com/api/userPoint/checkin?_ts=${Date.now()}`,
      headers: {
        'auth-token': chavy.getdata(cookieAuthTokenKey),
        'auth-uid': chavy.getdata(cookieAuthUidKey),
        'vc': chavy.getdata(cookieVcKey)
      }
    }
    chavy.get(url, (error, response, data) => {
      try {
        chavy.log(`${cookieName}, data: ${data}`)
        resultInfo.checkin = JSON.parse(data)
        resolve()
      } catch (e) {
        chavy.notify(cookieName, '签到: 失败❌', `原因: ${e}`)
        chavy.log(`${cookieName} - 签到: 失败❌, 原因: ${e}`)
        chavy.log(`${cookieName} - response: ${JSON.stringify(response)}`)
        resolve()
      }
    })
  })
}

function showNotify() {
  return new Promise((resolve, reject) => {
    let subTitle = ''
    let detail = ''
    if (resultInfo.checkin) {
      subTitle = `签到: `
      if (!!resultInfo.checkin.success) {
        if (resultInfo.checkin.success == true) {
          subTitle += '成功🎉'
          detail = '积分: ' + resultInfo.checkin.pointCount
        } else {
          subTitle += '失败❌'
        }
      } else {
        subTitle += '失败❌'
      }
    }
    chavy.notify(cookieName, subTitle, detail)
    resolve()
  })
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  notify = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return {
    isSurge,
    isQuanX,
    notify,
    log,
    getdata,
    setdata,
    get,
    post,
    done
  }
}