// pages/course/component_t/homework/hw_create/hw_create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    objectArray: [
      {
        id: 1,
        name: '单选题'
      },
      {
        id: 2,
        name: '多选题'
      },
      {
        id: 3,
        name: '填空题'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name = options.name// 作业名字
    

    wx.setNavigationBarTitle({
      title: name,
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