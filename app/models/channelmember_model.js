// const { channelmembers } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Channelmember=sequelize.define('channelmember',{
       
        // channel_id:{
        //     type:DataTypes.INTEGER,
        //     // allowNull:true,
        //     // references:{
        //     //     model:'channels',
        //     //     key:'id',
        //     // }
        // },
        // member_id:{
        //     type:DataTypes.INTEGER,
        //     // allowNull:false,
        //     // references:{
        //     //     model:'users',
        //     //     key:'id',
        //     // }
        // },
    },
    {
        timestamps: false,
    });

    // Channelmember.associate=models=>{
    //     Channelmember.belongsTo(models.User,{
    //         foreignKey:'id'
    //     });
    //     Channelmember.belongsTo(models.Channel,{
    //         foreignKey:'id'
    //     });
    // }

    

    return Channelmember;
};