import { Icon } from '../atoms';

/**
 * Base layout for the auth pages (login and cadastro): dark page with
 * decorative chain marks and a centered card split into banner + content.
 * @param {Object} props
 * @param {string} props.bannerSrc - Banner image URL (left column)
 * @param {string} props.bannerAlt - Banner alt text
 * @param {React.ReactNode} props.children - Right column content
 */
export function AuthTemplate({ bannerSrc, bannerAlt, children }) {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-page px-4 py-10">
      <Icon
        name="chain"
        className="pointer-events-none absolute -top-16 -left-16 h-80 w-80 text-[#0B1A1F] md:h-112 md:w-112"
      />
      <Icon
        name="chain"
        className="pointer-events-none absolute -right-16 -bottom-16 h-80 w-80 text-[#0B1A1F] md:h-112 md:w-112"
      />

      <main className="relative grid w-full max-w-100 overflow-hidden rounded-4xl bg-surface md:max-w-220 md:grid-cols-[407px_1fr]">
        {/* bg-page fills the transparent bottom rows of the exported banner PNG */}
        <div className="relative hidden bg-page md:block">
          <img
            src={bannerSrc}
            alt={bannerAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-8 p-8 md:px-12 md:py-14">
          {children}
        </div>
      </main>
    </div>
  );
}
