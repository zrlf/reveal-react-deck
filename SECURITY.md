# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it by:

1. **Do NOT** create a public GitHub issue
2. Email the maintainers or use GitHub's private vulnerability reporting feature
3. Include as much detail as possible:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond as quickly as possible to address the issue.

## Supported Versions

We provide security updates for the latest major version. Older versions may not receive security patches.

| Version | Supported          |
| ------- | ------------------ |
| 0.x.x   | :white_check_mark: |

## Security Best Practices

### For Library Users

1. **Keep dependencies updated**: Regularly update `reveal-react-deck` and its dependencies
2. **Content Security Policy**: Implement proper CSP headers when deploying presentations
3. **Sanitize user input**: If you allow user-generated content in slides, sanitize it properly
4. **HTTPS only**: Always serve presentations over HTTPS in production
5. **Review BibTeX sources**: Only load BibTeX files from trusted sources

### For Contributors

1. **Avoid `innerHTML`**: Use `textContent` or sanitized HTML when manipulating DOM
2. **Validate user input**: Always validate and sanitize external data
3. **Use TypeScript types**: Leverage type safety to prevent runtime errors
4. **Check dependencies**: Run `npm audit` or `pnpm audit` regularly
5. **SSR safety**: Add guards for browser-only APIs (e.g., `window`, `localStorage`)

### Known Considerations

- The library uses `innerHTML` for rendering speaker notes and bibliographies. Ensure these sources are trusted.
- BibTeX parsing may be vulnerable if loading untrusted `.bib` files. Only load from trusted sources.
- localStorage is used for state persistence. This is generally safe but be aware of potential XSS if other scripts have access.

## Security Tools

This repository includes:

- TypeScript for type safety
- ESLint for code quality
- Dependency audit tools

Run security checks:

```bash
# Check for vulnerabilities
pnpm audit

# Update dependencies
pnpm update --latest
```

## Third-Party Dependencies

This project depends on:

- React & React DOM
- Reveal.js
- Tailwind CSS
- Various build tools and utilities

We regularly monitor these dependencies for security updates.
