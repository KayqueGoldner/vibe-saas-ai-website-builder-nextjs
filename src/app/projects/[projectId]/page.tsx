import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import { ProjectView } from "@/modules/projects/ui/views/project-view";

interface ProjectIdPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

const ProjectIdPage = async ({ params }: ProjectIdPageProps) => {
  const { projectId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.messages.getMany.queryOptions({ projectId }),
  );
  void queryClient.prefetchQuery(
    trpc.projects.getOne.queryOptions({ id: projectId }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <ProjectView projectId={projectId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default ProjectIdPage;
