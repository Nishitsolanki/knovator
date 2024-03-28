
// exports.getAllPosts = async (req, res) => {
//   try {
//     const createdBy = req.user._id;
//     const posts = await Post.find({ createdBy });
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch posts' });
//   }
// };

// exports.updatePost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const { title, body, location, active } = req.body;
//     const createdBy = req.user._id;
//     const post = await Post.findOneAndUpdate(
//       { _id: postId, createdBy },
//       { title, body, location, active },
//       { new: true }
//     );
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }
//     res.json({ message: 'Post updated successfully', post });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to update post' });
//   }
// };

// exports.deletePost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const createdBy = req.user._id;
//     const post = await Post.findOneAndDelete({ _id: postId, createdBy });
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }
//     res.json({ message: 'Post deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to delete post' });
//   }
// };


const Post = require('../model/post');

exports.createPost = async (req, res) => {
  try {
    const { title, body, location } = req.body;
    const createdBy = req.user._id;
    const post = new Post({ title, body, location, createdBy });
    await post.save();
    res.status(201).send({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getPostsByLocation = async (req, res) => {
  try {
    const { latitude, longitude} = req.body;

    // Check if any required parameter is missing or not a valid number
    if (isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude))) {
      return res.status(400).json({ message: 'Invalid coordinates or radius.' });
    }

    const posts = await Post.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(latitude), parseFloat(longitude)] 
          },
          
        }
      }
    });
    res.send({ posts });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


exports.postCount = async (req, res) => {
  try {
    const activePostsCount = await Post.countDocuments({ active: 1 });
    const inactivePostsCount = await Post.countDocuments({ active: 0 });  
    return res.status(200).json({ activePostsCount, inactivePostsCount });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
