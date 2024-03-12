import { Sequelize } from "sequelize";
import { responseApi } from "../config/response.js";
import sequelize from "../model/Connection.js";
import initModels from "../model/initModel.js";
import {
  FIELD_REQUIRED,
  TOKEN_EXPIRED,
  USER_NOT_EXIST,
} from "../utils/jwtMessageUtil.js";
import {
  COMPLETE_COMMENT,
  COMPLETE_CREATE_IMAGE,
  COMPLETE_DELETE_IMAGE,
  COMPLETE_DELETE_IMAGE_COMMENT,
  COMPLETE_GET_IMAGE,
  COMPLETE_GET_IMAGE_COMMENT,
  COMPLETE_SAVE_IMAGE,
  COMPLETE_UNSAVE_IMAGE,
  COMPLETE_UPDATE_IMAGE,
  COMPLETE_UPDATE_IMAGE_COMMENT,
  FAIL_COMMENT,
  FAIL_CREATE_IMAGE,
  FAIL_DELETE_IMAGE,
  FAIL_DELETE_IMAGE_COMMENT,
  FAIL_GET_COMMENT,
  FAIL_GET_IMAGE,
  FAIL_SAVE_IMAGE,
  FAIL_UNSAVE_IMAGE,
  FAIL_UPDATE_IMAGE,
  FAIL_UPDATE_IMAGE_COMMENT,
  IMAGE_NOT_EXIST,
  NULL_COMMENT,
  NULL_IMAGE_LIST,
  NULL_SEARCH_RESULT,
} from "../utils/messageUtil.js";
import { AuthController } from "./AuthController.js";
import { validationData } from "../utils/validationData.js";
import {PrismaClient} from '@prisma/client'
import uploadFile from "../middleware/cloudinary.js";

let model = new PrismaClient()
const Op = Sequelize.Op;

export const ImageController = {
  checkImage: async (imageId) => {
    let data = await model.hinh_anh.findFirst({
      where: {
        hinh_id: Number(imageId),
      },
    });

    return data;
  },

  checkComment: async (commentId) => {
    let data = await model.binh_luan.findFirst({
      where: {
        binh_luan_id: Number(commentId),
      },
    });

    return data;
  },

  getAllImage: async (req, res) => {
    try {
      let data = await model.hinh_anh.findFirst({
        include: {
          nguoi_dung: true
        }
      });

      data.length <= 0
        ? responseApi(res, 404, {}, NULL_IMAGE_LIST)
        : responseApi(res, 200, data, COMPLETE_GET_IMAGE);
    } catch (error) {
      responseApi(res, 404, error, FAIL_GET_IMAGE);
    }
  },

  getAllImagePaging: async (req, res) => {
    let { page } = req.params;
    let pageSize = 10;

    let index = (page - 1) * pageSize;

    let count = await model.hinh_anh.count();
    let totalPage = Math.ceil(count / 20);

    try {
      let data = await model.hinh_anh.findMany({
        skip: index,
        take: pageSize,
        include: {
          nguoi_dung: true
        },
      });
      data.length <= 0
        ? responseApi(res, 404, {}, NULL_IMAGE_LIST)
        : responseApi(
            res,
            200,
            { content: data, totalPage: totalPage, currentPage: page },
            COMPLETE_GET_IMAGE
          );
    } catch (error) {
      responseApi(res, 404, error, FAIL_GET_IMAGE);
    }
  },

  getImageByUserId: async (req, res) => {
    let userId = await AuthController.getUserIdFromToken(req);

    if (userId != 0) {
      if (userId == 1) {
        responseApi(res, 404, {}, TOKEN_EXPIRED);
      } else {
        try {
          let data = await model.hinh_anh.findMany({
            where: {
              nguoi_dung_id: userId,
            },
            include: {
              nguoi_dung: true
            },
          });

          responseApi(res, 200, data, COMPLETE_GET_IMAGE);
        } catch (error) {
          responseApi(res, 404, error, FAIL_GET_IMAGE);
        }
      }
    } else {
      responseApi(res, 404, {}, USER_NOT_EXIST);
    }
  },

  searchImage: async (req, res) => {
    let { key } = req.params;
    try {
      let data =await model.hinh_anh.findMany({
        where:{
          ten_hinh:{
            search: key
          }
        },
        include: {
          nguoi_dung: true
        },
      });
      data.length > 0
        ? responseApi(res, 200, data, COMPLETE_GET_IMAGE)
        : responseApi(res, 404, [], NULL_SEARCH_RESULT);
    } catch (error) {
      responseApi(res, 404, error, FAIL_GET_IMAGE);
    }
  },

  getImageCommentByImage: async (req, res) => {
    let { imageId } = req.params;

    try {
      let data = await model.binh_luan.findMany({
        where: {
          hinh_id: Number(imageId),
        },
        include: {
          hinh_anh: true,
          nguoi_dung: true
        },
      });
      responseApi(res, 200, data, COMPLETE_GET_IMAGE_COMMENT);
    } catch (error) {
      console.log(error);
      responseApi(res, 404, {}, FAIL_GET_COMMENT);
    }
  },

  addNewImage: async (req, res) => {
    let userId = await AuthController.getUserIdFromToken(req);
    let dataInput = {
      imageName: req.body.imageName,
      imageDescription: req.body.imageDescription,
    }
    let {file} = req

    let imageId = AuthController.generateRandomId();

    if (userId != 0) {
      if (userId == 1) {
        responseApi(res, 404, {}, TOKEN_EXPIRED);
      } else {
        if (validationData.checkNull(dataInput.imageName)) {
          responseApi(res, 404, {}, FIELD_REQUIRED + " " + imageName);
        } else if (validationData.checkNull(dataInput.imageDescription)) {
          responseApi(res, 404, {}, FIELD_REQUIRED + " " + imageDescription);
        } else {
          let currentUser = await AuthController.checkExistUser(userId);
          if (currentUser) {
            try {
              const uploadImage = await uploadFile(file.path,'Folder path created on cloudinary')
              const {secure_url: image_url} = uploadImage
              await model.hinh_anh.create({
                data:{
                  hinh_id: imageId,
                  nguoi_dung_id: userId,
                  ten_hinh: dataInput.imageName,
                  mo_ta: dataInput.imageDescription,
                  duong_dan: image_url,
                }
              });

              responseApi(res, 200, {}, COMPLETE_CREATE_IMAGE);
            } catch (error) {
              responseApi(res, 404, error, FAIL_CREATE_IMAGE);
            }
          } else {
            responseApi(res, 404, error, USER_NOT_EXIST);
          }
        }
      }
    } else {
      responseApi(res, 404, {}, USER_NOT_EXIST);
    }
  },

  updateImage: async (req, res) => {
    let { imageName, imageURL, imageDescription } = req.body;
    let { imageId } = req.params;

    let currentImage = await ImageController.checkImage(imageId);
    let userId = await AuthController.getUserIdFromToken(req);

    if (validationData.checkNull(imageName)) {
      responseApi(res, 404, {}, FIELD_REQUIRED + " imageName");
    } else if (validationData.checkNull(imageURL)) {
      responseApi(res, 404, {}, FIELD_REQUIRED + " imageURL");
    } else if (validationData.checkNull(imageDescription)) {
      responseApi(res, 404, {}, FIELD_REQUIRED + " imageDescription");
    } else {
      if (userId != 0) {
        if (userId == 1) {
          responseApi(res, 404, {}, TOKEN_EXPIRED);
        } else {
          if (userId == currentImage.nguoi_dung_id) {
            if (currentImage) {
              try {
                let data = await model.hinh_anh.update(
                  {
                    where: {
                      hinh_id: currentImage.hinh_id,
                    },
                    data:{
                      ten_hinh: imageName,
                      duong_dan: imageURL,
                      mo_ta: imageDescription
                    }
                  }
                );
                responseApi(res, 200, data, COMPLETE_UPDATE_IMAGE);
              } catch (error) {
                responseApi(res, 404, {}, FAIL_UPDATE_IMAGE);
              }
            } else {
              responseApi(res, 404, {}, IMAGE_NOT_EXIST);
            }
          } else {
            responseApi(res, 404, {}, USER_NOT_EXIST);
          }
        }
      } else {
        responseApi(res, 404, {}, USER_NOT_EXIST);
      }
    }
  },

  deleteImage: async (req, res) => {
    let { imageId } = req.params;
    let userId = await AuthController.getUserIdFromToken(req);
    let currentImage = await ImageController.checkImage(imageId);

    if (userId != 0) {
      if (userId == 1) {
        responseApi(res, 404, {}, TOKEN_EXPIRED);
      } else {
        if (userId != currentImage.dataValues.nguoi_dung_id) {
          responseApi(res, 404, {}, USER_NOT_EXIST);
        } else {
          if (currentImage) {
            try {
              await model.hinh_anh.delete({
                where: {
                  hinh_id: Number(imageId),
                },
              });
              responseApi(res, 200, {}, COMPLETE_DELETE_IMAGE);
            } catch (error) {
              responseApi(
                res,
                404,
                error,
                FAIL_DELETE_IMAGE
              );
            }
          } else {
            responseApi(res, 404, {}, IMAGE_NOT_EXIST);
          }
        }
      }
    } else {
      responseApi(res, 404, {}, USER_NOT_EXIST);
    }
  },

  getCommentByImage: async (req, res) => {
    let { imageId } = req.params;
    let currentImage = await ImageController.checkImage(imageId);

    if (currentImage) {
      try {
        let data = await model.binh_luan.findMany({
          where: {
            hinh_id: Number(imageId),
          },
        });
        data.length <= 0
          ? responseApi(res, 404, data, NULL_COMMENT)
          : responseApi(res, 200, data, COMPLETE_GET_IMAGE_COMMENT);
      } catch (error) {
        console.log(error);
        responseApi(res, 404, {}, FAIL_GET_COMMENT);
      }
    } else {
      responseApi(res, 404, {}, IMAGE_NOT_EXIST);
    }
  },

  getCommentByIdPage: async (req, res) => {
    let { page, imageId } = req.params;
    let pageSize = 10;
    // let currentImage = await ImageController.checkImage(imageId)

    let index = (page - 1) * pageSize;

    let count = await model.hinh_anh.count();
    let totalPage = Math.ceil(count / 10);

    try {
      let data = await model.binh_luan.findMany({
        where: {
          hinh_id: Number(imageId),
        },
        skip: index,
        take: pageSize,
        include: {
          nguoi_dung:true,
          hinh_anh: true
        },
      });

      responseApi(
        res,
        200,
        { content: data, totalPage,currentPage: page },
        COMPLETE_GET_IMAGE_COMMENT
      );
    } catch (error) {
      responseApi(res, 404, {}, FAIL_GET_COMMENT);
    }
  },

  addNewComment: async (req, res) => {
    let userId = await AuthController.getUserIdFromToken(req);
    let { imageId, content } = req.body;
    let commentId = AuthController.generateRandomId();
    let currentUser = await AuthController.checkExistUser(userId);

    if (userId != 0) {
      if (userId == 1) {
        responseApi(res, 404, {}, TOKEN_EXPIRED);
      } else {
        if (currentUser) {
          if (validationData.checkNull(imageId)) {
            responseApi(res, 404, {}, FIELD_REQUIRED + " imageId");
          } else if (validationData.checkNull(content)) {
            responseApi(res, 404, {}, FIELD_REQUIRED + " content");
          } else {
            try {
              await model.binh_luan.create({
                data:{
                  binh_luan_id: commentId,
                  nguoi_dung_id: userId,
                  hinh_id: Number(imageId),
                  ngay_binh_luan: new Date(),
                  noi_dung: content,
                }
                
              });

              responseApi(res, 200, {}, COMPLETE_COMMENT);
            } catch (error) {
              responseApi(res, 404, {}, FAIL_COMMENT);
            }
          }
        } else {
          responseApi(res, 404, {}, USER_NOT_EXIST);
        }
      }
    } else {
      responseApi(res, 404, {}, USER_NOT_EXIST);
    }
  },

  updateComment: async (req, res) => {
    let { comment } = req.body;
    let { commentId } = req.params;

    let currentComment = await ImageController.checkComment(commentId);
    let userId = await AuthController.getUserIdFromToken(req);

    if (userId != 0) {
      if (userId == 1) {
        responseApi(res, 404, {}, TOKEN_EXPIRED);
      } else {
        if (validationData.checkNull(comment)) {
          responseApi(res, 404, {}, FIELD_REQUIRED + " comment");
        } else {
          if (currentComment) {
            try {
              let data = await model.binh_luan.update(
                {
                  where: {
                    binh_luan_id: currentComment.binh_luan_id,
                    hinh_id: currentComment.hinh_id,
                    nguoi_dung_id: Number(userId),
                  },

                  data:{
                    noi_dung: comment
                  }
                }
              );
              responseApi(res, 200, data, COMPLETE_UPDATE_IMAGE_COMMENT);
            } catch (error) {
              responseApi(res, 404, {}, FAIL_UPDATE_IMAGE_COMMENT);
            }
          } else {
            responseApi(res, 404, {}, FAIL_GET_IMAGE);
          }
        }
      }
    } else {
      responseApi(res, 404, {}, USER_NOT_EXIST);
    }
  },

  deleteComment: async (req, res) => {
    let { commentId } = req.params;
    let userId = await AuthController.getUserIdFromToken(req);

    let currentComment = await ImageController.checkComment(commentId);
    if (userId === 0) {
      responseApi(res, 404, {}, USER_NOT_EXIST);
    } else {
      if (userId == 1) {
        responseApi(res, 404, {}, TOKEN_EXPIRED);
      } else {
        if (currentComment) {
          try {
            await model.binh_luan.delete({
              where: {
                binh_luan_id: commentId,
                nguoi_dung_id: userId,
              },
            });
            responseApi(res, 200, {}, COMPLETE_DELETE_IMAGE_COMMENT);
          } catch (error) {
            responseApi(res, 404, {}, FAIL_DELETE_IMAGE_COMMENT);
          }
        } else {
          responseApi(res, 404, {}, FAIL_GET_COMMENT);
        }
      }
    }
  },

  getSaveImageByUserId: async (req, res) => {
    let userId = await AuthController.getUserIdFromToken(req);

    if (userId != 0) {
      if (userId === 1) {
        responseApi(res, 404, {}, TOKEN_EXPIRED);
      } else {
        try {
          let data = await model.luu_anh.findMany({
            where: {
              nguoi_dung_id: Number(userId),
            },
            include: {
              nguoi_dung: true,
              hinh_anh: true
            },
          });

          data.length <= 0
            ? responseApi(res, 200, {}, NULL_IMAGE_LIST)
            : responseApi(res, 200, data, COMPLETE_GET_IMAGE);
        } catch (error) {
          console.log(error);
          responseApi(res, 404, {}, FAIL_GET_IMAGE);
        }
      }
    } else {
      responseApi(res, 404, {}, USER_NOT_EXIST);
    }
  },

  saveImageByUserId: async (req,res) =>{
    let {imageId} = req.params
    let userId = await AuthController.getUserIdFromToken(req)

    if(userId != 0){
      if(userId === 1) {
        responseApi(res,404,{},TOKEN_EXPIRED)
      }else{
        try {
          await model.luu_anh.create({
            data:{
              nguoi_dung_id: userId,
              hinh_id: imageId,
              ngay_luu: new Date()
            }
            
          })
          responseApi(res,200,{},COMPLETE_SAVE_IMAGE)
        } catch (error) {
          responseApi(res,404,error,FAIL_SAVE_IMAGE)
        }
      }
    }else{
      responseApi(res,404,{},USER_NOT_EXIST)
    }
  },

  deleteSaveImage: async (req,res) =>{
    let {imageId} = req.params
    let userId = await AuthController.getUserIdFromToken(req)

    if(userId != 0){
      if(userId === 1) {
        responseApi(res,404,{},TOKEN_EXPIRED)
      }else{
        try {
          await model.luu_anh.delete({
            where:{
              nguoi_dung_id: Number(userId),
              hinh_id: Number(imageId),
            }
          })
          responseApi(res,200,{},COMPLETE_UNSAVE_IMAGE)
        } catch (error) {
          responseApi(res,404,error,FAIL_UNSAVE_IMAGE)
        }
      }
    }else{
      responseApi(res,404,{},USER_NOT_EXIST)
    }
  }
};
