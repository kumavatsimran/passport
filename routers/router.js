const  {Router}=require('express')
const {isAuth,localAuth}= require('../middlewar/Auth');
const {
     blogPage, AddBlog, uploadImage,form, deleteData,edit,editdata,login,loginPage,signup,signupPage,logout
     } = require('../controller/controller');
const passport = require('passport');


const router=Router();

router.get('/',isAuth,blogPage);
router.get('/blog',form);
router.get('/deleteData',deleteData);
router.get('/editData',edit);
router.get('/signup',signupPage);
router.get('/logout',logout);
router.get('/login',loginPage);

router.post('/insertData',uploadImage,AddBlog);
router.post('/edit',uploadImage,editdata);

// router.post('/logindata',login);

router.get('/logout',logout);
router.post('/singupdata',signup)
router.post(
    "/local",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );
  

module.exports=router
