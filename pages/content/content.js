// pages/content/content.js
const { requestPromise } = require('../../utils/util.js')
Page({
  data: {
    content: ``,
    title: ``
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