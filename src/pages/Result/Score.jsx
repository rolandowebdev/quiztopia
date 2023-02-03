export const Score = ({ correctAnswer, amountOfQuestion, incorrectAnswers, notAnswer }) => (
  <div className="flex flex-wrap items-center justify-center gap-3 text-5xl text-gray-500">
    <div className="flex flex-1 min-w-[160px] flex-col p-3 text-center border border-gray-500 rounded-lg">
      <p className="text-lg">Correct answer</p>
      <h3 className="text-6xl font-bold text-green-500">
        {correctAnswer}
        <span className="text-lg text-gray-500 ">/ {amountOfQuestion}</span>
      </h3>
    </div>
    <div className="flex flex-1 min-w-[160px] flex-col p-3 text-center border border-gray-500 rounded-lg">
      <p className="text-lg">Incorrect answer</p>
      <h3 className="text-6xl font-bold text-red-500">
        {incorrectAnswers}
        <span className="text-lg text-gray-500 ">/ {amountOfQuestion}</span>
      </h3>
    </div>
    <div className="flex flex-1 min-w-[160px] flex-col p-3 text-center border border-gray-500 rounded-lg">
      <p className="text-lg">Not answerd</p>
      <h3 className="text-6xl font-bold text-gray-700">
        {notAnswer}
        <span className="text-lg text-gray-500 ">/ {amountOfQuestion}</span>
      </h3>
    </div>
  </div>
)
