type DeleteConfirmationDialogProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-8 rounded-lg shadow   ">
        <p className="text-lg font-semibold mb-4">
          Are you sure you want to delete this book?
        </p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 rounded-md mr-4"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-md"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
