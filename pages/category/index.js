import {requireData} from "../../request/index";
import {fenlei} from "../../request/params"
Page({
  data: {
    categoryData:[],
    leftcategory:[],
    rightcategory:[],
    currentNum:0,
    scrollTop:0
  },
  onLoad: function () {
    const cases = wx.getStorageSync('case');
    if(!cases){
      this.getFeiLei();
    }else{
      if(Date.now() - cases.time > 1000*10){
        this.getFeiLei();
      }else{
        let leftcategory =cases.data.map(v =>v.name1);
        var rightcategory = cases.data[0].children;
        this.setData({
          leftcategory,
          rightcategory
      })
      }
    }
    
  },
  getFeiLei(){
    requireData({url:"/home/fenlei"})
    .then(result =>{
      this.setData({
        categoryData:result.data
      })
    })
    .catch(error =>{
      var categoryData = fenlei();
      wx.setStorageSync('case',{time:Date.now(),data:categoryData})
      let leftcategory =categoryData.map(v =>v.name1);
      var rightcategory = categoryData[0].children
      this.setData({
        categoryData,
        leftcategory,
        rightcategory
      })
    })
  },
  handleLeft:function(e){
      const {index} = e.currentTarget.dataset;
      if(wx.getStorageSync('case')){
        var rightcategory = wx.getStorageSync('case').data[index].children;
      }else{
        let categoryData = this.data.categoryData;
        var rightcategory = categoryData[index].children
      }
      this.setData({
        currentNum:index,
        rightcategory,
        scrollTop:0
      })
  }
})