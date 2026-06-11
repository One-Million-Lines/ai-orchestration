# Contributing

Thanks for your interest in improving AI Orchestration.

## Before you start

- Read [public.md](./public.md).
- Keep docs and examples aligned with the actual section definitions and UI behavior.
- Prefer small, focused pull requests.

## Local setup

```bash
npm install
npm run dev
```

## Development guidelines

- Run `npm run lint` and `npm run build` before opening a PR.
- Keep section IDs, section metadata, and rendered inputs in sync.
- Avoid adding undocumented dependencies or hidden configuration requirements.
- Update `README.md` when setup, scripts, or export behavior changes.

## Pull request checklist

- [ ] The change matches current application behavior
- [ ] Lint and build pass locally
- [ ] No secrets, local env files, or generated artifacts are included
- [ ] Section or export changes are described clearly in the PR
