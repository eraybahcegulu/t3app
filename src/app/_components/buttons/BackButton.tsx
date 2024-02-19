import Link from 'next/link'
import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'

const BackButton = () => {
  return (
    <Link href={"/"}>
      <IoMdArrowRoundBack className='text-3xl' />
    </Link>
  )
}

export default BackButton