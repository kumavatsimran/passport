// const blogDB=require("../models/blogdata")
const blogDB=require("../models/blogdata")
const user=require("../models/user")

const multer=require('multer')

const fs=require('fs')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./upload/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
})
const uploadImage=multer({storage}).single("image")

const form=async(req,res)=>{
    return res.render('pages/blog')
}
const blogPage=async(req,res)=>{
    const blog=await blogDB.find()



    return res.render('pages/index',{blog})
}
const AddBlog=async(req,res)=>{
    const image= req.file.path;
    const {name,discribtion,}=req.body

    try{
        let blog=await blogDB.create({name,discribtion,image})
        return res.redirect('/')
    }catch(error){
        console.log(error);
    }
}
const deleteData=async(req,res)=>{
    let {id}=req.query
    console.log({id},"q");
    try{
        let data=await blogDB.findByIdAndDelete(id)
        .then((singleRecord)=>{
            fs.unlinkSync(singleRecord.image)
            
            return res.redirect('/')
        })
    }
    catch(err){
        console.log(err);
    }
}
let blogId
const edit=async(req,res)=>{
    let id=req.query.id
    blogId=id
    let blog=await
    console.log(id,"e");
    blogDB.findById(id).then((blog) => {
        // console.log(data,"update");
        return res.render('./pages/edit', {blog});
    }).catch((err) => {
        console.log(err);
        return false;
    })
  
}

const editdata= async (req, res) => {
    let blog = req.body;
    if (req.file) {
      blog.image = req.file.path;
    }
    try {
      let result = await blogDB.findByIdAndUpdate(blogId, blog);  
      return res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };


  const signup = async(req,res)=>{
    console.log(req.body,"l");
    let data = await user.create(req.body);
    
    return res.redirect('/login')
}

const login = async(req,res)=>{
    const {email, password} = req.body;

    let User = await user.findOne({email : email})
    if (User) {
      if (User.password === password) {
        return res.redirect("/");
      }
      console.log("invalid password");
      return res.redirect("/login");
    } else {
      console.log("invalid email");
      return res.redirect("/login");
    }


}
const loginPage = (req,res)=>{
    return res.render('pages/login');
}

const signupPage = (req,res)=>{
    
    return res.render('pages/singup');
}

const logout = (req,res)=>{
    // res.clearCookie('user');
    res.redirect('/login');
}
const local=async(req,res)=>{
    console.log(req.body);
    res.end();

}

module.exports={blogPage,uploadImage,AddBlog,form,deleteData,edit,editdata,login,loginPage,signup,signupPage,logout,local};
