module.exports=(sequelize,DataTypes)=>{
    const Message=sequelize.define('message',{
        msg:{
            type:DataTypes.STRING
        },
        sender:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        channelId:{
            type:DataTypes.INTEGER
        },
        serverId:{
            type:DataTypes.INTEGER,
        },
        pinned:{
            type:DataTypes.BOOLEAN
        },
        thread_id:{
            type:DataTypes.INTEGER
        },  
    } ,
    { timestamps: true,
        updatedAt:false,
        createdAt:'Time',});
    return Message;
}