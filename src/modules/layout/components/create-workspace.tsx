"use client";

import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { useCreateWorkspace } from "@/modules/workspace/hooks/workspace";
import { useState } from "react";
import { toast } from "sonner";

const CreateWorkspace = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}) => {
  const [name, setName] = useState("");
  const { mutateAsync, isPending } = useCreateWorkspace();

  const handleSubmit = async () => {
    if (!name.trim()) return;
    try {
      await mutateAsync(name);
      toast.success("workspace created successfully");
      setName("");
      setIsModalOpen(false);
    } catch (error) {
        toast.error("workspace creation failed");
        console.error("Failed to create workspace",error);
    }
  };

  return (
    <Modal
      title='add new workspace'
      description='create a new workspace to organize your workspace'
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
      submitText={isPending ? "creating ..." : "Create Workspace"}
      submitVariant='default'>
      <div className='space-y-4'>
        <Input
          className='w-full p-2 border rounded-sm'
          placeholder='workspace name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default CreateWorkspace;
