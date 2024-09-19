const mongoose=require('mongoose');
const {Schema}=mongoose;


const placeSchema=new Schema({
    title:String,
    description:String,
    location:[Number],
    address:String,
    photos:[String],
    diet:[String],
    website:String,
    facebook:String,
    instagram:String,
    categories:[String],
    id:String,
    dist:Number,
    owner: {type: mongoose.Schema.Types.ObjectId,ref:'users'},

},  { collection : 'places' });

const PlaceModel=mongoose.model('places',placeSchema);

module.exports = PlaceModel;