import _sequelize from 'sequelize'
const {Model,Sequelize} = _sequelize

export default class nguoi_dung extends Model{
    static init(sequelize,DataTypes){
        return super.init({
            nguoi_dung_id: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.INTEGER
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING(100)
            },
            mat_khau: {
                allowNull: false,
                type: DataTypes.STRING(10000)
            },
            ho_ten: {
                allowNull: false,
                type: DataTypes.STRING(100)
            },
            tuoi: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            anh_dai_dien: {
                allowNull: false,
                type: DataTypes.STRING(1000)
            },
            refresh_token: {
                allowNull: false,
                type: DataTypes.STRING(1000)
            },
        },{
            sequelize,
            tableName: 'nguoi_dung',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields:[
                        {
                            name: 'nguoi_dung_id'
                        }
                    ]
                },
                {
                    name: 'email',
                    unique: true,
                    using: 'BTREE',
                    fields: [{
                        name: 'email'
                    }]
                }
            ]
        })
    }
}