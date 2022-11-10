module.exports=(sequelize,DataTypes)=>{
    const Serverchanneluser=sequelize.define('serverChannelUser',{
        userId:{
            type:DataTypes.INTEGER,
        },
        private:{
            type:DataTypes.BOOLEAN,
        },
        role:{
            type:DataTypes.INTEGER,
            
        },
    },
    {
        timestamps: false,
    });
    return Serverchanneluser;
};