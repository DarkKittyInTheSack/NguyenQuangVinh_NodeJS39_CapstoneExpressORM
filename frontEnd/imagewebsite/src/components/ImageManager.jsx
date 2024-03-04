import React from "react";

const ImageManager = () => {
  return (
    <div className="container mx-auto text-center flex flex-col items-center space-y-0">
      <p className="w-20 h-20 rounded-full inline-block bg-black text-white text-center text-5xl font-bold leading-relaxed">
        S
      </p>
      <span className="font-normal inline-block text-4xl my-2">User 01</span>
      <span className="font-normal text-base text-gray-400">@user0001</span>
      <span className="font-normal text-base "> 0 follower</span>
      <div className="flex justify-center w-full space-x-3">
            <button className="p-3 bg-gray-200 font-normal rounded-full ">Chia se</button>
            <button className="p-3 bg-gray-200 font-normal rounded-full ">Chinh sua ho so</button>
      </div>

      <div className="flex justify-center w-full space-x-3 my-3">
            <button className="p-3 font-bold rounded-full ">Da tao</button>
            <button className="p-3 font-bold rounded-full ">Da luu</button>
      </div>

      <div className="mx-auto grid grid-cols-5">
        <div className="p-2 flex flex-col space-y-2 overflow-hidden">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Mounted.police.buckingham.palace.arp.jpg/640px-Mounted.police.buckingham.palace.arp.jpg"
            alt=""
            className="w-full block bg-black h-full rounded"
          />
          <span className="font-medium text-start w-full block">
            Image here
          </span>
        </div>
        <div className="p-2 flex flex-col space-y-2 overflow-hidden">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Mounted.police.buckingham.palace.arp.jpg/640px-Mounted.police.buckingham.palace.arp.jpg"
            alt=""
            className="w-full block bg-black h-full rounded"
          />
          <span className="font-medium text-start w-full block">
            Image here
          </span>
        </div>
        <div className="p-2 flex flex-col space-y-2 overflow-hidden">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Mounted.police.buckingham.palace.arp.jpg/640px-Mounted.police.buckingham.palace.arp.jpg"
            alt=""
            className="w-full block bg-black h-full rounded"
          />
          <span className="font-medium text-start w-full block">
            Image here
          </span>
        </div>
        <div className="p-2 flex flex-col space-y-2 overflow-hidden">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Mounted.police.buckingham.palace.arp.jpg/640px-Mounted.police.buckingham.palace.arp.jpg"
            alt=""
            className="w-full block bg-black h-full rounded"
          />
          <span className="font-medium text-start w-full block">
            Image here
          </span>
        </div>
        <div className="p-2 flex flex-col space-y-2 overflow-hidden">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Mounted.police.buckingham.palace.arp.jpg/640px-Mounted.police.buckingham.palace.arp.jpg"
            alt=""
            className="w-full block bg-black h-full rounded"
          />
          <span className="font-medium text-start w-full block">
            Image here
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageManager;
