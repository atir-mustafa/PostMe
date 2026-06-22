import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleLine } from "@fortawesome/free-solid-svg-icons";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [posts, setPosts] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = useSelector(
    (state) => state.auth.userData
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const postData = await service.getPosts();

      if (postData) {
        setPosts(postData.documents);
      }

      const profileData =
        await service.getAllProfiles();

      if (profileData) {
        setProfiles(profileData);
      }
    };

    fetchData();
    setLoading(false);
  }, []);

  if (!userData) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="p-2 w-full min-h-96 flex justify-center items-center">
            <h1 className="text-3xl font-bold hover:text-violet-400">
              Login to read posts
            </h1>
          </div>
        </Container>
      </div>
    );
  }

  if (loading) {
    return (
      <Container>
        <div className="text-center py-20">
          Loading...
        </div>
      </Container>
    );
  }

  const uniqueProfiles = [];

  const seenUsers = new Set();

  profiles.forEach((profile) => {
    if (!seenUsers.has(profile.userId)) {
      seenUsers.add(profile.userId);
      uniqueProfiles.push(profile);
    }
  });

  const randomProfiles = uniqueProfiles
    .filter(
      (profile) =>
        profile.userId !== userData.$id
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const randomPosts = posts
    .filter(
      (post) =>
        post.userId !== userData.$id
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return (
    <div className="w-full py-8">

      <Container>

        <div
          className="
            rounded-3xl
            p-5
            md:p-10
            bg-linear-to-r
            from-violet-900
            via-slate-900
            to-slate-800
            shadow-xl
            mb-12
            transition-all 
            duration-300 
            hover:shadow-2xl
          "
        >

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome,
            <span className="text-violet-400">
              {" "}
              {userData.name}
            </span>
            !
          </h1>

          <p className="text-slate-300 text-base md:text-lg max-w-3xl">
            PostMe is a place where people share
            thoughts, stories, ideas and discover
            amazing creators. Explore new profiles,
            connect with interesting people and
            discover content that inspires you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">

            <button
              onClick={() => navigate("/search")}
              className="
                bg-violet-500
                hover:bg-violet-600
                px-6
                py-3
                rounded-xl
                font-semibold
              "
            >
              Explore People
            </button>

            <button
              onClick={() => navigate("/all-posts")}
              className="
                bg-slate-700
                hover:bg-slate-600
                px-6
                py-3
                rounded-xl
                font-semibold
              "
            >
              Explore Posts
            </button>

          </div>

        </div>

        <div className="mb-14">

          <h2 className="text-3xl font-bold mb-8">
            <FontAwesomeIcon icon={faPeopleLine} className="text-blue-500" /> <span>Discover New People</span>
          </h2>

          <div className="flex items-center gap-8 flex-wrap">

            {randomProfiles.map((profile) => (
              <div
                key={profile.$id}
                className="text-center cursor-pointer"
                onClick={() =>
                  navigate(`/visit-profile/${profile.userId}`)
                }
              >

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
                    w-24
                    h-24
                    rounded-full
                    object-cover
                    border-4
                    border-violet-500
                    transition
                    duration-300
                    hover:scale-110
                  "
                />

                <p className="mt-3 font-semibold">
                  {profile.authorName}
                </p>

              </div>
            ))}

            <button
              onClick={() => navigate("/search")}
              className="
                bg-violet-500
                hover:bg-violet-600
                px-5
                py-3
                rounded-xl
                h-fit
              "
            >
              See More →
            </button>

          </div>

        </div>

        <div>

          <h2 className="text-3xl font-bold mb-8">
            <FontAwesomeIcon icon={faRankingStar} className="text-yellow-500" /> <span>Discover Interesting Posts</span>
          </h2>

          <div className="flex flex-wrap">

            {randomPosts.map((post) => (
              <div
                key={post.$id}
                className="
                  p-3
                  w-full
                  sm:w-1/2
                  lg:w-1/4
                "
              >
                <PostCard {...post} />
              </div>
            ))}

          </div>

          <div className="mt-8 text-center">

            <button
              onClick={() =>
                navigate("/all-posts")
              }
              className="
                bg-violet-500
                hover:bg-violet-600
                px-8
                py-3
                rounded-xl
                font-semibold
              "
            >
              Visit More Posts →
            </button>

          </div>

        </div>

      </Container>

    </div>
  );
}

export default Home