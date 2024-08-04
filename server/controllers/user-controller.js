const { number } = require("zod");
const Img = require("../models/image-model");
const User = require("../models/user-model");
const Score = require("../models/score-model");

const getAllUsers = async (req, res) => {
  try {
    //console.log("from auth controller")
    const users = await User.find();
    res.status(200).json({ users: users });
  } catch (error) {
    console.log(error);
  }
};

const totalOptions = async (req, res) => {
  try {
    const maxOptions = [8, 10, 12, 14];

    const randomIndexMax = Math.floor(Math.random() * maxOptions.length);

    res.json({ totalOptions: maxOptions[randomIndexMax] });
  } catch (error) {
    return res.json({
      err: error,
      location: "in total random options generator",
    });
  }
};
const option = async (req, res) => {
  try {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    const randomNo = Math.floor(Math.random() * numbers.length);
    const randomNumber = randomNo;

    const imgDoc = await Img.findOne({ name: new RegExp(`^${randomNumber}-`) });

    if (imgDoc) {
      // const extractedNumber = imgDoc.name.split('-')[0];
      res.json({ randomImageName: imgDoc.name });
    } else {
      // Handle case where no matching image found
      res.status(404).json({ error: "No matching image found" });
    }
  } catch (error) {
    return res.json({ err: error, location: "in random option generator" });
  }
};

const saveScore = async (req, res) => {
    try {
      const { username, correctValue, totalImage } = req.body;
  
      if (!username || correctValue === undefined || totalImage === undefined) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      if(correctValue == 0 && totalImage ==0 ){
        return res.status(400).json({ message: "Invalid values!"})
      }
  
      const date = new Date();
    //   const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${date.getFullYear()}`;
  
      const score = new Score({
        username,
        correctValue,
        totalImage,
        date,
      });
  
      await score.save();
      res.json({ newScore: score });
    } catch (error) {
      console.error("Error saving score:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  

const sendHistory = async (req, res) => {
    try {
      const { username } = req.body;
  
      if (!username) {
        return res.status(400).json({ message: "Username is required" });
      }
  
      const userHistory = await Score.find({ username });
  
      if (!userHistory || userHistory.length === 0) {
        return res.status(404).json({ message: "User data not found" });
      }
  
      res.status(200).json({ userHistory });
    } catch (error) {
      console.error("Error fetching user history:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  

module.exports = { totalOptions, option, getAllUsers, saveScore, sendHistory };
