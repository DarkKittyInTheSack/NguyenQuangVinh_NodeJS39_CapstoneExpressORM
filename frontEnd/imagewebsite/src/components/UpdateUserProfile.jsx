import React from "react";

const UpdateUserProfile = () => {
  return (
    <div className="w-full text-start">
      <h2 className="font-medium text-3xl mt-3">Ho so cong khai</h2>
      <span>Nguoi truy cap ho so cua ban se thay thong tin sau</span>

      <form action="" className="space-y-3 w-1/2 my-10">
        <div>
          <label htmlFor="anh">Anh</label>
          <div className="flex items-center space-x-2 my-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Mounted.police.buckingham.palace.arp.jpg/640px-Mounted.police.buckingham.palace.arp.jpg"
              alt=""
              className="w-16 h-16 object-cover rounded-full"
              style={{
                objectPosition: "60% -3px",
              }}
            />

            <button className="py-2 px-4 bg-gray-200 text-center font-medium text-base rounded-full">
              Thay doi
            </button>
          </div>
        </div>

        <div className="flex space-x-3">
          <div className="w-1/2">
            <label htmlFor="firstname">Ten</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Ten"
              className="inline-block border py-3 w-full px-2 rounded-md my-2"
            />
          </div>

          <div className="w-1/2">
            <label htmlFor="lastname">Ho</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Ho"
              className="inline-block border py-3 w-full px-2 rounded-md my-2"
            />
          </div>
        </div>

        <div>
            <label htmlFor="description">Gioi thieu</label>
            <textarea id="description" name="description" rows={4} placeholder="Ke cau chuyen cua ban" className="w-full inline-block border rounded-sm px-2 py-3 my-2"></textarea>
        </div>

        <div>
            <label htmlFor="web">Trang web</label>
            <input
              type="text"
              name="web"
              id="web"
              placeholder="Them duong lien ket de huong den trang web cua ban"
              className="inline-block border py-3 w-full px-2 rounded-md my-2"
            />
        </div>

        <div>
            <label htmlFor="username">Ten nguoi dung</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Them ten nguoi dung "
              className="inline-block border py-3 w-full px-2 rounded-md my-2"
            />
        </div>

        <div className="space-x-3 text-center">
            <button className="py-3 px-4 rounded-full font-medium text-base bg-gray-200">Thiet lap lai</button>
            <button className="py-3 px-4 rounded-full font-medium text-base bg-red-500 text-white">Huy</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserProfile;
