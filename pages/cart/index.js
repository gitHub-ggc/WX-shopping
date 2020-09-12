

import {getSetting,openSetting,getclooseAdress,getShowModal,getShowTotal} from "../../utils/asyncWX"
Page({
  data: {
    addressData:{},
    carData:[],
    checkAll:true,
    priceAll:0,
    numAll:0,
    footerText:"包含运费"
  },
  onShow(){
     const cart = wx.getStorageSync('cat') || []
     this.init(cart);
     this.setData({
      addressData:wx.getStorageSync('address'),
    })
  },
  // 获取收货地址
  handleBtn(){
    //打开授权接口,查看并得到你打开的获取收货地址上点的是确定还是取消状态
    getSetting().then((result)=>{
       const scopeAddress = result.authSetting["scope.address"];
       if(!scopeAddress){
        openSetting();
       }
        getclooseAdress().then((result2)=>{
           result2.all=result2.provinceName+result2.cityName+result2.countyName+result2.detailInfo;
           wx.setStorageSync('address', result2);
        })
    })
  },
  // 点击单选
  handChecked(e){
    let index = e.currentTarget.dataset.index;
    let cart = JSON.parse(JSON.stringify(this.data.carData))
        cart.forEach((v,i) =>{
      if(i == index){
        v.checkde = ! v.checkde;
      };  
       this.init(cart);
    })
  },
  // 点击全选
  changeAll(e){
    let {checkAll,priceAll,numAll,footerText} = this.data;
    let cart = this.data.carData
    checkAll = !checkAll;
    cart.forEach(v=>{
      v.checkde = checkAll;
    });
    this.setData({
      carData:cart
    })
    this.init(cart)
  },
  // 全选 总价格, 结算函数封装
  init(cart){
      let checkAll;
      let priceAll=0;
      let numAll=0;
      let text 
       cart.forEach(v => {
        if(v.checkde){
          numAll+= v.num;
          priceAll+=v.num*v.goods_price;
          console.log(numAll,priceAll)
        }else{
          checkAll = false;
        }
     });
     if(priceAll == 0){
        text = ""
     }else{
      text = "包含运费"
     }
     this.setData({
      checkAll,
      numAll,
      priceAll,
      carData:cart,
      footerText:text
      })
    wx.setStorageSync("cat",cart);
  },
  //点击符号+或-
  handleNumAdd(e){
    let goods_id=e.currentTarget.dataset.goods_id;
    let params=e.currentTarget.dataset.index;
    let cart = this.data.carData;
    let index = cart.findIndex(v => v.goods_id==goods_id);
    cart.forEach(v =>{
      if(v.goods_id==goods_id){
        if(v.num ==1 && params == -1){
          getShowModal({content:"确定删除吗?"}).then((res)=>{
            if(res.confirm){
                cart.splice(index,1);
                this.init(cart);
            }
          })
          return;
        }else{
          v.num+=params;
          this.init(cart);
        } 
      }
    });
  },
  // 点击结算按钮
  handleEnd(){
    let address = wx.getStorageSync("address");
    if(! address.userName || address == undefined){
      getShowTotal({content:"请填写收货人信息"}).then(()=>{});
      return;
    }
    if(this.data.numAll==0){
      getShowTotal({content:"您还未挑选商品!"}).then(()=>{})
      return;
    }
    wx.navigateTo({
      url: '../pay/index',
    })
  }
})