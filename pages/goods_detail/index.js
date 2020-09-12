

import {requireData} from "../../request/index"
import {goodDetail} from "../../request/params";
Page({
  data: {
     goodsDetailData:{},
     pageId:0,
     isClict:false
  },
  goods:{},
  
  onLoad: function (options) {
    let id = options.id
    this.setData({
      pageId:id,
    })
    this.requireGoodDetail(id);
  },
  onShow(){
    let isClict=wx.getStorageSync('clict');
    if(!isClict.length==0){
      let index = isClict.findIndex(v=>v.ids == this.data.pageId);
      if(index ==-1){
        this.setData({
          isClict:false
        })
      }else{
        this.setData({
          isClict:true
        })
      }
      
    }
  },
  requireGoodDetail(id){
    requireData({url:"/home/goodsDetail",data:id})
    .then(result =>{
       this.setDate({
         goodsDetailData:result.data.data,
         goodsDetailData:{
           goodsName:result.data.goodsName,
           goodsTime:result.data.goodsTime.replace(/\.web/g,'.jpg')
         }
       })
    })
    .catch(error =>{
      this.setData({
        goodsDetailData:goodDetail()
      })
    })
  },
  handImg(e){
    const urls = this.data.goodsDetailData.pics.map(v => v.imgUrl);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      urls,
      current
    })
  },
  handCatAdd(){
    let cats = wx.getStorageSync('cat') || [];
    //  const index = cats.findIndex(v => v.goods_id == this.data.goodsDetailData.goods_id);
    const index = cats.findIndex(v => v.goods_id == this.data.pageId);
     if(index == -1){
      this.data.goodsDetailData.num=1;
      this.data.goodsDetailData.checkde=true;
      this.data.goodsDetailData.goods_id=this.data.pageId;
      cats.push(this.data.goodsDetailData);
     }else{
       cats[index].num++;
     }
     wx.setStorageSync('cat', cats);
     wx.showToast({
       title: '加入成功',
       mask:true
     })
  },
  handleClict(){
    let {goodsDetailData,pageId} = this.data;
    let clict = wx.getStorageSync('clict') || [];
    console.log(666,pageId)
    let index=clict.findIndex(v=>v.ids==pageId);
    console.log(index);
    if(index==-1){
      goodsDetailData.isclict=true;
      goodsDetailData.ids=pageId;
      clict.push(goodsDetailData);
      wx.showToast({
        title: '收藏成功',
        icon:"success",
        mask:true
      })
    }else{
      clict.splice(index,1)
      wx.showToast({
        title: '取消收藏',
        icon:"error",
        mask:true
      })
    }
    wx.setStorageSync('clict', clict)
    this.setData({
      isClict:!this.data.isClict
    })
  }
})