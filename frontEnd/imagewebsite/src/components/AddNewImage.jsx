import React from "react";

const AddNewImage = () => {
  return (
    <div className="flex mx-auto my-5">
      <div className="w-1/3">
        <div className="bg-gray-200 rounded p-5">
          <div
            id="drop_zone"
            onDrop="dropHandler(event);"
            className="h-full border-dotted border-2 border-gray-500 w-full px-5 py-10 mb-5"
          >
            <i className="py-20 block">Upper</i>
            <p>
              Drag one or more files to this <i>drop zone</i>.
            </p>
          </div>

          <div className="py-10">
            <p>using hight quality file image</p>
          </div>
        </div>

        <button className="my-5 w-full py-3 font-medium text-base bg-gray-300 text-black rounded-full">
          Luu tu trang
        </button>
      </div>

      <div className="w-1/2 mx-10">
        <form action="" className="w-full space-y-5 text-start">
          <input
            type="text"
            className="py-3 font-bold text-3xl border-b-2 w-full outline-none"
            placeholder="Tao tieu de"
          />

          <div className="flex items-center space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Mounted.police.buckingham.palace.arp.jpg/640px-Mounted.police.buckingham.palace.arp.jpg"
              alt=""
              className="w-10 h-10 object-cover rounded-full"
              style={{
                objectPosition: "60% -3px",
              }}
            />

            <p className="font-bold text-base">User</p>
          </div>

          <input
            type="text"
            className="py-3 font-normal text-base border-b-2 w-full outline-none"
            placeholder="Cho moi nguoi biet ghim cua ban gioi thieu dieu gi"
          />

          <button className="inline-block px-4 bg-gray-200 font-bold text-base py-3 rounded-full">
            Them van ban thay the
          </button>

          <input
            type="text"
            className="py-3 font-normal text-base border-b-2 w-full outline-none"
            placeholder="Them mot lien ket den"
          />
        </form>
      </div>
    </div>
  );
};

export default AddNewImage;
