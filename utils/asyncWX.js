export function getSetting(){
    return new Promise((resole,reject)=>{ //设置权限
       wx.getSetting({
         success:(result)=>{
            resole(result);
         },
         fail:(error)=>{
           reject(error);
         }
       })
    })
}

export function openSetting(){
    return new Promise((resole,reject)=>{ //打开权限
       wx.openSetting({
         success:(result)=>{
            resole(result);
         },
         fail:(error)=>{
           reject(error);
         }
       })
    })
}

export function getclooseAdress(){
    return new Promise((resole,reject)=>{  //获取地址
       wx.chooseAddress({
         success:(result)=>{
            resole(result);
         },
         fail:(err)=>{
             reject(err)
         }
       })
    })
}

export function getShowModal({content}){   //弹出框组件
   return new Promise((resolve,reject)=>{
      wx.showModal({
         title: '提示',
         content: content,
         success: (res)=> {
           resolve(res)
         },
         fail:(error)=>{
            reject(error)
         }
       })
   })
}

export function getShowTotal({content}){
   return new Promise((resolve,reject)=>{ //消息提示
      wx.showToast({
        title: content,
        success:(result)=>{
          resolve(result);
        },
        fail:(result)=>{
          reject(result);
        }
      })
   })
}

export function getLogin(){
   return new Promise((resolve,reject)=>{  //登入接口
     wx.login({
       timeout: 10000,
       success:(result)=>{
          resolve(result);
       },
       fail:(error)=>{
          reject(error);
       }
     })
   })
}

export function getPay({pay}){
   return new Promise((resolve,reject)=>{  //支付接口
      wx.requestPayment({
        ...pay,
        success:(result)=>{
           resolve(result);
        },
        fail:(err)=>{
           reject(err);
        }
      })   
   })
}

export function getUploadImg(){
   return new Promise((resolve,reject)=>{  //选择图片
      wx.chooseImage({
         count: 5,
         sizeType: ['original', 'compressed'],
         sourceType: ['album', 'camera'],
         success: (result) => {
           resolve(result)
         },
         fail:(err)=>{
          reject(err)
         }
       });
   })
}

export function getUploadImg2(){
   return new Promise((resolve,reject)=>{  //图片上传后台
      wx.uploadFile({
         url: '',
         filePath:filePath,
         name:name,
         formData: {},
         success: (result) => {
           resolve(result);
         },
       });
   })
}
