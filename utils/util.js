const requestPromise = myUrl => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: myUrl,
      method: 'POST',
      success: res => resolve(res)
    })
  })
}
const getTitle = (page,searchUrl) => {
  return new Promise((resolve) => {
    let questionData = [];
    requestPromise(`${searchUrl}${page + 1}`)
    .then(res => {
      [...questionData] = [...res.data.data];
    })
    .then(() => {
      page++;
      resolve({
        questionTitleData: questionData,
        page: page
      })
    })
  });
}
module.exports = {
  requestPromise: requestPromise,
  getInfo: getTitle
};