module.exports=(sequelize,DataTypes)=>{
    const Permission=sequelize.define('permission',{
        role_name:{
            type:DataTypes.STRING,
            defaultValue: 'Default',
            

        },
        view_channels:{
            type:DataTypes.BOOLEAN,
            defaultValue: true,
        },
        manage_channels:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
        },
        manage_roles:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
        },
        manage_emoji_stickers:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
            
        },
        view_auditlogs:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
        },
        manage_webhooks:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
        },
        manage_server:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
        },
        create_invite:{
            type:DataTypes.BOOLEAN,
            defaultValue: true,
        },
        change_nickname:{
            type:DataTypes.BOOLEAN,
            defaultValue: true,
        },
        manage_nickname:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
        },
        kick_members:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
        },
        ban_members:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
        },
        moderate_member:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
        },
        send_messages:{
            type:DataTypes.BOOLEAN,
            defaultValue: true,
        },
        send_messages_in_thread:{
            type:DataTypes.BOOLEAN,
            defaultValue: true,
        },
        create_public_thread:{
            type:DataTypes.BOOLEAN,
            defaultValue: true,
        },
        embed_links:{
            type:DataTypes.BOOLEAN,
            defaultValue: true,
        },
        attach_files:{
            type:DataTypes.BOOLEAN,
            defaultValue: true,
        },
        add_reactions:{
            type:DataTypes.BOOLEAN,
            defaultValue: true,
        },
        manage_messages:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
        },
        manage_threads:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
        },
        mention:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
        },
       
    },
    {
        timestamps: false,
    });
    return Permission;
}