import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../appwrite/config";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const userData = useSelector((state) => state.auth.userData);

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        let existingProfile = await service.getProfile(userData.$id);

        if (!existingProfile) {
          existingProfile = await service.createProfile({
            userId: userData.$id,
            authorName: userData.name,
            description: `${userData.name}'s description...`,
            profileImage: "",
            tags: ["#tag"],
          });
        }

        setProfile(existingProfile);
        setDescription(existingProfile.description);
        setTags(existingProfile.tags || []);
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

  const uploadProfilePicture = async (e) => {
    try {
      const file = e.target.files[0];

      if (!file) return;

      const uploadedFile = await service.uploadFile(file);

      await service.updateProfile(profile.$id, {
        profileImage: uploadedFile.$id,
      });

      setProfile({
        ...profile,
        profileImage: uploadedFile.$id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const saveDescription = async () => {
    try {
      await service.updateProfile(profile.$id, {
        description,
      });

      setProfile({
        ...profile,
        description,
      });

      alert("Description updated!");
    } catch (error) {
      console.error(error);
    }
  };

  const addTag = () => {
    if (!newTag.trim()) return;

    const formattedTag = newTag.startsWith("#")
      ? newTag
      : `#${newTag}`;

    setTags([...tags, formattedTag]);
    setNewTag("");
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const saveTags = async () => {
    try {
      await service.updateProfile(profile.$id, {
        tags,
      });

      setProfile({
        ...profile,
        tags,
      });

      alert("Tags updated!");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to load profile. Check console.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">

      <div className="flex flex-col items-center">
        <img
          src={
            profile.profileImage
              ? service.getFileView(profile.profileImage)
              : `https://ui-avatars.com/api/?name=${profile.authorName}&size=200`
          }
          alt="Profile"
          className="w-32 h-32 md:w-60 md:h-60 rounded-full object-cover border-4 border-white shadow-lg"
        />

        <label className="mt-4 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Change Picture
          <input
            type="file"
            className="hidden"
            onChange={uploadProfilePicture}
          />
        </label>
      </div>

      <h1 className="text-3xl font-bold mt-6">
        {profile.authorName}
      </h1>

      <div className="w-full max-w-3xl mt-8">
        <h2 className="text-xl font-semibold mb-2">
          Description
        </h2>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          className="w-full border rounded p-3"
        />

        <button
          onClick={saveDescription}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Description
        </button>
      </div>

      <div className="w-full max-w-3xl mt-10">
        <h2 className="text-xl font-semibold mb-3">
          Hobbies / Interests / Characteristics
        </h2>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-slate-500 px-3 py-1 rounded flex items-center gap-2"
            >
              <span>{tag}</span>

              <button
                onClick={() => removeTag(index)}
                className="text-red-700 font-bold"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <div className="flex w-full max-w-3xl gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter tag"
            className="w-full flex-1 border rounded p-2"
          />

          <button
            onClick={addTag}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        <button
          onClick={saveTags}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Tags
        </button>
      </div>
      <button
        onClick={() =>
          navigate(`/profile/${userData.$id}`)
        }
        className="mt-10 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded cursor-pointer"
      >
        Visit Profile
      </button>
    </div>
  );
}

export default EditProfile;