const Score = ({ correctAnswer, amountOfQuestion, incorrectAnswer }) => (
  <div className="flex items-center gap-3 text-5xl font-bold ">
    <div className="flex flex-col p-3 text-center border border-gray-500 rounded-lg">
      <p className="text-lg text-gray-500 w-max">Correct answer</p>
      <h3 className="text-6xl text-green-500">
        {correctAnswer}
        <span className="text-lg text-gray-500 ">/ {amountOfQuestion}</span>
      </h3>
    </div>
    <div className="flex flex-col p-3 text-center text-gray-500 border border-gray-500 rounded-lg">
      <p className="text-lg w-max">Incorrect answer</p>
      <h3 className="text-6xl text-red-500">
        {incorrectAnswer}
        <span className="text-lg text-gray-500 ">/ {amountOfQuestion}</span>
      </h3>
    </div>
  </div>
);

export default Score;
