// pages/content/content.js
const { requestPromise } = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    content: ``,
    title: ``,
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '华广信息搜索引擎' //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 30
  },
  onLoad: function (options) {
    requestPromise(`https://chenxuan.online/api/preview/${options.id}`).then(res => {
      this.setData({
        content: res.data,
        title: options.title
      })
    });
  },
  directToFeedback: function() {
    wx.navigateTo({
      url: `../feedback/feedback`
    })
  }
})