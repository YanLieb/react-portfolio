type ProjectsMenuProps = {
	category: string
}

export default function ProjectsMenu({category}: ProjectsMenuProps) {

	const getProjectsMenu = (category: string) => {
		const menu = [];
		for (let i = 1; i < 4; i++) {
			menu.push(
				<div className="projects__menu-entry" key={i}>
					<a href={`#project-${category}-${i}`}>{category} Xca Portfolio</a>
				</div>
			);
		}
		return menu;
	}

	return (
		<div className="projects__menu absolute pb-5 top-5 right-0 flex flex-col gap-2 text-right z-10">
			{getProjectsMenu(category)}
		</div>
	)
}