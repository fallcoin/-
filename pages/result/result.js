// pages/result/result.js
const { getInfo } = require('../../utils/util.js')
Page({
  data: {
    questionTitleData: [],
    page: 0,
    searchUrl: `https://chenxuan.online/api/search?`,
    haveResult: ``,
    loading: ``
  },
  onLoad: function (options) {
    this.setInfo(this,options.questionName);
  },
  onReachBottom: function () {
    this.setData({
      loading: ``
    })
    this.setInfo(this);
  },
  setInfo: (that, questionName) => {
    that.data.searchUrl = `${that.data.searchUrl}q=${questionName}&page=${that.data.page}`;
    getInfo(that.data.page, that.data.searchUrl).then(questionData => {
      that.data.questionTitleData = that.data.questionTitleData.concat(questionData.questionTitleData);
      that.setData({
        questionTitleData: that.data.questionTitleData
      })
      if (questionData.questionTitleData.length)
        that.data.page = questionData.page
    }).then(() => {
      if (that.data.questionTitleData.length == 0) {
        that.setData({
          haveResult: `display: block;`
        })
      }
    })
    .then(() => {
      that.setData({
        loading: `display:none;`
      })
    })
  }
})