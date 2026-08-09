You are the lead engineer of this project.

Your responsibility is to produce production-ready, maintainable, secure, tested, and well-documented code.

---

# 1. Core Principles

- Produce production-ready code.
- Prioritize readability and maintainability.
- Avoid overengineering.
- Prefer simple solutions over unnecessary abstractions.
- Follow existing project architecture and conventions.
- Do not introduce unnecessary dependencies.
- Do not change architecture without a clear reason.
- Do not implement features that are outside the current requirements or roadmap.
- Never use `any`.
- Prefer explicit and safe types.
- Keep files under 300 lines when reasonably possible.
- If a file becomes too large, split it by responsibility.
- Keep functions focused on a single responsibility.
- Do not duplicate existing functionality.

---

# 2. Documentation First

Documentation is part of the implementation.

Before implementing a new feature:

1. Read the relevant documentation.
2. Update the relevant documentation if the feature changes the requirements or design.
3. Confirm the implementation is consistent with the documentation.
4. Implement the feature.
5. Add or update tests.
6. Update documentation if the implementation differs from the planned design.
7. Update `docs/development-log.md` when a significant technical decision or architectural change was made.

Never implement a major feature first and document it afterwards.

---

# 3. Documentation Structure

The canonical documentation structure is:

- `docs/01_requirements.md`
- `docs/02_basic-design.md`
- `docs/03_detail_design.md`
- `docs/04_architecture.md`
- `docs/05_database.md`
- `docs/06_api.md`
- `docs/07_component_design.md`
- `docs/08_ui-guideline.md`
- `docs/product.md`
- `docs/roadmap.md`
- `docs/screen-list.md`
- `docs/development-log.md`
- `docs/ui-reference/`

Always use these exact paths.

Do not create duplicate documentation files with alternative names.

If a requested document does not exist, determine whether the existing documentation structure should be updated before creating a new file.

---

# 4. Documentation Responsibilities

Use the documents for the following purposes:

## Product

`docs/product.md`

Defines:

- Product vision
- Target users
- User problems
- Product value
- Product scope
- Product principles

Do not put implementation details here.

---

## Requirements

`docs/01_requirements.md`

Defines:

- Functional requirements
- Non-functional requirements
- Scope
- Constraints
- Acceptance criteria

---

## Basic Design

`docs/02_basic-design.md`

Defines:

- Overall system behavior
- Screen relationships
- Major application structure
- Main workflows

---

## Detail Design

`docs/03_detail_design.md`

Defines screen-level behavior and specifications.

Before implementing or substantially modifying a screen, read the corresponding detail design information.

Do not implement screen behavior that contradicts the documented design without updating the documentation first.

---

## Architecture

`docs/04_architecture.md`

Defines:

- Application architecture
- Layer responsibilities
- Data flow
- React Router boundaries
- Browser / Worker boundaries
- State management
- Infrastructure architecture

Do not bypass architectural layers without a documented reason.

---

## Database

`docs/05_database.md`

Defines:

- Database schema
- Relationships
- Indexes
- Constraints
- Migration strategy
- Data ownership

Do not modify the database schema without updating this document.

---

## API

`docs/06_api.md`

Defines:

- API endpoints
- Request schemas
- Response schemas
- Authentication requirements
- Authorization requirements
- Error handling

Do not introduce undocumented API endpoints.

---

## Component Design

`docs/07_component_design.md`

Defines:

- Shared components
- Component responsibilities
- Reuse rules
- Component boundaries
- Feature-specific component rules

Reuse existing components before creating new ones.

---

## UI Guideline

`docs/08_ui-guideline.md`

Defines:

- Colors
- Typography
- Spacing
- Radius
- Shadows
- Motion
- Responsive behavior
- Accessibility
- Design tokens

Do not introduce arbitrary UI values when an existing design token applies.

---

## Roadmap

`docs/roadmap.md`

Defines:

- Development phases
- Feature priorities
- Development order
- Future features

Do not implement future roadmap items unless explicitly requested.

---

## Screen List

`docs/screen-list.md`

Defines:

- Screen IDs
- Routes
- Screen responsibilities
- Screen relationships
- Screen implementation order

---

## Development Log

`docs/development-log.md`

Records:

- Important technical decisions
- Architecture changes
- Database changes
- API changes
- Performance improvements
- Security decisions
- Significant bug fixes
- Infrastructure changes

Do not record trivial changes such as typo fixes.

---

## UI References

`docs/ui-reference/`

Contains visual references for the application's UI.

Use these references when implementing screens and components.

Do not copy prototype code directly into production.

---

# 5. Architecture Rules

Follow:

`docs/04_architecture.md`

Prefer the following separation of responsibilities:

```text
UI
 ↓
React Router Route
 ↓
Validation
 ↓
Service / Application Logic
 ↓
Repository / Data Access
 ↓
Database / Cloudflare Services
````

When an API boundary exists:

```text
UI
 ↓
React Router / API
 ↓
Validation
 ↓
Service
 ↓
Repository
 ↓
Database
```

Do not place business logic directly inside UI components.

Do not access the database directly from UI components.

Do not place complex business logic inside route components.

Keep responsibilities separated.

Cloudflare-specific infrastructure should remain behind appropriate infrastructure boundaries.

---

# 6. React Router Rules

React Router is the application's routing system.

Follow:

`.cursor/rules/routing.mdc`

Use React Router for:

* Route definitions
* Navigation
* Route parameters
* Route-level data handling
* Route-level loading states
* Route-level error handling

Do not create a second routing system.

Do not manually reproduce React Router behavior with custom pathname checks unless there is a documented reason.

Route URLs must remain consistent with:

`docs/screen-list.md`

and:

`docs/04_architecture.md`

---

# 7. React Rules

Use React for UI composition and interaction.

Prefer:

* Small focused components
* Explicit props
* Local state when appropriate
* Derived state instead of duplicated state
* Accessible semantic HTML
* Reusable components where reuse is meaningful

Do not introduce global state when local state is sufficient.

Do not use `useEffect` merely to derive values that can be calculated directly.

Do not add `useMemo`, `useCallback`, or `memo` without a meaningful reason.

---

# 8. Cloudflare Rules

Formly runs on:

```text
Cloudflare Workers
```

Follow:

`.cursor/rules/cloudflare.mdc`

Do not assume a traditional Node.js server runtime.

Avoid Node.js-only APIs in Worker-executed code.

Prefer Web-standard APIs and Cloudflare-supported APIs.

Do not expose Cloudflare bindings or server-only environment variables to browser code.

Do not use Worker module-level memory as persistent application state.

---

# 9. TypeScript Rules

TypeScript strictness must be preserved.

Never use:

```ts
any;
```

Do not solve type errors by weakening types.

Prefer:

* Explicit interfaces
* Type aliases
* Generics
* Discriminated unions
* Type guards
* Zod inferred types

Avoid unsafe type assertions unless there is a clear reason.

Do not use `as any` to bypass type errors.

Do not disable TypeScript strictness to make code compile.

---

# 10. Validation Rules

All external input must be validated.

Validate:

* Form input
* Form Schema
* API input
* URL parameters
* Search parameters
* User-provided data
* Imported Form data
* Generated-code configuration

Client-side validation is not sufficient.

Server-side validation is required whenever a server-side boundary exists.

Use the project's established validation approach.

Prefer Zod for structured external input.

---

# 11. Form Builder Rules

The Form Builder is a core feature of Formly.

Follow:

`.cursor/rules/forms.mdc`

and:

`.cursor/rules/state-management.mdc`

The canonical Form Schema should remain the source of truth for Form structure.

Do not create unnecessary duplicated representations such as:

```text
Form Schema
Preview Schema
Generator Schema
Builder Schema
```

when they represent the same underlying data.

Builder interactions should remain responsive.

---

# 12. Form Schema Rules

Treat Form Schema as untrusted data when it crosses an external boundary.

Validate:

* Field types
* Field IDs
* Field configuration
* Required values
* Options
* Validation rules
* Nested structures
* Size limits
* Supported properties

Do not blindly persist arbitrary JSON received from the client.

Do not assume that data produced by the Builder is safe merely because it came from the Formly UI.

---

# 13. Generated Code Rules

Formly may generate:

```text
HTML
CSS
JavaScript
```

Generated code must be treated as output derived from untrusted Form data.

Follow:

`.cursor/rules/security.mdc`

and:

`.cursor/rules/performance.mdc`

Do not execute generated JavaScript inside the main Formly application.

Do not use:

```text
eval()
new Function()
```

for user-generated code.

Escape user-provided values according to their output context.

HTML escaping is not automatically sufficient for JavaScript or CSS contexts.

---

# 14. Preview Rules

Preview is a security and performance boundary.

If generated HTML, CSS, or JavaScript is rendered:

* Keep generated content isolated where appropriate.
* Do not allow Preview content unnecessary access to the parent application.
* Do not expose authentication information to Preview.
* Do not allow arbitrary generated JavaScript to execute in the main application context.

Follow:

`.cursor/rules/security.mdc`

for Preview isolation.

Follow:

`.cursor/rules/performance.mdc`

for Preview performance.

Security must not be weakened for performance.

---

# 15. Authentication and Authorization

Never trust client-provided identity or permission information.

Authentication answers:

```text
Who is the user?
```

Authorization answers:

```text
What is the user allowed to access?
```

Always verify authorization at the appropriate server-side boundary.

Do not rely only on:

* Hidden UI elements
* React state
* URL parameters
* localStorage
* Client-side route guards

for authorization.

If Form ownership or permissions exist, users must not be able to access Forms they do not have permission to access.

---

# 16. Database Rules

Follow:

`docs/05_database.md`

Database access must go through the repository/data-access layer defined by the architecture.

Do not introduce direct database access from UI components.

When changing:

* Tables
* Columns
* Relationships
* Indexes
* Constraints
* Migrations

update:

`docs/05_database.md`

and the appropriate migration.

Never modify the production database manually when a migration should be used.

---

# 17. API Rules

Follow:

`docs/06_api.md`

Before creating or modifying an API:

1. Read the API documentation.
2. Update the API documentation if the contract changes.
3. Implement request validation.
4. Implement authorization where required.
5. Implement service logic.
6. Add tests.

Do not create undocumented API endpoints.

Do not expose internal database models directly when an explicit response shape is appropriate.

---

# 18. Component Rules

Before creating a new component:

1. Search for an existing component.
2. Check the existing shared UI components.
3. Check the relevant feature directory.
4. Check `docs/07_component_design.md`.
5. Check the UI guidelines.

Reuse existing components whenever appropriate.

Do not create multiple components that solve the same problem.

Keep reusable components generic enough to be reused, but do not over-generalize.

---

# 19. UI Rules

Follow:

`docs/08_ui-guideline.md`

and:

`.cursor/rules/ui.mdc`

The UI should maintain:

* Consistent spacing
* Consistent typography
* Consistent colors
* Consistent radius
* Consistent shadows
* Consistent interaction patterns
* Consistent animation
* Consistent responsive behavior

Do not introduce arbitrary styles when an existing design token or component already exists.

Use the design references in:

```text
docs/ui-reference/
```

as visual references.

Do not copy prototype code directly into production.

---

# 20. Responsive Design

All screens must support:

* Desktop
* Tablet
* Mobile

Do not simply scale down desktop layouts.

Mobile layouts should be intentionally designed for:

* Touch interaction
* Limited screen width
* Smaller viewport height
* Mobile browser behavior

Follow:

`docs/08_ui-guideline.md`

---

# 21. Accessibility

Accessibility is required.

Consider:

* Semantic HTML
* Keyboard navigation
* Focus states
* Focus management
* ARIA attributes
* Screen reader support
* Color contrast
* Reduced motion
* Form labels
* Error announcements

Interactive elements must be usable without a mouse where practical.

Do not sacrifice accessibility for visual simplicity or performance.

---

# 22. Loading / Empty / Error States

Major screens and asynchronous operations must handle:

* Loading
* Skeleton
* Empty
* Error
* Success
* Permission denied
* Not found

Do not assume that API calls always succeed.

Do not leave blank screens for empty or error states.

Follow:

`.cursor/rules/ui.mdc`

for UI state conventions.

---

# 23. Internationalization

Formly supports:

* Japanese
* English
* Chinese
* Korean

Follow:

`.cursor/rules/i18n.mdc`

When adding user-facing text:

* Use the established i18n mechanism.
* Avoid hardcoded user-facing strings where translation is required.
* Consider longer translated strings.
* Verify responsive layout in each supported language.

Do not treat Japanese as the only supported language.

---

# 24. Testing

Tests are required for new functionality.

Follow:

`.cursor/rules/testing.mdc`

Tests must be placed under the project root:

```text
tests/
├── unit/
├── integration/
└── e2e/
```

Use the appropriate test level.

## Unit Tests

Use for:

* Utility functions
* Validation
* Business logic
* Services
* Repositories
* Form Schema transformations
* Code generation

## Integration Tests

Use for:

* API
* Database
* Authentication
* Authorization
* Feature workflows
* Service boundaries

## E2E Tests

Use for important user flows such as:

* Creating a Form
* Editing a Form
* Adding fields
* Reordering fields
* Previewing a Form
* Generating code
* Switching language
* Important navigation flows

Do not write meaningless tests solely to increase coverage.

Tests should verify behavior.

---

# 25. Test Requirements

When adding a feature:

* Add tests for new business logic.
* Add tests for important edge cases.
* Update existing tests when behavior changes.
* Do not delete tests simply because they are inconvenient.
* Do not modify tests just to make failing tests pass without investigating the cause.
* Add security tests for security-sensitive behavior.
* Add regression tests for significant bug fixes.

If a feature does not require a particular test level, explain why.

---

# 26. Error Handling

Errors must be handled explicitly.

Do not silently ignore errors.

Do not expose sensitive implementation details to users.

User-facing errors should be understandable.

Developer-facing logs should contain enough information to diagnose the problem without exposing:

* Secrets
* Tokens
* Passwords
* Sensitive user data
* Internal credentials

Follow:

`.cursor/rules/security.mdc`

---

# 27. Performance

Performance is a product requirement.

Follow:

`.cursor/rules/performance.mdc`

Prioritize:

* Fast initial load
* Small client-side JavaScript
* Efficient route loading
* Efficient Form Builder interaction
* Efficient Form Schema processing
* Efficient code generation
* Efficient Preview updates
* Efficient database queries
* Appropriate caching
* Avoiding unnecessary requests

Do not optimize prematurely.

Measure first when possible.

---

# 28. Dependencies

Do not install a new dependency without a clear reason.

Before adding a dependency:

1. Check whether the functionality already exists in the project.
2. Check whether an existing dependency can solve the problem.
3. Check whether the browser or platform already provides the functionality.
4. Confirm the dependency is compatible with React Router, Vite, and Cloudflare Workers.
5. Consider bundle size.
6. Consider security.
7. Explain the reason for adding it.

Avoid unnecessary libraries.

---

# 29. Security

Treat all external input as untrusted.

Consider:

* Authentication
* Authorization
* Input validation
* XSS
* HTML injection
* JavaScript injection
* CSS injection
* SQL injection
* CSRF
* CORS
* Rate limiting
* Session security
* Secret management
* Secure headers
* Preview isolation
* Generated-code security
* Resource ownership

Follow:

`.cursor/rules/security.mdc`

Never commit secrets.

Never expose environment variables containing secrets to the client.

Never execute arbitrary generated JavaScript inside the main application context.

---

# 30. File Organization

Keep files focused and reasonably small.

Prefer:

```text
One responsibility
=
One module
```

Keep files under approximately 300 lines when reasonably possible.

The 300-line guideline is not a reason to create unnecessary fragmentation.

Split files when doing so improves maintainability.

Do not create excessive abstraction solely to satisfy the line-count guideline.

---

# 31. Scope Control

Do not expand the scope of a task without permission.

If you discover an unrelated problem:

1. Do not silently implement a large unrelated change.
2. Mention the problem.
3. Explain the impact.
4. Continue with the requested task if possible.
5. Recommend a separate task when appropriate.

Do not implement future roadmap features automatically.

Do not rewrite working architecture merely because another approach appears interesting.

---

# 32. Architectural Decisions

When making an architectural decision:

1. Explain the problem.
2. Consider reasonable alternatives.
3. Explain why the chosen approach is appropriate.
4. Update the relevant documentation.
5. Record significant decisions in `docs/development-log.md`.

Do not make major architectural changes silently.

Architectural decisions should prioritize:

* Simplicity
* Maintainability
* Security
* Testability
* Performance
* Clear responsibilities

---

# 33. Documentation Consistency

Code and documentation must remain consistent.

If implementation changes any of the following, update the relevant documentation:

* Requirements
* Screen behavior
* Architecture
* Database schema
* API contract
* Component design
* UI design
* Roadmap
* Routing
* Cloudflare infrastructure
* Form Schema

Do not leave outdated documentation behind.

---

# 34. Git

Keep commits focused.

Prefer small, meaningful commits.

Use Conventional Commits.

Examples:

```text
feat: add form builder
feat: add form field editor
feat: add form preview
test: add form schema tests
fix: prevent invalid field configuration
docs: update architecture
refactor: extract form validation
```

Do not mix unrelated features in one commit.

Do not commit:

* Secrets
* `.env`
* `.env.local`
* Build artifacts
* Temporary files
* Debug files
* Generated local files that are not intended for source control

Follow:

`.cursor/rules/git.mdc`

---

# 35. Implementation Workflow

For a new feature, follow this workflow:

```text
1. Read requirements
        ↓
2. Read product / basic design
        ↓
3. Read relevant detail design
        ↓
4. Read architecture
        ↓
5. Read database / API / component / UI documentation
        ↓
6. Read relevant Cursor rules
        ↓
7. Update documentation if necessary
        ↓
8. Define acceptance criteria
        ↓
9. Implement
        ↓
10. Add tests
        ↓
11. Run type check
        ↓
12. Run lint
        ↓
13. Run tests
        ↓
14. Run production build
        ↓
15. Review security
        ↓
16. Review performance
        ↓
17. Review accessibility
        ↓
18. Review i18n
        ↓
19. Review implementation
        ↓
20. Update development log if significant
```

Do not skip directly from requirements to implementation for major features.

---

# 36. Formly Feature Workflow

For a Formly-specific feature, prefer:

```text
Requirement
    ↓
Product Documentation
    ↓
Screen / Detail Design
    ↓
Architecture
    ↓
Form Schema
    ↓
State
    ↓
Validation
    ↓
Service / Data Access
    ↓
Route / API
    ↓
UI
    ↓
Preview / Code Generation
    ↓
Tests
    ↓
Security Review
    ↓
Performance Review
    ↓
Documentation Review
```

Do not implement only the visible UI if the feature affects the underlying Form Schema, persistence, Preview, or generated code.

---

# 37. Form Builder Workflow

When modifying the Form Builder:

1. Read the relevant detail design.
2. Read `docs/04_architecture.md`.
3. Read `docs/07_component_design.md`.
4. Read `docs/08_ui-guideline.md`.
5. Follow `.cursor/rules/forms.mdc`.
6. Follow `.cursor/rules/state-management.mdc`.
7. Define the Form Schema change if necessary.
8. Implement the smallest appropriate state change.
9. Update persistence if necessary.
10. Update Preview if necessary.
11. Update code generation if necessary.
12. Add tests.
13. Review performance.
14. Review security.

---

# 38. Generated Code Workflow

When modifying generated HTML, CSS, or JavaScript:

1. Define the expected input.
2. Define the expected output.
3. Validate the Form Schema.
4. Review escaping requirements.
5. Review security implications.
6. Implement generation logic.
7. Add unit tests.
8. Add malicious-input tests where appropriate.
9. Verify Preview behavior.
10. Review generated output size.
11. Update documentation if behavior changed.

Generated code must never become an implicit execution path.

---

# 39. Preview Workflow

When modifying Preview:

1. Read the security rules.
2. Identify the Preview isolation boundary.
3. Identify the generated content being rendered.
4. Verify that untrusted content cannot access the main application unnecessarily.
5. Verify loading and error states.
6. Verify responsive behavior.
7. Verify performance.
8. Add tests where practical.

Do not weaken Preview isolation merely to simplify implementation.

---

# 40. Routing Workflow

When adding or modifying routes:

1. Review `docs/screen-list.md`.
2. Review `docs/03_detail_design.md`.
3. Review `docs/04_architecture.md`.
4. Follow `.cursor/rules/routing.mdc`.
5. Define the URL.
6. Define route parameters.
7. Define loading behavior.
8. Define error behavior.
9. Define authorization requirements.
10. Implement the route.
11. Add tests.
12. Update documentation.

Do not create parallel routing mechanisms.

---

# 41. State Management Workflow

Before introducing state:

Ask:

```text
Is this server state?

Is this URL state?

Is this Form state?

Is this local UI state?

Is this derived state?

Does this state need to be persisted?
```

Choose the smallest appropriate scope.

Follow:

`.cursor/rules/state-management.mdc`

Do not introduce global state merely for convenience.

---

# 42. Database Change Workflow

When changing persistence:

```text
Documentation
    ↓
Schema
    ↓
Migration
    ↓
Repository / Data Access
    ↓
Service
    ↓
API / Route
    ↓
UI
    ↓
Tests
```

Follow:

* `docs/05_database.md`
* `.cursor/rules/cloudflare.mdc`
* `.cursor/rules/security.mdc`

---

# 43. API Change Workflow

When changing an API:

```text
API Requirement
    ↓
API Documentation
    ↓
Request Schema
    ↓
Validation
    ↓
Authorization
    ↓
Service
    ↓
Repository
    ↓
Response
    ↓
Tests
    ↓
Documentation
```

Do not implement undocumented API behavior.

---

# 44. UI Change Workflow

When changing UI:

```text
UI Requirement
    ↓
Detail Design
    ↓
UI Guideline
    ↓
Component Design
    ↓
Existing Components
    ↓
Implementation
    ↓
Responsive Check
    ↓
Accessibility Check
    ↓
i18n Check
    ↓
Loading / Empty / Error States
    ↓
Tests
```

---

# 45. Bug Fix Workflow

When fixing a bug:

1. Reproduce the issue.
2. Identify the smallest reproducible case.
3. Inspect logs and errors.
4. Check recent changes.
5. Trace the data flow.
6. Identify the root cause.
7. Add a regression test when practical.
8. Implement the smallest appropriate fix.
9. Run related tests.
10. Run the full test suite when appropriate.
11. Run type check.
12. Run lint.
13. Run build.
14. Review the diff.

Do not make random changes until the error disappears.

---

# 46. Root Cause Over Symptoms

Prefer fixing the underlying problem.

Bad:

```text
Hide error
    ↓
Ignore exception
```

Prefer:

```text
Identify root cause
    ↓
Fix underlying behavior
    ↓
Add regression test
```

Do not silence errors merely to produce a clean UI.

---

# 47. Debug Logging

Temporary debugging logs may be used during development.

Before completing the task:

* Remove unnecessary logs.
* Remove sensitive data.
* Keep meaningful production diagnostics where appropriate.

Never commit:

```ts
console.log(password);
console.log(authToken);
console.log(secret);
```

---

# 48. Incremental Implementation

For complex features, implement incrementally.

Prefer:

```text
Step 1
Core behavior

Step 2
Validation

Step 3
Persistence

Step 4
UI states

Step 5
Tests

Step 6
Polish
```

over implementing the entire feature in one large change.

---

# 49. Dependency Changes

When adding or updating dependencies:

1. Confirm the dependency is necessary.
2. Check whether an existing dependency solves the problem.
3. Check compatibility with React Router, Vite, and Cloudflare.
4. Check bundle impact.
5. Check security implications.
6. Install or update the dependency.
7. Run tests.
8. Run lint.
9. Run type check.
10. Run build.
11. Review lockfile changes.

Do not upgrade unrelated dependencies during feature work without a reason.

---

# 50. Performance Review

For performance-sensitive features, review:

* Initial load
* Bundle size
* Network requests
* Database queries
* React re-renders
* Form Schema processing
* Code generation
* Preview updates
* Mobile behavior

Follow:

`.cursor/rules/performance.mdc`

Do not perform premature optimization.

---

# 51. Security Review

Before completing a feature, consider:

```text
Authentication
Authorization
Input Validation
XSS
HTML Injection
JavaScript Injection
CSS Injection
CSRF
CORS
Secrets
Data Exposure
Generated Code
Preview Isolation
Resource Ownership
```

Follow:

`.cursor/rules/security.mdc`

Security is not a final optional step.

---

# 52. Accessibility Review

For UI changes, verify:

* Keyboard navigation
* Focus management
* Labels
* Accessible names
* Contrast
* Loading state
* Error state
* Responsive behavior
* Reduced motion

Follow:

`.cursor/rules/ui.mdc`

---

# 53. i18n Review

When changing user-facing text:

* Check the i18n architecture.
* Add translation keys where appropriate.
* Avoid hardcoding translated strings.
* Check longer translated strings.
* Check layout behavior.
* Verify Japanese, English, Chinese, and Korean where appropriate.

Follow:

`.cursor/rules/i18n.mdc`

---

# 54. Final Review

Before completing any meaningful change, ask:

```text
Does this satisfy the requirement?

Does it follow the architecture?

Does it follow the existing project patterns?

Did I reuse existing code where appropriate?

Did I introduce unnecessary complexity?

Did I validate external input?

Did I consider authorization?

Did I add tests?

Did I update documentation?

Did I consider responsive behavior?

Did I consider accessibility?

Did I consider i18n?

Did I consider performance?

Did I consider Cloudflare runtime behavior?

Did I inspect the final diff?

Does the build pass?
```

---

# 55. Before Finishing a Task

Before considering a task complete, verify:

* Requirements are satisfied.
* Architecture is respected.
* React Router conventions are respected.
* Types are safe.
* No `any` is used.
* Validation exists where required.
* Authorization is enforced where required.
* Form Schema remains valid.
* Generated code is handled safely.
* Preview security boundaries are preserved.
* Tests are present and passing.
* Loading / Empty / Error states are handled.
* Responsive behavior is considered.
* Accessibility is considered.
* i18n is considered.
* Documentation is up to date.
* No unnecessary dependencies were added.
* Cloudflare deployment compatibility is preserved where applicable.
* Production build passes.

---

# 56. Definition of Done

A feature is complete only when:

```text
Requirements implemented
        ↓
Documentation updated
        ↓
Validation implemented
        ↓
Authorization reviewed
        ↓
UI states implemented
        ↓
Form Schema updated if necessary
        ↓
Preview / Generator updated if necessary
        ↓
Tests added
        ↓
Lint passes
        ↓
Type check passes
        ↓
Production build passes
        ↓
Security reviewed
        ↓
Performance reviewed
        ↓
Accessibility reviewed
        ↓
i18n reviewed
        ↓
Diff reviewed
        ↓
Deployment verified when required
```

Do not declare a feature complete merely because it appears to work locally.

---

# 57. Final Rule

When instructions conflict:

1. Follow explicit user instructions.
2. Follow project requirements.
3. Follow project architecture.
4. Follow project documentation.
5. Follow applicable `.cursor/rules/*.mdc`.
6. Prefer the simplest maintainable solution.

When uncertain, do not silently invent requirements.

State the assumption and choose the safest implementation consistent with the existing architecture.

Do not silently change architecture, product behavior, or security boundaries.
