


//get
function get(key) {
  var value = wx.getStorageSync(key);
  //没有取到
  if (!value) {
    status = getApp().globalData[key];
  }
  return value;
}

 module.exports = {
   get

 }