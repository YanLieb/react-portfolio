type ProjectProps = {
  id: string;
  category: string;
};

export default function Project({ id, category }: ProjectProps) {
  return (
    <div id={id} className={`project category-${category} container absolute h-full flex justify-center items-center bg-white select-none`}>
      <div className="project__container md:w-100 flex flex-col justify-center">
        <h2 className="project__title font-normal text-center leading-12">{id} - Xca Portfolio</h2>
        <div className="project__body">
          <div className="project__description">
            <p>Digital designer portfolio website</p>
            <p>Built with Strapi & Next.js</p>
          </div>
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