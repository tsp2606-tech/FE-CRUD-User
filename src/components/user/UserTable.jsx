import React from "react";
import { Edit2, Trash2 } from "lucide-react";

const mockUsers = [
  { id: 1, name: "Liam Nguyen", email: "liam@example.com", age: 24, createdAt: "2023-10-12" },
  { id: 2, name: "Emma Tran", email: "emma@example.com", age: 29, createdAt: "2023-11-05" },
  { id: 3, name: "Noah Vu", email: "noah@example.com", age: 31, createdAt: "2024-01-20" },
  { id: 4, name: "Olivia Le", email: "olivia@example.com", age: 22, createdAt: "2024-02-15" },
  { id: 5, name: "William Pham", email: "william@example.com", age: 27, createdAt: "2024-03-10" },
];

const UserTable = ({ onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 text-slate-400 text-sm uppercase tracking-wider">
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Email</th>
            <th className="px-6 py-4 font-medium">Age</th>
            <th className="px-6 py-4 font-medium">Created At</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {mockUsers.map((user) => (
            <tr
              key={user.id}
              className="group hover:bg-white/5 transition-colors duration-200"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-inner">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-medium text-slate-200 group-hover:text-white transition-colors">
                    {user.name}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-slate-400">{user.email}</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {user.age} yrs
                </span>
              </td>
              <td className="px-6 py-4 text-slate-400">{user.createdAt}</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button 
                    onClick={() => onEdit(user)}
                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-xl transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onDelete(user)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
