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
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
    if (e.detail.value)
      this.data.feedBackStr = e.detail.value.trim()
    else
      wx.showToast({
        title: '未输入内容',
        icon: 'none'
      })
  },
  submit: function () {
    if (this.data.feedBackStr) {
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