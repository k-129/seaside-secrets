const {Router} = require('express');

const bcryptjs = require('bcryptjs');
const saltRounds = 10;

// require the User Model 
const mongoose = require('mongoose');
const User  = require('../models/User.model');

const router = new Router();

// Require Auth Middleware
const {isLoggedIn, isLoggedOut} = require('../middleware/route-guard');


//SIGN UP
//GET Route to display form
router.get('/signup', isLoggedOut, (req, res)=>{
    res.render('auth/signup.hbs');
})

router.post('/signup', (req, res)=>{
    
    const {firstName, lastName, email, password} = req.body;

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    if (!regex.test(password)){
        res.status(500).render('auth/signup', {errorMessage: 'Password needs to have at least 6 characters, 1 lowercase letter and 1 uppercase letter'});
        return;
    }

    // Make sure users fill all mandatory fields
    if(!email){
        res.render('auth/signup', {errorMessage: 'Please add email.'});
        return;
    } else if (!password){
        res.render('auth/signup', {errorMessage: 'Please add password.'});
        return;
    }else if (!firstName){
        res.render('auth/signup', {errorMessage: 'Please add your first name.'});
        return;
    } else if(!lastName){
        res.render('auth/signup', {errorMessage: 'Please add your last name.'});
        return;
    }

    async function encryptPassword(){
        try{
        // salt is a random string
        let salt = await bcryptjs.genSalt(saltRounds);
        // combines salt and password --> FUSION, AHH! 
        let hashedPassword = await bcryptjs.hash(password, salt);
        //console.log(`Password hash: ${hashedPassword}`);

        
        // save to DB 
        let newUser = await User.create({
            firstName,
            lastName,
            email, 
            password: hashedPassword,
        }); 

        // Redirect to User Profile 
        res.redirect('/login');
    }
    catch(error){
        if(error instanceof mongoose.Error.ValidationError){
            // HTTP Response Codes
            // 200 - successful response
            // 4xx - client-side error;
            // 404 - not found on client;
            // 5xx - server-side error; 
            // 505 - not found on server; 
            // 11000 - native MongoDB error --> you tried to submit a value that was created before. 
                    // same email as other user. 

            res.status(500).render('auth/signup', {errorMessage: error.message});
        } 
        else if (error.code === 11000){
            res.status(500).render('auth/signup', {errorMessage: 'email must be unique. Choose an email that is original, if you may.', });
        }
        
        else{
            console.log(error);
        }
    }
    }
    encryptPassword();
});

// LOGIN

// GET Route to display the login form to the user 
router.get('/login',isLoggedOut, (req,res)=>{
    res.render('auth/login.hbs');
});

router.post('/login', (req, res)=>{
    const {email, password} = req.body;

    // Validate if the user submitted email / password blank
    if(email === ''){
        res.render('author/login', {
            errorMessage: 'Please write your email'
        });
        return
    }else if (password === ''){
        res.render('author/login', {
            errorMessage: 'Please write your password'
        });
        return
    }

    async function manageDb(){
        try{
            let user = await User.findOne({email});
            if(!user){
                res.render('auth/login', {errorMessage: 'email is not registered. Try other, if you may.'})
            } else if (bcryptjs.compareSync(password, user.password)){
                req.session.currentUser = user; 
                res.redirect('/profile')
            } else {
                res.render('auth/login', {errorMessage: 'Wrong Password'})
            }
        }
        catch(error){
            console.log(error);
        }
    }
    manageDb();
});


//USER PROFILE  
router.get('/profile',isLoggedIn, (req,res)=>{
    const currentUser = req.session.currentUser._id
    async function getUserFromDb(){
        try{
        let foundUsers = await User.findById(currentUser);
        res.render('user/user-profile.hbs', {users: foundUsers});
        }
        catch(error){
            console.log(error);
        }
    }
    getUserFromDb();
});


//UPDATE PROFILE

// GET route to display the form to update a user
router.get('/user/edit/:userId',isLoggedIn, (req, res)=>{
    // Destructuring the req.params.bookId object
    const {userId} = req.params;

    // Feedback regarding req.params.bookId
    // console.log(bookId);

    async function findUser(){
        try{
            // get info of the user we want to edit
            let userToEdit = await User.findById(userId);
            // Render info with hbs view
            res.render('user/user-edit.hbs', {user: userToEdit});
        }
        catch (error){
            console.log(error);
        }
    }

    findUser();
});

// POST route to actually make updates on a user

router.post('/user/edit/:userId', (req, res)=>{
    // destructuring the req.params.bookId
    const {userId} = req.params; 
    const {firstName, lastName, email} = req.body;

    async function updateUser(){
        try{
          let updatedUser = await User.findByIdAndUpdate(userId, {firstName, lastName, email}, {new: true});
          res.redirect(`/profile`);
        }
        catch(error){
            console.log(error);
        }
    }

    updateUser();
});

router.get("/logout", isLoggedIn, (req, res, next) => {
    req.session.destroy((err) => {
      if (err) next(err);
      res.redirect("/");
    });
  });

  
/// Export Router
module.exports = router; 