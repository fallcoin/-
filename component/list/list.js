// component/list/list.js
const { getTitle } = require('../../utils/util.js');
Component({
  properties: {
    url: {
      type: String,
      value: `https://chenxuan.online/api/view?page=`
    }
  },
  data: {
    questionTitleData: [],
    page: 0,
    loading: `display:none`,
    isLoading: false,
    searchUrl: ``
  },
  attached: function (options) {
    this.data.searchUrl = this.properties.url;
    console.log(this.data.searchUrl);
    this.setInfo(this);
  },
  methods: {
    setInfo: function() {
      //请求数据的函数
      if (this.data.isLoading === false) {
        this.data.loading = ``;
        this.data.isLoading = true;
        getTitle(this.data.page, this.data.searchUrl).then(questionData => {
          if (questionData.length) {
            this.data.questionTitleData = this.data.questionTitleData.concat(questionData);
            this.data.page++;
            this.setData({
              questionTitleData: this.data.questionTitleData
            })
          }
          //数据更新后取消loading动画
          this.setData({
            loading: `display:none;`,
            isLoading: false
          })
        })
      }
    }
  }
})