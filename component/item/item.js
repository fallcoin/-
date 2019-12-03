const { requestPromise, getLabel } = require('../../utils/util.js');
Component({
  properties: {
    question: {
      type: String,
      value: ``
    },
    aid: {
      type: Number,
      value: 0
    },
    labelId: {
      type: Number,
      value: 0
    }
  },
  data: {
    // 这里是一些组件内部数据
    label: ``
  },
  methods: {
    setLabel(id) {
      getLabel(id).then(label => {
        this.setData({
          label: label
        })
      });
    }
  },
  attached : function() {
    this.setLabel(this.properties.labelId);
  }
})