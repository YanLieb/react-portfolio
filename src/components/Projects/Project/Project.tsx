type ProjectProps = {
	id: string;
	category: string;
};

export default function Project({ id, category }: ProjectProps) {
	return (
		<div id={id} className={`project category-${category} h-screen md:w-150 flex flex-col justify-center`}>
			<div className="project__thumbnail">
				<img src="/img/xca-portfolio-cover.jpg" alt="Thumbnail for Xca Portfolio website"
				     className={"max-w-full"}/>
			</div>
			<div className="project__header flex justify-between items-center">
				<h3 className="project__title">{category} Xca Portfolio</h3>
				<div className="project__year">
					<p>2025</p>
				</div>
			</div>
			<div className="project__body flex justify-between items-end">
				<div className="project__description">
					<p>Digital designer portfolio website</p>
					<p>Built with Strapi & Next.js</p>
				</div>
				<a href="https://xca-portfolio.vercel.app" target="_blank" rel="noopener noreferrer"
				   className="project__link">Discover</a>
			</div>
		</div>
	);
}