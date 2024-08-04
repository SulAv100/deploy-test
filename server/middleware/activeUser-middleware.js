const User = require("../models/user-model");

const checkActiveUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const packageLimit = user.package;

    // replace this shit later
    if (user.activeUsersCount > packageLimit) {
      return res.status(403).json({ msg: `Exceeded limit of package` });
    }

    user.activeUsersCount += 1;
    await user.save();

    next();
  } catch (error) {
    res.status(500).json({ msg: "Error in checking active users", error });
  }
};

module.exports = { checkActiveUser };
