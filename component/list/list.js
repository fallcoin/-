// component/list/list.js
const { getTitle, getLabel } = require('../../utils/util.js');
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
    loading: `display: block`,
    isLoading: false,
    searchUrl: ``,
    isEmpty: false,
    compelete: false
  },
  attached: function (options) {
    this.data.searchUrl = this.properties.url;
    this.setTitle();
  },
  methods: {
    setTitle: function() {
      //请求数据的函数
      if (this.data.isLoading === false) {
        this.setData({
          loading: `display: block`,
          isLoading: true
        })
        getTitle(this.data.page, this.data.searchUrl)
        .then(questionData => {
          if(questionData.length) {
            let promiseQueue = []
            questionData.forEach(current => {
              let pr = getLabel(current.aid)
              .then(label => {
                current.label = label;
              });
              promiseQueue.push(pr);
            })
            Promise.all(promiseQueue)
            .then(() => {
              this.data.questionTitleData = this.data.questionTitleData.concat(questionData);
              this.data.page++;
              this.setData({
                compelete: true,
                loading: `display:none;`,
                isLoading: false,
                questionTitleData: this.data.questionTitleData
              })
            })
          } else if(this.data.questionTitleData){
            this.setData({
              loading: `display: none;`,
              isLoading: false
            })
            if (this.data.questionTitleData.length == 0) {
              this.setData({
                isEmpty: true
              })
            }
          }
        })
      }
    }
  }
})