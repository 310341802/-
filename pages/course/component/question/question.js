Component({
  data: {
    taskq:[
      {
        title: "2.1测试",
        state: 0
      },
      {
        title: "4.11实验报告回顾",
        state: 1,
        score:66
      },
      {
        title: "3.1测试",
        state: 1,
        score: 33
      }
    ]
  },
  methods:{
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
    toExams: function () {
      wx.navigateTo({
        url: '/pages/course/component/question/exam/exam',
      })
    }
  },
  properitys:{

  }
    
  
})