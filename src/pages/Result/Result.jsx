import { Link } from 'react-router-dom';
import { SectionContainer } from '../../layouts';

const Result = () => (
  <SectionContainer>
    <div className="flex flex-col items-center gap-6">
      <p className="text-2xl">Your Final Score🎉</p>
      <h3 className="flex items-end text-7xl text-primary font-logo">
        8<span className="text-[20px] text-gray-400">/ 10</span>
      </h3>
    </div>
    <Link
      to="/"
      className="py-3 px-4 mt-4 font-semibold tracking-wide text-white hover:bg-[#3b47c2] capitalize cursor-pointer rounded-xl bg-primary">
      Back to Dashboard
    </Link>
  </SectionContainer>
);

export default Result;
