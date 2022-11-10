module.exports=(sequelize,DataTypes)=>{
    const Share=sequelize.define('share',{
        link:{
            type:DataTypes.STRING
        },
        expiry:{
            type:DataTypes.TIME
        },
    });
    return Share;
};