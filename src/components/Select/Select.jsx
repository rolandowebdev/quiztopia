import { forwardRef } from 'react';

const Select = forwardRef(({ id, label, options }, ref) => (
  <label htmlFor={id}>
    <span className="block mb-[6px] capitalize">{label}</span>
    <select
      id={id}
      ref={ref}
      className="block w-full p-3 pr-10 capitalize border-none cursor-pointer rounded-xl ring-gray-400 focus:ring-primary ring-1 text-primary focus:border-none"
      required>
      <option defaultValue>select {label}</option>
      {options?.map(({ id, name }) => (
        <option value={id} key={id}>
          {name}
        </option>
      ))}
    </select>
  </label>
));

export default Select;
