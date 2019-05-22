let app = getApp()
Page({
  data: {

    // taskinfo: {},
    // questionlist: [],
    // test:[ ]

    //假设数据
    index: 0, //当前题目
    sum: 0, //总分
    ans_id: [ //用于显示ABCD
      "A", "B", "C", "D", "E", "F", "G"
    ],
    myBlank_id: [ //用于显示
      "第一空", "第二空", "第三空", "第四空", "第五空", "第六空", "第七空"
    ],
    checked: [], //用于显示做过题目的选中
    type: [ //用于显示
      "单选题", "多选题", "填空题"
    ], //阿展的数据
    taskinfo: {
      title: "2-1测试"
    },

    //(待修改)数据注入
    questionlist: [{
        questionType: 2,
        questionID: '',
        questionDesc: "如何呼叫好友开黑",
        choicelist: ["维和咯", "来不来刺激一下", "L不L", "画archi咯"], //choicelist[i]
        answer: ["ABC"], //answer[0]

      },
      {
        questionType: 3,
        questionID: '',
        questionDesc: "华为最新手机型号是?",
        choicelist: [],
        answer: ["P30", "XS", "XR"], //answer[i]

      },
      {
        questionType: 1,
        questionID: '',
        questionDesc: "以下哪个是中文",
        choicelist: ["你好呀小老弟", "Hi,little brother", "Bonjour", "안녕하세요"],
        answer: ["A"], //answer[0]

      },

    ]
  },
  do: function(e) {
    // var taskin = this.data.taskinfo;

    // var courseTaskId = taskin.courseTaskId;
    // var userId = app.userInfo.userId;
    // var formObject = e.detail.value;
    // console.log(formObject);
    // var fromstring = JSON.stringify(formObject);

    // fromstring = fromstring.substring(0, fromstring.length - 1);
    // fromstring = fromstring.substring(1);
    // console.log(fromstring);




    // wx.request({
    //   url: 'http://localhost:8081/question/count?useranswer=' + fromstring + '&userId=' + userId + '&courseTaskId=' + courseTaskId,
    //   method: "POST",
    //   success: function(res) {
    //     console.log(res.data);

    //   }
    // })
    // wx.navigateBack();
  },
  onLoad: function(params) {
    // var me = this;
    // var info = JSON.parse(params.taskinfo);
    // console.log(info);
    // me.setData({

    //   taskinfo: info
    // });
    // var ids = info.questionListId;
    // wx.request({
    //   url: 'http://localhost:8081/question/queryquerstionlist?questionids=' + ids,
    //   method: "POST",
    //   success: function(res) {
    //     var questionlist = res.data.data.data;
    //     console.log(questionlist);
    //     me.setData({
    //       questionlist: questionlist
    //     });

    //   }
    // });


    //根据前端页面假设，设置作业名为导航条名
    var taskTitle = this.data.taskinfo.title
    wx.setNavigationBarTitle({
      title: taskTitle,
    })
    //将未作的题目的得分grade设置为-1
    var that = this.data.questionlist
    for (var i = 0; i < this.data.questionlist.length; i++) {
      that[i].grade = -1,
      that[i].useranswer = []
    }
    this.setData({
      questionlist: that
    })

  },
  //检查输入是否为空
  checkBlank: function(e) {

    var type = this.data.questionlist[this.data.index].questionType
    var that = this.data.questionlist[this.data.index]

    if (type == 1) {

      if (e.detail.value.single === "") {
        return false
      }
    } else if (type == 2) {
      if (e.detail.value.multi == "") {
        return false
      }
    } else if (type == 3) {

      for (var i = 0; i < that.answer.length; i++) {
        if (e.detail.value[i].length == 0)
          return false
      }
    }
    return true


  },
  //上一题
  toPre(e) {
    var currentIndex = this.data.index
    this.setData({
      index: currentIndex - 1,
      checked: []
    })
    this.setchecked()
  },
  //下一题
  toNext(e) {

    var currentIndex = this.data.index
    this.setData({
      index: currentIndex + 1,
      checked: []
    })
    this.setchecked()

  },
  //保存答案并计算grade个题得分
  saveans: function(e) {
    var type = this.data.questionlist[this.data.index].questionType
    var that = this.data.questionlist
    if (type == 1) {
      that[this.data.index].useranswer[0] = e.detail.value.single
      if (that[this.data.index].useranswer[0] == that[this.data.index].answer[0]) {
        that[this.data.index].grade = (100 / that.length).toPrecision(3)
      } else {
        that[this.data.index].grade = 0
      }

    } else if (type == 2) {
      var t = e.detail.value.multi
      t = t.sort()

      that[this.data.index].useranswer[0] = ''
      for (var i = 0; i < t.length; i++) {
        that[this.data.index].useranswer[0] += t[i]
      }
      if (that[this.data.index].useranswer[0] == that[this.data.index].answer[0]) {
        that[this.data.index].grade = (100 / that.length).toPrecision(3)
      } else {
        that[this.data.index].grade = 0
      }
    } else if (type == 3) {
      var length = this.data.questionlist[this.data.index].answer.length
      for (var i = 0; i < length; i++) {
        that[this.data.index].useranswer[i] = ''
        that[this.data.index].useranswer[i] += e.detail.value[i]
        if (that[this.data.index].useranswer[i] == that[this.data.index].answer[i]) {
          that[this.data.index].grade = (100 / that.length).toPrecision(3)
        } else {
          that[this.data.index].grade = 0
        }
      }


    }
    this.setData({
      questionlist: that
    })
  },
  //提交事件
  submit: function(e) {
    var that = this
    if (e.detail.target.id == 2) {

      if (this.checkBlank(e)) {
        //如果是下一页，保存当前页答案计算分数后跳转下页
        this.saveans(e)
        this.toNext(e)
      } else {
        wx.showToast({
          title: '请填写答案',
          icon: "none"
        })
      }

    } else if (e.detail.target.id == 1) {
      //如果是上一页，不保存当前页答案跳转上页
      this.toPre(e)
    } else {
      //如果是最后一页的提交检查不为空后保存并提交
      if (this.checkBlank(e)) {
        this.saveans(e)
        wx.showModal({
          title: '提示',
          content: '确认提交后无法修改',
          success: function(res) {
            if (res.confirm) {
              //计算总分
              var sum = 0
              for (var i = 0; i < that.data.questionlist.length; i++) {
                sum += that.data.questionlist[i].grade * 1
              }
              sum = (sum * 1).toPrecision(3)
              that.setData({
                sum: sum
              })


              //console.log('题目', that.data.questionlist)
              //加工函数
              var myans = ''
              var temp = ''
              for (var i = 0; i < that.data.questionlist.length; i++) {
                if (that.data.questionlist[i].questionType != 3)
                  myans += that.data.questionlist[i].useranswer[0]
                else {

                  temp = ''
                  for (var j = 0; j < that.data.questionlist[i].useranswer.length; j++) {

                    temp += that.data.questionlist[i].useranswer[j]
                    if (j != that.data.questionlist[i].useranswer.length - 1)
                      temp += ','
                  }
                  myans += temp
                }
                if (i != that.data.questionlist.length - 1) {
                  myans += '-'
                }
              }

            }
            //(待修改)数据提交后跳转分数查看页面
            console.log('总分', that.data.sum)
            console.log(myans)
            wx.showToast({
              title: '提交成功',
            })
            setTimeout(function() {
              wx.navigateBack({

              })
            }, 1000)
          }
        })
      } else {
        wx.showToast({
          title: '请填写答案',
          icon: "none"
        })
      }
    }
  },
  //设置默认选中
  setchecked: function() {
    var type = this.data.questionlist[this.data.index].questionType
    var that = this.data.questionlist[this.data.index]
    var ans = that.useranswer[0]

    var check = this.data.checked
    check = []
    if (type != 3 && that.useranswer.length != 0) {
      for (var i = 0; i < ans.length; i++) {
        switch (ans.charAt(i)) {
          case "A":
            check[0] = 'true';
            break;
          case "B":
            check[1] = 'true';
            break;
          case "C":
            check[2] = 'true';
            break;
          case "D":
            check[3] = 'true';
            break;
          case "E":
            check[4] = 'true';
            break;
          case "F":
            check[5] = 'true';
            break;
          case "G":
            check[6] = 'true';
            break;
        }
      }

      this.setData({
        checked: check
      })

    }
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