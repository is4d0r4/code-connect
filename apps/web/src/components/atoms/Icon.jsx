/**
 * Inline SVG icon set. Uses `currentColor`, so color it with text-* classes.
 * Decorative by default (aria-hidden); pass `title` to expose it to assistive tech.
 * @param {Object} props
 * @param {'arrow-right'|'clipboard'|'login'|'chain'} props.name - Icon to render
 * @param {string} [props.title] - Accessible name; when set, the icon is not hidden
 * @param {string} [props.className] - Size/color classes
 */
export function Icon({ name, title, className = 'h-5 w-5', ...props }) {
  const icon = ICONS[name];
  if (!icon) return null;

  const a11y = title
    ? { role: 'img', 'aria-label': title }
    : { 'aria-hidden': true, focusable: 'false' };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={icon.viewBox}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      data-icon={name}
      {...a11y}
      {...props}
    >
      {icon.content}
    </svg>
  );
}

const ICONS = {
  'arrow-right': {
    viewBox: '0 0 24 24',
    content: (
      <g strokeWidth="2">
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </g>
    ),
  },
  clipboard: {
    viewBox: '0 0 24 24',
    content: (
      <g strokeWidth="2">
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="M9 12h6" />
        <path d="M9 16h6" />
      </g>
    ),
  },
  login: {
    viewBox: '0 0 24 24',
    content: (
      <g strokeWidth="2">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <path d="m10 17 5-5-5-5" />
        <path d="M15 12H3" />
      </g>
    ),
  },
  // Two interlocked rounded links — the "code connect" mark used as background decoration.
  chain: {
    viewBox: '0 0 100 100',
    content: (
      <g strokeWidth="12">
        <path d="M44 22H30a20 20 0 0 0-20 20v8a20 20 0 0 0 20 20h6" />
        <path d="M56 78h14a20 20 0 0 0 20-20v-8a20 20 0 0 0-20-20h-6" />
        <path d="M34 50a16 16 0 0 1 16-16h0a16 16 0 0 1 16 16v0a16 16 0 0 1-16 16h0" />
      </g>
    ),
  },
};
