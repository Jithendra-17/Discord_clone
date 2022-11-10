module.exports=(sequelize,DataTypes)=>{
    const LoginAuth=sequelize.define('loginAuth',{
        name:{
            type:DataTypes.STRING
        },
        email_id:{
            type:DataTypes.STRING
        },
        otp:{
            type:DataTypes.INTEGER
        },
    });
    return LoginAuth;
}