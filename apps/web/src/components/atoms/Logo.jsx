import clsx from 'clsx';

// Exported Figma parts and their insets inside the 127x40 logo box.
const PARTS = [
  { src: '/logo/mark-1.svg', inset: 'inset-[35.48%_88.04%_6.09%_0]' },
  { src: '/logo/mark-2.svg', inset: 'inset-[15.11%_78.6%_26.47%_9.43%]' },
  { src: '/logo/wordmark.svg', inset: 'inset-[0_0_0_26.88%]' },
];

/**
 * "code connect" logo, composed from the exported Figma SVG parts.
 * @param {Object} props
 * @param {string} [props.className] - Extra classes (the logo keeps its 127x40 box)
 */
export function Logo({ className }) {
  return (
    <span
      role="img"
      aria-label="code connect"
      className={clsx('relative inline-block h-10 w-[127.258px] shrink-0', className)}
    >
      {PARTS.map(({ src, inset }) => (
        <span key={src} className={clsx('absolute', inset)}>
          <img alt="" src={src} className="absolute inset-0 block size-full max-w-none" />
        </span>
      ))}
    </span>
  );
}
