module.exports.user_signout = async (req, res) => {
    res.clearCookie("token");
    return res
        .status(200)
        .json({ message: "User signed out successfully", status: 200 });
};
