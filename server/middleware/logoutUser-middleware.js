const User = require("../models/user-model");

const logoutUser = async (req, res, next) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (user.activeUsersCount > 0) {
            user.activeUsersCount -= 1;
            await user.save();
        }

        next();
    } catch (error) {
        res.status(500).json({ msg: "Error in logging out user", error });
    }
};

module.exports = { logoutUser };
