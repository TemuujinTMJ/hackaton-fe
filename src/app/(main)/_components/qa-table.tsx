"use client";

import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import { useState, useEffect } from "react";

interface QAItem {
  _id: string;
  question_text: string;
  answer_text: string;
  isSolved: boolean;
  origin: string;
  score: number;
  existing_files: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface QATableProps {
  qaData: QAItem[];
  onDataUpdate?: (updatedData: QAItem[]) => void;
}

export default function QATable({ qaData, onDataUpdate }: QATableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<QAItem | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localQaData, setLocalQaData] = useState<QAItem[]>(qaData);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const itemsPerPage = 6;

  // Apply default sorting (latest first) when component mounts or qaData changes
  useEffect(() => {
    const sortedData = [...qaData].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setLocalQaData(sortedData);
  }, [qaData]);

  // Handle status sorting
  const handleStatusSort = (selectedValue: string) => {
    const newSortOrder = selectedValue as "asc" | "desc" | "none";
    setSortOrder(newSortOrder);

    const sortedData = [...localQaData];
    if (newSortOrder === "asc") {
      // Pending first (false), then Solved (true)
      sortedData.sort((a, b) => Number(a.isSolved) - Number(b.isSolved));
    } else if (newSortOrder === "desc") {
      // Solved first (true), then Pending (false)
      sortedData.sort((a, b) => Number(b.isSolved) - Number(a.isSolved));
    } else {
      // Reset to original order (by creation date)
      sortedData.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    setLocalQaData(sortedData);
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Handle opening answer modal
  const handleOpenAnswerModal = (question: QAItem) => {
    setSelectedQuestion(question);
    setAnswerText("");
    setIsModalOpen(true);
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
    setAnswerText("");
    setIsSubmitting(false);
  };

  // Submit answer to API
  const handleSubmitAnswer = async () => {
    if (!selectedQuestion || !answerText.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedQuestion._id,
          answer_text: answerText.trim(),
        }),
      });

      if (response.ok) {
        // Update local data immediately for instant UI update
        const updatedData = localQaData.map((item) =>
          item._id === selectedQuestion._id
            ? { ...item, answer_text: answerText.trim(), isSolved: true }
            : item
        );
        setLocalQaData(updatedData);

        // Call parent update if provided
        if (onDataUpdate) {
          onDataUpdate(updatedData);
        }

        handleCloseModal();
      } else {
        console.error("Failed to submit answer");
        // You can add error handling here
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      // You can add error handling here
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(localQaData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = localQaData.slice(startIndex, endIndex);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-[#101522] rounded-2xl p-6 border border-gray-800 lg:col-span-2 items-start flex flex-col">
      <div className="flex items-center justify-between w-full mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Асуулт & Хариулт
          </h2>
          <p className="text-gray-400 text-sm">
            Нийт {localQaData.length} асуулт •{" "}
            {localQaData.filter((q) => q.isSolved).length} шийдэгдсэн
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Sort Controls */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Эрэмбэлэх:</span>
            <select
              value={sortOrder}
              onChange={(e) => handleStatusSort(e.target.value)}
              className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 text-sm hover:border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
            >
              <option value="none">Шинэ нь эхэнд</option>
              <option value="asc">Хүлээгдэж буй эхэнд</option>
              <option value="desc">Шийдэгдсэн эхэнд</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto self-start mb-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Төлөв
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Асуулт
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Хариулт
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Эх үүсвэр
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Оноо
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Үүсгэсэн
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center text-nowrap">
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        item.isSolved ? "bg-green-500" : "bg-orange-500"
                      }`}
                    />
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.isSolved
                          ? "bg-green-500/20 text-green-400"
                          : "bg-orange-500/20 text-orange-400"
                      }`}
                    >
                      {item.isSolved ? "Шийдэгдсэн" : "Хүлээгдэж буй"}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-white text-sm max-w-xs">
                    <p title={item.question_text}>
                      {truncateText(item.question_text, 60)}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-gray-300 text-sm max-w-xs">
                    {item.answer_text ? (
                      <p title={item.answer_text}>
                        {truncateText(item.answer_text, 80)}
                      </p>
                    ) : (
                      <Button
                        props={{ onClick: () => handleOpenAnswerModal(item) }}
                      >
                        Хариулах
                      </Button>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      item.origin === "ai"
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {item.origin.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="text-gray-300 text-sm">
                    {item.score > 0 ? item.score.toFixed(3) : "-"}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-gray-400 text-sm">
                    {formatDate(item.createdAt)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800 w-full">
          <div className="text-gray-400 text-sm">
            {startIndex + 1}-с {Math.min(endIndex, localQaData.length)} хүртэл{" "}
            {localQaData.length} үр дүнгээс
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg text-sm bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Өмнөх
            </button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      currentPage === pageNum
                        ? "bg-purple-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-lg text-sm bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Дараах
            </button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {qaData.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-white text-lg font-medium mb-2">
            Асуулт одоогоор байхгүй
          </h3>
          <p className="text-gray-400 text-sm">
            Асуулт хариултууд илгээгдсэний дараа энд харагдах болно.
          </p>
        </div>
      )}

      {/* Answer Question Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Асуултанд хариулах"
        primaryButton={{
          label: "Илгээх",
          onClick: handleSubmitAnswer,
          loading: isSubmitting,
        }}
        secondaryButton={{
          label: "Цуцлах",
          onClick: handleCloseModal,
          loading: isSubmitting,
        }}
      >
        <div className="space-y-4">
          {selectedQuestion && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Асуулт:
                </label>
                <div className="p-3 bg-gray-800 rounded-lg text-gray-300 text-sm">
                  {selectedQuestion.question_text}
                </div>
              </div>

              <div>
                <label
                  htmlFor="answer"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Таны хариулт:
                </label>
                <textarea
                  id="answer"
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Хариултаа энд бичнэ үү..."
                />
              </div>

              {/* <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!answerText.trim() || isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {isSubmitting && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  <span>
                    {isSubmitting ? "Submitting..." : "Submit Answer"}
                  </span>
                </button>
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div> */}
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
