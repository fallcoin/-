// pages/category/category.js
const { getTitle } = require('../../utils/util.js');
Page({
  data: {
    questionTitleData: [],
    dataUrl: null
  },
  onLoad: function (options) {
    this.setData({
      dataUrl: `https://chenxuan.online/api/view?page=`
    })
    this.itemList = this.selectComponent("#itemList");
  },
  onReachBottom: function () {
    this.itemList.setInfo();
  }
})