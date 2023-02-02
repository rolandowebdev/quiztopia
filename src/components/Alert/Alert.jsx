export const Alert = ({ message, type }) => (
  <h2
    className={`${
      type === 'error' ? 'bg-red-500' : 'bg-green-500'
    } text-xl my-1 text-center px-2 pb-1 rounded-lg text-white`}
    role="alert">
    {message}
  </h2>
)
