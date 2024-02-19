import { unstable_noStore as noStore } from "next/cache";
import { getServerAuthSession } from "app/server/auth";
import Link from "next/link";
import { Avatar, Button, Card } from "antd";
import { MdLogout } from "react-icons/md";
import SignInButton from "./_components/buttons/SignInButton";
import { api } from "app/trpc/server";

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#382158] to-[#9294c7] text-white">
      {
        session
          ?
          <div className='flex flex-col items-center justify-center'>
            <Card className='min-w-[300px] min-h-[150px]'>
              <div className='flex flex-col items-center justify-center gap-4' >
                <Avatar
                  size={100}
                  src={session.user.image}
                  className='mb-2' />
                <p>Welcome, {session.user.name}</p>
                <p>{session.user.email} </p>
                <Link href={"/api/auth/signout"}>
                  <MdLogout className="text-2xl text-red-500 hover:scale-125 transition-all" />
                </Link>
                <div className='flex flex-row items-center justify-center gap-2'>
                  <Link href={session && "/movies"}>
                    <Button >Movies</Button>
                  </Link>
                  <Link href={session && "/series"}>
                    <Button >Series</Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
          :
          <SignInButton />
      }
    </main>
  );
}

