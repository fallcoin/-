// pages/category/category.js
const { getTitle } = require('../../utils/util.js');
Page({
  data: {
    questionTitleData: [],
    dataUrl: null
  },
  onLoad: function (options) {
    this.setData({
      dataUrl: `https://chenxuan.online/api/preview/class/${options.key}?page=`
    })
    this.itemList = this.selectComponent("#itemList");
  },
  onReachBottom: function () {
    this.itemList.setTitle();
  }
})