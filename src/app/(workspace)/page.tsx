import { Button } from "@/components/ui/button";
import { currentUser } from "@/modules/authentication/actions";
import UserButton from "@/modules/authentication/components/user-button";
import Image from "next/image";

export default async function Home() {
  const user = await currentUser();
  return (
    <div className='flex justify-center items-center h-screen text-red-500'>
      <UserButton user={user} />
    </div>
  );
}
