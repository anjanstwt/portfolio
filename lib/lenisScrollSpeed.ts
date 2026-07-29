// Lenis freezes wheelMultiplier/touchMultiplier inside its internal
// VirtualScroll instance at construction time and never re-reads
// lenis.options afterward, so mutating those options at runtime has no
// effect on actual scroll behavior. This factor is read inside
// LenisProvider's `virtualScroll` hook (which intercepts raw input deltas
// before Lenis processes them) — that's the only point where scroll speed
// can still be influenced dynamically after the instance exists.
export const scrollSpeed = { factor: 1 };
