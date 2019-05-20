
var util = require('../../../../utils/util.js');
Component({
  data: {
    date:"",
    hw_count:1,
    showModal: false,
    currentBlock:0,
    delBtnWidth: 90,//删除按钮宽度单位（rpx）
    publishedList: [
      {
        title: "2-11测试",
        createTime: "2019-02-11"
      },
      {
        title: "2-11测试",
        createTime: "2019-02-11"
      }
    ],
    unpublishList:[
      {
        title: "2019-5-11",
        createTime:""
      },
      {
        title: "2019-5-12",
        createTime:""
      }
    ]
  },
 
  /*组件所在页面的生命周期 */
  pageLifetimes:{
    show(){
     
    },
    hide(){
     
    }
  },
  methods: {
   showPHW:function(e){
     var name = this.data.publishedList[e.currentTarget.dataset.index].title
     
     wx.navigateTo({
       url: '/pages/course/component_t/homework/phw_show/phw_show?name=' + name + "&" + "index=" + e.currentTarget.dataset.index,
     })
   },
    showHW:function(e){
      var name = this.data.unpublishList[e.currentTarget.dataset.index].title
      wx.navigateTo({
        url: '/pages/course/component_t/homework/hw_show/hw_show?name=' + name + "&" + "index=" + e.currentTarget.dataset.index,
      })
    }
    ,
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
    touchS: function (e) {
      if (e.touches.length == 1) {
        this.setData({
          //设置触摸起始点水平方向位置
          startX: e.touches[0].clientX
        });
      }
    },
    touchM: function (e) {
      if (e.touches.length == 1) {
        //手指移动时水平方向位置
        var moveX = e.touches[0].clientX;
        //手指起始点位置与移动期间的差值
        var disX = this.data.startX - moveX;
        var delBtnWidth = this.data.delBtnWidth;
        var txtStyle = "";
        if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
          txtStyle = "left:0px";
        } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
          txtStyle = "left:-" + disX + "px";
          if (disX >= delBtnWidth) {
            //控制手指移动距离最大值为删除按钮的宽度
            txtStyle = "left:-" + delBtnWidth + "px";
          }
        }
        //获取手指触摸的是哪一项
        var index = e.target.dataset.index;
        var list = this.data.unpublishList;
        if (index == null) {
          return false
        }
        list[index].txtStyle = txtStyle

        //更新列表的状态
        this.setData({
          unpublishList: list
        });
        
      }
    },
    touchE: function (e) {
      if (e.changedTouches.length == 1) {
        //手指移动结束后水平位置
        var endX = e.changedTouches[0].clientX;
        //触摸开始与结束，手指移动的距离
        var disX = this.data.startX - endX;
        var delBtnWidth = this.data.delBtnWidth;
        //如果距离小于删除按钮的1/2，不显示删除按钮
        var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
        //获取手指触摸的是哪一项
        var index = e.target.dataset.index;
        var list = this.data.unpublishList;

        if(index == null){
          return false
        }

        //更新列表的状态
        this.setData({
          unpublishList: list
        });
      }
    },
    //获取元素自适应后的实际宽度
    getEleWidth: function (w) {
      var real = 0;
      try {
        var res = wx.getSystemInfoSync().windowWidth;
        var scale = (750 / 2) / (w / 2);
      
        real = Math.floor(res / scale);
        return real;
      } catch (e) {
        return false;
       
      }
    },
    initEleWidth: function () {
      var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
      this.setData({
        delBtnWidth: delBtnWidth
      });
    },
    //点击删除按钮事件
    delItem: function (e) {
      //获取列表中要删除项的下标
      var that = this
      var index = e.target.dataset.index;
      var list = this.data.unpublishList;
      //移除列表中下标为index的项
      wx.showModal({
        title: '提示',
        content: '确定要删除'+list[index].title+"吗？",
        success(res) {
          if (res.confirm) {
            //删除
            list.splice(index, 1);
            //更新列表的状态
            that.setData({
              unpublishList: list
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
    //测试临时数据
    tempData: function () {
      
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