module.exports=(sequelize,DataTypes)=>{
    const Notification=sequelize.define('notification',{
        mute:{
            type:DataTypes.BOOLEAN,
            
        },
        none:{
            type:DataTypes.BOOLEAN
        },
        mention:{
            type:DataTypes.BOOLEAN
        },
       
    });
    return Notification;
}