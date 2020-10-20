const cookieName = '云闪付'
const cookieKey = 'cookie_unipay'
const chavy = init()

!(async () => {
  chavy.log(`🔔 ${$.name}, 获取Cookie: 开始!`)
  const cookieVal = $request.headers['Cookie']
  if (cookieVal) {
    if (chavy.setdata(cookieVal, cookieKey)) {
      chavy.notify(`${cookieName}`, '🔔 获取Cookie: 成功', '')
      chavy.log(`[${cookieName}] 获取Cookie: 成功, cookie: ${cookieVal}`)
    }
  } else {
    chavy.notify(`${cookieName}`, '获取Cookie: 失败', '')
  }
})()
.catch((e) => {
  chavy.notify(`${cookieName}`, '❌ 获取Cookie: 失败', `原因: ${e}`)
  chavy.log(`❌ ${$.name}, 获取Cookie: 失败! 原因: ${e}`)
})
.finally(() => {
  chavy.log(`🔔 ${$.name}, 获取Cookie: 结束!`)
})

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
  setdata = (val, key) => {
    if (isSurge()) return $persistentStore.write(val, key)
    if (isQuanX()) return $prefs.setValueForKey(val, key)
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
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
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
chavy.done()