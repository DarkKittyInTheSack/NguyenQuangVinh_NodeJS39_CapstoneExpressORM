import React from "react";
import { Link, Outlet } from "react-router-dom";

const MainContent = () => {
  return (
    <>
      <header>
        <nav>
          <div className="py-3 w-full flex justify-between container mx-auto">
            {/* <Link to={"/"} className="">
              Trang chu
            </Link> */}
            <button className="py-1 px-3 text-white bg-black font-normal rounded-full">
              Trang chu
            </button>

            <button className="py-1 px-4 text-white bg-black font-normal rounded">
              Tao
            </button>

            <form
              action=""
              className="flex items-center p-1 bg-gray-100 rounded-full w-3/5"
            >
              <button>Tim</button>
              <input
                type="text"
                className="p-2 w-full outline-none bg-transparent"
                placeholder="Tim kiem..."
              />
            </form>

            <button className="py-1 px-3 text-white bg-black font-normal rounded-full">
              Thong bao
            </button>

            <button className="py-1 px-3 text-white bg-black font-normal rounded-full">
              Tin nhan
            </button>

            <button className="py-1 px-3 text-white bg-black font-normal rounded-full">
              Tai khoan
            </button>
          </div>
        </nav>
      </header>
      {/* <Outlet/> */}
    </>
  );
};

export default MainContent;
