export const Login = () => {
  return (
    <>
      <div className="h-full flex justify-center items-center text-sm">
        <div className="w-96 bg-login rounded-xl">
          <div className="flex m-10 justify-center items-center gap-4">
            <div>Sign in</div>
            <div
              className="bg-button rounded-md text-white
             py-2 px-5"
            >
              Sign up
            </div>
          </div>
          <div className="flex flex-col px-5 gap-8 mt-5 mb-16">
            <div>
              <img
                className="w-4 relative top-[30px] left-2"
                src="./src/assets/img/email.svg"
                alt=""
              />
              <input
                placeholder="Email"
                type="text"
                className="p-3 pl-8 rounded-md w-full focus:outline-none"
              />
            </div>
            <div>
              <img
                className="w-4 relative top-[30px] left-2"
                src="./src/assets/img/user.svg"
                alt=""
              />
              <input
                placeholder="Username"
                type="text"
                className="p-3 pl-8 rounded-md w-full focus:outline-none"
              />
            </div>
            <div>
              <img
                className="w-4 relative top-[30px] left-2"
                src="./src/assets/img/password.svg"
                alt=""
              />
              <input
                placeholder="Password"
                type="text"
                className="p-3 pl-8 rounded-md w-full focus:outline-none"
              />
            </div>
            <div>
              <img
                className="w-4 relative top-[30px] left-2"
                src="./src/assets/img/re-password.svg"
                alt=""
              />
              <input
                placeholder="Re-Password"
                type="text"
                className="p-3 pl-8 rounded-md w-full focus:outline-none"
              />
            </div>
          </div>
          <div className="bg-button text-white m-5 p-2 rounded-md text-center">
            Sign up
          </div>
        </div>
      </div>
    </>
  );
};
