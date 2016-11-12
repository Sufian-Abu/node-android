var chgpass = require('config/chgpass');
var register = require('config/register');
var login = require('config/login');
var report = require('config/report');
var user = require('config/models'); 
module.exports = function(app) {
 
 
 
    app.get('/peerinfo', function(req, res) {
 
        res.send([
  
  {
     
     "name": "navila",
     "text": "Left 7:00 PM"
  },
  {
    
     "name": "Ontora",
     "text": "Left 6:30 PM"
   },
   {
      "name": "Prova",
     "text": "Left 7:00 PM"
   },
   
   {
    
     "name": "Razia",
     "text": "Left 7:40 PM"
   },
   
   {
    
    "name": "Nishi",
     "text": "Left 8:40 PM"
   },
   {
    "name": "Syeda",
     "text": "Left 7:40 PM"
   },
   {
    
     "name": "NoorJaha",
     "text": "Left 8:40 PM"
   },
   
     {
    "name": "Azim",
     "text": "Left 6:40 PM"
   },
   {
    
     "name": "Noora",
     "text": "Left 10:40 PM"
   }
  
 ]);
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
        var displayname = "";
        var report = "";
        var lat="";
        var lon="";
        var category="";
        var locationname="";
        var created_at= new Date();
        register.register(email,password,public_key,created_at,displayname,report,lat,lon,category,locationname,function (found) {
            console.log(found);
            res.json(found);
    });
    });

    //     app.post('/report',function(req,res){
    //     var report = req.body.report;
    //     var lat = req.body.lat;
    //     var lon=req.body.lon;
    //     var category=req.body.category;
    //     var username=req.body.username;
    //     var locationname=req.body.locationname;
    //     var created_at= new Date();
    //     report.report(report,report,lat,lon,category,username,locationname,created_at,function (found) {
    //         console.log(found);
    //         res.json(found);
    // });
    // });

  app.get('/api/chgpass', function(req, res) {
 
        var response ={};
        user.find({},function(err,data){

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
        var displayname = req.body.displayname;
        var report = req.body.report;
        var public_key=req.body.public_key;
        var lat=req.body.lat;
        var lon=req.body.lon;
        var category=req.body.category;
        var locationname=req.body.locationname;
        var created_at= new Date();
        chgpass.cpass(id,displayname,report,public_key,lat,lon,category,locationname,created_at,function(found){
            console.log(found);
            res.json(found);
    });
    });
 
 
    // app.post('/api/resetpass', function(req, res) {
 
    //     var email = req.body.email;
 
    //     chgpass.respass_init(email,function(found){
    //         console.log(found);
    //         res.json(found);
    // });
    // });
 
 
    // app.post('/api/resetpass/chg', function(req, res) {
 
    //     var email = req.body.email;
    //     var code = req.body.code;
    //     var npass = req.body.newpass;
 
    //     chgpass.respass_chg(email,code,npass,function(found){
    //         console.log(found);
    //         res.json(found);
    // });
    // });
 
 
};