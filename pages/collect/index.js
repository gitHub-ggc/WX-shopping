
Page({
  data: {
     tabData:[
       {id:0,title:"商品收藏",current:false},
       {id:1,title:"品牌收藏",current:false},
       {id:2,title:"店铺收藏",current:false},
       {id:3,title:"浏览足迹",current:false}
     ],
     clictData:[]
  },  
  onShow(){
    let currentPages =  getCurrentPages();
    let pageId =currentPages[currentPages.length-1].options.id
    let {tabData} = this.data;
    tabData.forEach(v=>{
      v.id==pageId?v.current=true:v.current=false;
    })
    let clictData = wx.getStorageSync("clict")||[];
     this.setData({
       clictData,
       tabData
     }) 
  },
  handleTitle(e){
    let index = e.detail;
    let tabData = JSON.parse(JSON.stringify(this.data.tabData));
    tabData.forEach(v => {
      v.id==index?v.current=true:v.current=false;
    });
    this.setData({
      tabData
    })
  }
})