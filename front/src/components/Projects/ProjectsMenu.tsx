type ProjectsMenuProps = {
  category: string
}

export default function ProjectsMenu({ category }: ProjectsMenuProps) {

  const getProjectsMenu = (category: string) => {
    const menu = [];
    for (let i = 1; i < 4; i++) {
      menu.push(
        <div className={`projects__menu-item cursor-pointer ${category.toLowerCase()}`} key={i}>
          <span>Xca Portfolio</span>
        </div>
      );
    }
    return menu;
  }

  return (
    <div className="projects__menu flex flex-col gap-1 md:gap-2 text-right absolute bottom-5 right-2">
      {getProjectsMenu(category)}
    </div>
  )
}