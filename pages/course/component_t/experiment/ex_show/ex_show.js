// pages/course/component_t/experiment/ex_show/ex_show.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    type: [""],//文件格式
    //(待修改)从上个实验中获取实验详情，涉及到json的转换
    exList: "",//实验
    /*
    stuT: [{已经上传实验作业的学生List(status=1)
      userId: 2,
      userName: '谢国城',
      upTime: '2019-05-19',
      status: 1
    }]
    stuF:[{没有上传实验作业的学生List(status=0)
      userId: 1,
      userName: '许伟杰',
      upTime: '',
      status: 0
    }]
    */ 
    //(待修改)获取该课程的学生及学生参与该项实验的status
    stuT: [{
      userId: 2,
      userName: '谢国城',
      upTime: '2019-05-19',
      status: 1
    },
      {
        userId: 4,
        userName: '蒸铃声',
        upTime: '2019-05-20',
        status: 1
      }
    ],
    stuF: [{
      userId: 1,
      userName: '许伟杰',
      upTime: '',
      status: 0
    },
      {
        userId: 3,
        userName: '肖展洲',
        upTime: '',
        status: 0
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var exList = JSON.parse(options.ex)
    this.setData({
      exList: exList
    })
    var type = this.data.type

    for (var i = 0; i < exList.fileName.length; i++) {
      var substr = exList.fileName[i].split(".")
      switch (substr[substr.length - 1]) {
        case "doc":
          type[i] = "word.png";
          this.setData({
            type: type
          });
          break;
        case "ppt":
          type[i] = "point.png";
          this.setData({
            type: type
          });
          break;
        case "pdf":
          type[i] = "text.png";
          this.setData({
            type: type
          });
          break;
        case "xls":
          type[i] = "excel.png";
          this.setData({
            type: type
          });
          break;
        case "mp4":
          type[i] = "vedio.png";
          this.setData({
            type: type
          });
          break;
        default:
          type[i] = "un.png";
          this.setData({
            type: type
          });
          break;
      }
    }
  },
  toStu:function(e){
    wx.navigateTo({
      //(待修改)传值进入学生详情页面
      url: '../../member/member-intro/member-intro',
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

  }
})