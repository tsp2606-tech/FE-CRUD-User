import { Building2, KeyRound, Mail, Pencil, StickyNote, Trash2, X } from "lucide-react";

const MoreInformationModal = ({ error, open, onClose, onDelete, onEdit, user }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      <button
        aria-label="Close user details modal"
        className="absolute inset-0 bg-background/70 backdrop-blur-md"
        onClick={onClose}
        type="button"
      />

      <section className="animate-modal-enter relative flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-glass-stroke bg-glass-bg shadow-[0_24px_90px_-28px_rgba(173,198,255,0.42)] backdrop-blur-2xl">
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-primary/10 to-transparent" />

        <header className="relative z-10 flex items-center justify-between border-b border-glass-stroke px-6 py-5">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            User Details
          </h2>
          <button
            aria-label="Close"
            className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-white/10 hover:text-on-surface"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="relative z-10 space-y-8 overflow-y-auto p-6 md:p-8">
          {error && (
            <p className="rounded-lg border border-danger-vibrant/25 bg-danger-vibrant/10 px-4 py-3 font-body-sm text-body-sm text-error">
              {error}
            </p>
          )}

          <section className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary/50 bg-surface-container-high ring-4 ring-primary/10">
              {user?.avatar ? (
                <img
                  alt={user.name}
                  className="h-full w-full object-cover"
                  src={user.avatar}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-headline-md text-headline-md text-on-surface">
                  {user?.initials}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface">
                {user?.name}
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-primary/30 bg-primary/20 px-3 py-1 font-label-sm text-label-sm uppercase text-primary">
                  {user?.role}
                </span>
                <span className="rounded-full border border-success-vibrant/30 bg-success-vibrant/10 px-3 py-1 font-label-sm text-label-sm uppercase text-success-vibrant">
                  Active
                </span>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <article className="rounded-lg border border-glass-stroke bg-white/5 p-5 transition-colors hover:bg-white/10">
              <div className="mb-4 flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
                <Mail className="h-5 w-5 text-primary" />
                Contact Identity
              </div>
              <dl className="space-y-4">
                <div>
                  <dt className="mb-1 font-label-sm text-label-sm text-on-surface-variant/70">
                    Primary Email
                  </dt>
                  <dd className="truncate font-body-md text-body-md text-on-surface">
                    {user?.email}
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 font-label-sm text-label-sm text-on-surface-variant/70">
                    Workspace Location
                  </dt>
                  <dd className="font-body-md text-body-md text-on-surface">
                    {user?.location}
                  </dd>
                </div>
              </dl>
            </article>

            <article className="rounded-lg border border-glass-stroke bg-white/5 p-5 transition-colors hover:bg-white/10">
              <div className="mb-4 flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
                <Building2 className="h-5 w-5 text-tertiary" />
                Organizational
              </div>
              <dl className="space-y-4">
                <div>
                  <dt className="mb-1 font-label-sm text-label-sm text-on-surface-variant/70">
                    Department
                  </dt>
                  <dd className="font-body-md text-body-md text-on-surface">
                    {user?.department}
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 font-label-sm text-label-sm text-on-surface-variant/70">
                    Date Joined
                  </dt>
                  <dd className="font-body-md text-body-md text-on-surface">
                    {user?.joinedAt}
                  </dd>
                </div>
              </dl>
            </article>

            <article className="rounded-lg border border-glass-stroke bg-white/5 p-5 transition-colors hover:bg-white/10 md:col-span-2">
              <div className="mb-3 flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
                <StickyNote className="h-5 w-5 text-secondary" />
                Administrator Notes
              </div>
              <p className="font-body-md text-body-md leading-relaxed text-on-surface/90">
                {user?.notes}
              </p>
            </article>
          </section>
        </div>

        <footer className="relative z-10 flex flex-col justify-end gap-3 border-t border-glass-stroke bg-surface-container/35 p-6 sm:flex-row">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-danger-vibrant/25 bg-danger-vibrant/10 px-5 py-2.5 font-label-md text-label-md text-danger-vibrant transition-colors hover:bg-danger-vibrant/20"
            onClick={onDelete}
            type="button"
          >
            <Trash2 className="h-4 w-4" />
            Delete User
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-glass-stroke bg-white/5 px-5 py-2.5 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-white/10 hover:text-on-surface"
            type="button"
          >
            <KeyRound className="h-4 w-4" />
            Reset Credentials
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-5 py-2.5 font-label-md text-label-md text-on-primary shadow-[0_0_18px_rgba(173,198,255,0.28)] transition-all hover:shadow-[0_0_26px_rgba(208,188,255,0.38)]"
            onClick={onEdit}
            type="button"
          >
            <Pencil className="h-4 w-4" />
            Edit User
          </button>
        </footer>
      </section>
    </div>
  );
};

export default MoreInformationModal;
