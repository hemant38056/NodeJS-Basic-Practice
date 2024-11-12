const express = require('express');
// const { render } = require('ejs');

const router = express.Router();

const math_obj = require('./controller/math');

const india_obj = require('./controller/india');

const stu_obj = require('./controller/college');

// Three Library for file upload  Any Type
const multer = require('multer'); // Upload the Destination Location

const fs = require('fs'); // Handle The File Type and Read

const path = require('path'); // Find The Where you Want To Store

//...........End..............


//Set up Multer for file upload

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        const uploadDir = './static/student_image';
        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename : function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname)); // unique file name (images or file)
        // cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

router.get('/', (req, res) => {
    res.render("Home");
    res.end();
})

router.get('/ram', (req, res) => {
    res.render('About');
    res.end();
})

router.get('/zirakpur', (req, res) => {
    res.render('contact');
    res.end();
})

router.get('/findSum', (req, res) => {
    res.render('sum');
    res.end();
})

router.post('/cal', (req, res) => {
    let a = req.body.a;
    let b = req.body.b;
    let c = parseInt(a) + parseInt(b);
    res.render('sum',{results : 'Sum is : ' + c});
    res.end();
})

router.use('/subtract', (req, res) =>{
    if(req.method == "GET"){
        res.render("subtract");
        res.end();
    }
    else{
        let a = req.body.a;
        let b = req.body.b;
        let c = parseInt(a) - parseInt(b);
        res.render('subtract', {results : 'Sub is : ' + c});
        res.end();
    }
})

router.use('/multi', (req, res) =>{
    math_obj.MUltiplication(req, res);
})

router.use('/test', (req, res) => {
    math_obj.Bootstrap_Page(req, res);
})

router.use('/test2', (req, res) => {
    res.render('test2');
    res.end();
}) 

router.use('/record_registration', (req, res) =>{
    india_obj.Add_Record(req, res);
})

router.use('/display_records1', (req, res) => {
    india_obj.Fetch_AllRecord1(req, res);
})

router.use('/display_records2', (req, res) => {
    india_obj.Fetch_AllRecord2(req, res);
})

router.use('/display_records3', (req, res) => {
    india_obj.Fetch_AllRecord3(req, res);
})

router.use('/delete_record1', (req, res) => {
    india_obj.Delete_Record1(req, res);
})

router.use('/delete_record2', (req, res) => {
    india_obj.Delete_Record2(req, res);
})


router.use('/update_records1', (req, res) => {
    india_obj.Update_Record1(req, res);
})

router.use('/search_record', (req, res) => {
    india_obj.Search_Record(req, res);
})

router.use('/delete_show', (req, res) => {
    india_obj.Delete_Show_Record(req, res);
})

router.use('/count_entries', (req, res) => {
    india_obj.Count(req, res);
})

router.use('/student_add',upload.single('photo'), (req, res) => {
    stu_obj.Add_Student(req, res);
})

router.use('/student_display', (req, res) => {
    stu_obj.Display_Student_Record1(req, res);
})

router.use('/login', (req, res) => {
    india_obj.Login_Check(req, res);
})

router.use('/signup', (req, res) =>{
    india_obj.SignUp_User(req, res);
})

router.use('/change_password', (req, res) => {
    if(req.session.myemailid){
        india_obj.change_pass(req, res);
    }
    else{
        res.render('login', {message : "Login Heree....."});
        res.end();
    }
})

router.use('/Welcome_dashboard', (req, res) => {
    if(req.session.myemailid){
        res.render('dashboard');
        res.end();
    }
    else{
        res.render('login', {message : "Login Here......"});
        res.end();
    }
    
})

router.use('/logout', (req, res) => {
    req.session.destroy();
    res.render('login', {message : "Logout Successfully"});
    res.end();
})


module.exports = router;