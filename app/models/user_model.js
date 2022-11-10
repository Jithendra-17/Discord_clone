module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define('user',{
        name:{
            type:DataTypes.STRING,
            
        },
        email_id:{
            type:DataTypes.STRING,
            unique:true,
        },
        mobile_number:{
            type:DataTypes.DECIMAL(10,0),
            unique:true,
        },
        dob:{
            type:DataTypes.DATEONLY
        },
        password:{
            type:DataTypes.STRING,
        }
    },
    {
        timestamps: true,
        updatedAt:false,
        createdAt:'Joined On' 
    });

 
    return User;
}