/*"use client";

import { useState } from "react";
import { updateResponse } from "./actions";

type EditableReflectionFormProps = {
  deliveryId: number;
  responseText: string;
};

export default function EditableReflectionForm({
  deliveryId,
  responseText,
}: EditableReflectionFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <form action={updateResponse} className="space-y-5">
      <input type="hidden" name="deliveryId" value={deliveryId} />

      <div>
        <p className="mb-2 text-sm text-[#9A7D68]">
          Your reflection for today
        </p>

        <textarea
          name="responseText"
          rows={9}
          required
          maxLength={5000}
          defaultValue={responseText}
          readOnly={!isEditing}
          className={`w-full rounded-[22px] bg-[#F6EEE3] px-5 py-4 text-[16px] leading-8 text-[#5F4636] placeholder:text-[#B19783] outline-none transition ${
            isEditing
              ? "focus:ring-2 focus:ring-[#E8B59A]"
              : "cursor-default"
          }`}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[#9A7D68]">
          {isEditing
            ? "Make any changes you need. The maximum character limit is 5000."
            : "Saved for today. You can still edit it until tomorrow’s question arrives."}
        </p>

        {isEditing ? (
          <button
            type="submit"
            className="rounded-full bg-[#D88B6A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C97857]"
          >
            Update
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-full bg-[#D88B6A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C97857]"
          >
            Edit
          </button>
        )}
      </div>
    </form>
  );
}*/

/*"use client";

import { useState } from "react";
import { updateResponse } from "./actions";

type EditableReflectionFormProps = {
  deliveryId: number;
  responseText: string;
};

export default function EditableReflectionForm({
  deliveryId,
  responseText,
}: EditableReflectionFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing) {
    return (
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-sm text-[#9A7D68]">
            Your reflection for today
          </p>

          <div className="w-full whitespace-pre-wrap rounded-[22px] bg-[#F6EEE3] px-5 py-4 text-[16px] leading-8 text-[#5F4636]">
            {responseText}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-[#9A7D68]">
            Saved for today. You can still edit it until tomorrow.
          </p>

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-full bg-[#D88B6A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C97857]"
          >
            Edit
          </button>
        </div>
      </div>
    );
  }

  return (
    <form action={updateResponse} className="space-y-5">
      <input type="hidden" name="deliveryId" value={deliveryId} />

      <div>
        <p className="mb-2 text-sm text-[#9A7D68]">
          Edit your reflection
        </p>

        <textarea
          name="responseText"
          rows={9}
          required
          maxLength={5000}
          defaultValue={responseText}
          autoFocus
          className="w-full rounded-[22px] bg-[#F6EEE3] px-5 py-4 text-[16px] leading-8 text-[#5F4636] placeholder:text-[#B19783] outline-none transition focus:ring-2 focus:ring-[#E8B59A]"
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[#9A7D68]">
          Make changes and save. The maximum character limit is 5000.
        </p>

        <button
          type="submit"
          className="rounded-full bg-[#D88B6A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C97857]"
        >
          Update
        </button>
      </div>
    </form>
  );
}*/

"use client";

import { useState, useTransition } from "react";
import { updateResponse } from "./actions";

type EditableReflectionFormProps = {
  deliveryId: number;
  responseText: string;
};

export default function EditableReflectionForm({
  deliveryId,
  responseText,
}: EditableReflectionFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [savedText, setSavedText] = useState(responseText);
  const [isPending, startTransition] = useTransition();

  function handleUpdate(formData: FormData) {
    const newResponseText = formData.get("responseText");

    if (typeof newResponseText !== "string") {
      return;
    }

    startTransition(async () => {
      await updateResponse(formData);
      setSavedText(newResponseText.trim());
      setIsEditing(false);
    });
  }

  if (!isEditing) {
    return (
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-sm text-[#9A7D68]">
            Your reflection
          </p>

          <div className="w-full whitespace-pre-wrap rounded-[22px] bg-[#F6EEE3] px-5 py-4 text-[16px] leading-8 text-[#5F4636]">
            {savedText}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-[#9A7D68]">
            Saved for today. You can still edit it until the next question arrives.
          </p>

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-full bg-[#D88B6A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C97857]"
          >
            Edit
          </button>
        </div>
      </div>
    );
  }

  return (
    <form action={handleUpdate} className="space-y-5">
      <input type="hidden" name="deliveryId" value={deliveryId} />

      <div>
        <p className="mb-2 text-sm text-[#9A7D68]">Edit your reflection</p>

        <textarea
          name="responseText"
          rows={9}
          required
          maxLength={5000}
          defaultValue={savedText}
          autoFocus
          className="w-full rounded-[22px] bg-[#F6EEE3] px-5 py-4 text-[16px] leading-8 text-[#5F4636] placeholder:text-[#B19783] outline-none transition focus:ring-2 focus:ring-[#E8B59A]"
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[#9A7D68]">
          Make changes and save. The maximum character limit is 5000.
        </p>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-[#D88B6A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C97857] disabled:opacity-70"
        >
          {isPending ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
}