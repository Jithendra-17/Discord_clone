const db=require('../models');
const Permission=db.permission;
const Serverchanneluser=db.serverchanneluser;

const addrole=async(req,res)=>{
    let info={
        role_name:req.body.role_name,
        view_channels:req.body.view_channels,
        manage_channels:req.body.manage_channels,
        manage_roles:req.body.manage_roles,
        manage_emoji_stickers:req.body.manage_emoji_stickers,
        view_auditlogs:req.body.view_auditlogs,
        manage_webhooks:req.body.manage_webhooks,
        manage_server:req.body.manage_server,
        create_invite:req.body.create_invite,
        change_nickname:req.body.change_nickname,
        manage_nickname:req.body.manage_nickname,
        kick_members:req.body.kick_members,
        ban_members:req.body.ban_members,
        moderate_member:req.body.moderate_member,
        send_messages:req.body.send_messages,
        create_pubilc_thread:req.body.create_pubilc_thread,
        embed_links:req.body.embed_links,
        attach_files:req.body.attach_files,
        add_reactions:req.body.add_reactions,
        manage_messages:req.body.manage_messages,
        manage_thread:req.body.manage_thread,
        mention:req.body.mention,
    }
    try{
    const role=await Permission.create(info);
    // const addserver=await Servermember.create({
    //     userId:req.userId,
    //     serverId:server.id,
    // })
    // // console.log('server is added');
    res.status(200).send(role);
    }

    catch(err){ res.send(err.message)}
    
}
module.exports={
    addrole,
};