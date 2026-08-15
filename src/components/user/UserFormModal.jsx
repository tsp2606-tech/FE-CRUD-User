import React from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

const UserFormModal = ({ isOpen, onClose, user }) => {
  const isEditing = !!user;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit User" : "Add New User"}
    >
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Name"
          placeholder="e.g. John Doe"
          defaultValue={user?.name || ""}
          required
        />
        
        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. john@example.com"
          defaultValue={user?.email || ""}
          required
        />
        
        <Input
          label="Age"
          type="number"
          placeholder="e.g. 25"
          defaultValue={user?.age || ""}
          min="1"
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {isEditing ? "Save Changes" : "Create User"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UserFormModal;
