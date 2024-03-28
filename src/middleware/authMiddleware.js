const passport = require('passport');

// exports.authenticateUser = (req, res, next) => {
//   const jwt = passport.authenticate('jwt', { session: false }, (err, user) => {
//     if (err || !user) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     console.log(jwt)
//     req.user = user;
//     next();
//   })(req, res, next);
// };

// exports.authenticateUser = (req, res, next) => {
//   passport.authenticate('jwt', { session: false }, (err, user) => {
//     if (err) {
//       console.error('JWT authentication error:', err); // Log the error
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     // if(!user){
//     //   return res.status(400).send({message: "user a"})
//     // }
//     console.log("solanki nishit", user)
//     req.user = user;
//     next();
//   })(req, res, next);
// };
