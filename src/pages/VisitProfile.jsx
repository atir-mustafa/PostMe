import React, {
  useEffect,
  useState
} from "react";

import { useParams } from "react-router-dom";

import service from "../appwrite/config";
import { Query } from "appwrite";
import PostCard from "../components/PostCard";

function VisitProfile() {
  const { userId } = useParams();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const profiles =
          await service.getAllProfiles();

        const foundProfile =
          profiles.find(
            (profile) =>
              profile.userId === userId
          );

        setProfile(foundProfile);

        const userPosts =
          await service.getPosts([
            Query.equal("userId", userId),
            Query.equal("status", "active")
          ]);

        setPosts(userPosts.documents);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [userId]);

  if (!profile)
    return <div>Loading Profile...</div>;

  return (
    <div className="p-8">

      <div className="flex flex-col items-center">

        <img
          src={
            profile.profileImage
              ? service.getFileView(
                  profile.profileImage
                )
              : `https://ui-avatars.com/api/?name=${profile.authorName}`
          }
          alt={profile.authorName}
          className="
            w-60
            h-60
            rounded-full
            object-cover
          "
        />

        <h1 className="text-3xl font-bold mt-5">
          {profile.authorName}
        </h1>

        <p className="mt-5 text-center">
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

      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">
        {(posts.length === 0) ? `${profile.authorName} has no posts yet!` : `${profile.authorName}'s Posts :`}
      </h2>

      <div className="flex flex-wrap gap-5">
        {posts.map((post) => (
          <PostCard
            key={post.$id}
            {...post}
          />
        ))}
      </div>

    </div>
  );
}

export default VisitProfile;