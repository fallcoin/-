// pages/search/search.js
const { getInfo } = require('../../utils/util.js');
Page({
  data: {
    questionTitleData: [],
    page: 0,
    searchUrl: `https://chenxuan.online/api/view?page=`,
    loading: ``,
    searchstr: ``
  },
  onLoad: function () {
    this.setInfo(this);
  },
  onReachBottom: function () {
    //下拉显示loading动画，并请求数据
    this.setData({
      loading: ``
    })
    this.setInfo(this);
  },
  setInfo: that => {
    //请求数据的函数
    getInfo(that.data.page, that.data.searchUrl)
      .then(questionData => {
        that.data.questionTitleData = that.data.questionTitleData.concat(questionData.questionTitleData);
        that.setData({
          questionTitleData: that.data.questionTitleData,
        })
        if (questionData.questionTitleData.length)
          //当请求的问题列表的长度存在说明请求成功，更新长度
          that.data.page = questionData.page
      })
      .then(() => {
        //数据更新后取消loading动画
        that.setData({
          loading: `display:none;`
        })
      })
  },
  //失去焦点
  loseFocus() {
    //清空搜索框
    this.setData({
      searchstr: ""
    });
  },
  endsearchList(e) {
    wx.navigateTo({
      url: `../result/result?questionName=${e.detail.value}`
    })
  }
})