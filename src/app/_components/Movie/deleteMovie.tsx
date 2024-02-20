import React, { useState } from 'react';
import { Modal, message, Button } from 'antd';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { api } from 'app/trpc/react';
import { useRouter } from 'next/navigation';
import { LoadingOutlined } from '@ant-design/icons';

const DeleteMovie = ({ id }: { id: number }) => {
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);

    const deleteMovie = api.movie.delete.useMutation({

        onSuccess: (data) => {
            setOpenModal(false);
            if (data.error) {
                void handleError(data.error);
            } else if (data.message) {
                void handleDeleted(data.message);
                router.refresh();
            }
        },
        onError: (error) => {
            void handleError(error.message);
        },
    });

    const handleDeleted = (data: string) =>
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

    const handleDeleteMovie = () => {
        setOpenModal(true);
    }

    return (
        <>
            <RiDeleteBin5Fill
                className="text-xl text-red-500 hover:scale-125 transition-all cursor-pointer"
                onClick={handleDeleteMovie}
            />
            <Modal
                title="Delete Movie"
                open={openModal}
                onOk={() => deleteMovie.mutate({ id })}
                onCancel={() => setOpenModal(false)}
                okText="Delete"
                cancelText="Cancel"
                closable={false}
                centered
                footer={[
                    <Button key="cancel" onClick={() => setOpenModal(false)} disabled={deleteMovie.isLoading}>Cancel</Button>,
                    <Button key="delete" type="primary" onClick={() => deleteMovie.mutate({ id })} disabled={deleteMovie.isLoading}>
                        {deleteMovie.isLoading ? <p> Deleting... <LoadingOutlined /></p> : "Delete"}
                    </Button>
                ]}
            >
                <p>Are you sure you want to delete this movie?</p>
            </Modal>
        </>
    );
};

export default DeleteMovie;
