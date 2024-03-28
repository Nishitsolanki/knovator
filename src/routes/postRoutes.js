// const express = require('express');
// const router = express.Router();
// const postController = require('../controller/postController');
// const authMiddleware = require('../middleware/authMiddleware');

// // router.post('/create', authMiddleware, postController.createPost);
// // router.get('/all', authMiddleware, postController.getAllPosts);
// // router.put('/:id', authMiddleware, postController.updatePost);
// // router.delete('/:id', authMiddleware, postController.deletePost);

// module.exports = router;

// routes/postRoutes.js
const express = require('express');
// const { authenticateUser } = require('../middleware/authMiddleware');
const { createPost, getPostsByLocation,postCount } = require('../controller/postController');
var passport = require('passport');
const bodyParser = require('body-parser');
require('../config/passport')(passport)

const router = express.Router() 
router.use(bodyParser.json())

router.post('/posts', passport.authenticate('jwt', { session: false }), createPost);
router.get('/location', getPostsByLocation);
router.get('/postCount',postCount)

module.exports = router;

