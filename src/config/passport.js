const passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../model/user');
const { secret } = require('./config')

module.exports = function (passport) {
  console.log("yes");
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
      },

      function (payload, done) {
        console.log(payload);

        User.findOne({ email: payload.email })
          .then(emp => {
            if (emp) {
              done(null, emp);
            } else {
              done(null, false);
            }
          })
          .catch(err => {
            done(err, false);
          });
      }
    )
  );
};



