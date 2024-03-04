import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _nguoi_dung from "./NguoiDung.js";
import _hinh_anh from "./HinhAnh.js";
import _binh_luan from "./BinhLuan.js";
import _luu_anh from "./LuuHinh.js";

export default function initModels(sequelize) {
  const nguoi_dung = _nguoi_dung.init(sequelize, DataTypes);
  const hinh_anh = _hinh_anh.init(sequelize, DataTypes);
  const binh_luan = _binh_luan.init(sequelize, DataTypes);
  const luu_anh = _luu_anh.init(sequelize, DataTypes);

  hinh_anh.belongsTo(nguoi_dung, {
    as: "nguoi_dung",
    foreignKey: "nguoi_dung_id",
    onDelete: "cascade",
  });
  nguoi_dung.hasMany(hinh_anh, { as: "hinh_anh", foreignKey: "nguoi_dung_id" });

  binh_luan.belongsTo(nguoi_dung, {
    as: "nguoi_dung",
    foreignKey: "nguoi_dung_id",
    onDelete: "cascade",
  });
  nguoi_dung.hasMany(binh_luan, {
    as: "binh_luan",
    foreignKey: "nguoi_dung_id",
  });
  binh_luan.belongsTo(hinh_anh, {
    as: "hinh_anh",
    foreignKey: "hinh_id",
    onDelete: "cascade",
  });
  hinh_anh.hasMany(binh_luan, { as: "binh_luan", foreignKey: "hinh_id" });

  luu_anh.belongsTo(nguoi_dung, {
    as: "nguoi_dung",
    foreignKey: "nguoi_dung_id",
    onDelete: "cascade",
  });
  nguoi_dung.hasMany(luu_anh, { as: "luu_anh", foreignKey: "nguoi_dung_id" });
  luu_anh.belongsTo(hinh_anh, {
    as: "hinh_anh",
    foreignKey: "hinh_id",
    onDelete: "cascade",
  });
  hinh_anh.hasMany(luu_anh, { as: "luu_anh", foreignKey: "hinh_id" });

  return { nguoi_dung, hinh_anh, luu_anh, binh_luan };
}
