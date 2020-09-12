

import {requireData} from "../../request/index";
import {getLunBoData,getCateData,getlouchen} from "../../request/params"
Page({
  data:{
      swiperList:[],
      catedata:[],
      louchen:[]
  },
  onLoad:function(){
      //轮播图数据
      this.getlunbo();
      this.getcatedata();
      this.getLouChen();
  },
  getlunbo(){
    requireData({url: '/home/swiperdata'})
        .then((result)=>{
          this.setData({
            swiperList:result.data.message
        })
       })
       .catch(error =>{
        this.setData({
            swiperList:getLunBoData()
          })
      })
  },
  getcatedata:function(){
    requireData({url: '/home/cate'})
    .then((result)=>{
      this.setData({
        swiperList:result.data.message
    })
   })
   .catch(error =>{
    this.setData({
        catedata:getCateData()
      })
  }) 
  },
  getLouChen(){
    requireData({url: '/home/louchen'})
    .then((result)=>{
      this.setData({
        swiperList:result.data.message
    })
   })
   .catch(error =>{
    this.setData({
        louchen:getlouchen()
      })
  })   
  }
})
