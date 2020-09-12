
import {goodListForst} from "../../request/params"
import {requireData} from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
     tabsData:[
       {id:0,title:"综合",current:true},
       {id:1,title:"销量",current:false},
       {id:2,title:"价格",current:false}
     ],
     goodList:[]
  },
  // 数据参数
  queryParams:{
    c_id:"",
    pageNum:1,
    pasesize:10
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.c_id = options.c_id;
    this.queryGoodList()
  },
  onReachBottom:function(){
    this.queryParams.pageNum++;
    if(this.queryParams.pageNum <= 4){
      this.queryGoodList();
    }else{
      wx.showToast({
        title: '我是有底线的~',
      })
    }
  },
  onPullDownRefresh(){
    this.queryParams.pageNum = 1;
    this.setData({
      goodList:[]
    });
    this.queryGoodList();
  },
  queryGoodList(){
    requireData({url:"/home/goodList",data:this.queryParams})
    .then(result =>{
      this.setData({
        goodList:result.data.goods
      })
    })
    .catch(error => {
      this.setData({
        goodList:[...this.data.goodList,...goodListForst()]
      })
      wx.stopPullDownRefresh();
    })
  },
  getgoodlist(e){
    const index = e.detail;
    const tabsData = this.data.tabsData;
    tabsData.map((v,i) => i==index ? v.current=true :v.current=false);
    this.setData({
      tabsData
    })
  }
})