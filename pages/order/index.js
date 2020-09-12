// pages/order/index.js
import {requireData} from "../../request/index";
import {getOrderList} from "../../request/params"
Page({
  data: {
    tabData:[
      {id:0,title:"全部",current:false},
      {id:1,title:"待付款",current:false},
      {id:2,title:"待发货",current:false},
      {id:3,title:"退款/退货",current:false},
    ],
    type:1,
    orderAll:[],
    orderfail:[],
    orderCompement:[]
  },
  onShow(){
    let pages =  getCurrentPages();
    let currentPages=pages[pages.length-1];
    let types = currentPages.options.type 
    let {tabData,type} = this.data;
    console.log(types);
    tabData.forEach(v=>{
      type == v.id+1?v.current=true:v.current=false;
   })
   this.setData({
     tabData
   });
   this.requireOrderListData(types);
  },
  // tab栏设置
  handleTab(e){
   let index = e.detail;
   let {tabData} = this.data;
   tabData.forEach(v => {
       index==v.id?v.current=true:v.current=false;
   });
   this.setData({
     tabData
   })
   let params = index+1;
   this.requireOrderListData(params);
  },
  onLoad(option){
    this.setData({
      type:option.type
    })
  },
  // 订单接口数据获取
  requireOrderListData(params){
    requireData({url:"/orderList",data:{type:params}})
    .then(result =>{
      let data = result.data;
      this.setData({
        orderAll:data
      })
    })
    .catch(err =>{
      if(params ==1){
        this.setData({
          orderAll:getOrderList(params).map(v=>({
            ...v,order_time_cn:(new Date(v.order_time*1000).toLocaleString())
          }))
        })
      }else if(params ==2){
        this.setData({
          orderfail:getOrderList(params)
        })
      }else{
        this.setData({
          orderCompement:getOrderList(params)
        })
      }
      
    })
  }
})