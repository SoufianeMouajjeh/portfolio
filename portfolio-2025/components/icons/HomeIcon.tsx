import React from 'react';

interface HomeIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function HomeIcon({ className, ...props }: HomeIconProps) {
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
      {/* Background layer - duotone fill */}
      <path
        d="M3.145 6.2L8.395 2.21C8.753 1.938 9.248 1.938 9.605 2.21L14.855 6.2C15.104 6.389 15.25 6.684 15.25 6.996V14.25C15.25 15.355 14.355 16.25 13.25 16.25H4.75C3.645 16.25 2.75 15.355 2.75 14.25V6.996C2.75 6.683 2.896 6.389 3.145 6.2Z"
        fill="currentColor"
        opacity="0.3"
      />
      
      {/* Outline layer */}
      <path
        d="M9 16V12.75"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M3.145 6.2L8.395 2.21C8.753 1.938 9.248 1.938 9.605 2.21L14.855 6.2C15.104 6.389 15.25 6.684 15.25 6.996V14.25C15.25 15.355 14.355 16.25 13.25 16.25H4.75C3.645 16.25 2.75 15.355 2.75 14.25V6.996C2.75 6.683 2.896 6.389 3.145 6.2Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
