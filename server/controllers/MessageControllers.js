import Message from "../models/MessagesModel.js";

export const getMessages = async (req, res) => {
  try {

    console.log("👉 req.userId:", req.userId);
    console.log("👉 req.body:", req.body);
    const user1 = req.id; // ✅ use req, not request
    const user2 = req.body.id;

    if (!user1 || !user2) {
      return res.status(400).json({ error: "Both UserID's are required." });
    }

    // Exclude logged-in user (verifyToken should set req.userId)
    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ timestamp: 1 });

    return res.status(200).json({ messages });
  } catch (error) {
    console.error("Get Messages Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
