import React from 'react'

const SignUp = () => {
  return (
    <div>
        <div>
      <h2 className="text-4xl text-center font-bold my-2">
        Welcome to my picture
      </h2>
      <span className="text-center font-normal text-base">
        Tìm những ý tưởng mới để thử
      </span>
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

        <div className="my-3 space-y-2">
          <label htmlFor="fullName" className="font-normal text-base">
            Họ tên
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            className="p-3 border rounded border-black w-full outline-none"
            placeholder="Nhập vào họ và tên của bạn"
          />
        </div>

        <div className="my-3 space-y-2">
          <label htmlFor="age" className="font-normal text-base">
            Tuổi
          </label>
          <input
            type="number"
            name="age"
            id="age"
            className="p-3 border rounded border-black w-full outline-none"
            placeholder="Nhập vào tuổi của bạn"
          />
        </div>

        <button className="w-full my-3 text-center text-white font-bold bg-red-500 rounded-full py-3">
          Đăng ký
        </button>

        <button className="w-full my-1 text-center text-white font-bold bg-black rounded-full py-3">
          Đến trang đăng nhập
        </button>
      </form>
    </div>
    </div>
  )
}

export default SignUp