import {useRef} from "react";

import ProjectsList from "./ProjectsList/ProjectsList";
import ProjectsMenu from "./ProjectsMenu/ProjectsMenu";


export default function Projects() {
	const projectsContainer = useRef<HTMLDivElement | null>(null);


	const categories = ['Javascript/TypeScript', 'WordPress', 'Prestashop'] as string[];


	return (
		<div ref={projectsContainer} className="projects relative">
			<ProjectsMenu/>
			<ProjectsList projectsContainer={projectsContainer}/>

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