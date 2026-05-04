"use client";

import { useActionState, useState } from "react";
import { deleteAccount, type DeleteAccountState } from "./actions";

const initialState: DeleteAccountState = {};

export default function DeleteAccountCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    deleteAccount,
    initialState
  );

  return (
    <div className="rounded-2xl border border-[#E6C8BA] bg-[#FFF7F3] px-5 py-4">
      <p className="text-sm text-[#A45F4E]">Delete account</p>

      <p className="mt-2 text-sm leading-6 text-[#8A6F5C]">
        Permanently remove your account, profile details, and saved reflections.
      </p>

      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mt-3 text-sm text-[#A45F4E] underline underline-offset-4 transition hover:text-[#7A3E32]"
        >
          Delete my account
        </button>
      ) : (
        <form action={formAction} className="mt-5 space-y-4">
          <div className="rounded-2xl border border-[#E6C8BA] bg-[#FFFDFC] px-4 py-4">
            <p className="text-sm font-medium text-[#7A3E32]">
              This action cannot be undone.
            </p>

            <p className="mt-2 text-sm leading-6 text-[#8A6F5C]">
              Your account, profile details, saved reflections, and login data
              will be permanently deleted.
            </p>
          </div>

          <label className="block">
            <span className="text-sm text-[#9A7D68]">Password</span>
            <input
              type="password"
              name="password"
              required
              className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm text-[#9A7D68]">
              Type DELETE to confirm
            </span>
            <input
              type="text"
              name="confirmation"
              required
              className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none"
            />
          </label>

          {state.error ? (
            <p className="rounded-xl bg-[#FCEDEA] px-4 py-3 text-sm text-[#A45F4E]">
              {state.error}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
              className="rounded-full border border-[#D8C5B3] px-4 py-2 text-sm text-[#6A4F3D] transition hover:bg-[#F8EFE7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-full bg-[#A45F4E] px-4 py-2 text-sm text-white transition hover:bg-[#7A3E32] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Deleting account..." : "Delete permanently"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}