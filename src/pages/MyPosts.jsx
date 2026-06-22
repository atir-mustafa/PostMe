import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import service from "../appwrite/config";
import PostCard from "../components/PostCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function MyPosts() {
  const [posts, setPosts] = useState([]);

  const userData = useSelector(
    (state) => state.auth.userData
  );

  useEffect(() => {
    if (!userData) return;

    service
      .getPosts([
        Query.equal("userId", userData.$id),
      ])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      });
  }, [userData]);

  return (
    <div className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">
          <FontAwesomeIcon icon={faEnvelope} /> <span>Your Posts</span>
        </h1>

        {posts.length === 0 ? (
          <p>You haven't posted anything yet.</p>
        ) : (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPosts;