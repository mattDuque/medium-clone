import React from 'react';

function Banner() {
  return (
    <div className="flex h-80 md:h-[25rem] border-y border-black pt-10">
      <div className="flex flex-1 max-w-7xl m-auto h-full justify-between px-14">
        <div className=" max-w-xl">
          <h1 className="text-5xl md:text-7xl font-serif font-thin tracking-tight">
            <span className="hidden md:inline">Medium is a place to</span>{" "}
            <span className="uppercase md:lowercase">w</span>rite, read and
            connect
          </h1>
          <h2 className="lg:font-semibold text-lg m-0 pb-5">
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </h2>
          <button className="border border-black rounded-full py-2 px-4 bg-white">
            Start Writing
          </button>
        </div>
        <img
          className="hidden md:flex h-full"
          src="/banner-image.png"
          alt="medium logo"
        />
      </div>
    </div>
  )
}

export default Banner;
