import { getServerAuthSession } from 'app/server/auth';
import React from 'react'

import BackButton from '../_components/Buttons/goHomeButton';
import SignInButton from '../_components/Buttons/signInButton';
import { CreateMovie } from '../_components/Movie/createMovie';
import AllMovies from '../_components/Movie/getMovies';

const Movies = async () => {
    const session = await getServerAuthSession();

    return (
        <main className="flex min-h-screen flex-col items-center p-28 justify-start bg-gradient-to-b from-[#382158] to-[#9294c7] text-white">
            {
                session
                    ?

                    <div className='flex flex-col justify-center items-center gap-5'>
                        <BackButton />
                        <CreateMovie />
                        <AllMovies/>
                    </div>
                    :
                    <SignInButton />
            }
        </main>
    )
}

export default Movies