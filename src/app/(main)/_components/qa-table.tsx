"use client";

import { useState } from "react";

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
}

export default function QATable({ qaData }: QATableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate pagination
  const totalPages = Math.ceil(qaData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = qaData.slice(startIndex, endIndex);

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
            Questions & Answers
          </h2>
          <p className="text-gray-400 text-sm">
            Total {qaData.length} questions •{" "}
            {qaData.filter((q) => q.isSolved).length} solved
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-400 text-sm">Solved</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-gray-400 text-sm">Pending</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto self-start mb-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Status
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Question
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Answer
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Origin
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Score
              </th>
              <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                Created
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
                  <div className="flex items-center">
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
                      {item.isSolved ? "Solved" : "Pending"}
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
                      <span className="text-gray-500 italic">
                        No answer yet
                      </span>
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
            Showing {startIndex + 1} to {Math.min(endIndex, qaData.length)} of{" "}
            {qaData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg text-sm bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
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
              Next
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
            No Questions Yet
          </h3>
          <p className="text-gray-400 text-sm">
            Questions and answers will appear here once they are submitted.
          </p>
        </div>
      )}
    </div>
  );
}
