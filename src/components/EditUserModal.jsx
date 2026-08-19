import { useEffect, useState } from "react";
import { CalendarDays, Info, Mail, User, X } from "lucide-react";

const EditUserModal = ({ error, isSubmitting, onClose, onSubmit, open, user }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (!user) return;

    setForm({
      name: user.name ?? "",
      email: user.email ?? "",
      age: user.age == null ? "" : String(user.age),
    });
  }, [user]);

  if (!open) return null;

  const updateField = (field, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newName = form.name.trim();
    const newEmail = form.email.trim();
    const newAge = form.age === "" ? undefined : Number(form.age);

    const oldName = (user?.name ?? "").trim();
    const oldEmail = (user?.email ?? "").trim();
    
    // Compare string versions exactly as initialized
    const currentAgeStr = form.age.trim();
    const initialAgeStr = user?.age == null ? "" : String(user.age).trim();

    if (newName === oldName && newEmail === oldEmail && currentAgeStr === initialAgeStr) {
      setLocalError("Không có gì thay đổi cả. Vui lòng chỉnh sửa hoặc bấm Cancel.");
      return;
    }

    setLocalError("");

    onSubmit(user?._id, {
      name: newName,
      email: newEmail,
      age: newAge,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10">
      <button
        aria-label="Close edit user modal"
        className="absolute inset-0 bg-surface-container-lowest/70 backdrop-blur-md"
        onClick={onClose}
        type="button"
      />

      <section className="animate-modal-enter relative flex w-full max-w-md flex-col gap-6 rounded-xl border border-white/15 bg-surface-container-low/80 p-7 shadow-[0_24px_80px_-24px_rgba(173,198,255,0.36)] backdrop-blur-2xl">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Edit User
            </h2>
            <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
              Update credentials and personal details.
            </p>
          </div>
          <button
            aria-label="Close"
            className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-white/10 hover:text-on-surface"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2">
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">
              Full Name
            </span>
            <span className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
              <input
                className="glass-input w-full rounded-lg py-2.5 pl-10 pr-4 font-body-md text-body-md text-on-surface placeholder:text-outline"
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Enter full name"
                required
                type="text"
                value={form.name}
              />
            </span>
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">
              Email Address
            </span>
            <span className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
              <input
                className="glass-input w-full rounded-lg py-2.5 pl-10 pr-4 font-body-md text-body-md text-on-surface placeholder:text-outline"
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="Enter email address"
                required
                type="email"
                value={form.email}
              />
            </span>
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">
              Age
            </span>
            <span className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
              <input
                className="glass-input w-full rounded-lg py-2.5 pl-10 pr-4 font-body-md text-body-md text-on-surface placeholder:text-outline"
                onChange={(event) => updateField("age", event.target.value)}
                placeholder="Enter age"
                type="number"
                value={form.age}
              />
            </span>
          </label>

          {localError && (
            <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 font-body-sm text-body-sm text-amber-500">
              <Info className="h-4 w-4" />
              {localError}
            </div>
          )}

          {error && (
            <p className="rounded-lg border border-danger-vibrant/25 bg-danger-vibrant/10 px-4 py-3 font-body-sm text-body-sm text-error">
              {error}
            </p>
          )}

          <footer className="mt-2 flex justify-end gap-3 border-t border-glass-stroke pt-5">
            <button
              className="rounded-lg border border-glass-stroke bg-white/5 px-5 py-2.5 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-white/10 hover:text-on-surface"
              disabled={isSubmitting}
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="rounded-lg bg-gradient-to-r from-primary to-secondary px-6 py-2.5 font-label-md text-label-md text-on-primary shadow-[0_0_18px_rgba(173,198,255,0.26)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_26px_rgba(208,188,255,0.36)]"
              disabled={isSubmitting || !user?._id}
              type="submit"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
};

export default EditUserModal;
