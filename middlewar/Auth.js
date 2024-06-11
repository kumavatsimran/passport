const user=require('../models/user')
// const blog=require('../models/blogdata')
const localStartegy = require("passport-local").Strategy;

const userAuth = (req,res,next) =>{

    const {username, email, password} = req.body;

    if(username && email && password){
        next();
    }else{
        res.send("invalid user");
    }

}


const localAuth = (passport) => {
    passport.use(
      new localStartegy(async (username, password, done) => {
        console.log(username, password);
        try {
          let User = await user.findOne({ username: username });
          console.log("local auth", User);
          if (!User) return done(null, false);
          if (User.password != password) return done(null, false);
          return done(null, User);
        } catch (error) {
          console.log(error);
        }
      })
    );
    passport.serializeUser((User, done) => {
      return done(null, User.id);
    });
    passport.deserializeUser(async (id, done) => {
      const User = await user.findById(id);
  
      return done(null, User);
    });
  };
  
  const isAuth = (req,res,next)=>{
    console.log("isauth", req.user);
    if (req.user) {
      return next();
    } else {
      return res.redirect("/login");
    }
    
}
module.exports = {userAuth, isAuth,localAuth};