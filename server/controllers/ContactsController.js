import User from "../models/Usermodel.js";

export const searchContacts = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    if (!searchTerm || searchTerm.trim() === "") {
      return res.status(400).json({ error: "Search term is required." });
    }

    // Escape regex special characters
    const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(sanitizedSearchTerm, "i");

    // Exclude logged-in user (verifyToken should set req.userId)
    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.userId } },
        {
          $or: [
            { firstName: regex },
            { lastName: regex },
            { email: regex },
          ],
        },
      ],
    }).select("firstName lastName email _id image");

    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Search Contacts Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
