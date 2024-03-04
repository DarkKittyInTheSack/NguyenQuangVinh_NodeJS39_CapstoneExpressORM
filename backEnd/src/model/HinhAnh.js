import _sequelize from 'sequelize'
const {Model,Sequelize} = _sequelize

export default class hinh_anh extends Model{
    static init(sequelize,DataTypes){
        return super.init({
            hinh_id: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.INTEGER
            },

            ten_hinh: {
                allowNull: false,
                type: DataTypes.STRING(100)
            },

            duong_dan: {
                allowNull: false,
                type: DataTypes.STRING(225)
            },

            mo_ta: {
                allowNull: false,
                type: DataTypes.STRING(225)
            },

            nguoi_dung_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references:{
                    model: 'nguoi_dung',
                    key: 'nguoi_dung_id'
                }
            },
        },{
            sequelize,
            tableName: 'hinh_anh',
            timestamps: false,
            indexes:[{
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields:[{
                    name: 'hinh_id'
                }]
            },{
                name: 'nguoi_dung_id',
                using: 'BTREE',
                fields:[{
                    name: 'nguoi_dung_id'
                }]
            }]
        })
    }
}