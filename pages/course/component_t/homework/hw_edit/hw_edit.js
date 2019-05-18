// pages/course/component_t/homework/hw_edit/hw_edit.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checked:[],
    index:'',
    ans_id: [ //答案的ABCD
      "A", "B", "C", "D", "E", "F", "G"
    ],
    blank_id: [ //答案的ABCD
      "第一空答案", "第二空答案", "第三空答案", "第四空答案", "第五空答案", "第六空答案", "第七空答案"
    ],
    ques_type:["单选题","多选题","填空题"],
    question:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      question:JSON.parse(options.question),
      index:options.index
    })
    /*初始化单选多选的选中*/
   

    if (this.data.question.question_type == 0)
    {
      var checked = this.data.checked
      for (var i = 0; i < this.data.question.answer[0].length; i++) {
        for (var j = i; j < this.data.question.choice.length; j++) {
          if (this.data.question.answer[0].charAt(i) == this.data.ans_id[j]) {
            checked[j] = 'true'
          }
          else {
            checked[j] = ''
          }
        }
      }
      this.setData({
        checked: checked
      })
    }
    else if (this.data.question.question_type == 1){
      var checked = this.data.checked
      for (var i = 0; i < checked.length; i++)
        checked[i] = ''

      for (var i = 0; i < this.data.question.answer[0].length; i++) {
        switch (this.data.question.answer[0].charAt(i)) {
          case "A": checked[0] = 'true'; break;
          case "B": checked[1] = 'true'; break;
          case "C": checked[2] = 'true'; break;
          case "D": checked[3] = 'true'; break;
          case "E": checked[4] = 'true'; break;
          case "F": checked[5] = 'true'; break;
          case "G": checked[6] = 'true'; break;
        }
      }
      this.setData({
        checked: checked
      })
    }
    
  },
  additem: function (e) {
    
    var that = this.data.question
    if(that.question_type!=2){
      //添加选项
      if (that.choice.length == 7) {
        wx.showToast({
          title: '最多添加7个选项',
          icon: 'none',
          duration: 2000
        })
        return false
      }
      else {
        var temp = that
        temp.choice.push({})
        temp.choice[temp.choice.length - 1] = ''
        this.setData({
          question: temp
        })
      }

    }else{
      if (that.answer.length == 7) {
        wx.showToast({
          title: '最多添加7个选项',
          icon: 'none',
          duration: 2000
        })
        return false
      }
      else {
        var temp = that
        temp.answer.push({})
        temp.answer[temp.answer.length - 1] = ''
        this.setData({
          question: temp
        })
      }
    }
    
  },
  radioChange:function(e){
    var que = this.data.question
    que.answer[0] = e.detail.value
    this.setData({
      question: que 
    })
    if (this.data.question.question_type != 2) {
      var checked = this.data.checked
      for (var i = 0; i < this.data.question.answer[0].length; i++) {
        for (var j = i; j < this.data.question.choice.length; j++) {
          if (this.data.question.answer[0].charAt(i) == this.data.ans_id[j]) {
            checked[j] = 'true'
          }
          else {
            checked[j] = ''
          }
        }
      }
      this.setData({
        checked: checked
      })
    }
 
  },
  checkboxChange:function(e){
    var que = this.data.question
    que.answer[0]=''
    var ans = e.detail.value.sort()
   

    for(var i = 0;i<ans.length;i++){
      que.answer[0]+=ans[i]
    }
    this.setData({
      question:que
    })
    var checked = this.data.checked
    for(var i =0; i<checked.length;i++)
      checked[i]=''

    for (var i = 0; i < this.data.question.answer[0].length; i++){
      switch (this.data.question.answer[0].charAt(i)){
        case "A": checked[0] = 'true';break;
        case "B": checked[1] = 'true'; break;
        case "C": checked[2] = 'true'; break;
        case "D": checked[3] = 'true'; break;
        case "E": checked[4] = 'true'; break;
        case "F": checked[5] = 'true'; break;
        case "G": checked[6] = 'true'; break;
      }
    }
    this.setData({
      checked:checked
    })
  },
  updateDesc:function(e){
    var que = this.data.question
    que.question_desc = e.detail.value
    this.setData({
      question:que
    })
  },
  updateChoice:function(e){
    var que = this.data.question
    que.choice[e.currentTarget.dataset.set] = e.detail.value
    this.setData({
      question: que
    })
  },
  updateAns:function(e){
    var que = this.data.question
    que.answer[e.currentTarget.dataset.set] = e.detail.value
    this.setData({
      question: que
    })
  },
  delitem: function (e) {
    var that = this.data.question
    if (that.question_type != 2) {
      //添加选项
      if (that.choice.length == 2) {
        wx.showToast({
          title: '最少保留2个选项',
          icon: 'none',
          duration: 2000
        })
        return false
      }
      else {
        var temp = that
        var checked = this.data.checked
        if (checked[temp.choice.length - 1]=='true')
        {
          if(that.question_type == 0){
            temp.answer[0] = ""
          }
          else{
            temp.answer[0]= temp.answer[0].substr(0, temp.answer[0].length - 1)
          }
          checked[temp.choice.length - 1] = ''
          this.setData({
            checked: checked
          })
        }
        temp.choice.pop({})
        this.setData({
          question: temp
        })
      }

    } else {
      if (that.answer.length == 1) {
        wx.showToast({
          title: '最少保留1个选项',
          icon: 'none',
          duration: 2000
        })
        return false
      }
      else {
        var temp = that
        temp.answer.pop({})
        this.setData({
          question: temp
        })
        
      }
    }
  },
  GetSingle:function(e){
    var that = this.data.question
    var me = this
    if(that.question_desc == ""){
      wx.showToast({
        title: '问题描述不可为空',
        icon:"none"
      })
      return false
    }
    if(that.answer[0]==""){
      wx.showToast({
        title: '请选择正确答案',
        icon: "none"
      })
      return false
    }
    for(var i =0;i < that.choice.length ;i++){
      if(e.detail.value[i]==""){
        wx.showToast({
          title: '请填写第'+(i+1)+"项答案",
          icon: "none"
        })
        return false
      }
    }
    wx.showModal({
      title: '提示',
      content: '是否保存修改',
      success:function(res){
        if(res.cancel){}
        else{
          wx.showToast({
            title: '保存成功',
            success:function(res){

              let pages = getCurrentPages()
              let prePage = pages[pages.length - 2]
              var preList = prePage.data.testList
              preList[me.data.index] = that
              
              prePage.setData({
                testList: preList
              })

              setTimeout(function(){
                wx.navigateBack({
                })
              },1500)
              
            }
          })
         
        }
        
      }
    })
    
  },
  GetBlank:function(e){
    var that = this.data.question
    var me = this
    if (that.question_desc == "") {
      wx.showToast({
        title: '问题描述不可为空',
        icon: "none"
      })
      return false
    }
    for (var i = 0; i < that.answer.length; i++) {
      if (e.detail.value[i] == "") {
        wx.showToast({
          title: '请填写第' + (i + 1) + "项答案",
          icon: "none"
        })
        return false
      }
    }
    wx.showModal({
      title: '提示',
      content: '是否保存修改',
      success: function (res) {
        if (res.cancel) { }
        else {
          wx.showToast({
            title: '保存成功',
            success: function (res) {
              let pages = getCurrentPages()
              let prePage = pages[pages.length - 2]
              var preList = prePage.data.testList
              preList[me.data.index] = that
              prePage.setData({
                testList: preList
              })

              setTimeout(function () {
                wx.navigateBack({
                })
              }, 1000)

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