Component({
  properties: {
  },
  data: {
    searchstr: ""
  },
  methods: {
    // getfocus() {
    //   this.setData({
    //     searchflag: true,
    //   })
    // },
    loseFocus() {
      this.clear();
    },
    endsearchList(e) {
      wx.navigateTo({
        url: `../result/result?questionName=${e.detail.value}`
      })
    },
    // 取消
    // cancelsearch() {
    //   this.setData({
    //     searchflag: false,
    //     searchstr: ""
    //   })
    // },
    //清空搜索框
    clear() {
      this.setData({
        searchstr: ""
      });
    }
  }
})