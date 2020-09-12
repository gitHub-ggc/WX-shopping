import {getPay,getShowTotal,getShowModal} from "../../utils/asyncWX"
import {requireData} from "../../request/index";
import {getOrder,getPayInfo} from "../../request/params";
Page({
  data: {
    addressData:{},
    carData:[],
    priceAll:0,
    numAll:0,
  },
  onShow(){
     let cart = wx.getStorageSync('cat') || [];
     cart = cart.filter(v =>{ return v.checkde});
     let priceAll=0;
     let numAll=0;
      cart.forEach(v => {
         numAll+= v.num;
         priceAll+=v.num*v.goods_price;
    });
    this.setData({
     numAll,
     priceAll,
     carData:cart,
     addressData:wx.getStorageSync('address')
     })
  },
  // 点击结算按钮
  handleOrder(){
    try {
      let token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '../auth/index',
      })
      return;
    };
    // 创建订单编号
    let head = token;
    let price = this.data.priceAll;
    let cart = this.data.carData;
    let address = this.data.addressData.all
    let goods=[]
    cart.forEach(v=>{
       goods.push({
         id:v.goods_id,
         num:v.num,
         price:v.goods_price
       })
    });
    let params = {price,address,}
    requireData({head,method:"post",data:params,url:"/my/order"}).then((result)=>{
      console.log(result);
    }).catch((error)=>{
      let pay = getOrder();
      let pay2=getPayInfo();
      getPay(pay2).then(result=>{
        console.log(result)
      }).catch((err)=>{
        getShowModal({content:"确定支付吗?"}).then(result=>{
          getShowTotal({content:"支付成功"}).then(result=>{
            let cart = wx.getStorageSync('cat');
            cart = cart.filter(v=>{return !v.checkde});
            wx.setStorageSync('cat', cart);
            wx.navigateBack({
              delta: 1,
            })
          })
        })
      })
    })
    } catch (error) {
      console.log(error); 
    }
  }
})