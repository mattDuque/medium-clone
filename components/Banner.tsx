import React from 'react';

function Banner() {
    return (
      <div className="bg-[#ffc017] border-y border-black lg:py-0 ">
        <div className="flex justify-between items-center max-w-7xl mx-auto ">
          <div className="px-10 space-x-5 ">
            <h1 className="text-6xl max-w-xl font-serif">
              Medium is a place to read, writte and connect
            </h1>
            <h2>
              It's easy and free to post your thinking on any topic an connect
              with millions of readers
            </h2>
          </div>
          <img
            className="hidden md:inline-flex "
            src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
            alt="medium logo"
          />
        </div>
      </div>
    )
}

export default Banner;
