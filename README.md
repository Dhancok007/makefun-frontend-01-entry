# Bounty terminal

A small, framework-free, read-only make.fun competition browser. Hash routes
provide the bounty board, competition details, leaderboard, and public profiles.
The board supports search, sorting and an open-only filter; countdowns share a
single timer. API responses use ETag revalidation and concurrent request deduplication.

Serve with `node serve.ts`, then open http://127.0.0.1:8080.
Any static server with `app/` as its root also works. No build step is required.
Run `MAKEFUN_OUTPUT_DIR=/tmp/makefun-output node main.ts` to package the app.

## Validation status

Live API contract was retrieved and mappings were verified against the public
OpenAPI and endpoint responses. The three captured 1280x720 screenshots are
live renders against that API. Packaging is deterministic: two dossier runs
produced byte-identical output; the final dossier is 449825 bytes.

Offline checks passed: all app modules parse; money formatting, HTML escaping,
deadline-based closure, countdown expiry, request deduplication and ETag/304
handling. The local server also could not bind (`listen EPERM`).
A review revision removed a broken generic rankings link, added per-bounty
leaderboard links, and added keyboard focus and reduced-motion styling.
