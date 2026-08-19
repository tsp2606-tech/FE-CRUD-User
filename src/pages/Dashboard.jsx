import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Funnel,
  Info,
  Menu,
  Pencil,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import AddUserModal from "../components/AddUserModal";
import DeleteModal from "../components/DeleteModal";
import EditUserModal from "../components/EditUserModal";
import MoreInformationModal from "../components/MoreInformationModal";
import { apiUser } from "../services/api/apiUser";

const departments = ["Engineering", "Design", "Marketing", "Operations", "Finance"];
const roles = ["Admin", "Editor", "Viewer"];

const roleStyles = {
  Admin: "border-primary/25 bg-primary/10 text-primary",
  Editor: "border-secondary/25 bg-secondary/10 text-secondary",
  Viewer: "border-glass-stroke bg-surface-container-high text-on-surface-variant",
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";

const formatDate = (date) => {
  if (!date) return "Not available";

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const normalizeUser = (user, index = 0) => ({
  ...user,
  _id: user?._id ?? user?.id,
  age: user?.age ?? "",
  department: user?.department ?? departments[index % departments.length],
  initials: getInitials(user?.name),
  joinedAt: formatDate(user?.createdAt),
  location: user?.location ?? "Remote Workspace",
  notes:
    user?.notes ??
    "This profile is synced from the CRUD User API. Role and workspace metadata are presented by the interface until the backend provides those fields.",
  role: user?.role ?? roles[index % roles.length],
});

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.error ||
  error?.response?.data?.message ||
  error?.message ||
  fallback;

const Dashboard = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [toast, setToast] = useState({ message: "", visible: false });
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return users;

    return users.filter((user) =>
      [user.name, user.email, user.department, user.role]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedQuery))
    );
  }, [query, users]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const loadUsers = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await apiUser.getAllUsers();
      setUsers(Array.isArray(response) ? response.map(normalizeUser) : []);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to load users."));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const showModal = (modalName, user = selectedUser) => {
    setSelectedUser(user);
    setModalError("");
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalError("");
  };

  const handleViewUser = async (user) => {
    showModal("details", user);

    try {
      const response = await apiUser.getUserById(user._id);
      setSelectedUser(normalizeUser(response));
    } catch (requestError) {
      setModalError(getErrorMessage(requestError, "Unable to load user details."));
    }
  };

  const handleCreateUser = async (payload) => {
    setIsSubmitting(true);
    setModalError("");

    try {
      const response = await apiUser.createUser(payload);
      const createdUser = response?.data ?? response;

      setUsers((currentUsers) => [
        normalizeUser(createdUser, currentUsers.length),
        ...currentUsers,
      ]);
      closeModal();
      return true;
    } catch (requestError) {
      setModalError(getErrorMessage(requestError, "Unable to create user."));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateUser = async (id, payload) => {
    if (!id) return;

    setIsSubmitting(true);
    setModalError("");

    try {
      const response = await apiUser.updateUser(id, payload);

      setUsers((currentUsers) =>
        currentUsers.map((user, index) =>
          user._id === id ? normalizeUser({ ...user, ...response }, index) : user
        )
      );
      setSelectedUser((currentUser) => normalizeUser({ ...currentUser, ...response }));
      closeModal();
    } catch (requestError) {
      if (requestError?.response?.status === 404) {
        showToast("Người dùng không tồn tại (có thể đã bị xoá)");
        closeModal();
        loadUsers();
      } else {
        setModalError(getErrorMessage(requestError, "Unable to update user."));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!id) return;

    setIsSubmitting(true);
    setModalError("");

    try {
      await apiUser.deleteUser(id);
      setUsers((currentUsers) => currentUsers.filter((user) => user._id !== id));
      closeModal();
    } catch (requestError) {
      if (requestError?.response?.status === 404) {
        showToast("Người dùng không tồn tại (có thể đã bị xoá)");
        closeModal();
        loadUsers();
      } else {
        setModalError(getErrorMessage(requestError, "Unable to delete user."));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-glass-stroke bg-surface-container-low/70 py-8 shadow-2xl backdrop-blur-xl md:flex">
        <div className="mb-8 flex items-center gap-4 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-container shadow-[0_0_18px_rgba(77,142,255,0.3)]">
            <ShieldCheck className="h-5 w-5 text-on-primary-container" />
          </div>
          <div>
            <h1 className="font-headline-sm text-headline-sm text-on-surface">
              Lumina Admin
            </h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Enterprise Tier
            </p>
          </div>
        </div>

        <nav className="flex-1">
          <a
            className="flex items-center gap-3 border-r-4 border-primary bg-primary/10 px-6 py-3 font-body-sm text-body-sm font-medium text-primary transition-all hover:bg-primary/15"
            href="#users"
          >
            <Users className="h-5 w-5" />
            Users
          </a>
        </nav>
      </aside>

      <div className="flex min-h-screen flex-col md:ml-64">
        <header className="sticky top-0 z-30 flex w-full items-center justify-between border-b border-glass-stroke bg-glass-bg px-4 py-4 shadow-sm backdrop-blur-md md:px-10">
          <div className="flex items-center gap-4">
            <button
              aria-label="Open navigation"
              className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-white/10 hover:text-primary md:hidden"
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="group relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary" />
              <input
                className="w-64 rounded-full border border-glass-stroke bg-surface-container/50 py-2 pl-10 pr-4 font-body-sm text-body-sm text-on-surface shadow-inner transition-all placeholder:text-outline-variant focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search..."
                type="text"
                value={query}
              />
            </div>
          </div>

          <div className="text-center md:hidden">
            <span className="font-headline-md text-headline-md text-primary">
              Lumina
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              aria-label="Notifications"
              className="relative rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-white/10 hover:text-primary"
              type="button"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger-vibrant shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
            </button>
            <button
              aria-label="Settings"
              className="hidden rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-white/10 hover:text-primary sm:inline-flex"
              type="button"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-8 p-4 md:p-10">
          <section className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Users
              </h2>
              <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                Manage platform access, roles, and account visibility.
              </p>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-container to-secondary-container px-5 py-2.5 font-label-md text-label-md text-white shadow-[0_4px_16px_rgba(77,142,255,0.24)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(77,142,255,0.38)]"
              onClick={() => showModal("add", null)}
              type="button"
            >
              <Plus className="h-4 w-4" />
              Add User
            </button>
          </section>

          <section
            className="glass-panel flex flex-col overflow-hidden rounded-xl"
            id="users"
          >
            {error && (
              <div className="border-b border-danger-vibrant/25 bg-danger-vibrant/10 px-4 py-3 font-body-sm text-body-sm text-error">
                {error}
              </div>
            )}

            <div className="flex flex-col justify-between gap-3 border-b border-glass-stroke bg-surface-container-low/30 p-4 sm:flex-row sm:items-center">
              <button
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-glass-stroke bg-surface-container px-3 py-2 font-label-sm text-label-sm text-on-surface-variant transition-colors hover:border-outline-variant hover:text-on-surface"
                onClick={loadUsers}
                type="button"
              >
                <Funnel className="h-4 w-4" />
                Refresh
              </button>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Showing {filteredUsers.length} of {users.length} users
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-glass-stroke bg-surface-container/25">
                    <th className="w-1/3 p-4 font-label-md text-label-md font-medium uppercase text-outline">
                      User
                    </th>
                    <th className="p-4 font-label-md text-label-md font-medium uppercase text-outline">
                      Email Address
                    </th>
                    <th className="p-4 font-label-md text-label-md font-medium uppercase text-outline">
                      Role
                    </th>
                    <th className="p-4 font-label-md text-label-md font-medium uppercase text-outline">
                      Date Added
                    </th>
                    <th className="p-4 text-right font-label-md text-label-md font-medium uppercase text-outline">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="font-body-sm text-body-sm text-on-surface-variant">
                  {isLoading && (
                    <tr>
                      <td
                        className="p-8 text-center font-body-md text-body-md text-on-surface-variant"
                        colSpan={5}
                      >
                        Loading users...
                      </td>
                    </tr>
                  )}

                  {!isLoading && paginatedUsers.length === 0 && (
                    <tr>
                      <td
                        className="p-8 text-center font-body-md text-body-md text-on-surface-variant"
                        colSpan={5}
                      >
                        No users found.
                      </td>
                    </tr>
                  )}

                  {!isLoading && paginatedUsers.map((user) => (
                    <tr
                      className="table-row-hover border-b border-glass-stroke/50 transition-colors"
                      key={user._id}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 overflow-hidden rounded-full border border-primary/30 bg-surface-container-high">
                            {user.avatar ? (
                              <img
                                alt={user.name}
                                className="h-full w-full object-cover"
                                src={user.avatar}
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center font-semibold text-on-surface">
                                {user.initials}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-on-surface">
                              {user.name}
                            </div>
                            <div className="text-[12px] text-on-surface-variant/70">
                              {user.department}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${roleStyles[user.role]}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4 text-on-surface-variant/70">
                        {user.joinedAt}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            aria-label={`View ${user.name}`}
                            className="rounded-md p-2 text-on-surface-variant transition-colors hover:bg-primary/10 hover:text-primary"
                            onClick={() => handleViewUser(user)}
                            title="More Information"
                            type="button"
                          >
                            <Info className="h-4 w-4" />
                          </button>
                          <button
                            aria-label={`Edit ${user.name}`}
                            className="rounded-md p-2 text-on-surface-variant transition-colors hover:bg-primary/10 hover:text-primary"
                            onClick={() => showModal("edit", user)}
                            title="Edit"
                            type="button"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            aria-label={`Delete ${user.name}`}
                            className="rounded-md p-2 text-on-surface-variant transition-colors hover:bg-danger-vibrant/10 hover:text-danger-vibrant"
                            onClick={() => showModal("delete", user)}
                            title="Delete"
                            type="button"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <footer className="flex items-center justify-between border-t border-glass-stroke bg-surface-container-lowest/50 p-4">
                <button
                  className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 font-label-sm text-label-sm transition-colors ${
                    currentPage === 1
                      ? "text-on-surface-variant opacity-50 cursor-not-allowed"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  type="button"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </button>
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        className={`flex h-8 w-8 items-center justify-center rounded-lg border font-label-sm text-label-sm transition-colors ${
                          page === currentPage
                            ? "border-primary/30 bg-primary/20 text-primary"
                            : "border-transparent text-on-surface-variant hover:bg-white/5"
                        }`}
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        type="button"
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
                <button
                  className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 font-label-sm text-label-sm transition-colors ${
                    currentPage === totalPages
                      ? "text-on-surface-variant opacity-50 cursor-not-allowed"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  type="button"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </footer>
            )}
          </section>
        </main>
      </div>

      <AddUserModal
        error={modalError}
        isSubmitting={isSubmitting}
        onClose={closeModal}
        onSubmit={handleCreateUser}
        open={activeModal === "add"}
      />
      <EditUserModal
        error={modalError}
        isSubmitting={isSubmitting}
        open={activeModal === "edit"}
        onClose={closeModal}
        onSubmit={handleUpdateUser}
        user={selectedUser}
      />
      <DeleteModal
        error={modalError}
        isSubmitting={isSubmitting}
        open={activeModal === "delete"}
        onClose={closeModal}
        onConfirm={handleDeleteUser}
        user={selectedUser}
      />
      <MoreInformationModal
        error={modalError}
        onClose={closeModal}
        onDelete={() => showModal("delete", selectedUser)}
        onEdit={() => showModal("edit", selectedUser)}
        open={activeModal === "details"}
        user={selectedUser}
      />
      {/* Toast Notification */}
      <div
        className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-lg border border-danger-vibrant/25 bg-surface-container-high px-4 py-3 shadow-[0_8px_30px_rgba(239,68,68,0.2)] transition-all duration-300 pointer-events-none ${
          toast.visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-danger-vibrant/10 text-danger-vibrant">
          <Info className="h-5 w-5" />
        </div>
        <p className="font-body-sm text-body-sm font-medium text-on-surface">
          {toast.message}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
