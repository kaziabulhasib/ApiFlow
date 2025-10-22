import React, { useState } from "react";
import { useCollections } from "../hooks/collection";
import {
  Archive,
  Clock,
  Code,
  ExternalLink,
  HelpCircle,
  Loader,
  Share2,
} from "lucide-react";
interface Props {
  currentWorkspace: {
    id: string;
    name: string;
  };
}
const TabbedSidebar = ({ currentWorkspace }: Props) => {
  const [activeTab, setActiveTab] = useState("Collections");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: collections, isPending } = useCollections(currentWorkspace?.id);
  if (isPending) {
    return (
      <div className='flex flex-1 items-center justify-center '>
        <Loader className='animate-spin h-6 w-6 text-indigo-500' />
      </div>
    );
  }

  const sidebarItems = [
    { icon: Archive, label: "Collections" },
    { icon: Clock, label: "History" },
    { icon: Share2, label: "Share" },
    { icon: Code, label: "Code" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Collections":
        return (
          <div className='h-full  bg-zinc-950 text-zinc-100 flex flex-col'>
            <div className='flex items-center justify-between p-4 border-b border-zinc-800'>
              <span className='text-sm text-zinc-400'>
                {currentWorkspace?.name}
              </span>
              <span className='text-zinc-600'>›</span>
              <span className='text-sm font-medium'>Collections</span>
            </div>
            <div className='flex items-center space-x-2'>
              <HelpCircle className='h-4 w-4 text-zinc-400 hover:text-zinc-300 cursor-pointer' />
              <ExternalLink className='h-4 w-4 text-zinc-400 hover:text-zinc-300 cursor-pointer' />
            </div>
          </div>
        );
    }
  };

  return (
    <div className='flex h-screen  text-zinc-900'>
      {/* Sidebar */}
      <div className='w-12 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center py-4 space-y-4'>
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(item.label)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
              activeTab === item.label
                ? "bg-indigo-600 text-white"
                : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800"
            }`}>
            <item.icon className='w-4 h-4' />
          </div>
        ))}
      </div>
      <div className='flex-1 bg-zinc-900 overflow-y-auto'>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TabbedSidebar;
