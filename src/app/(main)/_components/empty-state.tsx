"use client";

import React from "react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  actionButton?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function EmptyState({
  icon,
  title = "No data available",
  description = "There are no items to display at the moment.",
  actionButton,
  className = "",
  size = "md",
}: EmptyStateProps) {
  const sizeClasses = {
    sm: {
      container: "py-8",
      iconSize: "w-12 h-12",
      titleSize: "text-lg",
      descSize: "text-sm",
    },
    md: {
      container: "py-12",
      iconSize: "w-16 h-16",
      titleSize: "text-xl",
      descSize: "text-base",
    },
    lg: {
      container: "py-16",
      iconSize: "w-20 h-20",
      titleSize: "text-2xl",
      descSize: "text-lg",
    },
  };

  const defaultIcon = (
    <div
      className={`${sizeClasses[size].iconSize} mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center`}
    >
      <svg
        className="w-8 h-8 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    </div>
  );

  return (
    <div className={`text-center ${sizeClasses[size].container} ${className}`}>
      {icon || defaultIcon}

      <h3
        className={`text-white ${sizeClasses[size].titleSize} font-semibold mb-2`}
      >
        {title}
      </h3>

      <p
        className={`text-gray-400 ${sizeClasses[size].descSize} mb-6 max-w-md mx-auto`}
      >
        {description}
      </p>

      {actionButton && (
        <div className="flex justify-center">{actionButton}</div>
      )}
    </div>
  );
}

// Predefined empty states for common scenarios
export const EmptyTableState = ({
  tableName = "table",
}: {
  tableName?: string;
}) => (
  <EmptyState
    icon={
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
    }
    title={`No ${tableName} found`}
    description={`There are no items in this ${tableName} yet. Items will appear here once they are added.`}
  />
);

export const EmptySearchState = ({
  searchTerm = "",
}: {
  searchTerm?: string;
}) => (
  <EmptyState
    icon={
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    }
    title="No results found"
    description={
      searchTerm
        ? `No results found for "${searchTerm}". Try adjusting your search terms.`
        : "No results match your current filters. Try adjusting your search criteria."
    }
  />
);

export const EmptyQuestionsState = () => (
  <EmptyState
    icon={
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    }
    title="No questions yet"
    description="Questions and answers will appear here once they are submitted by users or the AI system."
  />
);

export const EmptyTasksState = () => (
  <EmptyState
    icon={
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      </div>
    }
    title="No tasks available"
    description="Tasks will be displayed here once they are created and assigned to team members."
  />
);

export const EmptyWorkersState = () => (
  <EmptyState
    icon={
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
    }
    title="No employees found"
    description="Employee records will appear here once they are added to the system."
  />
);

export const EmptyFilesState = () => (
  <EmptyState
    icon={
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </div>
    }
    title="No files uploaded"
    description="Files and documents will be displayed here once they are uploaded to the system."
  />
);
