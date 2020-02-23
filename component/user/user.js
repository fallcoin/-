// component/user/user.js
Component({
  properties: {
    isUser: {
      type: Boolean,
      value: false
    },
    avatar: {
      type: String,
      value: ``
    },
    comstr: {
      type: String,
      value: ``
    }
  },
  data: {
    ready: false
  },
  attached: function() {
    this.setData({
      ready: true
    })
  }
})