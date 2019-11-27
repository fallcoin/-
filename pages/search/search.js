// pages/search/search.js
const { getInfo } = require('../../utils/util.js');
Page({
  data: {
    questionTitleData: [],
    page: 0,
    searchUrl: `https://chenxuan.online/api/view?page=`,
    loading: ``
  },
  onLoad: function () {
    this.setInfo(this);
  },
  onReachBottom: function() {
    this.setData({
      loading: ``
    })
    this.setInfo(this);
  },
  setInfo: that => {
    getInfo(that.data.page, that.data.searchUrl)
    .then(questionData => {
      that.data.questionTitleData = that.data.questionTitleData.concat(questionData.questionTitleData);
      that.setData({
        questionTitleData: that.data.questionTitleData,
      })
      if (questionData.questionTitleData.length)
        that.data.page = questionData.page
    })
    .then(() => {
      that.setData({
        loading: `display:none;`
      })
    })
  }
})