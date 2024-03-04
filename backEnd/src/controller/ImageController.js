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

const model = initModels(sequelize);
const Op = Sequelize.Op;

export const ImageController = {
  checkImage: async (imageId) => {
    let data = await model.hinh_anh.findOne({
      where: {
        hinh_id: imageId,
      },
    });

    return data;
  },
  checkComment: async (commentId) => {
    let data = await model.binh_luan.findOne({
      where: {
        binh_luan_id: commentId,
      },
    });

    return data;
  },
  getAllImage: async (req, res) => {
    try {
      let data = await model.hinh_anh.findAll({
        include: ["nguoi_dung"],
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
    let pageSize = 20;

    let index = (page - 1) * pageSize;

    let count = await model.hinh_anh.count();
    let totalPage = Math.ceil(count / 20);

    try {
      let data = await model.hinh_anh.findAll({
        offset: index,
        limit: pageSize,
        include: ["nguoi_dung"],
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
          let data = await model.hinh_anh.findAll({
            where: {
              nguoi_dung_id: userId,
            },
            include: ["nguoi_dung"],
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
      let data = await model.hinh_anh.findAll({
        where: {
          ten_hinh: {
            [Op.like]: `%${key}%`,
          },
        },
        include: ["nguoi_dung"],
      });
      data.length > 0
        ? responseApi(res, 200, data, COMPLETE_GET_IMAGE)
        : responseApi(res, 404, [], NULL_SEARCH_RESULT);
    } catch (error) {
      console.log(error);
      responseApi(res, 404, error, FAIL_GET_IMAGE);
    }
  },

  getImageCommentByImage: async (req, res) => {
    let { imageId } = req.params;

    try {
      let data = await model.binh_luan.findAll({
        where: {
          hinh_id: imageId,
        },
        include: ["hinh_anh", "nguoi_dung"],
      });
      responseApi(res, 200, data, COMPLETE_GET_IMAGE_COMMENT);
    } catch (error) {
      responseApi(res, 404, {}, FAIL_GET_COMMENT);
    }
  },

  addNewImage: async (req, res) => {
    let userId = await AuthController.getUserIdFromToken(req);
    let { imageName, imageDescription, imageUrl } = req.body;
    let imageId = AuthController.generateRandomId();

    if (userId != 0) {
      if (userId == 1) {
        responseApi(res, 404, {}, TOKEN_EXPIRED);
      } else {
        if (validationData.checkNull(imageName)) {
          responseApi(res, 404, {}, FIELD_REQUIRED + " " + imageName);
        } else if (validationData.checkNull(imageDescription)) {
          responseApi(res, 404, {}, FIELD_REQUIRED + " " + imageDescription);
        } else if (validationData.checkNull(imageUrl)) {
          responseApi(res, 404, {}, FIELD_REQUIRED + " " + imageUrl);
        } else {
          let currentUser = await AuthController.checkExistUser(userId);
          if (currentUser) {
            try {
              await model.hinh_anh.create({
                hinh_id: imageId,
                nguoi_dung_id: userId,
                ten_hinh: imageName,
                mo_ta: imageDescription,
                duong_dan: imageUrl,
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

    currentImage.dataValues.ten_hinh = imageName;
    currentImage.dataValues.duong_dan = imageURL;
    currentImage.dataValues.mo_ta = imageDescription;

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
          if (userId === currentImage.dataValues.nguoi_dung_id) {
            if (currentImage) {
              try {
                let data = await model.hinh_anh.update(
                  currentImage.dataValues,
                  {
                    where: {
                      hinh_id: currentImage.dataValues.hinh_id,
                    },
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
              await model.hinh_anh.destroy({
                where: {
                  hinh_id: imageId,
                },
              });
              responseApi(res, 200, {}, COMPLETE_DELETE_IMAGE);
            } catch (error) {
              responseApi(
                res,
                404,
                { err: error.sqlMessage },
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
        let data = await model.binh_luan.findAll({
          where: {
            hinh_id: imageId,
          },
        });
        data.length <= 0
          ? responseApi(res, 404, data, NULL_COMMENT)
          : responseApi(res, 200, data, COMPLETE_GET_IMAGE_COMMENT);
      } catch (error) {
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
      let data = await model.binh_luan.findAll({
        where: {
          hinh_id: imageId,
        },
        offset: index,
        limit: pageSize,
        include: ["nguoi_dung", "hinh_anh"],
      });

      responseApi(
        res,
        200,
        { content: data, totalPage },
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
                binh_luan_id: commentId,
                nguoi_dung_id: userId,
                hinh_id: Number(imageId),
                ngay_binh_luan: new Date(),
                noi_dung: content,
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
              currentComment.dataValues.noi_dung = comment;
              let data = await model.binh_luan.update(
                currentComment.dataValues,
                {
                  where: {
                    binh_luan_id: currentComment.dataValues.binh_luan_id,
                    hinh_id: currentComment.dataValues.hinh_id,
                    nguoi_dung_id: userId,
                  },
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
            await model.binh_luan.destroy({
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
          let data = await model.luu_anh.findAll({
            where: {
              nguoi_dung_id: userId,
            },
            include: ["nguoi_dung", "hinh_anh"],
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
            nguoi_dung_id: userId,
            hinh_id: imageId,
            ngay_luu: new Date()
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
          await model.luu_anh.destroy({
            where:{
              nguoi_dung_id: userId,
              hinh_id: imageId,
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