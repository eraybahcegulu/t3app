import Link from 'next/link'
import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'

const GoMovies = () => {
  return (
    <Link href={"/movies"}>
      <IoMdArrowRoundBack className='text-3xl' />
    </Link>
  )
}

export default GoMovies