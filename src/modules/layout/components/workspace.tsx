import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { useWorkspaces } from "@/modules/workspace/hooks/workspace";
import { Loader, User } from "lucide-react";
import React from "react";

const Workspace = () => {
  const { data: workspaces, isLoading } = useWorkspaces();

  if (isLoading) {
    return <Loader className='animate-spin text-indigo-400 size-4' />;
  }

  if (!workspaces || workspaces.length===0) {
    return <div className="font-semibold text-indigo-400">No workspace Found</div>
  }
  return (
    <>
      <Hint label='Change Workspace'>
        <Button className='border border-indigo-400 bg-indigo-400/10 hover:bg-indigo-400/20 text-indigo-400 hover:text-indigo-300 flex flex-row items-center space-x-1'>
          <User className='size-4 text-indigo-400' />
          <span className='text-sm'>Personal Workspace</span>
        </Button>
      </Hint>
    </>
  );
};

export default Workspace;
