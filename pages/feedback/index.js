
import {getUploadImg,getShowTotal} from "../../utils/asyncWX"
Page({
  data: {
    tabData:[
      {id:0,title:"体验问题",current:true},
      {id:1,title:"商品/商家投诉",current:false}
    ],
    imgArr:[],
    valueArear:""
  },
  imgs:[],
  tabEvent(e){
    let index = e.detail;
    let tabData = JSON.parse(JSON.stringify(this.data.tabData));
    tabData.forEach(v => {
       v.id==index?v.current=true:v.current=false;
    });
    this.setData({
      tabData
    })
  },
  handleImg(){
    getUploadImg().then(result=>{
      this.setData({
        imgArr:[...this.data.imgArr,...result.tempFilePaths]
      })
    })   
  },
  requireImg(e){
    let index=e.detail;
    let {imgArr}=this.data;
    imgArr.splice(index,1);
    this.setData({
      imgArr
    })
  },
  handleArea(e){
    let valueArear = e.detail.value;
    this.setData({valueArear});
  },
  handleBtn(){
    let {imgArr,valueArear}=this.data;
    if(valueArear.trim()==""){
      getShowTotal({content:"请输入反馈内容"});
      return;
    }
    // 这不多余,不能实现有误
    this.data.imgArr.forEach((v,i)=>{
      wx.uploadFile({
        url: 'https://web.yms7.com/tuchuang/index.html',
        filePath: v,
        name:"file" ,
        formData: {},
        success: (result) => {
          let url = result.data;
        },
      });
    });
    this.setData({
      imgArr:[],
      valueArear:""
    });
    wx.navigateBack({
      delta: 1
    });
  }
})