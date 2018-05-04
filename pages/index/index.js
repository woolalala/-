//导包
var myUtils = require("../../utils/myUtils.js")


Page({
  data: {
    log: 116.337747,
    lat: 39.992895,
    controls: [],
    markers: [],
    status: 0
   
  },
 
 //首次加载页面时调用,生命周期函数 监听页面加载
  onLoad: function () {
    var that = this;
    wx.getLocation({
      success: function(res) {
        var longitude = res.longitude
        var latitude = res.latitude
        findBikes(longitude, latitude, that) 
        that.setData({
          log: longitude,
          lat: latitude
        })
      },
    })
    wx.getSystemInfo({
      success: function(res) {
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        that.setData({
          controls: [
            {
              //扫码开锁
              id: 1,  
              iconPath: '/images/lock.png', 
              position: {
                width: 130,
                hight: 60,
                left: windowWidth / 2 - 65,
                top: windowHeight - 50
              },
              clickable: true
            },
            {
              //拖动地图后返回原点
              id: 2,
              iconPath: '/images/back.png',
              position: {
                width: 25,
                hight: 25,
                left: 20,
                top: windowHeight - 30
              },
              clickable: true
            },
            {
              //充值按钮
              id: 3,
              iconPath: '/images/money.png',
              position: {
                width: 22,
                hight: 24,
                left: windowWidth - 40,
                top: windowHeight - 90
              },
              clickable: true
            },
            {
              //报修按钮
              id: 4,
              iconPath: '/images/mistake.png',
              position: {
                width: 22,
                hight: 24,
                left: windowWidth - 40,
                top: windowHeight - 40
              },
              clickable: true
            },
            {
              //大头钉 选定位置
              id: 5,
              iconPath: '/images/location.png',
              position: {
                width: 20,
                hight: 20,
                left: windowWidth/2-10,
                top: windowHeight/2-40
              },
              clickable: true
            },
            {
              //添加单车按钮
              id: 6,
              iconPath: '/images/add.png',
              position: {
                width: 20,
                hight: 20,
                left:5
              },
              clickable: true
            },
          ]
        })
        
      },
    })   
  },
  //控件被点击事件
  controltap: function(e) {
    var that = this;
    var cid = e.controlId;
    switch(cid)  {
      //扫码按钮
      case 1: {
       
        var status = myUtils.get("status");
        //根据用户状态，跳转到对应页面（首次需要注册）
        //若status==0 跳转到手机注册界面
        if(status == 0) {
          //跳转到手机注册界面
          wx.navigateTo({
            url: '../register/register',
          })
        }
        else if(status == 1) {
          wx.navigateTo({
            url: '../deposite/deposite',
          })
        }
        else if(status == 2) {
          wx.scanCode({
            onlyFromCamera:true,
            success: (res) => {console.log(res)}
          })
        }
        break;
      }
      //定位按钮
      case 2: { 
        this.mapCtx.moveToLocation()
        break;
      }
      //添加车辆
      case 6:{
        //获取已有车辆
        //var bikes = that.data.markers;
       
        this.mapCtx.getCenterLocation({
          success: function(res) {
            console.log("add")
            var log = res.longitude;
            var lat = res.latitude;
            /*bikes.push({
                iconPath: "/images/bike.png",
                width: 30,
                height: 30,
                longitude: log,
                latitude: lat
              }) 
            //重新赋值
            that.setData({
                markers: bikes
              })*/
            //将添加单车的数据发送到后台
            wx.request({
              url: 'http://localhost:8097/bike/add',
              data: {
               // longitude: log,
                //latitude: lat,
                location: [log,lat],
                status: 0
              },
              method: 'POST',
              success: function(res) {
                findBikes(log, lat, that) 

              }
            })
          }
        })
        
        break;
      }
    }
  },
  //移动地图后视野变化触发的事件
  regionchange: function(e) {
    var that = this;
    //获取移动后的位置
    var etype = e.type;
    if(etype == 'end') {
      this.mapCtx.getCenterLocation({
        success: function(res) {
          var log = res.longitude;
          var lat = res.latitude;
          findBikes(log, lat, that);

         

        }
      })
      
    }
    
  },
  //生命周期函数，监听页面初次渲染完成
  onReady: function() {
    this.mapCtx = wx.createMapContext('mymap')

  }
   
})


function findBikes(longitude, latitude, that) {
  wx.request({
    url: 'http://localhost:8097/bike/findNear',
    method: "GET",
    data: {
      longitude: longitude,
      latitude: latitude
    },
    success: function(res) {
      var bikes = res.data.map((geoResult) => {
        return {
          longitude: geoResult.content.location[0],
          latitude: geoResult.content.location[1],
          iconPath:"/images/bike.png",
          width: 25,
          height: 25,

        }
      })
      //将bike数组放入markers
      that.setData({
        markers: bikes
      })
    }
  })
}