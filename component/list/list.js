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
    questionTitleData: [],  // 问题列表
    page: 0,  // 页数
    loading: `display: block`,  // 控制加载图标显示
    isLoading: false, // 是否处于加载中
    searchUrl: ``,  // 获取列表的api
    isEmpty: false, // 问题列表是否为空
    compelete: false  // 是否加载完成
  },
  attached: function (options) {
    this.data.searchUrl = this.properties.url
    this.setTitle()
  },
  methods: {
    setTitle: function() {
      // 请求数据的函数
      if (this.data.isLoading === false) {
        // 不处于加载状态时允许获取数据
        this.setData({
          loading: `display: block`,
          isLoading: true
        })

        getTitle(this.data.page, this.data.searchUrl)
        .then(questionData => {
          if (questionData.length) {
            // 可以获取得到问题列表
            let promiseQueue = [] // 用来暂时保存promise
            questionData.forEach(current => {
              // 对每个问题尝试获取其标签
              let pr = getLabel(current.aid)
              .then(label => {
                current.label = label
              });
              promiseQueue.push(pr)
            })

            //数据全部获取后
            Promise.all(promiseQueue)
            .then(() => {
              this.data.questionTitleData = this.data.questionTitleData.concat(questionData)
              this.data.page++
              this.setData({
                compelete: true,
                loading: `display:none;`,
                isLoading: false,
                questionTitleData: this.data.questionTitleData
              })
            })
          } else if(this.data.questionTitleData) {
            // 这里有两种情况，1：没有与之相连的问题数据，2：所有问题数据已获取完成
            this.setData({
              loading: `display: none;`,
              isLoading: false
            })
            if (this.data.questionTitleData.length === 0) {
              // 自身没有问题数据，说明是第一种情况，所以问题列表设置为空
              this.setData({
                isEmpty: true
              })
            }
          }
        })
      }
    },
    directToFeedback: function () {
      wx.navigateTo({
        url: `../feedback/feedback`
      })
    }
  }
})