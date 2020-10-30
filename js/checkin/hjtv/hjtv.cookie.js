const cookieName = '韩剧TV'
const cookieAuthTokenKey = 'hjtv_auth-token'
const cookieAuthUidKey = 'hjtv_auth-uid'
const cookieVcKey = 'hjtv_vc'
const chavy = init()

!(async () => {
  const cookieAuthTokenVal = $request.headers['auth-token']
  const cookieAuthUidVal = $request.headers['auth-uid']
  const cookieVcVal = $request.headers['vc']
  if (cookieAuthTokenVal && cookieAuthUidVal && cookieVcVal) {
    if (chavy.setdata(cookieAuthTokenVal, cookieAuthTokenKey) 
    && chavy.setdata(cookieAuthUidVal, cookieAuthUidKey) 
    && chavy.setdata(cookieVcVal, cookieVcKey)) {
      chavy.notify(cookieName, '获取Cookie: 成功🎉', '')
      chavy.log(`${cookieName}, 获取Cookie: 成功🎉`)
    }
  }
})()
.catch((e) => {
  chavy.notify(cookieName, '获取Cookie: 失败❌', `原因: ${e}`)
  chavy.log(`${cookieName}, 获取Cookie: 失败❌, 原因: ${e}`)
})
.finally(() => {
  chavy.done()
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