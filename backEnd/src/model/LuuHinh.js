import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class luu_anh extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        nguoi_dung_id: {
          primaryKey: true,
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: "nguoi_dung",
            key: "nguoi_dung_id",
          },
        },
        hinh_id: {
          primaryKey: true,
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: "hinh_anh",
            key: "hinh_id",
          },
        },
        ngay_luu: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        tableName: "luu_anh",
        timestamps: false,
        indexes: [
          {
            name: "nguoi_dung_id",
            using: "BTREE",
            fields: [
              {
                name: "nguoi_dung_id",
              },
            ],
          },
          {
            name: "hinh_id",
            using: "BTREE",
            fields: [
              {
                name: "hinh_id",
              },
            ],
          },
        ],
      }
    );
  }
}
