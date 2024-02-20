"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { message } from 'antd';
import { api } from "app/trpc/react";
import { LoadingOutlined } from "@ant-design/icons";

export function CreateMovie() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createMovie = api.movie.create.useMutation({
    onSuccess: (data) => {
      if (data.error) {
        void handleError(data.error);
      } else if (data.message) {
        void handleCreated(data.message);
        router.refresh();
        setName("");
      }
    },
    onError: (error) => {
      void handleError(error.message);
    },
  });

  const handleCreated = (data: string) =>
    message.open({
      type: 'success',
      content: data,
      duration: 3
    });

  const handleError = (data: string) =>
    message.open({
      type: 'error',
      content: data,
      duration: 3
    });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if(!name.trim()){
          void handleError('Please enter a movie name');
          return;
        }
        createMovie.mutate({ name });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Movie Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createMovie.isLoading}
      >
        {createMovie.isLoading ? <p> Creating... <LoadingOutlined /></p> : "Create"}
      </button>
    </form>
  );
}
