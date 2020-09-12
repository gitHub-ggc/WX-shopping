// pages/user/index.js
Page({
  data: {
     userInfo:{},
     clictThings:0
  },
  onShow(){
     let userInfo = wx.getStorageSync('userInfo');
     this.setData({
       userInfo
     })
     this.getClictString()
  },
  // 获取商品收藏的数据
  getClictString(){
    let clictThings=wx.getStorageSync('clict');
    let clictLength = clictThings.length
    if(clictLength != 0){
      this.setData({
        clictThings:clictLength
      })
    }
  }
})