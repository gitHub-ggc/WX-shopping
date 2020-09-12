
let num = 0
wx.showLoading({
    title: '加载中',
    mask:true
  });
  num++
 const baseUrl = "https://api.zbztb.cn/api/public/vl"
export const requireData = (params)=>{
   let header={...params.header};
   if(params.url.includes("/my/")){
     header["Authorization"]=wx.getStorageSync("token");  
   }
    return new Promise((resoleve,reject)=>{
       wx.request({
        ...params,
        header, 
        url:baseUrl + params.url,
        success:(result)=>{
            resoleve(result)
        },
        fail:(error)=>{
            reject(error)
        },
        complete:()=>{
          num--;
          if(num == 0){
            wx.hideLoading();
          }
        }
       });    
    })
}
wx.hideLoading();