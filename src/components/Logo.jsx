import React from "react";

function Logo({width = '100px'}) {
  return(
    <div className="flex items-center">
      <div className="w-10 h-10 mr-2">
        <img src="./PostMe_Logo.png" alt="Logo" />
      </div>
      <div className="font-bold text-xl font-serif">Post<span className="text-violet-500">Me</span></div>
    </div>
  )
}

export default Logo