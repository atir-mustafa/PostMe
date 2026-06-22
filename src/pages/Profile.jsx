import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import service from "../appwrite/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const userData = useSelector(
    (state) => state.auth.userData
  );

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        let existingProfile =
          await service.getProfile(userData.$id);

        if (!existingProfile) {
          existingProfile =
            await service.createProfile({
              userId: userData.$id,
              authorName: userData.name,
              description:
                `${userData.name}'s description...`,
              profileImage: "",
              tags: ["#tag"],
            });
        }

        setProfile(existingProfile);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (userData) {
      loadProfile();
    }
  }, [userData]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-96 flex flex-col items-center p-8">

      <img
        src={
          profile.profileImage
            ? service.getFileView(
                profile.profileImage
              )
            : `https://ui-avatars.com/api/?name=${profile.authorName}&size=200`
        }
        alt="Profile"
        className="w-60 h-60 rounded-full object-cover border-4 border-white shadow-lg"
      />

      <h1 className="text-3xl font-bold mt-5">
        {profile.authorName}
      </h1>

      <p className="max-w-2xl mt-6 text-center">
        {profile.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-6 justify-center">
        {profile.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-slate-700 px-3 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        onClick={() =>
          navigate(`/edit-profile/${userData.$id}`)
        }
        className="mt-10 bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg cursor-pointer"
      >
        <FontAwesomeIcon icon={faPenToSquare} /> <span>Edit Profile</span>
      </button>
    </div>
  );
}

export default Profile;