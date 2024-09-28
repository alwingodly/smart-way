import React from "react";
const DeleteModal = ({ closeModal, handleAction , question , title , buttonName }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-[300px] md:w-[500px]">
        <div className="flex items-center justify-between p-4">
          <p className="text-lg font-medium">{title}</p>
        </div>
        <hr />
        <p className="p-4 mb-16">{question}</p>
        <hr />
        <div className="flex justify-end space-x-4 p-4">
          <button
            className="bg-gray-100 hover:bg-gray-200 text-black font-medium text-sm py-2 px-4 rounded-full"
            onClick={closeModal}
          >
            cancel
          </button>
          <button
            className="bg-black text-white font-medium py-2 px-8 text-sm rounded-full"
            onClick={handleAction}
          >
            {buttonName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
