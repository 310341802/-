// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../img/swiper/s1.png',
      '../../img/swiper/s2.png',
      '../../img/swiper/s5.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    indicatorColor: '#ddd',
    activeColor: '#24dd82',
    //所有图片的高度
    imgWidth: wx.getSystemInfoSync().windowWidth * 0.9,
    imgHeight: wx.getSystemInfoSync().windowWidth / 1.77 *0.9
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  intro: function(e){
    wx.navigateTo({
      url: 'course-intro/course-intro',
    })
  },
  toSearch:function(e){
    wx.navigateTo({
      url: 'search/search',
    })
  },
  toAdd: function (e) {
    wx.showActionSheet({
      itemList: ["创建课程", "加入课程"],
      success: function (e) {
        if(e.tapIndex==0){
          wx.navigateTo({
            url: '../create/create',
          })
        }
        else if (e.tapIndex == 1){
          wx.navigateTo({
            url: '../join/join',
          })
        }
      }
    })
  }
})