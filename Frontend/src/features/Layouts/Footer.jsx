import React from "react";

const Footer = () => {
  return (
    <footer className="max-w-full mx-auto text-center mt-[40px] border-t-[1px] border-t-gray-900 py-[30px] space-y-[10px] text-white">
      <p className="md:text-xl text-md opacity-80">@2024 Aizaz Ul Haq</p>
      <ul className="flex space-x-[10px] opacity-70 justify-center">
        <li>Archive</li>
        <li>Privacy policy</li>
        <li>Terms</li>
      </ul>
    </footer>
  );
};

export default Footer;
