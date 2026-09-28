/**
 * Branded intro, shown once per browser session on the first page load.
 * Pure CSS (see globals.css → "Intro loader"): it paints with the HTML, never waits
 * for JavaScript, is click-through, and removes itself after ~1.7s.
 * The inline script in <head> adds `.intro-seen` on later loads so it never replays.
 */
export function IntroLoader() {
  return (
    <div className="clf-loader" data-loader aria-hidden="true">
      <div className="clf-loader__panel clf-loader__panel--l" />
      <div className="clf-loader__panel clf-loader__panel--r" />
      <div className="clf-loader__seam" />
      <div className="clf-loader__logo">
        {/* Original CLF artwork, untouched. Plain <img>: must render before hydration. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/clf-monogram-sm.webp" alt="" width={236} height={285} decoding="sync" />
        <span className="clf-loader__sheen" />
      </div>
    </div>
  );
}

/** Runs before first paint: skip the intro if it already played this session. */
export const introScript = `try{var d=document.documentElement;if(sessionStorage.getItem('clf-intro')){d.classList.add('intro-seen')}else{sessionStorage.setItem('clf-intro','1')}}catch(e){document.documentElement.classList.add('intro-seen')}`;
