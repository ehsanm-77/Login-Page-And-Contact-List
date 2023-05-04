import React from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

interface DeleteConfirmationModalProps {
  showDeleteConfirmation: boolean;
  cancelDelete: () => void;
  confirmDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  showDeleteConfirmation,
  cancelDelete,
  confirmDelete,
}) => {
  return (
    <Modal
      isOpen={showDeleteConfirmation}
      onRequestClose={cancelDelete}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="text-center rounded-full bg-gray-400 p-10">
        <p className="mb-4 text-xl">آیا از حذف این مخاطب اطمینان دارید؟</p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => {
            confirmDelete();
            toast.success(`حذف کاربر با موفقیت انجام شد`, {
              className: 'text-xl text-right',
            });
          }}
        >
          بله
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={cancelDelete}
        >
          خیر
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
