module.exports=(sequelize,DataTypes)=>{
    const Server=sequelize.define('server',{
        name:{
            type:DataTypes.STRING
        },
        image:{
            type:DataTypes.STRING,
        },
        // channel_id:{
        //     type:DataTypes.INTEGER
        // },
        // profile_pic:{
        //     type:DataTypes.BLOB
        // },
        // notification:{
        //     type:DataTypes.INTEGER
        // },
        created_by:{
            type:DataTypes.INTEGER
        },
    });
    return Server;
}