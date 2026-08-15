import React, { useState } from "react";
import { UserPlus, Search } from "lucide-react";
import UserTable from "../components/user/UserTable";
import Button from "../components/ui/Button";
import UserFormModal from "../components/user/UserFormModal";
import DeleteConfirmModal from "../components/user/DeleteConfirmModal";

const HomePage = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsFormModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsFormModalOpen(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden p-6 md:p-12">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              User Management
            </h1>
            <p className="text-slate-400 mt-1">
              Manage your users, roles, and permissions effectively.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full md:w-64 bg-white/5 border border-white/10 text-white rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-500"
              />
            </div>
            <Button onClick={handleAddUser} className="rounded-full gap-2 shadow-lg shadow-blue-500/20 whitespace-nowrap">
              <UserPlus className="w-4 h-4" />
              Add User
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
          <UserTable 
            onEdit={handleEditUser} 
            onDelete={handleDeleteUser} 
          />
        </main>
      </div>

      <UserFormModal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)} 
        user={selectedUser} 
      />

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        user={selectedUser} 
      />
    </div>
  );
};

export default HomePage;
