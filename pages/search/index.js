// pages/search/index.js
import {getSearchList} from "../../request/params";
import {requireData}from "../../request/index"
Page({
  data: {
    searchData:[],
    isShowBtn:false,
    value:""
  },
  handleInput(e){
   let value = e.detail.value;
   if(!value.trim()){
     value="";
     this.setData({
       searchData:[],
       isShowBtn:false
     })
   }else{
    clearTimeout(this.times);
    this.times=setTimeout(() => {
      let searchData=[];
      requireData({url:"/api/search",data:value.trim()}).then(result=>{
       searchData = result.data;
    }).catch(err=>{
       searchData = getSearchList(value.trim());
       this.setData({
        searchData,
        isShowBtn:true
      })
    })
    }, 800);
   }
  },
  handleBtn(){
    this.value=""
    this.setData({
      searchData:[],
      isShowBtn:false,
      value:""
    })
  }
})