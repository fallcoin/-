// pages/content/content.js
const { requestPromise } = require('../../utils/util.js')
Page({
  data: {
    content: ``
  },
  onLoad: function (options) {
    requestPromise(`https://chenxuan.online/api/preview/${options.id}`).then(res => {
      this.setData({
        content: res.data
      })
    });
    console.log(this.data.content);
  }
})