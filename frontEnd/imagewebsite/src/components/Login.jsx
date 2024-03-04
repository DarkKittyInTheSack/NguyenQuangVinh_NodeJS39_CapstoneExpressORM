import React from "react";

const Login = () => {
  return (
    <div>
      <h2 className="text-4xl text-center font-bold my-2">
        Welcome to my picture
      </h2>

      <form className="my-3 text-start w-1/2 mx-auto">
        <div className="my-3 space-y-2">
          <label htmlFor="email" className="font-normal text-base">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="p-3 border rounded border-black w-full outline-none"
            placeholder="Nhập vào email của bạn"
          />
        </div>

        <div className="my-3 space-y-2">
          <label htmlFor="password" className="font-normal text-base">
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="p-3 border rounded border-black w-full outline-none"
            placeholder="Nhập vào mật khẩu của bạn"
          />
        </div>

        <button className="w-full my-3 text-center text-white font-bold bg-red-500 rounded-full py-3">
          Đăng nhập
        </button>

        <button className="w-full my-1 text-center text-white font-bold bg-black rounded-full py-3">
          Đến trang đăng ký
        </button>
      </form>
    </div>
  );
};

export default Login;
