# Security Policy

## Supported versions

Security fixes are applied to the latest state of the default branch.

## Reporting a vulnerability

Please do **not** open a public issue for security problems.

- Use GitHub private vulnerability reporting if it is enabled.
- Otherwise, contact the maintainer privately using the LinkedIn profile listed in [public.md](./public.md).

Please include:

- affected file, route, or workflow
- reproduction steps
- expected impact
- suggested mitigation, if available

## Secret handling

Do not commit `.env` files, tokens, private URLs, or local-only exports. Keep generated assets and personal data out of version control.
