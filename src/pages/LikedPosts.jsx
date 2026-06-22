import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../appwrite/config";
import PostCard from "../components/PostCard";

function LikedPosts() {
    const [posts, setPosts] = useState([]);

    const userData = useSelector(
        (state) => state.auth.userData
    );

    useEffect(() => {
        const loadLikedPosts = async () => {

            if (!userData) return;

            try {

                const reactions =
                    await service.getLikedPostsByUser(
                        userData.$id
                    );

                const likedPosts = await Promise.all(
                    reactions.documents.map(async (reaction) => {
                        try {
                            return await service.getPost(
                                reaction.postId
                            );
                        } catch {
                            return null;
                        }
                    })
                );

                setPosts(
                    likedPosts.filter(Boolean)
                );

            } catch (error) {
                console.log(error);
            }
        };

        loadLikedPosts();
    }, [userData]);

    return (
        <div className="w-full py-8">
            <div className="max-w-7xl mx-auto px-4">

                <h1 className="text-3xl font-bold mb-8">
                    <i className="fa-regular fa-thumbs-up"></i> <span>Liked Posts</span>
                </h1>

                {posts.length === 0 ? (
                    <p>
                        You haven't liked any posts yet.
                    </p>
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

export default LikedPosts;