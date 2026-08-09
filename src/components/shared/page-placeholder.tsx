interface PagePlaceholderProps {
  title: string;
  description: string;
  badge?: string;
}

export function PagePlaceholder({ title, description, badge }: PagePlaceholderProps) {
  return (
    <section className="space-y-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-sm)] sm:p-8">
      {badge ? (
        <p className="inline-flex rounded-full bg-[var(--accent-subtle)] px-3 py-1 text-xs font-medium text-[var(--text-primary)]">
          {badge}
        </p>
      ) : null}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        <p className="max-w-2xl text-[var(--text-secondary)]">{description}</p>
      </div>
    </section>
  );
}
