function randomString(len) {
  if (!len) {
    len = 32
  }
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = $chars.length;
  var pwd = '';
  for (var i = 0; i < len; i += 1) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

// Browser environment sniffing
// var inBrowser = typeof window !== 'undefined';
// var UA = inBrowser && window.navigator.userAgent.toLowerCase();
// var isIE = UA && /msie|trident/.test(UA);
// var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
// var isEdge = UA && UA.indexOf('edge/') > 0;
// var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
// var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
// var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

export {
  randomString
}