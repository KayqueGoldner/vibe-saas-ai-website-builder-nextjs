interface ProjectIdPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

const ProjectIdPage = async ({ params }: ProjectIdPageProps) => {
  const { projectId } = await params;

  return <div>ProjectIdPage: {projectId}</div>;
};

export default ProjectIdPage;
