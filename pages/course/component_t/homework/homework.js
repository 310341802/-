
var util = require('../../../../utils/util.js');
Component({
  data: {
    date:"",
    hw_count:1,
    showModal: false,
    currentBlock:0,
    published: [
      {
        name: "2-11测试",
        date: "2019-02-11"
      },
      {
        name: "2-11测试",
        date: "2019-02-11"
      }
    ],
    unpublish:[
      {
        name: "2019-5-11",

      },
      {
        name: "2019-5-12",

      }
    ]
  },

  /*生命周期 */
  
  methods: {
    onLoad: function (options) {

    },
    changeFlag: function () {
      if(this.data.currentBlock==0)
      {
        this.setData({
          currentBlock: 1
        })
      }
      else{
        this.setData({
          currentBlock: 0
        })
      }
     
      
      
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
    showDialogBtn: function () {
      var time = util.formatTime(new Date());
      this.setData({
        date: time + " 作业" + this.data.hw_count
      })
      this.setData({
        showModal: true
      })
    },
    /**
     * 弹出框蒙层截断touchmove事件
     */
    preventTouchMove: function () {
    },
    /**
     * 隐藏模态对话框
     */
    hideModal: function () {
      this.setData({
        showModal: false
      });
    },
    /**
     * 对话框取消按钮点击事件
     */
    onCancel: function () {
      this.hideModal();
    },
    /**
     * 对话框确认按钮点击事件
     */
    GetName: function (e) {
      var name = e.detail.value.hw_name//获取作业名

      this.hideModal();
      this.setData({
        hw_count: this.data.hw_count + 1
      })
      wx.navigateTo({
        url: '/pages/course/component_t/homework/hw_create/hw_create?name='+name,
      })
    }
  },
  properitys: {

  }


})