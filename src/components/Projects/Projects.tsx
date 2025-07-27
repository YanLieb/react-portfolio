import {useRef} from "react";

import ProjectsList from "./ProjectsList/ProjectsList";


export default function Projects() {
	const projectsCategoryContainer = useRef<HTMLDivElement | null>(null);


	const categories = ['Javascript', 'WordPress', 'Prestashop'] as string[];


	return (
		<div ref={projectsCategoryContainer} className={`projects`}>
			{categories.map((category, index) => {
					const id = index + 1;
					return (
						<ProjectsList key={id} category={category.toLowerCase()}/>
					)
				}
			)}
			<div className="projects__categoriesMenu">
				{categories.map((category, index) => {
					const id = index + 1;

					return (
						<div key={id} className="category-item">
							<a href={`category-${id}`}>{category}</a>
						</div>
					)
				})
				}
			</div>
		</div>
	)
}