import Link from 'next/link';
import React from 'react';

function Header() {
    return (
      <header className="bg-[#ffc017] h-20">
        <div className="flex justify-between items-center space-x-5 mx-auto max-w-7xl p-5 ">
          <Link href="/">
            <img
              className="w-44"
              src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
              alt="medium logo"
            />
          </Link>
          <div className="inline-flex items-center space-x-5 text-">
            <h3>Our story</h3>
            <h3>Membership</h3>
            <h3>Write</h3>
            <h3>Sign In</h3>
            <h3 className="border px-4 py-1 text-white border-black bg-black rounded-full">
              Get Started
            </h3>
          </div>
        </div>
      </header>
    )
}

export default Header;
