import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search() {
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const userData = useSelector(
    (state) => state.auth.userData
  );

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const users = await service.getAllProfiles();
        setProfiles(users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfiles();
  }, []);

  const uniqueProfiles = [];

  const seenUsers = new Set();

  profiles.forEach((profile) => {
    if (!seenUsers.has(profile.userId)) {
      seenUsers.add(profile.userId);
      uniqueProfiles.push(profile);
    }
  });

  const filteredProfiles = uniqueProfiles.filter(
    (profile) =>
      profile.userId !== userData?.$id &&
      profile.authorName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center p-8">

      <h1 className="text-3xl font-bold mb-8 text-center">
        <FontAwesomeIcon icon={faMagnifyingGlass} /> <span>Find People You May Know!!</span>
      </h1>

      <input
        type="text"
        placeholder="Search username..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="
          w-full
          max-w-4xl
          p-4
          rounded-lg
          text-white
          bg-slate-800
          outline-none
          border
          border-slate-700
        "
      />

      <div className="w-full max-w-4xl mt-8 space-y-4">

        {filteredProfiles.length === 0 ? (
          <div className="text-center text-xl mt-20">
            No user found possessing this username!!
          </div>
        ) : (
          filteredProfiles.map((profile) => (
            <div
              key={profile.$id}
              className="
                flex
                flex-col
                md:flex-row

                gap-4

                md:items-center
                md:justify-between

                bg-slate-800
                p-4
                rounded-xl
              "
            >

              <div className="flex items-center gap-4">

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
                    w-14
                    h-14
                    rounded-full
                    object-cover
                  "
                />

                <h2 className="font-semibold text-lg">
                  {profile.authorName}
                </h2>

              </div>

              <button
                onClick={() =>
                  navigate(
                    `/visit-profile/${profile.userId}`
                  )
                }
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  px-4
                  py-2
                  rounded-lg
                "
              >
                Visit Profile <FontAwesomeIcon icon={faCircleUser} />
              </button>

            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Search;