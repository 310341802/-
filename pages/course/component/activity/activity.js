// pages/course/component/activity/activity.js 
Component({

  /**
   * 页面的初始数据
   */
  data: {
    activity: [{
        title: "实验一:制作双绞线",
        statement: "已结束",
        time: "03.11 18:53 发布",
        engage: "已提交",
        status: 1,
        score: 83
      },
      {
        title: "实验二:VLAN虚拟局域网划分",
        statement: "进行中",
        time: "03.25 16:50 发布",
        engage: "未提交",
        status: 0
      }
      ,
      {
        title: "实验三:横穿局域网",
        statement: "已结束",
        time: "03.28 16:50 发布",
        engage: "未提交",
        status: 0,
        score: 0
      }
    ]
  },
  methods: {
    onLoad: function(options) {
      wx.setNavigationBarTitle({
        title: '计算机网络',
      })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    toExperiment: function() {
      wx.navigateTo({
        url: '/pages/course/component/activity/experiment/experiment',
      })
    }
  },
  properties:{
    /*这里拿来设置参数,小老弟 */
    innerText: {
      type: String,
      value: 'default value',
    }
  }
})