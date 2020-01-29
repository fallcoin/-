// pages/search/search.js
const { getTitle } = require('../../utils/util.js');
Page({
  data: {
    questionTitleData: [],
    dataUrl: `https://chenxuan.online/api/view?page=`,
    category: [{
      name: `常见问题`,
      key: `常见问题`,
      src: `../../asset/usual.png`,
      questionTitle: []
    },{
      name: `学习资料`,
      key: `学习资料`,
      src: `../../asset/data.png`,
      questionTitle: []
    },{
      name: `校园生活`,
      key: `校园生活`,
      src: `../../asset/live.png`,
      questionTitle: []
    },{
      name: `吃喝玩乐`,
      key: `吃喝玩乐`,
      src: `../../asset/enjoy.png`,
      questionTitle: []
    }],
    swiperItems: [`../../asset/background.png`, `../../asset/background.png`, `../../asset/background.png`],
    swiperCurrent: -1
  },
  onLoad: function () {
    //this.itemList = this.selectComponent("#itemList");
    this.data.category.forEach(item => {
      getTitle(0, `https://chenxuan.online/api/preview/class/${item.name}?page=`)
      .then(data => {
        item.questionTitle.push(data[0]);
        item.questionTitle.push(data[1]);
        this.setData({
          category: this.data.category
        })
      })
    })
  },
  onReachBottom: function () {
    //this.itemList.setTitle();
  },
  directToCategory: function(e) {
    wx.navigateTo({
      url: `../category/category?key=${e.currentTarget.dataset.key}`
    })
  },
  swipclick: function() {
    
  },
  swiperChange: function(e) {
    this.data.swiperCurrent = e.detail.current;
  },
  directToPage: function(e) {
    wx.navigateTo({
      url: `../content/content?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}`
    })
  }
})