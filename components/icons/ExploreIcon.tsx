import React from 'react';

const ExploreIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-amber-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9 9 0 100-18 9 9 0 000 18z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v18m9-9H3"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 6.343l-11.314 11.314m0-11.314l11.314 11.314"
    />
  </svg>
);

export default ExploreIcon;
