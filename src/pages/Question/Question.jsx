import { Button } from '../../components';
import { SectionContainer } from '../../layouts';

const Question = () => (
  <SectionContainer title>
    <h2 className="text-3xl">Question 1</h2>
    <p className="my-3 text-lg">This is the question</p>
    <div className="flex flex-col justify-center w-full gap-4">
      <Button type="button">Answer 1</Button>
      <Button type="button">Answer 2</Button>
      <Button type="button">Answer 3</Button>
      <Button type="button">Answer 4</Button>
    </div>
    <p>Your Score : 2 / 6</p>
  </SectionContainer>
);

export default Question;
