//index.js
//获取应用实例
const app = getApp()
const { getTitle } = require('../../utils/util.js');
Page({
  data: {
    questionTitleData: [],
    dataUrl: `https://chenxuan.online/api/view?page=`,
    category: [{
      name: `常见问题`,
      key: `常见问题`,
      src: `../../asset/usual.png`
    }, {
      name: `学习资料`,
      key: `学习资料`,
      src: `../../asset/data.png`
    }, {
      name: `校园生活`,
      key: `校园生活`,
      src: `../../asset/live.png`
    }, {
      name: `吃喝玩乐`,
      key: `吃喝玩乐`,
      src: `../../asset/enjoy.png`
    }],
    swiperItems: [`../../asset/background.png`, `../../asset/background.png`, `../../asset/background.png`],
    swiperCurrent: -1,
    hotQuestions: []
  },
  onLoad: function () {
    getTitle(0, 'https://chenxuan.online/api/view?page=')
      .then(data => {
        this.data.hotQuestions = data.splice(0, 4);
        this.setData({
          hotQuestions: this.data.hotQuestions
        })
      })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //.......................................................
  onReachBottom: function () {
    //this.itemList.setTitle();
  },
  directToCategory: function (e) {
    wx.navigateTo({
      url: `../category/category?key=${e.currentTarget.dataset.key}`
    })
  },
  swipclick: function () {

  },
  swiperChange: function (e) {
    this.data.swiperCurrent = e.detail.current;
  },
  directToPage: function (e) {
    wx.navigateTo({
      url: `../content/content?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}`
    })
  },
  directToMain2: function () {
    wx.navigateTo({
      url: `../main2/main2`
    })
  }
})