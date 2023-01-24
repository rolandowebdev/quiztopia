import { forwardRef, useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const Password = forwardRef(({ label, id }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <label htmlFor={id}>
      <span className="block mb-[6px] capitalize">{label}</span>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          ref={ref}
          className="block w-full p-3 bg-transparent outline-none ring-1 ring-gray-400 rounded-xl text-primary focus:ring-primary"
          required
        />
        <span className="absolute cursor-pointer text-primary top-1/4 right-4">
          {showPassword ? (
            <AiFillEye size={24} onClick={() => setShowPassword((prev) => !prev)} />
          ) : (
            <AiFillEyeInvisible size={24} onClick={() => setShowPassword((prev) => !prev)} />
          )}
        </span>
      </div>
    </label>
  );
});

export default Password;
