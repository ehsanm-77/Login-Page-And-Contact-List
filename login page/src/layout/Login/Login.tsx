import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  email: string;
  username: string;
  password: string;
  rePassword: string;
}

export const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: '',
    rePassword: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors: Partial<FormData> = {};

    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email = 'Invalid email format';
    }

    if (!formData.username) {
      validationErrors.username = 'Username is required';
    }

    if (!formData.password) {
      validationErrors.password = 'Password is required';
    }

    if (!formData.rePassword) {
      validationErrors.rePassword = 'Re-enter password is required';
    } else if (formData.rePassword !== formData.password) {
      validationErrors.rePassword = 'Passwords do not match';
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <div className="h-full flex justify-center items-center text-sm">
        <div className="w-96 bg-login rounded-xl">
          <div className="flex justify-center items-center gap-4 mt-5">
            <div>Sign in</div>
            <div
              className="bg-button rounded-md text-white
             py-2 px-5"
            >
              Sign up
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col px-5 gap-3 mt-5 mb-8">
              <div>
                <img
                  className="w-4 relative top-[30px] left-2"
                  src="./src/assets/img/email.svg"
                  alt=""
                />
                <input
                  name="email"
                  placeholder="Email"
                  type="text"
                  className={`p-3 pl-8 rounded-md w-full focus:outline-none ${
                    errors.email ? 'border border-red-400' : ''
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>
              <div>
                <img
                  className="w-4 relative top-[30px] left-2"
                  src="./src/assets/img/user.svg"
                  alt=""
                />
                <input
                  name="username"
                  placeholder="Username"
                  type="text"
                  className={`p-3 pl-8 rounded-md w-full focus:outline-none ${
                    errors.username ? 'border border-red-500' : ''
                  }`}
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <span className="text-red-500">{errors.username}</span>
                )}
              </div>
              <div>
                <img
                  className="w-4 relative top-[30px] left-2"
                  src="./src/assets/img/password.svg"
                  alt=""
                />
                <input
                  name="password"
                  placeholder="password"
                  type="password"
                  className={`p-3 pl-8 rounded-md w-full focus:outline-none ${
                    errors.password ? 'border border-red-500' : ''
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <span className="text-red-500">{errors.password}</span>
                )}
              </div>
              <div>
                <img
                  className="w-4 relative top-[30px] left-2"
                  src="./src/assets/img/re-password.svg"
                  alt=""
                />
                <input
                  name="rePassword"
                  placeholder="Re-Password"
                  type="password"
                  className={`p-3 pl-8 rounded-md w-full focus:outline-none ${
                    errors.rePassword ? 'border border-red-500' : ''
                  }`}
                  value={formData.rePassword}
                  onChange={handleChange}
                />
                {errors.rePassword && (
                  <span className="text-red-500">{errors.rePassword}</span>
                )}
              </div>

              <button
                type="submit"
                className="bg-button py-2 text-white w-full rounded-md text-center"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
