'use client';

import { cn } from '@/lib/utils';
import { FileText, GitBranch } from 'lucide-react';
import { XCircle } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Cloud from '../components/dashboard-components/Cloud';
import SunGlareEffect from '../components/dashboard-components/SunGlareEffect';
import {
  type ProjectData,
  projects,
} from '../components/rfc-components/project-data';
import ProjectCard from '../components/rfc-components/projectCard';
import ReadmeViewer from '../components/rfc-components/readmeviewer';
import { Button } from '../components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';

const RequestForCodePage = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<'projects' | 'readme'>('projects');

  const handleProjectSelect = (project: ProjectData) => {
    setSelectedProject(project);
    if (window.innerWidth < 768) {
      setActiveTab('readme');
    }
  };

  const clearSelection = () => {
    setSelectedProject(null);
    if (window.innerWidth < 768) {
      setActiveTab('projects');
    }
  };

  const discussionsButton = (
    <Button
      asChild
      className="flex cursor-pointer transform items-center justify-between rounded-3xl bg-gray-800 px-4 py-2 text-sm font-medium w-fit sm:font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-slate-900"
    >
      <a
        href="https://github.com/orgs/acm-avv/discussions"
        target="_blank"
        rel="noopener noreferrer"
      >
        Join Discussions
      </a>
    </Button>
  );

  const desktopView = (
    <div className="flex flex-col gap-6 md:flex-row h-[calc(100vh-105px)]">
      <div className="w-full shrink-0 rounded-2xl bg-white/30 backdrop-blur-md border border-white/30 p-4 sm:p-5 shadow-lg md:w-1/2 lg:w-5/12 flex flex-col">
        <div className="mb-3 flex items-center justify-between border-b border-white/50 pb-2 shrink-0">
          <h2 className="flex items-center font-semibold text-2xl text-gray-800">
            <GitBranch
              className="mr-2 h-6 w-6"
              color="#4B5563"
            />
            Projects{' '}
            <span className="ml-2 text-gray-700">({projects.length})</span>
          </h2>
          {discussionsButton}
        </div>
        <div className="scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent flex-1 min-h-0 overflow-y-auto rounded-lg p-1">
          <div className="space-y-3">
            {projects.length > 0 ? (
              projects.map((project) => (
                <button
                  type="button"
                  key={project.id}
                  onClick={() => handleProjectSelect(project)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      handleProjectSelect(project);
                    }
                  }}
                  aria-pressed={selectedProject?.id === project.id}
                  className="cursor-pointer rounded-lg w-full"
                >
                  <ProjectCard
                    id={project.id}
                    name={project.name}
                    description={project.description}
                    tech={project.tech}
                    maintainerUsernames={project.maintainerUsernames}
                    url={project.url ?? ''}
                  />
                </button>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <GitBranch className="mb-2 h-10 w-10 text-gray-600" />
                <p className="text-gray-600">No projects found.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full rounded-2xl bg-white/40 backdrop-blur-md border border-white/30 p-4 sm:p-5 shadow-lg md:w-1/2 lg:w-7/12 flex flex-col">
        <div className="mb-3 flex items-center justify-between border-b border-white/50 pb-2 shrink-0">
          <h2 className="flex items-center font-semibold text-2xl text-gray-800">
            <FileText
              className="mr-2 h-6 w-6"
              color="#4B5563"
            />
            Details
            {selectedProject && (
              <span className="ml-2 text-lg text-gray-700 line-clamp-1">
                - {selectedProject.name}
              </span>
            )}
          </h2>
          {selectedProject && (
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={clearSelection}
              className="bg-white/40 cursor-pointer border-white/40 backdrop-blur-sm text-gray-800 hover:bg-white/50 hover:text-gray-600"
            >
              <XCircle className="mr-1 h-4 w-4" /> Clear
            </Button>
          )}
        </div>
        <div className="scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent flex-1 min-h-0 overflow-y-auto rounded-lg p-2">
          {selectedProject ? (
            <ReadmeViewer
              owner={selectedProject.owner}
              repoName={selectedProject.repo_name}
              pdfLink={selectedProject.pdfLink}
            />
          ) : (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border-2 border-white/30 border-dashed bg-white/10">
              <FileText className="mb-2 h-8 w-8 text-gray-600" />
              <p className="text-gray-600 text-sm sm:text-base">
                Select a project to view its details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const mobileView = (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as 'projects' | 'readme')}
      className="md:hidden"
    >
      <TabsList className="grid w-full grid-cols-2 bg-white/40 backdrop-blur-md p-1 border border-white/30 rounded-2xl">
        <TabsTrigger
          value="projects"
          className={cn(
            'data-[state=active]:bg-white/40 data-[state=active]:text-gray-800 rounded-2xl',
            'data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-500',
          )}
        >
          <GitBranch className="mr-2 h-4 w-4" /> Projects
        </TabsTrigger>
        <TabsTrigger
          value="readme"
          className={cn(
            'data-[state=active]:bg-white/40 data-[state=active]:text-gray-800 rounded-2xl',
            'data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-500',
          )}
        >
          <FileText className="mr-2 h-4 w-4" /> Details
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="projects"
        className="mt-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/30 p-4 sm:p-5 shadow-lg"
      >
        <div className="mb-3 flex items-center justify-between border-b border-white/50 pb-2">
          <h2 className="flex items-center font-semibold text-xl sm:text-2xl text-gray-800">
            <GitBranch className="mr-2 h-6 w-6 text-gray-600" />
            Projects{' '}
            <span className="ml-2 text-gray-700">({projects.length})</span>
          </h2>
          {discussionsButton}
        </div>
        <div className="scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent h-[70vh] overflow-y-auto rounded-2xl p-2">
          <div className="space-y-3">
            {projects.length > 0 ? (
              projects.map((project) => (
                <button
                  type="button"
                  key={project.id}
                  onClick={() => handleProjectSelect(project)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      handleProjectSelect(project);
                    }
                  }}
                  aria-pressed={selectedProject?.id === project.id}
                  className={cn(
                    'cursor-pointer rounded-2xl transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md w-full',
                    selectedProject?.id === project.id
                      ? 'ring-2 ring-gray-500'
                      : 'hover:ring-1 hover:ring-gray-400',
                  )}
                >
                  <ProjectCard
                    id={project.id}
                    name={project.name}
                    description={project.description}
                    tech={project.tech}
                    maintainerUsernames={project.maintainerUsernames}
                    url={project.url ?? ''}
                  />
                </button>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <GitBranch className="mb-2 h-10 w-10 text-gray-600" />
                <p className="text-gray-600">No projects found.</p>
              </div>
            )}
          </div>
        </div>
      </TabsContent>

      <TabsContent
        value="readme"
        className="mt-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/30 p-4 sm:p-5 shadow-lg"
      >
        <div className="mb-3 flex items-center justify-between border-b border-white/50 pb-2">
          <h2 className="flex items-center font-semibold text-xl sm:text-2xl text-gray-800">
            <FileText className="mr-2 h-6 w-6 text-gray-600" />
            {selectedProject && (
              <span className="ml-2 text-lg text-gray-800">
                {selectedProject.name}
              </span>
            )}
          </h2>
          {selectedProject && (
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={clearSelection}
              className="bg-white/40 border-white/40 backdrop-blur-md text-gray-800 hover:bg-white/50 hover:text-gray-600"
            >
              <XCircle className="mr-1 h-4 w-4" /> Clear
            </Button>
          )}
        </div>
        <div className="scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent h-[70vh] overflow-y-auto rounded-lg p-2">
          {selectedProject ? (
            <ReadmeViewer
              owner={selectedProject.owner}
              repoName={selectedProject.repo_name}
              pdfLink={selectedProject.pdfLink}
            />
          ) : (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border-2 border-white/30 border-dashed bg-white/10">
              <FileText className="mb-2 h-8 w-8 text-gray-600" />
              <p className="text-gray-600 text-sm sm:text-base">
                Select a project to view its details
              </p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <SunGlareEffect />
      <Cloud />
      <div className="z-20 h-[80px] shrink-0">
        <Navbar />
      </div>
      <div className="w-11/12 mx-auto flex flex-1 flex-col pt-4">
        <div className="hidden md:block md:flex-1 md:min-h-0">
          {desktopView}
        </div>
        <div className="md:hidden">{mobileView}</div>
      </div>
    </div>
  );
};

export default RequestForCodePage;
