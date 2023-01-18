import { forwardRef } from 'react';

const Select = forwardRef(({ id, label }, ref) => (
  <label htmlFor={id}>
    <span className="block mb-[6px] capitalize">{label}</span>
    <select
      id={id}
      ref={ref}
      className="block w-full p-3 pr-10 capitalize border-none cursor-pointer rounded-xl ring-gray-400 focus:ring-primary ring-1 text-primary focus:border-none">
      <option defaultValue>select {label}</option>
      <option value="option1">Option1</option>
      <option value="option2">Option2</option>
      <option value="option3">Option3</option>
    </select>
  </label>
));

export default Select;
