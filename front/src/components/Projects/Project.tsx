type ProjectData = {
  title: string;
  description: string;
  infos: string;
  link: string;
  repo_link?: string;
};

type ProjectProps = {
  id: string;
  category: string;
  projectData: ProjectData;
};

export default function Project({ id, category, projectData }: ProjectProps) {
  return (
    <div id={id} className={`project category-${category} absolute h-full w-full flex justify-center items-center bg-white select-none`}>
      <div className="project__container max-w-75 md:max-w-120 flex flex-col justify-center gap-2">
        <h2 className="project__title font-normal text-center leading-12">{projectData.title}</h2>
        <div className="project__body flex flex-col gap-1">
          <div className="project__description">
            <p>{projectData.description}</p>
          </div>
          <div className="project__infos">
            <p>{projectData.infos}</p>
          </div>
          <div className="project__link flex justify-end">
            <a href={projectData.link} target="_blank"
              className="block border border-gray-200 px-2 py-1 shadow-gray-900 transition hover:border-gray-900 hover:shadow-[-3px_3px_0] hover:translate-x-[3px] hover:translate-y-[-3px]">
              Go to website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}