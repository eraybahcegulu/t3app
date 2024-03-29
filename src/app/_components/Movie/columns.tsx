"use client";

import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import DeleteMovie from "./deleteMovie";

export const movieColumns = [
    {
        title: 'Id',
        dataIndex: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Actions',

        render: (record: { id: number }) =>
            <div className="flex flex-row justify-between items-center">

                <Link href={`/movies/${record.id}`} passHref>
                    <FaArrowRight className="text-xl text-black hover:scale-125 transition-all" />
                </Link>

                <FaRegEdit className="text-xl text-blue-500 hover:scale-125 transition-all cursor-pointer" />

                <DeleteMovie id={record.id} />

            </div>
    }

];
