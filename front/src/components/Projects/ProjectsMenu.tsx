type ProjectData = {
  title: string;
  description: string;
  infos: string;
  link: string;
  repo_link?: string;
};

type ProjectsMenuProps = {
  category: string;
  projects: ProjectData[];
}

export default function ProjectsMenu({ category, projects }: ProjectsMenuProps) {

  return (
    <div className="projects__menu flex flex-col gap-1 md:gap-2 text-right absolute bottom-5 right-2">
      {projects.map((project, index) => (
        <div className={`projects__menu-item cursor-pointer ${category.toLowerCase().replace(/[/\s]/g, '-')}`} key={index}>
          <span>{project.title}</span>
        </div>
      ))}
    </div>
  )
}