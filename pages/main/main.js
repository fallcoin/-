// pages/search/search.js
const { getTitle } = require('../../utils/util.js');
Page({
  data: {
    questionTitleData: [],
    dataUrl: `https://chenxuan.online/api/view?page=`,
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
    this.itemList = this.selectComponent("#itemList");
  },
  onReachBottom: function () {
    this.itemList.setInfo();
  },
  directToCategory() {
    
  }
})