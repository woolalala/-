// pages/deposite/deposite.js

var myUtils = require("../../utils/myUtils.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: "",
    status:2,
    deposite:299
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  deposite: function() {
    var that = this;
    var phoneNum = myUtils.get("phoneNum");
    wx.showModal({
      title: '提示',
      content: '是否进行充值？',
      success: function(res) {
        if(res.confirm) {
          
          wx.showLoading({
            title: '充值中...',
            mask: true,
            
          })
          
          //调用小程序支付接口，若成功就向后台发送请求 然后更新用户的status
          wx.request({
            url: 'http://localhost:8097/user/deposite',
            method:"POST",
            data: {
              phoneNum: phoneNum,
              status: 2,
              deposite: 299
            },
            success: function () {
              wx.hideLoading()
              getApp().globalData.status = 2
              wx.setStorageSync("status", 2)
              wx.navigateTo({
                url: '../start/start',
              })

            }
          })


        }
      }
    })

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