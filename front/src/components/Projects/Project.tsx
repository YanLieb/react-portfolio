type ProjectProps = {
  id: string;
  category: string;
};

export default function Project({ id, category }: ProjectProps) {
  return (
    <div id={id} className={`project category-${category} container h-full flex items-center justify-center bg-white`}>
      <div className="project__container md:w-150 flex flex-col justify-center">
        <div className="project__header flex justify-between items-center">
          <h3 className="project__title">Xca Portfolio</h3>
        </div>
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
          <a href="https://xca-portfolio.vercel.app" target="_blank" rel="noopener noreferrer"
            className="project__link">Go to website</a>
        </div>
      </div>
    </div>
  );
}