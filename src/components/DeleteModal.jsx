import { AlertTriangle, Trash2, X } from "lucide-react";

const DeleteModal = ({ error, isSubmitting, onClose, onConfirm, open, user }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        aria-label="Close delete user modal"
        className="absolute inset-0 bg-background/45 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />

      <section className="animate-modal-enter relative w-full max-w-lg overflow-hidden rounded-xl border border-white/15 bg-surface-container-low/95 text-left shadow-[0_28px_90px_-28px_rgba(239,68,68,0.52)] backdrop-blur-2xl">
        <div className="absolute inset-x-0 top-0 h-1 bg-danger-vibrant" />

        <header className="relative z-10 flex items-start justify-between gap-4 border-b border-glass-stroke bg-surface-container/55 px-6 py-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-danger-vibrant/35 bg-danger-vibrant/10 text-error">
              <Trash2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Delete User
              </h3>
              <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                Review this action before removing the account.
              </p>
            </div>
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

        <div className="relative z-10 space-y-5 px-6 py-6">
          <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-on-surface">
              {user?.name ?? "this user"}
            </span>
            ? This will permanently remove the account and all associated data
            from the workspace.
          </p>

          <div className="flex gap-3 rounded-lg border border-danger-vibrant/25 bg-danger-vibrant/10 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-error" />
            <div>
              <p className="font-label-md text-label-md text-error">
                This action cannot be undone
              </p>
              <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                You will need to create a new user if this account is removed
                by mistake.
              </p>
            </div>
          </div>

          {error && (
            <p className="rounded-lg border border-danger-vibrant/25 bg-danger-vibrant/10 px-4 py-3 font-body-sm text-body-sm text-error">
              {error}
            </p>
          )}
        </div>

        <footer className="relative z-10 flex flex-col justify-end gap-3 border-t border-glass-stroke bg-surface-container-lowest/35 px-6 py-5 sm:flex-row">
          <button
            className="inline-flex w-full justify-center rounded-lg border border-glass-stroke bg-white/5 px-5 py-2.5 font-label-md text-label-md text-on-surface transition-colors hover:bg-white/10 sm:w-auto"
            disabled={isSubmitting}
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-danger-vibrant/50 bg-danger-vibrant px-5 py-2.5 font-label-md text-label-md text-white shadow-[0_0_16px_rgba(239,68,68,0.34)] transition-all hover:bg-red-500 hover:shadow-[0_0_24px_rgba(239,68,68,0.48)] sm:w-auto"
            disabled={isSubmitting || !user?._id}
            onClick={() => onConfirm(user?._id)}
            type="button"
          >
            <Trash2 className="h-4 w-4" />
            {isSubmitting ? "Deleting..." : "Delete User"}
          </button>
        </footer>
      </section>
    </div>
  );
};

export default DeleteModal;
