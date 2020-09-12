
import {getLogin} from "../../utils/asyncWX";
import {requireData} from "../../request/index";
import {getUserToken} from "../../request/params";
Page({
  data: {

  },
  getUserInfo(e){
    let {encryptedData,iv,signature,rawData}=e.detail;
    let code;
    getLogin().then((result) =>{
        code = result.code;
    });
    let params={encryptedData,iv,signature,rawData,code};
    requireData({url:"/users/wxlogin",data:{params},method:"post"}).then((result)=>{
       let {token} = result
    }).catch((error) =>{
       let token = getUserToken();
       wx.setStorageSync('token', token);
       wx.navigateBack({
         delta: 1,
       })
    })
  }
  
})