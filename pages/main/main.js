// pages/search/search.js
const { getTitle } = require('../../utils/util.js');
Page({
  data: {
    questionTitleData: [],
    dataUrl: `https://chenxuan.online/api/view?page=`,
    category: [{
      name: `常见问题`,
      id: 1,
      src: `../../asset/usual.png`
    },{
      name: `学习资料`,
      id: 2,
      src: `../../asset/data.png`
    },{
      name: `校园生活`,
      id: 3,
      src: `../../asset/live.png`
    },{
      name: `吃喝玩乐`,
      id: 4,
      src: `../../asset/usual.png`
    }],
    swiperItems: [`../../asset/background.png`, `../../asset/background.png`, `../../asset/background.png`],
    swiperCurrent: -1
  },
  onLoad: function () {
    this.itemList = this.selectComponent("#itemList");
  },
  onReachBottom: function () {
    this.itemList.setInfo();
  },
  directToCategory: function(e) {
    wx.navigateTo({
      url: `../category/category?id=${e.currentTarget.dataset.id}`
    })
  },
  swipclick: function() {
    
  },
  swiperChange: function(e) {
    this.data.swiperCurrent = e.detail.current;
  }
})