"use client";

type ShareQuestionButtonProps = {
  questionText: string;
  shareUrl: string;
};

export default function ShareQuestionButton({
  questionText,
  shareUrl,
}: ShareQuestionButtonProps) {
  async function handleShare() {
    const text = `Today's reflection question:\n\n"${questionText}"\n\nReflect with me on WithinYou.`;

    if (navigator.share) {
      await navigator.share({
        title: "WithinYou Reflection Question",
        text,
        url: shareUrl,
      });
      return;
    }

    await navigator.clipboard.writeText(`${text}\n\n${shareUrl}`);
    alert("Question copied. You can paste it anywhere.");
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="rounded-full border border-[#E8D9CC] px-5 py-3 text-sm font-medium text-[#7A5C49] transition hover:bg-[#F6EEE3]"
    >
      Share this question
    </button>
  );
}