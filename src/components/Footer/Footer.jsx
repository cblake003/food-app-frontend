import React from "react";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "../SocialIcons/SocialIcons";
import {Icons} from "./Menus";

export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 relative">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py=7">
        <h1 className="lg:texxt-4x1 text-3x1 text-white md:mb-0 mb-6 lg:leading-normal font-bold md:w-2/5">LunchBreak</h1>
      </div>
      <ItemsContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
        <span> Copyright 2024. All Rights Reserved.</span>
        <span> Terms - Privacy Policy</span>
        <SocialIcons Icons={Icons} />
      </div>
    </footer>
  );
};