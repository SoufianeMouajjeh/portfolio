import React from 'react';

interface WorkIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function WorkIcon({ className, ...props }: WorkIconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Background layer - duotone fill (graduation cap top) */}
      <path
        d="M9.45799 2.361L15.79 5.621C16.403 5.937 16.403 6.813 15.79 7.129L9.45799 10.389C9.16999 10.537 8.82899 10.537 8.54199 10.389L2.20999 7.129C1.59699 6.813 1.59699 5.937 2.20999 5.621L8.54199 2.361C8.82999 2.213 9.17099 2.213 9.45799 2.361Z"
        fill="currentColor"
        opacity="0.3"
      />
      
      {/* Outline layer - cap top */}
      <path
        d="M9.45799 2.361L15.79 5.621C16.403 5.937 16.403 6.813 15.79 7.129L9.45799 10.389C9.16999 10.537 8.82899 10.537 8.54199 10.389L2.20999 7.129C1.59699 6.813 1.59699 5.937 2.20999 5.621L8.54199 2.361C8.82999 2.213 9.17099 2.213 9.45799 2.361Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Outline layer - tassel */}
      <path
        d="M16.25 6.375C16.079 7.115 15.932 8.097 15.969 9.25C15.996 10.084 16.113 10.812 16.25 11.406"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Outline layer - base */}
      <path
        d="M4.25 10.75V14C4.25 15.104 6.377 16 9 16C11.623 16 13.75 15.104 13.75 14V10.75"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
