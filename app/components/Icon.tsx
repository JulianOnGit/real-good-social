interface IconProps {
  name: 'venture' | 'tech' | 'partnership' | 'strategy';
  size?: number;
}

// Restrained, abstract line icons echoing the brief's motifs:
// connected points, layered systems, structured fields, pathways.
const paths: Record<IconProps['name'], JSX.Element> = {
  venture: (
    <>
      <circle cx="6" cy="18" r="2.4" />
      <circle cx="12" cy="7" r="2.4" />
      <circle cx="18" cy="15" r="2.4" />
      <path d="M7.6 16.4 10.6 9M13.8 8.4 16.4 13" />
    </>
  ),
  tech: (
    <>
      <rect x="4" y="5" width="16" height="11" rx="1.5" />
      <path d="M4 12h16M9 19h6M12 16v3" />
    </>
  ),
  partnership: (
    <>
      <circle cx="8.5" cy="12" r="4.5" />
      <circle cx="15.5" cy="12" r="4.5" />
    </>
  ),
  strategy: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="M7 16l4-5 3 3 4-7" />
    </>
  ),
};

export default function Icon({ name, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
