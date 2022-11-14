module.exports=(sequelize,DataTypes)=>{
    const Userroles=sequelize.define('userrole',{
        // server_id:{
        //     type:DataTypes.INTEGER
        // },
        // member_id:{
        //     type:DataTypes.INTEGER
        // },
    },{
        timestamps: false,
    });
    return Userroles;
};