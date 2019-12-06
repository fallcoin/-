Component({
  properties: {
  },
  data: {
    searchstr: ""
  },
  methods: {
    //失去焦点
    loseFocus() {
      //清空搜索框
      this.setData({
        searchstr: ""
      });
    },
    endsearchList(e) {
      wx.navigateTo({
        url: `../searchResult/searchResult?searchStr=${ e.detail.value }`
      })
    }
  }
})