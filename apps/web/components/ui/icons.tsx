interface IconProps {
  className?: string;
}

export const Logo = ({ className }: IconProps) => {
  return (
    <div className={`flex items-center gap-2 group ${className} hover:text-blue-500`}>
      <svg
        width="20"
        height="18"
        viewBox="0 0 28 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors duration-300 md:h-6 md:w-6"
      >
        <path
          d="M13.75 4.75C13.75 3.68913 14.1714 2.67172 14.9216 1.92157C15.6717 1.17143 16.6891 0.75 17.75 0.75H25.75C26.0152 0.75 26.2696 0.855357 26.4571 1.04289C26.6446 1.23043 26.75 1.48478 26.75 1.75V17.75C26.75 18.0152 26.6446 18.2696 26.4571 18.4571C26.2696 18.6446 26.0152 18.75 25.75 18.75H17.75C16.6891 18.75 15.6717 19.1714 14.9216 19.9216C14.1714 20.6717 13.75 21.6891 13.75 22.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.75 17.75C0.75 18.0152 0.855357 18.2696 1.04289 18.4571C1.23043 18.6446 1.48478 18.75 1.75 18.75H9.75C10.8109 18.75 11.8283 19.1714 12.5784 19.9216C13.3286 20.6717 13.75 21.6891 13.75 22.75V4.75C13.75 3.68913 13.3286 2.67172 12.5784 1.92157C11.8283 1.17143 10.8109 0.75 9.75 0.75H1.75C1.48478 0.75 1.23043 0.855357 1.04289 1.04289C0.855357 1.23043 0.75 1.48478 0.75 1.75V17.75Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="font-unica text-[20px] leading-none uppercase tracking-tight transition-colors duration-300">
        BookStore
      </p>
    </div>
  );
};

export const SunIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M4.93 4.93l1.41 1.41" />
    <path d="M17.66 17.66l1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M6.34 17.66l-1.41 1.41" />
    <path d="M19.07 4.93l-1.41 1.41" />
  </svg>
);

export const MoonIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export const BookMark = ({ className }: IconProps) => (
  <svg
    width="18"
    height="25"
    viewBox="0 0 18 25"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.75 23.75L8.75 18.75L0.75 23.75V1.75C0.75 1.48478 0.855357 1.23043 1.04289 1.04289C1.23043 0.855357 1.48478 0.75 1.75 0.75H15.75C16.0152 0.75 16.2696 0.855357 16.4571 1.04289C16.6446 1.23043 16.75 1.48478 16.75 1.75V23.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const KorbIcon = ({ className }: IconProps) => (
  <svg
    width="29"
    height="25"
    viewBox="0 0 29 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M9.75 22.0625C10.682 22.0625 11.4375 22.818 11.4375 23.75C11.4375 24.682 10.682 25.4375 9.75 25.4375C8.81802 25.4375 8.0625 24.682 8.0625 23.75C8.0625 22.818 8.81802 22.0625 9.75 22.0625Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.125"
    />
    <path
      d="M22.75 22.0625C23.682 22.0625 24.4375 22.818 24.4375 23.75C24.4375 24.682 23.682 25.4375 22.75 25.4375C21.818 25.4375 21.0625 24.682 21.0625 23.75C21.0625 22.818 21.818 22.0625 22.75 22.0625Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.125"
    />
    <path
      d="M5.0375 5.75H27.4625L24.1625 17.3C24.0448 17.7192 23.7926 18.0881 23.4448 18.3501C23.0971 18.612 22.6729 18.7525 22.2375 18.75H10.2625C9.82711 18.7525 9.40293 18.612 9.05515 18.3501C8.70738 18.0881 8.45524 17.7192 8.3375 17.3L3.8125 1.475C3.7527 1.26594 3.6264 1.08207 3.45271 0.951246C3.27903 0.820421 3.06744 0.749771 2.85 0.750001H0.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LinkedinIcon = ({ className }: IconProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M22.75 0.75H1.75C1.19772 0.75 0.75 1.19772 0.75 1.75V22.75C0.75 23.3023 1.19772 23.75 1.75 23.75H22.75C23.3023 23.75 23.75 23.3023 23.75 22.75V1.75C23.75 1.19772 23.3023 0.75 22.75 0.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.25 10.25V18.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.25 10.25V18.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.25 13.75C11.25 12.8217 11.6187 11.9315 12.2751 11.2751C12.9315 10.6187 13.8217 10.25 14.75 10.25C15.6783 10.25 16.5685 10.6187 17.2249 11.2751C17.8813 11.9315 18.25 12.8217 18.25 13.75V18.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.25 5.0625C7.90584 5.0625 8.4375 5.59416 8.4375 6.25C8.4375 6.90584 7.90584 7.4375 7.25 7.4375C6.59416 7.4375 6.0625 6.90584 6.0625 6.25C6.0625 5.59416 6.59416 5.0625 7.25 5.0625Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.125"
    />
  </svg>
);

export const GitHubIcon = ({ className }: IconProps) => (
  <svg
    width="19"
    height="20"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6.25 25.75C6.64443 25.7517 7.03528 25.6752 7.4 25.525C7.76473 25.3748 8.0961 25.1539 8.37501 24.875C8.65391 24.5961 8.87483 24.2647 9.02501 23.9C9.17519 23.5353 9.25165 23.1444 9.25 22.75V16.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.25 25.75C16.8556 25.7517 16.4647 25.6752 16.1 25.525C15.7353 25.3748 15.4039 25.1539 15.125 24.875C14.8461 24.5961 14.6252 24.2647 14.475 23.9C14.3248 23.5353 14.2484 23.1444 14.25 22.75V16.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.75 16.75H16.75C17.1444 16.7484 17.5353 16.8248 17.9 16.975C18.2647 17.1252 18.5961 17.3461 18.875 17.625C19.1539 17.9039 19.3748 18.2353 19.525 18.6C19.6752 18.9647 19.7517 19.3556 19.75 19.75V20.75C19.7483 21.1445 19.8248 21.5353 19.975 21.9C20.1252 22.2648 20.3461 22.5961 20.625 22.875C20.9039 23.1539 21.2353 23.3749 21.6 23.525C21.9647 23.6752 22.3556 23.7517 22.75 23.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.75 16.75H6.75C6.35557 16.7484 5.96472 16.8248 5.6 16.975C5.23527 17.1252 4.9039 17.3461 4.62499 17.625C4.34609 17.9039 4.12517 18.2353 3.97499 18.6C3.82481 18.9647 3.74835 19.3556 3.75 19.75V20.75C3.75165 21.1445 3.67519 21.5353 3.52501 21.9C3.37483 22.2648 3.15391 22.5961 2.87501 22.875C2.5961 23.1539 2.26473 23.3749 1.9 23.525C1.53528 23.6752 1.14443 23.7517 0.75 23.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.725 3.75C9.13752 2.83063 8.32806 2.07394 7.37125 1.54966C6.41443 1.02537 5.34104 0.750374 4.25 0.75C3.76488 1.58972 3.47379 2.52735 3.39809 3.49417C3.32239 4.461 3.46399 5.43251 3.8125 6.3375C3.12901 7.34507 2.75929 8.53252 2.75 9.75V10.75C2.75 12.3413 3.38214 13.8674 4.50736 14.9926C5.63258 16.1179 7.1587 16.75 8.75 16.75H14.75C16.3413 16.75 17.8674 16.1179 18.9926 14.9926C20.1179 13.8674 20.75 12.3413 20.75 10.75V9.75C20.7407 8.53252 20.371 7.34507 19.6875 6.3375C20.036 5.43251 20.1776 4.461 20.1019 3.49417C20.0262 2.52735 19.7351 1.58972 19.25 0.75C18.159 0.750374 17.0856 1.02537 16.1287 1.54966C15.1719 2.07394 14.3625 2.83063 13.775 3.75H9.725Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FigmaIcon = ({ className }: IconProps) => (
  <svg
    width="15"
    height="20"
    viewBox="0 0 19 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M13.5 17.75C15.8472 17.75 17.75 15.8472 17.75 13.5C17.75 11.1528 15.8472 9.25 13.5 9.25C11.1528 9.25 9.25 11.1528 9.25 13.5C9.25 15.8472 11.1528 17.75 13.5 17.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.25 9.25V0.75H5C3.87283 0.75 2.79183 1.19777 1.9948 1.9948C1.19777 2.79183 0.75 3.87283 0.75 5C0.75 6.12717 1.19777 7.20817 1.9948 8.0052C2.79183 8.80223 3.87283 9.25 5 9.25H9.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.25 17.75V9.25H5C3.87283 9.25 2.79183 9.69777 1.9948 10.4948C1.19777 11.2918 0.75 12.3728 0.75 13.5C0.75 14.6272 1.19777 15.7082 1.9948 16.5052C2.79183 17.3022 3.87283 17.75 5 17.75H9.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.25 9.25V0.75H13.5C14.6272 0.75 15.7082 1.19777 16.5052 1.9948C17.3022 2.79183 17.75 3.87283 17.75 5C17.75 6.12717 17.3022 7.20817 16.5052 8.0052C15.7082 8.80223 14.6272 9.25 13.5 9.25H9.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.25 17.75V22C9.25 22.8406 9.00074 23.6623 8.53375 24.3612C8.06675 25.0601 7.40299 25.6048 6.62641 25.9265C5.84982 26.2482 4.99529 26.3323 4.17087 26.1683C3.34645 26.0043 2.58917 25.5996 1.9948 25.0052C1.40042 24.4108 0.995652 23.6536 0.831664 22.8291C0.667677 22.0047 0.751841 21.1502 1.07351 20.3736C1.39519 19.597 1.93992 18.9332 2.63883 18.4663C3.33774 17.9993 4.15943 17.75 5 17.75H9.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
