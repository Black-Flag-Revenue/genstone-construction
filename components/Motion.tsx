/** Arms scroll reveals before first paint, then loads the deferred site script. */
export function MotionScript() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: "if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window)document.documentElement.setAttribute('data-motion','')" }} />
      <script src="/site.js" defer />
    </>
  );
}
