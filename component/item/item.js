const WxParse = require('../../wxParse/wxParse.js');
const {requestPromise} = require('../../utils/util.js');
Component({
  properties: {
    question: {
      type: String,
      value: ``
    },
    aid: {
      type: Number,
      value: 0
    }
  },
  data: {
    // 这里是一些组件内部数据
    isfold: true, //状态，是否折叠
    height: '0px',  //存储内容高度
    animationing: false,  //是否在动画中
    answer: null  //内容，html格式的数据
  },
  methods: {
    // 这里是一个自定义方法 
    _changeFoldStatus: function() {
      //点击事件，改变状态
      if (this.data.answer == null) {
        //判断内容是否为空，为空则请求数据
        this.getAnswer(this);
      }else {
        //不为空改变状态
        if (this.data.isfold) {
          this.changeFoldAnimation(this.data.height);
        } else {
          this.changeFoldAnimation(0);
        }
      }
    },
    changeFoldAnimation: function (height) {
      //状态改变动画函数
      let time = this.data.height/1000*1000;
      let animation = wx.createAnimation({
        duration: time,
        timingFunction: 'ease'
      });
      animation.height(height).step();
      this.setData({
        changefold: animation.export()
      });
      this.createSelectorQuery().select('.wxParse-div').boundingClientRect(rect => {
        if (this.data.height != rect.height){
          this.data.height = rect.height;
          this.changeFoldAnimation(this.data.height); //展开
        }
      }).exec();
    },
    animationend: function (){
      this.data.isfold = !this.data.isfold;
    },
    getAnswer: that => {
      requestPromise(`https://chenxuan.online/api/preview/${that.properties.aid}`).then(res => {
        res.data.replace('<img', '<img style="max-width:100%;height:auto" ');
        that.setData({
          answer: `<div>${res.data}</div>`
        })
        WxParse.wxParse('article', 'html', that.data.answer, that, 0);
        that.createSelectorQuery().select('.wxParse-div').boundingClientRect(rect => {
          that.data.height = rect.height;
          that.changeFoldAnimation(that.data.height); //展开
        }).exec();
      })
    }
  }
})