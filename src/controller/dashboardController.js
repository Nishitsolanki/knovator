
const Dashboard = require('../model/dashboard');
const Post = require('../model/post');

const updateDashboard = async () => {
  try {
    const activeCount = await Post.countDocuments({ active: true });
    const inactiveCount = await Post.countDocuments({ active: false });

    let dashboard = await Dashboard.findOne();
    if (!dashboard) {
      dashboard = new Dashboard();
    }
    dashboard.activeCount = activeCount;
    dashboard.inactiveCount = inactiveCount;
    await dashboard.save();
  } catch (error) {
    console.error('Error updating dashboard:', error);
  }
};

const getDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne();
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateDashboard,
  getDashboard,
};
