/*
// GET route to retrieve and display details of a specific book
router.get('/beach/:beachId', (req,res)=>{
    // Destructuring the req.params.bookId
    const {beachId} = req.params; 
 
 
    // Feedback regarding to req.params.bookId
    //console.log('The Id from the URL is:', bookId);
 
    async function findBeachFromDb(){
     try{
         // Find all the users
         const users = await User.find();
 
 
         // Finding the Book via Id
         let foundBeach = await Beach.findById(beachId);
         await foundBeach.populate('something here')
         await foundBeach.populate({
             path:'beach', 
             populate: {
                 path:'beach', 
                 model: 'User'
             }
         });
         // Feedback Regarding the found Book
         // console.log(foundBook);
         // Render 
         res.render('user/user-profile.hbs', {beach: foundBeach, users});
     }
     catch(error){
         console.log(error);
     }
    }
 
    findBeachFromDb();
 })
 
 router.post('/user/user-profile/:id', (req,res)=>{
     // Object destructuring
     // same as -> const id = req.params.id;
     const {id} = req.params; 
 
     // req.query --> queries of the form that was submitted via 'GET' method
     // req.body --> 'body' of the form that was submitted via 'POST' method
     const {content, author} = req.body;
 
     async function createReviewinDb(){
         try{
             // Create the Review
             const newReview = await Review.create({content, author});
 
             // Add the Review to the Book
             const bookUpdate = await Book.findByIdAndUpdate(id, {$push: {reviews: newReview._id}} );
 
             // Add the Review to the User
             const userUpdate = await User.findByIdAndUpdate(author, {$push: {reviews: newReview._id}} );
 
             res.redirect(`/books/${id}`);
         }
         catch(error){
             console.log(error);
         };
     }
 
     createReviewinDb();
 
 }); 

 
 // Export Routes
 module.exports = router;

 */