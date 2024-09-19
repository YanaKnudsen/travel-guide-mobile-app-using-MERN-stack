const mongoose=require('mongoose');
const {Schema}=mongoose;

const citySchema=new Schema({
    name:String,
    location:[Number],


},  { collection : 'cities' });

const CityModel=mongoose.model('cities',citySchema);

module.exports = CityModel;