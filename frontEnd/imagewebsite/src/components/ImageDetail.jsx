import React from "react";

const ImageDetail = () => {
  return (
    <div className="container mx-auto">
      <div className="flex w-full">
        <div className="w-2/4 overflow-hidden">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Mounted.police.buckingham.palace.arp.jpg/640px-Mounted.police.buckingham.palace.arp.jpg"
            alt=""
            className="w-full block h-full"
          />
        </div>
        <div className="w-2/4 px-2 overflow-hidden text-start mx-5">
            <div className="flex items-center justify-between">
                <ul className="flex space-x-3">
                    <li>
                        <button>
                            <i className="fa-solid fa-ellipsis font-bold text-2xl px-3"></i>
                        </button>
                    </li>
                    <li>
                        <button>
                            <i className="fa-solid fa-upload font-bold text-2xl px-3"></i>
                        </button>
                    </li>
                    <li>
                        <button>
                            <i className="fa-solid fa-link font-bold text-2xl px-3"></i>
                        </button>
                    </li>
                </ul>

                <button className="bg-red-500 text-white p-3 rounded-full">Save</button>
            </div>
          

          <span className="text-base font-normal underline underline-offset-1 inline-block start-0 my-5">
            link.com
          </span>

          <h2 className="text-2xl font-bold ">Lorem ipsum dolor sit amet.</h2>
          <span className="w-11/12">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
            et reiciendis qui atque voluptate cum!
          </span>

          <div className="flex items-center my-5">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Mounted.police.buckingham.palace.arp.jpg/640px-Mounted.police.buckingham.palace.arp.jpg"
              alt=""
              className="w-16 h-16 object-cover rounded-full"
              style={{
                objectPosition: "60% -3px",
              }}
            />
            <div className="mx-3">
              <h2 className="font-bold text-base">User 0001</h2>
              <span className="font-normal text-base">120k follower</span>
            </div>
          </div>

          <div className="my-10">
            <h2 className="font-bold text-xl">User review: </h2>

            <div className="flex items-center space-x-3 my-5">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Mounted.police.buckingham.palace.arp.jpg/640px-Mounted.police.buckingham.palace.arp.jpg"
                alt=""
                className="w-10 h-10 object-cover rounded-full"
                style={{
                  objectPosition: "60% -3px",
                }}
              />

              <form
                action=""
                className="py-2 px-3 rounded-full border w-full bg-gray-50 flex"
              >
                <input
                  type="text"
                  className="w-full font-normal text-black text-base bg-transparent outline-none"
                  placeholder="Them nhan xet"
                />
                <button>Icon</button>
              </form>
            </div>

            <div className="flex">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Mounted.police.buckingham.palace.arp.jpg/640px-Mounted.police.buckingham.palace.arp.jpg"
                alt=""
                className="w-10 h-10 object-cover rounded-full"
                style={{
                  objectPosition: "60% -3px",
                }}
              />
              <div className="mx-3">
                <p className="w-full text-sm font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                  nostrum consequuntur quisquam temporibus ullam rem quidem sed
                  architecto corporis animi.
                </p>
                <div className="flex my-2 justify-between items-center">
                  <div>
                    <span className="text-xs font-medium">1y ago</span>
                    <button className="text-xs font-medium mx-3"><i className="fa-solid fa-ellipsis-vertical"></i></button>
                  </div>

                  <button className="text-xs font-medium"><i className="fa-regular fa-thumbs-up me-2"></i>Useful</button>
                </div>
              </div>
            </div>

            <div className="my-5 flex items-center space-x-2">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Mounted.police.buckingham.palace.arp.jpg/640px-Mounted.police.buckingham.palace.arp.jpg"
                    alt=""
                    className="w-10 h-10 object-cover rounded-full"
                    style={{
                    objectPosition: "60% -3px",
                    }}
                />

                <p className="font-bold text-base">User</p>
                <span className="font-normal text-base">has saved this picture</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
