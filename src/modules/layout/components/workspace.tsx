import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { useWorkspaces } from "@/modules/workspace/hooks/workspace";
import { Loader, User } from "lucide-react";
import React, { useEffect } from "react";
import { useWorkspaceStore } from "../store";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const Workspace = () => {
  const { data: workspaces, isLoading } = useWorkspaces();

  const { selectedWorkspace, setSelectedWorkspace } = useWorkspaceStore();

  useEffect(() => {
    if (workspaces && workspaces.length > 0 && !selectedWorkspace) {
      setSelectedWorkspace(workspaces[0]);
    }
  }, [workspaces, selectedWorkspace, setSelectedWorkspace]);

  if (isLoading) {
    return <Loader className='animate-spin text-indigo-400 size-4' />;
  }

  if (!workspaces || workspaces.length === 0) {
    return (
      <div className='font-semibold text-indigo-400'>No workspace Found</div>
    );
  }
  return (
    <>
      <Hint label='Change Workspace'>
        <Select
          value={selectedWorkspace?.id}
          onValueChange={(id) => {
            const ws = workspaces.find((w) => w.id === id);
            if (ws) setSelectedWorkspace(ws);
          }}>
          <SelectTrigger className='border border-indigo-400 bg-indigo-400/10 hover:bg-indigo-400/20 text-indigo-400 hover:text-indigo-300 flex flex-row items-center space-x-1'>
            <User size={4} className='text-indigo-400' />
            <span className='text-sm text-indigo-400 font-semibold'>
              <SelectValue placeholder='Select Workspace' />
            </span>
          </SelectTrigger>
          <SelectContent>
            {workspaces.map((ws) => (
              <SelectItem key={ws.id} value={ws.id}>
                {ws.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Hint>
    </>
  );
};

export default Workspace;
