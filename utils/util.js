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
    requestPromise(`${searchUrl}${page + 1}`).then(res => {
      [...questionData] = [...res.data.data];
      page++;
      resolve({
        questionTitleData: questionData,
        page: page
      })
    })
  });
}
const getLabel = id =>{
  return new Promise(resolve => {
    requestPromise(`https://chenxuan.online/api/preview/type/${id}`).then(res => {
      resolve(res.data);
    })
  })
}
module.exports = {
  requestPromise: requestPromise,
  getTitle: getTitle,
  getLabel: getLabel
};