import { currentUser } from "@/modules/authentication/actions";
import Header from "@/modules/Layout/components/header";

import React from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  return (
    <>
      {/* @ts-ignore */}
      <Header user={user} />
      {/* MAIN */}
      <main className='max-h[calc(100vh-4rem)] h-[calc(100vh-4rem)] flex flex-1 overflow-hidden'>
        <div className='flex h-full w-full'>
          <div className='w-12 border-zinc-800 bg-zinc-900'>Tab Left Panel</div>
          <div className='flex-1 bg-zinc-900'>{children}</div>
        </div>
      </main>
    </>
  );
};

export default RootLayout;
