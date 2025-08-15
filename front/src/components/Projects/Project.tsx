type ProjectProps = {
  id: string;
  category: string;
};

export default function Project({ id, category }: ProjectProps) {
  return (
    <div id={id} className={`project category-${category} absolute h-full w-full flex justify-center items-center bg-white select-none`}>
      <div className="project__container max-w-75 md:max-w-120 flex flex-col justify-center">
        <h2 className="project__title font-normal text-center leading-12">{id} - Xca Portfolio</h2>
        <div className="project__body">
          <p>Digital designer portfolio website</p>
          <p>Built with Strapi & Next.js</p>
          <div className="project__details flex justify-between items-end">
            <div className="project__infos">
              <p>Design: Xcaret Castillo Sanchez</p>
            </div>
            <div className="project__year">
              <p>2025</p>
            </div>
          </div>
          <div className="project__link">
            <a href="https://xca-portfolio.com" target="_blank"
              className="project__link">Go to website</a>
          </div>
        </div>
      </div>
    </div>
  );
}