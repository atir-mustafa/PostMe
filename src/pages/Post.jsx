import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

export default function Post() {
    const [post, setPost] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);

                    service.getLikes(post.$id)
                        .then(setLikes);

                    service.getDislikes(post.$id)
                        .then(setDislikes);
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };
    
    const handleLike = async () => {

        if (!userData) return;

        const existingReaction =
            await service.getUserReaction(
                post.$id,
                userData.$id
            );

        if (!existingReaction) {

            await service.addReaction(
                post.$id,
                userData.$id,
                "like"
            );

        } else if (
            existingReaction.reaction === "like"
        ) {

            await service.deleteReaction(
                existingReaction.$id
            );

        } else {

            await service.updateReaction(
                existingReaction.$id,
                "like"
            );
        }

        setLikes(
            await service.getLikes(post.$id)
        );

        setDislikes(
            await service.getDislikes(post.$id)
        );
    };

    const handleDislike = async () => {

        if (!userData) return;

        const existingReaction =
            await service.getUserReaction(
                post.$id,
                userData.$id
            );

        if (!existingReaction) {

            await service.addReaction(
                post.$id,
                userData.$id,
                "dislike"
            );

        } else if (
            existingReaction.reaction === "dislike"
        ) {

            await service.deleteReaction(
                existingReaction.$id
            );

        } else {

            await service.updateReaction(
                existingReaction.$id,
                "dislike"
            );
        }

        setLikes(
            await service.getLikes(post.$id)
        );

        setDislikes(
            await service.getDislikes(post.$id)
        );
    };

    return post ? (
        <div className="py-8">
            <Container>
                <h1 className="mb-3 text-slate-400 text-xl">
                    Posted by <Link to={`/visit-profile/${post.userId}`} className="hover:text-violet-500"> <FontAwesomeIcon icon={faUser} />{post.authorName || "Unknown Author"}</Link>
                </h1>
                <div className="max-w-lg flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.getFileView(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={handleLike}
                            className="px-4 py-2 rounded bg-violet-500 hover:bg-violet-600 cursor-pointer duration-500"
                        >
                            <FontAwesomeIcon icon={faThumbsUp} /> {likes}
                        </button>

                        <button
                            onClick={handleDislike}
                            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 cursor-pointer duration-500"
                        >
                            <FontAwesomeIcon icon={faThumbsDown} /> {dislikes}
                        </button>
                    </div>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}