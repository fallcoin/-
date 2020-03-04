const requestPromise = myUrl => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: myUrl,
      method: 'POST',
      success: res => resolve(res)
    })
  })
}

const getTitle = (page, searchUrl) => {
  // 获取问题标题
  return new Promise((resolve) => {
    requestPromise(`${searchUrl}${page + 1}`)
    .then(res => {
      resolve(res.data.data)
    })
  });
}

const getLabel = id =>{
  // 获取问题标签
  return new Promise(resolve => {
    requestPromise(`https://chenxuan.online/api/preview/type/${id}`)
    .then(res => {
      resolve(res.data);
    })
  })
}

module.exports = {
  requestPromise: requestPromise,
  getTitle: getTitle,
  getLabel: getLabel
};