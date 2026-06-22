import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import service from '../appwrite/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopesBulk } from '@fortawesome/free-solid-svg-icons';

function AllPosts() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  return(
    <div className='w-full pb-8'>
      <h1 className="text-3xl font-bold m-6">
        <FontAwesomeIcon icon={faEnvelopesBulk} /> <span>All Posts</span>
      </h1>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((posts) => (
            <div key={posts.$id} className='p-2 w-1/4'>
              <PostCard {...posts} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts