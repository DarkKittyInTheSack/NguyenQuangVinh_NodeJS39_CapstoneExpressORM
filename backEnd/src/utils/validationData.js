import { responseApi } from "../config/response.js"
import { EMAIL_INVALID, FIELD_REQUIRED, RANGE_REQUIRED } from "./jwtMessageUtil.js"

export const validationData = {
    checkNull: (data,res) =>{
        if(data == ''){
            return true
        }else{
            return false
        }
    },

    checkLength: (data,res,min,max) =>{
        if(data.length < min || data.length > max){
            // responseApi(res,404,{},RANGE_REQUIRED+ "("+min + " - " + max + ")")
            return true
        }else{
            return false
        }
    },

    checkEmailTempalte: (data) =>{
        let emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!emailValidation.test(String(data).toLowerCase())){
            return false
        }else{
            return true
        }
    }
}