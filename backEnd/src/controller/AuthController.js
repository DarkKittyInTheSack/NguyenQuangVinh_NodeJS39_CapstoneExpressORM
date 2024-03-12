import { responseApi } from "../config/response.js";
import bcrypt from 'bcrypt'
import { COMPLETE_CREATE_USER_PROFILE, COMPLETE_GET_USER_PROFILE, COMPLETE_UPDATE_USER_PROFILE, EMAIL_EXIST, EMAIL_NOT_EXIST, FAIL_CREATE_USER_PROFILE, FAIL_GET_USER_PROFILE, FAIL_UPDATE_USER_PROFILE, IMAGE_PATH_INVALID, USER_PROFILE_EXIST } from "../utils/messageUtil.js";
import { jwtoken } from "../config/jwt.js";
import { COMPLETE_CHANGE_PASSWORD, COMPLETE_CREATE_TOKEN, EMAIL_INVALID, FAIL_CHANGE_PASSWORD, FAIL_CREATE_TOKEN, FIELD_REQUIRED, LOGIN_COMPLETE, PASSWORD_DO_NOT_MATCH, PASSWORD_FAIL, TOKEN_EXPIRED, USER_NOT_EXIST } from "../utils/jwtMessageUtil.js";
import { validationData } from "../utils/validationData.js";
import {PrismaClient} from '@prisma/client'
import uploadFile from "../middleware/cloudinary.js";

// const model = initModels(sequelize)
let model = new PrismaClient()

export const AuthController = {
    generateRandomId: () =>{
        return Number(Math.floor(Math.random() * 1000000000))
    },

    checkExistUser: async (userId) =>{

        let data = await model.nguoi_dung.findFirst({
            where: {
                nguoi_dung_id: userId
            }
        });
        return data;
    },

    checkExistEmail: async (email) =>{

        let data = await model.nguoi_dung.findFirst({
           where:{
            email:email
           }
        });

        return data;
    },

    loginUser: async (req,res) =>{
        let {email,password} = req.body;

        let checkEmail = await AuthController.checkExistEmail(email)
        let checkEmailTemplate  = validationData.checkEmailTempalte(email)

        if(validationData.checkNull(email)){
            responseApi(res,404,{},FIELD_REQUIRED + " email");
        }
        else if(validationData.checkNull(password)){
            responseApi(res,404,{},FIELD_REQUIRED + " password");
        }else{
            if(!checkEmailTemplate){
                responseApi(res,404,{},EMAIL_INVALID);
            }else{
                if(checkEmail){
                    if(bcrypt.compareSync(password,checkEmail.mat_khau)){
                        let key = new Date().getTime();
                        let token = jwtoken.createToken({userId: checkEmail.nguoi_dung_id,key});
                        let tokenRefresh = jwtoken.createToken({userId: checkEmail.nguoi_dung_id,key});
        
                        let userData = await model.nguoi_dung.update({
                            where:{
                                nguoi_dung_id: checkEmail.nguoi_dung_id
                            },
                            data:{
                                refresh_token: tokenRefresh
                            }
                        })
                        res.setHeader('token',token)
        
                        responseApi(res,200,{dataUser: userData, userToken: token},LOGIN_COMPLETE);
                    }else{
                        responseApi(res,404,{},PASSWORD_FAIL);
                    }
                }else{
                    responseApi(res,404,{},EMAIL_NOT_EXIST);
                }
            }
        }

    },

    registerUser: async (req,res) =>{
        let userId = AuthController.generateRandomId();
        // let {email,password,name,age} = req.form
        let dataInput = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            age: req.body.age
        }
        let {file} = req
        let existUser = await AuthController.checkExistUser(userId), existEmail = await AuthController.checkExistEmail(dataInput.email)
        if(!existEmail && !existUser){
            try {
                const uploadResult = await uploadFile(file.path,'Folder path created on cloudinary')
                const {secure_url: image_url} = uploadResult
                await model.nguoi_dung.create({
                    data:{
                        nguoi_dung_id: userId,
                        email: dataInput.email,
                        mat_khau: bcrypt.hashSync(dataInput.password,10),
                        ho_ten: dataInput.name,
                        tuoi: Number(dataInput.age),
                        anh_dai_dien: image_url
                    }
                })
                responseApi(res,200,{},COMPLETE_CREATE_USER_PROFILE)
            } catch (error) {
                console.log(error)
                responseApi(res,404,error,FAIL_CREATE_USER_PROFILE)
            }
            
        }else{
            if(await AuthController.checkExistUser(userId)){
                responseApi(res,404,{},USER_PROFILE_EXIST)
            }else{
                if(!file){
                    responseApi(res,404,{},IMAGE_PATH_INVALID)
                }else{
                    
                    responseApi(res,404,{},EMAIL_EXIST)
                }
            }
        }
    },

    resetLoginToken: async (req,res) =>{
        let {token} = req.headers;
        let decode = jwtoken.decodeToken(token)

        let data = await AuthController.checkExistUser(decode.userId)

        if(data){
            let checkRefreshToken = jwtoken.checkRefreshToken(data.dataValues.refresh_token);
            let decodeRefreshToken = jwtoken.decodeToken(data.dataValues.refresh_token);

            if(checkRefreshToken == null && decode.key == decodeRefreshToken.key){
                let key = new Date().getTime();
                let loginToken = jwtoken.createToken({userId: data.dataValues.nguoi_dung_id,key});
                responseApi(res,200,{newLoginToken: loginToken},COMPLETE_CREATE_TOKEN)
            }else{
                responseApi(res,401,'Unauthorized',FAIL_CREATE_TOKEN)
            }   
            
        }else{
            responseApi(res,404,{},USER_NOT_EXIST)
        }
    },

    getUserIdFromToken: async (req,res) =>{
        let {token} = req.headers;
        let decode = jwtoken.decodeToken(token)

        let tokenChecker = jwtoken.verifyToken(req,res)
        if(!tokenChecker){
            return 1
        }else{
            if(decode != null){
                if(await AuthController.checkExistUser(decode.userId) != undefined){
                    return decode.userId
                }else{
                    return 0
                }
            }else{
                return 0
            }
        }

        
    },

    getUserInformation: async (req,res) =>{
        let userId = await AuthController.getUserIdFromToken(req)
        if(userId != 0){

            if(userId == 1){
                responseApi(res,401,{},TOKEN_EXPIRED)
            }else{
                try {
                    let userData = await model.nguoi_dung.findFirst({
                        where: {
                            nguoi_dung_id: userId
                        }
                    })
        
                    responseApi(res,200,userData,COMPLETE_GET_USER_PROFILE)
                } catch (error) {
                    responseApi(res,404,error,FAIL_GET_USER_PROFILE)
                }
            }
        }else{
            responseApi(res,404,{},USER_NOT_EXIST)
        }
    },

    updateUserInformation: async (req,res) =>{
        let {age,fullname,image} = req.body
        let userId = await AuthController.getUserIdFromToken(req)

        if(userId!= 0){
            if(userId == 1){
                responseApi(res,401,{},TOKEN_EXPIRED)
            }else{
                let currentUser = await model.nguoi_dung.findFirst({
                    where:{
                        nguoi_dung_id: userId
                    }
                })
        
                try {
                    if(validationData.checkNull(age)){
                        responseApi(res,404,{},FIELD_REQUIRED + " age")
                    }else if(validationData.checkNull(fullname)){
                        responseApi(res,404,{},FIELD_REQUIRED + " full name")
                    }else if(validationData.checkNull(image)){
                        responseApi(res,404,{},FIELD_REQUIRED + " image")
                    }else {
                        await model.nguoi_dung.update({
                            where:{
                                nguoi_dung_id: currentUser.nguoi_dung_id
                            },
                            data:{
                                tuoi: Number(age),
                                ho_ten: fullname,
                                anh_dai_dien: image
                            }
                        })       
                        responseApi(res,200,{},COMPLETE_UPDATE_USER_PROFILE)
                    }
                } catch (error) {
                    console.log(error)
                    responseApi(res,404,error,FAIL_UPDATE_USER_PROFILE)
                }
            }
        }else{
            responseApi(res,404,{},USER_NOT_EXIST)
        }
    },

    changePassword: async (req,res) =>{
        let {email} = req.params;
        let {password,confirmPassword} = req.body

        let currentUser = await AuthController.checkExistEmail(email)

        if(currentUser){
            let newPassword = bcrypt.hashSync(password,10)
            // let newPasswordConfirm = bcrypt.hashSync(confirmPassword,10)
            if(bcrypt.compareSync(confirmPassword,newPassword)){
                try {
                    await model.nguoi_dung.update({
                        where:{
                            nguoi_dung_id: currentUser.nguoi_dung_id
                        },
                        data:{
                            mat_khau: newPassword
                        }
                    })
                    responseApi(res,200,{},COMPLETE_CHANGE_PASSWORD)
                } catch (error) {
                    responseApi(res,404,error,FAIL_CHANGE_PASSWORD)
                }
            }else{
                responseApi(res,404,{},PASSWORD_DO_NOT_MATCH)
            }
            
        }else{
            responseApi(res,404,{},USER_NOT_EXIST)
        }
    },

    getAllUser: async (req,res) =>{
        let data = await model.nguoi_dung.findMany()
        responseApi(res,200,data,'Thanh cong')
    },

    getUserById: async (req,res) =>{
        let {userId} = req.params;

        let data = await model.nguoi_dung.findFirst({
            where: {
                nguoi_dung_id: Number(userId)
            }
        })

        if(data){
            responseApi(res,200,data,COMPLETE_GET_USER_PROFILE)
        }else{
            responseApi(res,404,{},USER_NOT_EXIST)
        }
    }
}