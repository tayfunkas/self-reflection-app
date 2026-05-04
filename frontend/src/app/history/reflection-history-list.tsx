/*"use client";

import { useState } from "react";

type HistoryItem = {
  id: number;
  deliveryId: number;
  questionId: number;
  submittedAt: Date | string;
  responseText: string;
  question: {
    text: string;
    category: string;
  };
};

function formatDate(date: Date | string) {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsedDate);
}

function formatTime(date: Date | string) {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);
}

function truncateText(text: string, maxLength = 240) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

export default function ReflectionHistoryList({
  items,
}: {
  items: HistoryItem[];
}) {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  function toggleItem(id: number) {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isOpen = !!openItems[item.id];

        return (
          <article
            key={item.id}
            className="rounded-2xl border border-[#E8D9CC] bg-[#FFFDFC] px-5 py-5 transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-[#9A7D68]">
                    {formatDate(item.submittedAt)} at {formatTime(item.submittedAt)}
                  </p>

                  <span className="rounded-full bg-[#F5ECE3] px-3 py-1 text-xs text-[#8B6B57]">
                    {item.question.category}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-medium leading-7 text-[#6A4F3D]">
                  {item.question.text}
                </h3>

                <p className="mt-3 whitespace-pre-wrap text-[15px] leading-7 text-[#705847]">
                  {isOpen
                    ? item.responseText
                    : truncateText(item.responseText)}
                </p>

                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="mt-4 inline-flex items-center gap-2 text-sm text-[#8B6B57] underline underline-offset-4 transition hover:text-[#6A4F3D]"
                  aria-expanded={isOpen}
                  aria-controls={`reflection-content-${item.id}`}
                >
                  {isOpen ? "Collapse reflection" : "Read full reflection"}

                  <span
                    className={`inline-block transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ˅
                  </span>
                </button>
              </div>
            </div>

            <div id={`reflection-content-${item.id}`} className="sr-only">
              {isOpen ? "Expanded reflection content" : "Collapsed reflection content"}
            </div>
          </article>
        );
      })}
    </div>
  );
}*/

/*"use client";

import { useState } from "react";

type HistoryItem = {
  id: number;
  deliveryId: number;
  questionId: number;
  submittedAt: Date | string;
  responseText: string;
  question: {
    text: string;
    category: string;
  };
};

function formatDate(date: Date | string) {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsedDate);
}

function formatTime(date: Date | string) {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);
}

function truncateText(text: string, maxLength = 240) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

export default function ReflectionHistoryList({
  items,
}: {
  items: HistoryItem[];
}) {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  function toggleItem(id: number) {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isOpen = !!openItems[item.id];
        const isConfirmingDelete = confirmDeleteId === item.id;

        return (
          <article
            key={item.id}
            className="rounded-2xl border border-[#E8D9CC] bg-[#FFFDFC] px-5 py-5 transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-[#9A7D68]">
                    {formatDate(item.submittedAt)} at{" "}
                    {formatTime(item.submittedAt)}
                  </p>

                  <span className="rounded-full bg-[#F5ECE3] px-3 py-1 text-xs text-[#8B6B57]">
                    {item.question.category}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-medium leading-7 text-[#6A4F3D]">
                  {item.question.text}
                </h3>

                <p className="mt-3 whitespace-pre-wrap text-[15px] leading-7 text-[#705847]">
                  {isOpen
                    ? item.responseText
                    : truncateText(item.responseText)}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="inline-flex items-center gap-2 text-sm text-[#8B6B57] underline underline-offset-4 transition hover:text-[#6A4F3D]"
                    aria-expanded={isOpen}
                    aria-controls={`reflection-content-${item.id}`}
                  >
                    {isOpen ? "Collapse reflection" : "Read full reflection"}

                    <span
                      className={`inline-block transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ˅
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConfirmDeleteId(item.id)}
                    className="text-sm text-[#A45F4E] underline underline-offset-4 transition hover:text-[#7A3E32]"
                  >
                    Delete reflection
                  </button>
                </div>

                {isConfirmingDelete && (
                  <div className="mt-5 rounded-2xl border border-[#E6C8BA] bg-[#FFF7F3] px-4 py-4">
                    <p className="text-sm font-medium text-[#7A3E32]">
                      Delete this reflection?
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#8A6F5C]">
                      This will permanently remove your answer. This cannot be
                      undone.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="rounded-full border border-[#D8C5B3] px-4 py-2 text-sm text-[#6A4F3D] transition hover:bg-[#F8EFE7]"
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        className="rounded-full bg-[#A45F4E] px-4 py-2 text-sm text-white transition hover:bg-[#7A3E32]"
                      >
                        Delete permanently
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div id={`reflection-content-${item.id}`} className="sr-only">
              {isOpen
                ? "Expanded reflection content"
                : "Collapsed reflection content"}
            </div>
          </article>
        );
      })}
    </div>
  );
}*/

"use client";

import { useState, useTransition } from "react";
import { deleteReflection } from "./actions";

type HistoryItem = {
  id: number;
  deliveryId: number;
  questionId: number;
  submittedAt: Date | string;
  responseText: string;
  question: {
    text: string;
    category: string;
  };
};

function formatDate(date: Date | string) {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsedDate);
}

function formatTime(date: Date | string) {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);
}

function truncateText(text: string, maxLength = 240) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

export default function ReflectionHistoryList({
  items,
}: {
  items: HistoryItem[];
}) {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  function toggleItem(id: number) {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  function handleDelete(responseId: number) {
    startTransition(async () => {
      await deleteReflection(responseId);
      setConfirmDeleteId(null);
    });
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isOpen = !!openItems[item.id];
        const isConfirmingDelete = confirmDeleteId === item.id;

        return (
          <article
            key={item.id}
            className="rounded-2xl border border-[#E8D9CC] bg-[#FFFDFC] px-5 py-5 transition"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-[#9A7D68]">
                  {formatDate(item.submittedAt)} at {formatTime(item.submittedAt)}
                </p>

                <span className="rounded-full bg-[#F5ECE3] px-3 py-1 text-xs text-[#8B6B57]">
                  {item.question.category}
                </span>
              </div>

              <h3 className="mt-3 text-lg font-medium leading-7 text-[#6A4F3D]">
                {item.question.text}
              </h3>

              <p className="mt-3 whitespace-pre-wrap text-[15px] leading-7 text-[#705847]">
                {isOpen ? item.responseText : truncateText(item.responseText)}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="inline-flex items-center gap-2 text-sm text-[#8B6B57] underline underline-offset-4 transition hover:text-[#6A4F3D]"
                  aria-expanded={isOpen}
                  aria-controls={`reflection-content-${item.id}`}
                >
                  {isOpen ? "Collapse reflection" : "Read full reflection"}

                  <span
                    className={`inline-block transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ˅
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setConfirmDeleteId(item.id)}
                  className="text-sm text-[#A45F4E] underline underline-offset-4 transition hover:text-[#7A3E32]"
                >
                  Delete reflection
                </button>
              </div>

              {isConfirmingDelete && (
                <div className="mt-5 rounded-2xl border border-[#E6C8BA] bg-[#FFF7F3] px-4 py-4">
                  <p className="text-sm font-medium text-[#7A3E32]">
                    Delete this reflection?
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#8A6F5C]">
                    This will permanently remove your answer. This cannot be undone.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(null)}
                      className="rounded-full border border-[#D8C5B3] px-4 py-2 text-sm text-[#6A4F3D] transition hover:bg-[#F8EFE7]"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={isPending}
                      className="rounded-full bg-[#A45F4E] px-4 py-2 text-sm text-white transition hover:bg-[#7A3E32] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isPending ? "Deleting..." : "Delete permanently"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div id={`reflection-content-${item.id}`} className="sr-only">
              {isOpen
                ? "Expanded reflection content"
                : "Collapsed reflection content"}
            </div>
          </article>
        );
      })}
    </div>
  );
}