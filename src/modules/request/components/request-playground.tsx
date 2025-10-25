"use client";

import { useState } from "react";
import { useSaveRequest } from "../hooks/request";
import { useRequestPlaygroundStore } from "../store/useRequestStore";
import { Unplug } from "lucide-react";
import TabBar from "./tab-bar";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";
import RequestEditors from "./request-editor";

const RequestPlayground = () => {
  const { tabs, activeTabId, addTab } = useRequestPlaygroundStore();
  const activeTab = tabs.find((t) => t.id === activeTabId);
  const { mutateAsync, isPending } = useSaveRequest(activeTab?.requestId!);
  const [showSaveModal, setShowSaveModal] = useState(false);

  useHotkeys(
    "ctrl+g, meta+shift+g",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      addTab();
      toast.success("New Request created");
    },
    {
      preventDefault: true,
      enableOnFormTags: true,
    },
    []
  );

  if (!activeTab) {
    return (
      <div className='flex space-y-4 flex-col h-full items-center justify-center'>
        <div className='flex flex-col justify-center items-center h-40 w-40 border rounded-full bg-zinc-900'>
          <Unplug size={80} className='text-indigo-400' />
        </div>

        <div className='bg-zinc-900 p-4 rounded-lg space-y-2'>
          <div className='flex justify-between items-center gap-8'>
            <kbd className='px-2 py-1 bg-zinc-800 text-indigo-400 text-sm rounded border'>
              Ctrl+G
            </kbd>
            <span className='text-zinc-400 font-semibold'>New Request</span>
          </div>
          <div className='flex justify-between items-center gap-8'>
            <kbd className='px-2 py-1 bg-zinc-800 text-indigo-400 text-sm rounded border'>
              Ctrl+S
            </kbd>
            <span className='text-zinc-400 font-semibold'>Save Request</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full'>
      <TabBar />
      <div className="flex-1 overflow-auto">
        <RequestEditors/>
      </div>
    </div>
  );
};

export default RequestPlayground;
