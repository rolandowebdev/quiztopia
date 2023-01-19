const SectionContainer = ({ children }) => (
  <section className="flex flex-col items-center gap-4 max-w-[350px] min-w-[350px]">
    <h1 className="mb-4 text-5xl text-primary font-logo">QuizTopia</h1>
    {children}
  </section>
);

export default SectionContainer;
