import React, { useEffect, useState } from 'react';
import service from "../appwrite/config"
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function PostCard({$id, title, featuredImage, authorName}) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const userData = useSelector(
      (state) => state.auth.userData
  );

  useEffect(() => {
    const loadReactions = async () => {
        setLikes(
            await service.getLikes($id)
        );

        setDislikes(
            await service.getDislikes($id)
        );
    };

    loadReactions();
  }, [$id]);

  const handleLike = async (e) => {
    e.preventDefault();

    if (!userData) return;

    const existingReaction =
        await service.getUserReaction(
            $id,
            userData.$id
        );
    if (!existingReaction) {
        await service.addReaction(
            $id,
            userData.$id,
            "like"
        );
    } else if (existingReaction.reaction === "like") {
        await service.deleteReaction(
            existingReaction.$id
        );
    } else {
        await service.updateReaction(
            existingReaction.$id,
            "like"
        );
    }

    setLikes(await service.getLikes($id));
    setDislikes(await service.getDislikes($id));
  };

  const handleDislike = async (e) => {
    e.preventDefault();

    if (!userData) return;

    const existingReaction =
        await service.getUserReaction(
            $id,
            userData.$id
        );
    if (!existingReaction) {
        await service.addReaction(
            $id,
            userData.$id,
            "dislike"
        );
    } else if (existingReaction.reaction === "dislike") {
        await service.deleteReaction(
            existingReaction.$id
        );
    } else {
        await service.updateReaction(
            existingReaction.$id,
            "dislike"
        );
    }

    setLikes(await service.getLikes($id));
    setDislikes(await service.getDislikes($id));
  };

  return(
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-slate-800 rounded-xl p-4 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/20 transition-all duration-300'>
        <h1 className="mb-3 text-slate-400">
            Posted by {authorName || "Unknown Author"}
        </h1>
        <div className='w-full h-56 overflow-hidden rounded-xl mb-4'>
          <img src={service.getFileView(featuredImage)} alt={title} className='w-full h-full object-cover' />
        </div>
        <h2 className='text-lg md:text-xl font-bold text-slate-50 mb-4 line-clamp-2'>
            {title}
        </h2>

        <div className="flex flex-wrap gap-3">
            <button
                onClick={handleLike}
                className="px-3 py-1 rounded bg-violet-500 hover:bg-violet-600 cursor-pointer duration-500"
            >
                <FontAwesomeIcon icon={faThumbsUp} /> {likes}
            </button>

            <button
                onClick={handleDislike}
                className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 cursor-pointer duration-500"
            >
                <FontAwesomeIcon icon={faThumbsDown} /> {dislikes}
            </button>
        </div>
      </div>
    </Link>
  )
}

export default PostCard