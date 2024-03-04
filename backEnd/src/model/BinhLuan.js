import _sequelize from 'sequelize'
const {Model,Sequelize} = _sequelize

export default class binh_luan extends Model{
    static init(sequelize, DataTypes){
        return super.init({
            binh_luan_id: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.INTEGER
            },
            nguoi_dung_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references:{
                    model: 'nguoi_dung',
                    key: 'nguoi_dung_id'
                }
            },
            hinh_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references:{
                    model: 'hinh_anh',
                    key: 'hinh_id'
                }
            },
            ngay_binh_luan: {
                allowNull: false,
                type: DataTypes.DATE
            },
            noi_dung: {
                allowNull: false,
                type: DataTypes.STRING(200)
            },
        },{
            sequelize,
            tableName: 'binh_luan',
            timestamps: false,
            indexes:[
                {
                    name:'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields:[
                        {
                            name:'binh_luan_id'
                        }
                    ]
                },

                {
                    name:'nguoi_dung_id',
                    using: 'BTREE',
                    fields:[
                        {
                            name:'nguoi_dung_id'
                        }
                    ]
                },

                {
                    name:'hinh_id',
                    unique: true,
                    using: 'BTREE',
                    fields:[
                        {
                            name:'hinh_id'
                        }
                    ]
                }
            ]
        })
    }
}