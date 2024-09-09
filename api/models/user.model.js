import mongoose from 'mongoose'

const userSchema  = new mongoose.Schema({

    username:{
            type: String,
            required: true,
            unique: true,
        },

        email:{
            type: String,
            required: true,
            unique: true,
        },

        password:{
            type: String,
            required:true,
        },
        profilePicture:{
            type: String,
            default: 'https://img.freepik.com/premium-photo/default-male-user-icon-blank-profile-image-green-background-profile-picture-icon_962764-98397.jpg?w=360',
        },
        isAdmin:{
            type: Boolean,
            default: false,
        },
        
}, {timestamps:true}
);

const User = mongoose.model('User', userSchema);

export default User;

