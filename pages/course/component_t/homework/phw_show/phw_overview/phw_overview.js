// pages/course/component_t/homework/phw_show/phw_overview/phw_overview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     /**
     * quesList[数据结构
     * {
          questionId: 1,
          questionType: 1,//单选1多选2
          questionDesc: "问题描述",
          choice: [//填空题choice为空，仅有answer[i]
            "选项1", "选项2", "选项3"
          ],
          answer: ["A"] //单选多选答案为answer[0]
          userAns:["B"] //用户的答案
     * }
     * ]
     */
    navTitle:'',//用户
    sumGrade:'',//本次作业得分
    quesList:[
      {
        questionId: 1,
        questionType: 1,
        questionDesc: "问题描述",
        choice: [
          "选项1", "选项2", "选项3"
        ],
        answer: ["A"],
        userAns: ["B"],
        grade: '',
      },
      {
        questionId: 2,
        questionType: 2,
        questionDesc: "问题描述",
        choice: [
          "选项111111111111111111111111111111111111111111111", "选项2", "选项3", "选项4"
        ],
        answer: ["ABD"],
        userAns: ["ABD"],
        grade:'',
      },
      {
        questionId: 2,
        questionType: 3,
        questionDesc: "问题描述",
        choice: [],
        answer: ["答案1","答案2"],
        userAns: ["答案1","答案2"],
        grade: '',
      }
     
    ]
  },
  lookQues:function(e){
    wx.navigateTo({
      //(待修改)需要使用base64进行传输
      url: 'look_ques/look_ques?list=' + JSON.stringify(this.data.quesList) + '&index=' + e.currentTarget.dataset.set+'&navTitle='+this.data.navTitle,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.stuName+"的作业报告",
    })
    //修改用户grade
    var sum = 0
    var that = this.data.quesList
    for(var i=0;i<that.length;i++){//遍历所有题目
      var flag = 1//设置flag
      for (var j = 0; j < that[i].answer.length; j++) {//遍历每一题的答案   
        if (that[i].answer[j] != that[i].userAns[j]) {
          flag = 0//如果某题的答案其中一个对不上，则该题得分为0
          break
        }
      }
      if(flag == 0){
        that[i].grade=0//该题得分为0
      }
      else{
        //该题得分为100/题目个数
        that[i].grade = (100 / that.length ).toPrecision(3)*1
        sum += that[i].grade
      }
    }
    this.setData({
      quesList:that,
      sumGrade: sum,
      navTitle:options.stuName+"的作业报告"
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