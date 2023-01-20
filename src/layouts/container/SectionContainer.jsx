const SectionContainer = ({ children, title }) => (
  <section className="flex flex-col items-center gap-4 max-w-[350px] min-w-[350px]">
    {title && <h1 className="text-5xl  text-primary font-logo">QuizTopia</h1>}
    {children}
  </section>
);

export default SectionContainer;
