import { useState } from "react";
import { CalendarDays, Mail, User, X } from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  age: "",
};

const AddUserModal = ({ error, isSubmitting, onClose, onSubmit, open }) => {
  const [form, setForm] = useState(initialForm);

  if (!open) return null;

  const updateField = (field, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const didSubmit = await onSubmit({
      name: form.name.trim(),
      email: form.email.trim(),
      age: form.age === "" ? undefined : Number(form.age),
    });

    if (didSubmit) {
      setForm(initialForm);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        aria-label="Close add user modal"
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
        type="button"
      />

      <section className="animate-modal-enter relative w-full max-w-md overflow-hidden rounded-xl border border-glass-stroke bg-glass-bg shadow-[0_18px_70px_-22px_rgba(173,198,255,0.38)] backdrop-blur-2xl">
        <header className="flex items-center justify-between border-b border-glass-stroke bg-surface-container-low/50 px-6 py-5">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Add New User
            </h2>
            <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
              Create a new profile shell for the workspace.
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

        <form className="space-y-5 px-6 py-6" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="font-label-md text-label-md text-on-surface-variant">
              Full Name
            </span>
            <span className="relative block">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
              <input
                className="glass-input w-full rounded-lg py-3 pl-10 pr-4 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/55"
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="e.g. John Doe"
                required
                type="text"
                value={form.name}
              />
            </span>
          </label>

          <label className="block space-y-2">
            <span className="font-label-md text-label-md text-on-surface-variant">
              Email Address
            </span>
            <span className="relative block">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
              <input
                className="glass-input w-full rounded-lg py-3 pl-10 pr-4 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/55"
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="john@example.com"
                required
                type="email"
                value={form.email}
              />
            </span>
          </label>

          <label className="block space-y-2">
            <span className="font-label-md text-label-md text-on-surface-variant">
              Age
            </span>
            <span className="relative block">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
              <input
                className="glass-input w-full rounded-lg py-3 pl-10 pr-4 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/55"
                max="120"
                min="18"
                onChange={(event) => updateField("age", event.target.value)}
                placeholder="25"
                type="number"
                value={form.age}
              />
            </span>
          </label>

          {error && (
            <p className="rounded-lg border border-danger-vibrant/25 bg-danger-vibrant/10 px-4 py-3 font-body-sm text-body-sm text-error">
              {error}
            </p>
          )}

          <footer className="flex justify-end gap-3 border-t border-glass-stroke pt-5">
            <button
              className="rounded-lg border border-glass-stroke bg-white/5 px-5 py-2.5 font-label-md text-label-md text-on-surface transition-colors hover:bg-white/10"
              onClick={onClose}
              disabled={isSubmitting}
              type="button"
            >
              Cancel
            </button>
            <button
              className="rounded-lg bg-gradient-to-r from-primary to-secondary px-5 py-2.5 font-label-md text-label-md text-on-primary shadow-[0_0_18px_rgba(173,198,255,0.26)] transition-all hover:shadow-[0_0_26px_rgba(208,188,255,0.36)]"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Adding..." : "Add User"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
};

export default AddUserModal;
