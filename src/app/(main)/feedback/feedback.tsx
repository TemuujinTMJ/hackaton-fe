"use client";
import React from "react";

interface FeedbackProps {
  _id: string;
  categoryId: {
    _id: string;
    categoryName: string;
  }[];
  createdAt: string;
  isSolved: boolean;
  question: string;
  unknown: boolean;
  updatedAt: string;
}

export default function Feedback({
  data,
  cat,
}: {
  data: FeedbackProps[];
  cat: { categoryName: string; _id: string }[];
}) {
  const [selectedCategory, setSelectedCategory] = React.useState(cat[0]?._id);

  const filteredData = data.filter((item) =>
    item.categoryId.find((cat) => cat._id === selectedCategory)
  );
  return (
    <div className="space-y-6 p-6">
      {/* Category Selector */}
      <div className="flex space-x-1 rounded-xl border border-zinc-500 p-1 max-w-fit">
        {(cat || []).map((category) => {
          const isActive = selectedCategory === category._id;
          return (
            <button
              key={category._id}
              className={`
                flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium 
                transition-all duration-200 ease-in-out rounded-lg
                ${
                  isActive
                    ? "bg-[#FFFFFF1A] text-white"
                    : "text-zinc-400 hover:text-white hover:bg-[#FFFFFF0D]"
                }
              `}
              onClick={() => setSelectedCategory(category._id)}
            >
              {category.categoryName}
            </button>
          );
        })}
      </div>

      {/* Feedback Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Асуулт
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Төрөл
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Огноо
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Статус
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A2A]">
            {filteredData.map((feedback, idx) => (
              <tr
                key={feedback._id}
                className={`${
                  idx % 2 === 0 && "bg-[#1C1D2F]"
                } border-b border-transparent hover:border-gray-500`}
              >
                <td className="px-6 py-4 whitespace-pre-wrap">
                  <div className="flex items-center">
                    <span className="text-sm">{feedback.question}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm inline-flex flex-wrap gap-1">
                    {feedback.categoryId.map((cat) => (
                      <div
                        key={cat._id}
                        className="px-2.5 py-0.5 rounded-full bg-gray-800"
                      >
                        {cat.categoryName}
                      </div>
                    ))}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      feedback.isSolved
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {feedback.isSolved ? "Шийдэгдсэн" : "Хүлээгдэж буй"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
