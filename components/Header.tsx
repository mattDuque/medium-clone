import Link from 'next/link';
import React from 'react';

function Header() {
    return (
      <header className="flex justify-between items-center space-x-5 mx-auto max-w-7xl px-6 md:px-14 h-20">
        <Link href="/">
          <img
            className="w-44"
            src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
            alt="medium logo"
          />
        </Link>
        <div className="flex items-center space-x-5 text-sm ">
          <span className="hidden md:inline-flex space-x-5 ">
            <h3>Our story</h3>
            <h3>Membership</h3>
            <h3>Write</h3>
            <h3>Sign In</h3>
          </span>
          <h3 className="border py-2 px-5 text-white border-black bg-black rounded-full">
            Get started
          </h3>
        </div>
      </header>
    )
}

export default Header;
