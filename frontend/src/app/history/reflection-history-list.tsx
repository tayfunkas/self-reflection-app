"use client";

import { useState } from "react";

type HistoryItem = {
  id: number;
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
}