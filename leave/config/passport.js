const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

module.exports = function(passport){
    //DB Connect String   
    var connect = require('../config/keys').mongoURI;

    const pool = new Pool({
        connectionString:connect,
    });
    // Local Strategy
    passport.use(new LocalStrategy(function(username,password,done){
    
        pool.connect();
        pool.query('SELECT id,employee_email,password,isadmin,ismanagement FROM employee WHERE employee_email = $1',[username], function(err, result) {

                if(err) {
                    return done(err);
                }

            if(result.rows[0] ===undefined){
            console.log("Oopss. Incorrect login details 1.");
            return done(null,{isUser:false});
            } else {
            // Match Password
            bcrypt.compare(password, result.rows[0].password,(err,isMatch)=>{
                if(err){
                    console.log("Error while checking password");
                    return done(null,{isUser:false});
                }
                else if (isMatch){
                    console.log("done!!");
                    return done(null,{isUser:isMatch,isAdmin:result.rows[0].isadmin,userId:result.rows[0].id});
                }else{
                    console.log('invalid password');
                    return done(null,{isUser:false});
                }
            });
        }
        });
    }));

    passport.serializeUser((user, done)=> {
        done(null,user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
      });


    // passport.deserializeUser((id,done)=>{
    //     pool.connect();
    //     pool.query('SELECT id,employee_email,password,isadmin,ismanagement FROM employee WHERE id = $1',[id], function(err, result) {
    //        if(err){
    //            console.log("Error here"+err)
    //         return done(err)
    //        }
    //        done(null,result.rows[0]);
        
    // });
    // });
}

