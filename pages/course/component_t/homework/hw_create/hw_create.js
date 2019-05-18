// pages/course/component_t/homework/hw_create/hw_create.js

Page({

  data: {
    index: 0,//当前页面
    single: "",//单选题答案
    mutil: "",//多选题答案
    checked:false,
    objectArray: [{//问题类型
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
    ],
    ans_id: [//答案的ABCD
      "A", "B", "C", "D", "E", "F", "G"
    ],
    ans:[//input.ans[0]
      "ans[0]", "ans[1]", "ans[2]", "ans[3]", "ans[4]", "ans[5]", "ans[6]"
    ],
    radioArray: [//单选行(2)
      {
      },
      {
      }
    ],
    checkboxArray: [//多选行(2)
      {
      },
      {
      }
    ],
    blankArray: [//填空行(1)
      {
      }
    ]
  },
  /**
   * 删除和添加事件
   */
  additem: function(e) {
    if (e.currentTarget.id == 0) {
      var that = this.data.radioArray
    } else if (e.currentTarget.id == 1) {
      var that = this.data.checkboxArray
    }
    else if(e.currentTarget.id ==2){
      var that = this.data.blankArray
    }
    else{
      wx.showToast({
        title: '系统错误',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    //添加选项
    if (that.length == 7) {
      wx.showToast({
        title: '最多添加7个选项',
        icon: 'none',
        duration: 2000
      })
      return false
    } 
    else {
      var temp = that
      temp.push({})
      if (e.currentTarget.id == 0){
        this.setData({
          radioArray: temp
        })
      }
      else if (e.currentTarget.id == 1){
        this.setData({
          checkboxArray: temp
        })
      } 
      else if(e.currentTarget.id ==2){
        this.setData({
          blankArray:temp
        })
      }
    }

  },
  delitem: function(e) {
    if (e.currentTarget.id == 0) {
      var that = this.data.radioArray
    } else if (e.currentTarget.id == 1) {
      var that = this.data.checkboxArray
    } else if (e.currentTarget.id == 2) {
      var that = this.data.blankArray
    }
    else {
      wx.showToast({
        title: '系统错误',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    //删除选项
    if (that.length == 2 && this.data.index != 2) {
      wx.showToast({
        title: '最少保留2个选项',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    else if (that.length == 1 && this.data.index == 2){
      wx.showToast({
        title: '最少保留1个选项',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    else {
      var temp = that
      temp.pop({})
      if (e.currentTarget.id == 0) {
        if (this.data.single == this.data.ans_id[that.length])
          this.setData({
            single:""
          })
        this.setData({
          radioArray: temp
        })
      }
      else if (e.currentTarget.id == 1) {
        var val = this.data.mutil
        if(this.data.mutil[val.length-1] == this.data.ans_id[that.length]){
          val.pop({})
        }
        this.setData({
          checkboxArray: temp,
          mutil:val
        })
      }
      else if (e.currentTarget.id == 2) {
        this.setData({
          blankArray: temp
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var name = options.name // 作业名字

    wx.setNavigationBarTitle({
      title: name,
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
  /*
   *改变下拉列表的值(改变题目类型)
   */
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  /*
   * 单选题更新所选到data.single
   */
  radioChange: function(e) {

    //将单选题的答案保存到this.data.single
    this.setData({
      single: e.detail.value
    })
  },
  /**
   * 多选更新所选到data.mutil
   */
  checkboxChange: function(e) {
    this.setData({
      mutil: e.detail.value.sort()
     })
  },
  /*单选题提交*/  
  GetSingle:function(e){
    var that = this

    if (e.detail.value.textarea == ""){
      wx.showToast({
        title: '问题不可为空',
        icon: "none"
      })
      return false
    }
    if (that.data.single == ""){
      wx.showToast({
        title: '请选择正确答案',
        icon: "none"
      })
      return false
    }
    
    var ans = "",
        val = ""
    for(var i = 0;i<that.data.radioArray.length;i++){
      val = e.detail.value["ans[" + i + "]"]
      if(val == ""){
        wx.showToast({
          title: '第'+(i+1)+"选项不可为空",
          icon: "none"
        })
        return false
      }
      ans += that.data.ans_id[i] + "." + val
      if (i != that.data.radioArray.length -1){
        ans+="-"
      }
    }

    if(that.data.index==0){
      console.log("题型：", that.data.index * 1 + 1)
      console.log("问题：", e.detail.value.textarea)
      console.log("答案：", that.data.single)
      console.log("选项：", ans)

      wx.showToast({
        title: '已保存',
        icon:'success'
      })
      //清空输入
      ans =""
      val=""
      that.setData({
        form_info:"",
        radioArray:[{},{}],
        single:"",
        checked:false
      })
    }
    
    
  },
  /**多选题提交 */
  GetMulti:function(e){
    var that = this

    if (e.detail.value.textarea == "") {
      wx.showToast({
        title: '问题不可为空',
        icon: "none"
      })
      return false
    }
    if (that.data.mutil == "") {
      wx.showToast({
        title: '请选择正确答案',
        icon: "none"
      })
      return false
    }

    var ans = "",
        val = ""

    for (var i = 0; i < that.data.checkboxArray.length; i++) {
      val = e.detail.value["ans[" + i + "]"]
      if (val == "") {
        wx.showToast({
          title: '第' + (i + 1) + "选项不可为空",
          icon: "none"
        })
        return false
      }
      ans += that.data.ans_id[i] + "." + val
      if (i != that.data.checkboxArray.length - 1) {
        ans += "-"
      }
    }

    var val = ""
    for (var i = 0; i < this.data.mutil.length; i++) {
      val += this.data.mutil[i]
    }

    if(that.data.index == 1){
      console.log("题型：", that.data.index * 1 + 1)
      console.log("问题：", e.detail.value.textarea)
      console.log("答案：", val)
      console.log("选项：", ans)

      wx.showToast({
        title: '已保存',
        icon: 'success'
      })
      //清空输入
      ans = ""
      val = ""
      that.setData({
        form_info: "",
        checkboxArray: [{}, {}],
        mutil: "",
        checked: false
      })
    }
  },
  /**
   * 提交填空题
   */
  GetBlank:function(e){
    var that = this

    if (e.detail.value.textarea == "") {
      wx.showToast({
        title: '问题不可为空',
        icon: "none"
      })
      return false
    }
    var ans = [],
      val = ""

    for (var i = 0; i < that.data.blankArray.length; i++) {
      val = e.detail.value["ans[" + i + "]"]
      if (val == "") {
        wx.showToast({
          title: '第' + (i + 1) + "选项不可为空",
          icon: "none"
        })
        return false
      }
      ans[i]=val
    }

    if (that.data.index == 2) {
      console.log("题型：", that.data.index * 1 + 1)
      console.log("问题：", e.detail.value.textarea)
      for(var i=0;i<ans.length;i++){
        console.log("答案",i+1,"：", ans[i])
      }
      

      wx.showToast({
        title: '已保存',
        icon: 'success'
      })
      //清空输入
      ans = ""
      val = ""
      that.setData({
        form_info: "",
        BlankArray: [{}, {}]
      })
    }
  }
})