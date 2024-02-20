"use client";

import { LoadingOutlined } from '@ant-design/icons';
import GoMovies from 'app/app/_components/Buttons/goMoviesButton';
import { api } from 'app/trpc/react';
import React, { useEffect, useState } from 'react';

const Movie = ({ params }: { params: { id: string } }) => {
    const getMovie = api.movie.getOne.useMutation();
    const [movie, setMovie] = useState<{ id: number; name: string; } | null>(null);

    const handleMovie = async () => {
        const movie = await getMovie.mutateAsync({ id: parseInt(params.id) });
        setMovie(movie);
    };

    useEffect(() => {
        void handleMovie()
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center p-28 justify-start bg-gradient-to-b from-[#382158] to-[#9294c7] text-white">
            <div className='flex flex-col justify-center items-center gap-5'>
                <GoMovies />
                {
                    getMovie.isLoading
                    &&
                    <span>
                        Loading... <LoadingOutlined />
                    </span>
                }
                {movie && 
                    <div>
                        <h1>{movie.id}</h1>
                        <h1>{movie.name}</h1>
                    </div>
                }
            </div>
        </main>
    );
};

export default Movie;
