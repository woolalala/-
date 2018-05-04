// pages/register/register.js
var myUtils = require("../../utils/myUtils.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: "",
    regDate:"",
    status:0
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  
  },
  inputPhoneNum: function(e) {
    this.setData({
      phoneNum: e.detail.value,
    })
  },
  submitPhoneNum: function() {
    var phoneNum = this.data.phoneNum;
    var nowDate = new Date();
    console.log(phoneNum)
    wx.request({
      url: 'http://localhost:8097/user/register',
      data: {
        phoneNum: phoneNum,
        regDate: nowDate,
        status: 1
      },
      method: 'POST',
      success: function(res) {
        wx.showToast({
          title: '注册成功',
        })
        //更新getApp().globalData中的数据是更新内存中的数据
        getApp().globalData.status = 1
        getApp().globalData.phoneNum = phoneNum
        //将用户信息保存到手机储存卡
        wx.setStorageSync("status", 1)
        wx.setStorageSync("phoneNum", phoneNum)
        wx.navigateTo({
          url: '../deposite/deposite',
        })
      }
    })

  },
  formSubmit: function(e) {
    var phoneNum = e.detail.value.phoneNum;

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})