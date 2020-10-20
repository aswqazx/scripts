const cookieName = '云闪付'
const cookieKey = 'cookie_unipay'
const chavy = init()
const resultInfo = {}

;(exec = async () => {
  chavy.log(`🔔 ${cookieName} 开始签到`)
  await checkin()
  await showNotify()
  chavy.done()
})().catch((e) => chavy.log(`❌ ${cookieName} 签到失败: ${e}`), chavy.done())

function checkin() {
  return new Promise((resolve, reject) => {
    let url = {
      url: `https://youhui.95516.com/newsign/api/daily_sign_in`,
      headers: {
        Cookie: chavy.getdata(cookieKey)
      }
    }
    chavy.post(url, (error, response, data) => {
      try {
        resultInfo.checkin = JSON.parse(data)
        resolve()
      } catch (e) {
        chavy.msg(cookieName, `签到: 失败`, `${data} == 说明: ${e}`)
        chavy.log(`❌ ${cookieName} - 签到失败: ${e}`)
        chavy.log(`❌ ${cookieName} - response: ${JSON.stringify(response)}`)
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
      if (!!resultInfo.checkin.signedIn) {
        if (resultInfo.checkin.signedIn == true) {
          subTitle += '成功; '
        } else {
          subTitle += '失败; '
        }
      } else {
        subTitle += '失败; '
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