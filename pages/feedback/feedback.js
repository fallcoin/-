// pages/feedback/feedback.js
const { requestPromise } = require('../../utils/util.js');
const app = getApp()
Page({
  data: {
    feedBackStr: ``,
    feedbackData: [
      {
        isUser: false,
        avatar: `../../asset/icon.jpg`,
        comstr: `欢迎使用华广信息搜索引擎，有什么想反馈的吗？`
      }],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '华广信息搜索引擎' //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 30
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getInfo: function (e) {
    // 用户输入时，对数据进行双向绑定
    if (e.detail.value)
      this.data.feedBackStr = e.detail.value.trim()
  },
  submit: function () {
    // 用户点击提交
    if (this.data.feedBackStr) {
      // 输入框存在内容
      if (this.data.feedBackStr.length > 50) {
        wx.showToast({
          title: '内容不得多于50字',
          icon: 'none'
        })
        return
      }
      
      this.data.feedbackData.push({
        isUser: true,
        avatar: this.data.userInfo.avatarUrl,
        comstr: this.data.feedBackStr
      })
      requestPromise(`https://chenxuan.online/api/feedbook?title=123`)
      .then(res => {
        this.data.feedbackData.push({
          isUser: false,
          avatar: `../../asset/icon.jpg`,
          comstr: `感谢您的反馈`
        })
        this.setData({
          feedbackData: this.data.feedbackData
        })
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      // 不存在内容
      wx.showToast({
        title: '未输入内容',
        icon: 'none'
      })
    }
    this.setData({
      feedbackData: this.data.feedbackData,
      feedBackStr: ``
    })
  }
})