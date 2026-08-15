import React from "react";
import { AlertTriangle } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

const DeleteConfirmModal = ({ isOpen, onClose, user }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete User">
      <div className="flex flex-col items-center text-center space-y-4 py-4">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-white mb-2">
            Are you absolutely sure?
          </h3>
          <p className="text-slate-400">
            This action cannot be undone. This will permanently delete{" "}
            <span className="text-white font-semibold">{user?.name || "this user"}</span>
            {" "}from the system.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 mt-2 border-t border-white/10">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger">
          Delete User
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
