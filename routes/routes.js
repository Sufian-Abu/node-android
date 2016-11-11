var chgpass = require('config/chgpass');
var register = require('config/register');
var login = require('config/login');
var community = require('config/community');
 
 
module.exports = function(app) {
 
 
 
    app.get('/', function(req, res) {
 
        res.end("Node-Android-Project");
    });
 
 
    app.post('/login',function(req,res){
        var email = req.body.email;
            var password = req.body.password;
 
        login.login(email,password,function (found) {
            console.log(found);
            res.json(found);
    });
    });
 
 
    app.post('/register',function(req,res){
        var email = req.body.email;
        var password = req.body.password;
        var public_key=req.body.public_key;
        var created_at= new Date();
        register.register(email,password,public_key,created_at,function (found) {
            console.log(found);
            res.json(found);
    });
    });

        app.post('/community',function(req,res){
        var displayname = req.body.displayname;
        var report = req.body.report;
        var public_key=req.body.public_key;
        var lat=req.body.lat;
        var lon=req.body.lon;
        var category=req.body.category;
        var locationname=req.body.locationname;
        var created_at= new Date();
        community.community(displayname,report,public_key,created_at,lat,lon,category,locationname,function (found) {
            console.log(found);
            res.json(found);
    });
    });

  app.get('/community', function(req, res) {
 
        var response ={};
        community.find({},function(err,data){

            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    });

 
 
    app.post('/api/chgpass', function(req, res) {
        var id = req.body.id;
        var opass = req.body.oldpass;
        var npass = req.body.newpass;
 
        chgpass.cpass(id,opass,npass,function(found){
            console.log(found);
            res.json(found);
    });
    });
 
 
    app.post('/api/resetpass', function(req, res) {
 
        var email = req.body.email;
 
        chgpass.respass_init(email,function(found){
            console.log(found);
            res.json(found);
    });
    });
 
 
    app.post('/api/resetpass/chg', function(req, res) {
 
        var email = req.body.email;
        var code = req.body.code;
        var npass = req.body.newpass;
 
        chgpass.respass_chg(email,code,npass,function(found){
            console.log(found);
            res.json(found);
    });
    });
 
 
};