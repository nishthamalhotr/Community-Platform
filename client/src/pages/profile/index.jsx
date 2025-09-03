import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { colors, getColor } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { UPDATE_PROFILE_ROUTE } from "@/utils/constants";



const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const validateProfile = (firstName, lastName) => {
    if (!firstName || firstName.trim() === "") {
      toast.error("First Name is required.");
      return false;
    }
    if (!lastName || lastName.trim() === "") {
      toast.error("Last Name is required.");
      return false;
    }
    return true;
  };

 const saveChanges = async () => {
  if (validateProfile(firstName, lastName)) {
    try {
      const response = await apiClient.put(
        UPDATE_PROFILE_ROUTE,
        {
          firstName,
          lastName,
          color: selectedColor, // ✅ if backend expects index, keep this. If it expects actual color class, pass colors[selectedColor]
        },
        { withCredentials: true }
      );

      if (response.status === 200 && response.data) {
        setUserInfo({ ...response.data });
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Update Profile Error:", error);
      toast.error(error.response?.data?.error || "Failed to update profile");
    }
  }
};


  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack
            className="text-4xl lg:text-6xl text-white/90 cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Avatar Section */}
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.charAt(0)
                    : userInfo.email.charAt(0)}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full">
                {image ? (
                  <FaTrash
                    className="text-white text-3xl cursor-pointer"
                    onClick={() => setImage(null)}
                  />
                ) : (
                  <FaPlus
                    className="text-white text-3xl cursor-pointer"
                    onClick={() => {
                      // TODO: open file input
                    }}
                  />
                )}
              </div>
            )}
          </div>
          {/* Input Section */}
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo.email}
                className="rounded-lg p-5 w-full bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <input
                placeholder="First Name"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="rounded-lg p-5 w-full bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <input
                placeholder="Last Name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="rounded-lg p-5 w-full bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                    selectedColor === index
                      ? "outline outline-white outline-1"
                      : ""
                  }`}
                  onClick={() => setSelectedColor(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="w-full">
          <Button
            className="h-18 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
