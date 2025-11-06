import RealTimeConnectionBar from "@/modules/realtime/components/real-time-connection-bar";
import RealTimeMessageEditor from "@/modules/realtime/components/real-time-message-editor";
import React from "react";

const RealTimePage = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='px-6  py-6 space-y-2'>
        <h1 className='text-2xl font-bold'>WebSocket</h1>
        <p className='text-sm text-muted-foreground'>
          connect to a websocket server and start testing
        </p>
        <RealTimeConnectionBar/>
      </div>
      <div className='flex-1 overflow-auto flex flex-col px-6 pb-6 border-zinc-800'>
        <RealTimeMessageEditor />
      </div>
    </div>
  );
};

export default RealTimePage;
