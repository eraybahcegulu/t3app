import { getServerAuthSession } from 'app/server/auth';
import React from 'react'
import BackButton from '../_components/Buttons/goHomeButton';
import SignInButton from '../_components/Buttons/signInButton';

const Series = async () => {
    const session = await getServerAuthSession();
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#382158] to-[#9294c7] text-white">
            {
                session
                    ?
                    <div>
                        <BackButton />
                    </div>
                    :
                    <SignInButton />
            }
        </main>
    )
}

export default Series