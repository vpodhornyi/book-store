interface IconProps {
  className?: string;
}

export const Logo = ({ className }: IconProps) => {
  return (
    <div className={`flex items-center gap-2 group ${className}`}>
      <svg
        width="28"
        height="24"
        viewBox="0 0 28 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors duration-300"
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
