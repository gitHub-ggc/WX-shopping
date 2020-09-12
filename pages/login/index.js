// pages/login/index.js
Page({

  data: {

  },
  handleInfo(e){
    let {userInfo} = e.detail;
    wx.setStorageSync('userInfo', userInfo);
    wx.navigateBack({
      delta: 1,
    })
  }
})