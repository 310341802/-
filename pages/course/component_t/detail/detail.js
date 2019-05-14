// pages/course/component/detail/detail.js
Component({
  /**
   * 页面的初始数据
   */
  data: {
    
   
    intro: [
      {
        title: "课程简介",
        status: 0,
        con: "123",
        src: "/img/detail/intro.png"
      },
      {
        title: "学习要求",
        status: 0,
        con: "123",
        src: "/img/detail/study.png"
      },
      {
        title: "教学进度",
        status: 1,
        con: "进度描述进度描述进度描述进度描述进度描述进度描述进度描述进度描述进度描述进度描述进度描述进度描述进度描述进度描述进度描述进度描述进度描述进度描述",
        src: "/img/detail/progess.png"
      }
      ,
      {
        title: "考试安排",
        status: 1,
        con: "第八周考试",
        src: "/img/detail/exam.png"
      }
    ],
    classify: [
      {
        title: "班级",
        status: 1,
        desc: "16软件4班",
        src: "/img/detail/class.png"
      },
      {
        title: "分类",
        status: 1,
        desc: "计算机",
        src: "/img/detail/classify.png"

      },
      {
        title: "所属学期",
        status: 1,
        desc: "2019年下学期",
        src: "/img/detail/schedule.png"
      }
    ]
  },
  methods: {
    
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
    copyId: function () {
      wx.setClipboardData({
        data: "" + this.data.courseId,
      })
    },
    toTeacherInfo: function () {
      wx.navigateTo({
        url: '/pages/course/component_t/detail/teacher_edit/teacher_edit',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  properties: {
    /*这里拿来设置参数,小老弟 */
  }
})