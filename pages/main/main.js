// pages/search/search.js
const { getTitle } = require('../../utils/util.js');
Page({
  data: {
    questionTitleData: [],
    page: 0,
    searchUrl: `https://chenxuan.online/api/view?page=`,
    loading: ``,
    searchstr: ``,
    category: [{
      name: `常见问题`,
      id: 0
    },{
      name: `学习资料`,
      id: 0
    },{
      name: `校园生活`,
      id: 0
    },{
      name: `吃喝玩乐`,
      id: 0
    }]
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
    getTitle(that.data.page, that.data.searchUrl).then(questionData => {
        that.data.questionTitleData = that.data.questionTitleData.concat(questionData.questionTitleData);
        that.setData({
          questionTitleData: that.data.questionTitleData,
        })
        if (questionData.questionTitleData.length)
          //当请求的问题列表的长度存在说明请求成功，更新长度
          that.data.page = questionData.page
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
  },
  directToCategory() {
    
  }
})