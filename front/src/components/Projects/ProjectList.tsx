type ProjectListProps = {
  category: string
}

export default function ProjectList({ category }: ProjectListProps) {

  const getProjectList = (category: string) => {
    const menu = [];
    for (let i = 1; i < 4; i++) {
      menu.push(
        <div className="projects__list-item cursor-pointer" key={i}>
          <span>Xca Portfolio</span>
        </div>
      );
    }
    return menu;
  }

  return (
    <div className="project-list flex flex-col gap-1 md:gap-2 text-right absolute bottom-5 right-5">
      {getProjectList(category)}
    </div>
  )
}