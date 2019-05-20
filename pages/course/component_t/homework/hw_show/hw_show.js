var util = require('../../../../../utils/util.js');
Page({
  data: {
    name: "",//作业名字
    name1:"",//作业备用名字
    start_date: "",//开始日期
    date: '',//截止日期
    showModal: false,
    ans_id: [ //答案的ABCD
      "A", "B", "C", "D", "E", "F", "G"
    ],
    blank_id: [ //答案的ABCD
      "第一空答案", "第二空答案", "第三空答案", "第四空答案", "第五空答案", "第六空答案", "第七空答案"
    ],
    type: [
      "单选题", "多选题", "填空题"
    ],
    /**
     * testList[数据结构
     * {
          question_id: 1,
          question_type: 0, 
          question_desc: "问题描述",
          choice: [
            "选项1", "选项2", "选项3"
          ],
          answer: ["A"] //answer[0]
     * }
     * ]
     */
    testList: [{
        question_id: 1,
        question_type: 0,
        question_desc: "问题描述问题描述问题描述问题描述问题描述问题描述1111111111111111111111",
        choice: [
          "选项1选项1选项11111111111111111111111111111111111111111", "选项2", "选项3选项3选项3选项3"
        ],
        answer: ["A"]
      },
      {
        question_id: 2,
        question_type: 1,
        question_desc: "问题描述",
        choice: [
          "选项111111111111111111111111111111111111111111111", "选项2", "选项3", "选项4"
        ],
        answer: ["ABD"]
      },
      {
        question_id: 3,
        question_type: 2,
        question_desc: "问题描述",
        //填空题没有选项choice只有answer
        answer: ["答案11111111111111a111111111111111111111111111", "答案2"]
      }
    ]
  },
  //保存临时修改
  saveQuestion:function(e){
    console.log(this.data.testList)
    wx.showModal({
      title: '提示',
      content: '是否保存临时修改',
      success:function(res){
        if(res.confirm){
          //(待修改)将testList和name保存到服务器,页面自动返回上层
          wx.showToast({
            title: '保存修改成功',
          })
          setTimeout(function(){
            wx.navigateBack({
              
            })
          },1500)
        }else{

        }
      }
    })
  },
  //创建下一题
  createQuestion:function(e){
    wx.navigateTo({
      url: 'hw_addQues/hw_addQues?index='+this.data.testList.length,
    })
  },
  onLoad: function(options) {
    this.setData({
      start_date: util.formatTime(new Date()),
      name: options.name,
      name1:options.name,
    })
  },
  //输入更改标题
  changeName: function(e) {
    if (e.detail.value == "") {
      wx.showToast({
        title: '标题不可为空',
        icon: "none"
      })
      this.setData({
        name:this.data.name1
      })
      return false
    } else {
      this.setData({
        name: e.detail.value
      })
      wx.showToast({
        title: '请保存修改',
      })
    }
  },
  edititem:function(e){
    var that = this
    var list = this.data.testList
    
    var index = e.currentTarget.dataset.set
    
    wx.navigateTo({
      url: '../hw_edit/hw_edit?question=' + JSON.stringify(list[index]) + "&index=" + index,
    })
    
  },
  delitem: function(e) {
    var that = this
    var list = this.data.testList
    var index = e.currentTarget.dataset.set
    wx.showModal({
      title: '提示',
      content: '确定删除第' + (index + 1) + '题' + that.data.type[that.data.testList[index].question_type],
      success(res) {
        if (res.confirm) {
          //删除
          list.splice(index, 1);
          //更新列表的状态
          that.setData({
            testList: list
          });
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })

        } else if (res.cancel) {

        }
      }
    })
  },
  showDialogBtn: function(e) {
    
    if (this.data.testList.length == 0) {
      wx.showToast({
        title: '发布失败，请创建题目',
        icon: "none"
      })
      return false
    } else {
      this.setData({
        showModal: true,
        date: util.formatTime(new Date())
      })
    }
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  //发布作业
  GetName: function(e) {

    wx.showToast({
      title: '发布成功',
    })
    this.hideModal();
    setTimeout(function(){
      //(待修改)需要将根据作业id将其状态设置为发布,添加到publishedList中,并且更新name(title)到数据库
      //参数有name testList 开始日期start_date和截止日期date (this.data)
      wx.navigateBack({
        
      })
    },1000)

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