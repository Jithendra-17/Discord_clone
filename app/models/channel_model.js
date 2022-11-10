const { DATE } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Channel=sequelize.define('channel',{
        name:{
            type:DataTypes.STRING
        },
        type:{
            type:DataTypes.STRING,
        },
        // server_id:{
        //     type:DataTypes.INTEGER
        // },
        // channel_id:{
        //     type:DataTypes.INTEGER,
        //     unique:true
        // },
        // message_id:{
        //     type:DataTypes.INTEGER
        // },
        // thread_id:{
        //     type:DataTypes.INTEGER
        // },
        // share:{
        //     type:DataTypes.STRING
        // },
        // notification:{
        //     type:DataTypes.INTEGER
        // },
        created_by:{
            type:DataTypes.INTEGER
        },
        private_channel:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
        },
      
        
    });
    return Channel;
}