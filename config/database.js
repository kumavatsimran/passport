const mongoose=require('mongoose')
const Database=async()=>{
    try{
        await mongoose.connect("mongodb+srv://simranKumavat:simran12345@cluster0.arrsyvy.mongodb.net/blog")
        console.log("database is connected");
        return true
    }catch(error){
        console.log(error);
        return false
    }
}
 module.exports= Database