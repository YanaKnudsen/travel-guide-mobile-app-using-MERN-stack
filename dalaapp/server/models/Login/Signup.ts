const mongoose=require('mongoose');
const {Schema}=mongoose;

const signupSchema=new Schema({
    fullName:String,
    email: {type:String,unique:true},
    password:String


},  { collection : 'users' });

const signupModel=mongoose.model('users',signupSchema);

module.exports = signupModel;