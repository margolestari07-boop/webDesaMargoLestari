"use client";

export function NewsletterForm() {
  return (
    <form
      className="flex flex-col gap-2.5"
      onSubmit={(event) => event.preventDefault()}
    >
      <input
        className="font-body-sm text-body-sm text-on-surface placeholder:text-outline w-full rounded-xl bg-white px-4 py-3 shadow-sm focus:outline-none"
        placeholder="Masukkan alamat email atau WhatsApp..."
        required
        type="email"
      />
      <button
        className="font-label-md text-label-md text-on-secondary-fixed bg-secondary-fixed flex w-full items-center justify-center gap-1.5 rounded-xl py-3 font-bold shadow-md transition-colors hover:bg-white"
        type="submit"
      >
        <span>Daftar Warta Desa</span>
        <span className="material-symbols-outlined text-[18px]">send</span>
      </button>
    </form>
  );
}
