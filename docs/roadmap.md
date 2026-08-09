# Formly Roadmap

## 1. Roadmap Overview

Formly is developed as a lightweight, practical Form Builder that allows users to visually create forms and export clean HTML, CSS, and JavaScript.

The development roadmap prioritizes:

1. A working core product
2. A simple and intuitive Form Builder
3. Accurate Preview
4. High-quality generated code
5. Local persistence without requiring an account
6. Accessibility, responsive design, and internationalization
7. Features that improve practical usability
8. Portfolio and production quality

The current implementation status is:

```text
Not Started
```

All roadmap items are currently unimplemented unless explicitly marked otherwise.

---

# 2. Product Development Strategy

Formly follows a phased development strategy.

```text
Phase 1
Foundation
    ↓
Phase 2
Core Form Builder
    ↓
Phase 3
Preview
    ↓
Phase 4
Code Generator
    ↓
Phase 5
Local Persistence
    ↓
Phase 6
Quality / Accessibility / i18n
    ↓
Phase 7
Import / Export
    ↓
Phase 8
Templates
    ↓
Phase 9
Portfolio / Production Quality
    ↓
Future
Advanced Product Features
```

The phases are ordered by dependency and product value.

Do not implement future phases prematurely when they would complicate the core product.

---

# 3. MVP Definition

The MVP is the smallest version of Formly that provides the core product value.

The MVP consists of:

```text
Form Builder
    ↓
Field Configuration
    ↓
Form Schema
    ↓
Preview
    ↓
HTML / CSS / JavaScript Generation
    ↓
Code Export / Copy
    ↓
LocalStorage
```

The MVP does not require:

- User accounts
- Authentication
- Cloud database
- Cloud form storage
- Form submission hosting
- Submission management
- Team collaboration
- SaaS functionality

The MVP should be usable entirely from the browser.

---

# 4. Phase 1 — Foundation

## Goal

Establish the technical and architectural foundation required to build Formly.

## Scope

- React application structure
- React Router v8
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Cloudflare Workers deployment
- ESLint
- Prettier
- Testing infrastructure
- Project documentation
- Cursor rules
- Basic application layout
- Internationalization foundation

## Tasks

### Application Foundation

- [ ] Confirm React Router v8 configuration
- [ ] Confirm Vite configuration
- [ ] Confirm TypeScript configuration
- [ ] Confirm Tailwind CSS configuration
- [ ] Confirm shadcn/ui integration
- [ ] Confirm ESLint configuration
- [ ] Confirm Prettier configuration

### Development Environment

- [ ] Configure `.vscode/settings.json`
- [ ] Configure `.vscode/extensions.json`
- [ ] Configure `.cursor/rules/`
- [ ] Configure testing tools
- [ ] Configure development scripts

### Cloudflare

- [ ] Confirm Cloudflare Workers development environment
- [ ] Confirm local Worker development
- [ ] Confirm production build
- [ ] Confirm Cloudflare deployment
- [ ] Confirm production application startup

### Documentation

- [ ] Product documentation
- [ ] Requirements documentation
- [ ] Basic design documentation
- [ ] Architecture documentation
- [ ] Screen list
- [ ] UI guideline
- [ ] Component design
- [ ] Development log

## Completion Criteria

Phase 1 is complete when:

- The application runs locally.
- React Router routes work.
- The application builds successfully.
- ESLint passes.
- TypeScript passes.
- Tests can be executed.
- The application can be deployed to Cloudflare Workers.
- The production deployment can be opened successfully.
- Development documentation is consistent with the implementation.

---

# 5. Phase 2 — Core Form Builder

## Goal

Implement the core Form Builder experience.

This phase establishes the central Formly interaction:

```text
Create Form
    ↓
Add Fields
    ↓
Configure Fields
    ↓
Reorder Fields
    ↓
Remove Fields
```

## Scope

- Form Schema
- Form Builder layout
- Field palette
- Field list
- Field selection
- Field configuration
- Field creation
- Field deletion
- Field reordering
- Basic form settings

## Initial Field Types

The initial field types should focus on common web forms.

Potential initial fields include:

- Text
- Email
- Number
- Textarea
- Select
- Radio
- Checkbox
- Submit Button

The final supported list should be defined in:

`docs/01_requirements.md`

## Form Schema

Implement the canonical Form Schema.

The Form Schema should represent:

- Form metadata
- Field IDs
- Field types
- Field order
- Labels
- Placeholders
- Required state
- Options
- Relevant field configuration

The Form Schema should become the source of truth for:

```text
Builder
Preview
Generator
Persistence
```

## Tasks

- [ ] Define Form Schema
- [ ] Define field types
- [ ] Define field configuration types
- [ ] Implement field palette
- [ ] Implement field list
- [ ] Implement field selection
- [ ] Implement field editor
- [ ] Implement add field
- [ ] Implement remove field
- [ ] Implement reorder field
- [ ] Implement field configuration
- [ ] Implement basic form settings
- [ ] Add unit tests for Form Schema
- [ ] Add Builder interaction tests

## Completion Criteria

Phase 2 is complete when a user can:

1. Create a form.
2. Add supported fields.
3. Select a field.
4. Configure a field.
5. Reorder fields.
6. Delete fields.
7. See the Form Schema update correctly.
8. Continue editing without data corruption.

---

# 6. Phase 3 — Preview

## Goal

Allow users to visually verify the form before generating code.

The Preview should be driven by the same Form Schema used by the Builder.

```text
Form Schema
     ↓
   Preview
```

## Scope

- Form Preview
- Field rendering
- Form layout
- Responsive Preview
- Basic interaction
- Validation-related visual behavior
- Preview error handling

## Tasks

- [ ] Implement Preview route/view
- [ ] Render supported field types
- [ ] Render labels
- [ ] Render placeholders
- [ ] Render required indicators
- [ ] Render buttons
- [ ] Implement responsive Preview
- [ ] Implement Preview states
- [ ] Synchronize Builder and Preview
- [ ] Add Preview tests
- [ ] Review Preview security boundary

## Completion Criteria

Phase 3 is complete when:

- Preview accurately reflects the Form Schema.
- Builder changes are reflected in Preview.
- Supported field types render correctly.
- Preview works on desktop.
- Preview works on mobile.
- Preview does not execute untrusted generated code inside the main application context.

---

# 7. Phase 4 — Code Generator

## Goal

Transform the Form Schema into practical frontend code.

```text
Form Schema
     ↓
Generator
     ↓
┌────┼────┐
↓    ↓    ↓
HTML CSS  JS
```

## Scope

- HTML generation
- CSS generation
- JavaScript generation
- Code viewer
- Syntax highlighting where appropriate
- Copy to clipboard
- Code export

## HTML Generator

Generate:

- Semantic form markup
- Labels
- Inputs
- Appropriate field attributes
- Stable IDs
- Accessible relationships

## CSS Generator

Generate:

- Form styles
- Field styles
- Button styles
- Responsive styles
- Configured visual styles

## JavaScript Generator

Generate frontend behavior such as:

- Client-side validation
- Field behavior
- Form-related interactions

Generated JavaScript must remain independent from the Formly application runtime.

## Tasks

- [ ] Design generator architecture
- [ ] Implement HTML generator
- [ ] Implement CSS generator
- [ ] Implement JavaScript generator
- [ ] Implement generated-code viewer
- [ ] Implement copy to clipboard
- [ ] Implement code export
- [ ] Add generator unit tests
- [ ] Add escaping tests
- [ ] Add malicious-input tests
- [ ] Verify generated output against Preview

## Completion Criteria

Phase 4 is complete when:

- A Form Schema can generate HTML.
- A Form Schema can generate CSS.
- A Form Schema can generate JavaScript.
- Generated output is readable.
- Generated output is maintainable.
- Generated output can be copied.
- Generated output can be exported.
- Generated output does not require Formly itself to run.
- Generated output is tested against representative Form Schemas.

---

# 8. Phase 5 — Local Persistence

## Goal

Allow users to continue working on forms without requiring an account.

Formly should use browser LocalStorage for local persistence.

```text
Form Schema
    ↓
LocalStorage
    ↓
Formly
```

## Scope

- Automatic saving
- Loading saved Form
- Form restoration
- New Form
- Reset Form
- LocalStorage error handling

## Tasks

- [ ] Define LocalStorage format
- [ ] Implement persistence layer
- [ ] Implement automatic save
- [ ] Implement form restoration
- [ ] Implement reset
- [ ] Handle invalid LocalStorage data
- [ ] Handle storage quota errors
- [ ] Add persistence tests

## Completion Criteria

Phase 5 is complete when:

- Form data survives page reload.
- Form data can be restored.
- Invalid stored data does not crash the application.
- LocalStorage failures are handled gracefully.
- The application does not require authentication.

---

# 9. Phase 6 — Quality, Accessibility, Responsive Design, and i18n

## Goal

Bring the core product to a production-quality level.

This phase focuses on usability rather than adding major new functionality.

## Scope

### Responsive Design

- [ ] Desktop optimization
- [ ] Tablet optimization
- [ ] Mobile optimization
- [ ] Builder responsive behavior
- [ ] Preview responsive behavior
- [ ] Code viewer responsive behavior

### Accessibility

- [ ] Keyboard navigation
- [ ] Focus management
- [ ] Accessible field labels
- [ ] Accessible buttons
- [ ] Accessible error states
- [ ] Screen reader considerations
- [ ] Color contrast
- [ ] Reduced motion
- [ ] Generated form accessibility

### Internationalization

Support:

- [ ] Japanese
- [ ] English
- [ ] Chinese
- [ ] Korean

Review:

- [ ] Navigation
- [ ] Builder UI
- [ ] Field editor
- [ ] Preview UI
- [ ] Code UI
- [ ] Error messages
- [ ] Empty states
- [ ] Loading states

### UI Quality

- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Success feedback
- [ ] Toast / notification behavior where appropriate
- [ ] Consistent spacing
- [ ] Consistent typography
- [ ] Consistent components
- [ ] Consistent interaction patterns

### Performance

- [ ] Initial load review
- [ ] Bundle size review
- [ ] Builder rendering review
- [ ] Preview rendering review
- [ ] Code generation performance review
- [ ] LocalStorage performance review
- [ ] Mobile performance review

## Completion Criteria

Phase 6 is complete when:

- The application works comfortably on desktop and mobile.
- Core workflows are keyboard accessible.
- Supported languages work correctly.
- Major UI states are implemented.
- Accessibility issues are addressed.
- Performance bottlenecks have been identified and addressed where appropriate.
- The generated forms follow accessibility best practices where practical.

---

# 10. Phase 7 — Form Schema Import / Export

## Goal

Allow users to save and transfer Formly projects independently of browser LocalStorage.

This provides a portable representation of a Formly form.

```text
Form Builder
    ↓
Form Schema
    ↓
Export
    ↓
form.json
```

and:

```text
form.json
    ↓
Import
    ↓
Form Schema
    ↓
Form Builder
```

## Scope

- Form Schema export
- Form Schema import
- JSON validation
- Invalid schema handling
- Versioning strategy
- Import error messages
- Export/download

## Tasks

- [ ] Define export format
- [ ] Define schema version
- [ ] Implement export
- [ ] Implement import
- [ ] Validate imported schema
- [ ] Reject invalid schemas
- [ ] Handle unsupported schema versions
- [ ] Add import/export tests
- [ ] Document the schema format

## Completion Criteria

Phase 7 is complete when:

- A Form can be exported.
- Exported Form data can be imported.
- Imported data produces the same Form Schema.
- Invalid data is rejected safely.
- Schema versions can be identified.
- Import/export behavior is documented.

---

# 11. Phase 8 — Form Templates

## Goal

Make common forms faster to create.

Templates are intentionally outside the MVP.

## Potential Templates

Examples:

- Contact Form
- Inquiry Form
- Reservation Form
- Application Form
- Newsletter Form
- Feedback Form

## Scope

- Template gallery
- Template preview
- Create Form from Template
- Template categories
- Template metadata

## Tasks

- [ ] Define template format
- [ ] Define template metadata
- [ ] Create initial templates
- [ ] Implement template gallery
- [ ] Implement template preview
- [ ] Implement create-from-template
- [ ] Add template tests

## Completion Criteria

Phase 8 is complete when:

- Users can browse templates.
- Users can preview templates.
- Users can create a Form from a template.
- Templates are represented using the canonical Form Schema.
- Templates can be modified normally after creation.

---

# 12. Phase 9 — Portfolio and Production Quality

## Goal

Make Formly a strong portfolio project while maintaining practical product quality.

This phase is particularly important because Formly is intended to demonstrate professional web development capabilities.

## Scope

### Public Presentation

- [ ] Production landing page
- [ ] Clear product explanation
- [ ] Interactive demo
- [ ] Feature overview
- [ ] Technology overview
- [ ] Documentation
- [ ] GitHub project presentation

### SEO

- [ ] Page titles
- [ ] Meta descriptions
- [ ] Open Graph metadata
- [ ] Appropriate headings
- [ ] Semantic page structure
- [ ] Sitemap where appropriate
- [ ] robots.txt where appropriate

### Demo Experience

- [ ] Demo form
- [ ] Example Form Schemas
- [ ] Clear Builder walkthrough
- [ ] Preview demonstration
- [ ] Code generation demonstration

### Generated Code Quality

- [ ] Review generated HTML quality
- [ ] Review generated CSS quality
- [ ] Review generated JavaScript quality
- [ ] Improve readability
- [ ] Reduce unnecessary generated code
- [ ] Improve accessibility
- [ ] Improve responsive behavior

### Performance

- [ ] Lighthouse review
- [ ] Core Web Vitals review
- [ ] Bundle analysis
- [ ] Initial load optimization
- [ ] Mobile optimization

### Accessibility

- [ ] Automated accessibility checks
- [ ] Keyboard-only review
- [ ] Screen reader review where practical
- [ ] Contrast review
- [ ] Generated form accessibility review

### Testing

- [ ] Unit test coverage review
- [ ] Integration test coverage review
- [ ] Critical E2E workflows
- [ ] Form Builder E2E workflow
- [ ] Preview E2E workflow
- [ ] Code generation E2E workflow
- [ ] i18n E2E workflow

### Documentation

- [ ] README
- [ ] Architecture documentation
- [ ] Development documentation
- [ ] Usage documentation
- [ ] Form Schema documentation
- [ ] Generated code documentation

## Completion Criteria

Phase 9 is complete when:

- Formly can be demonstrated publicly.
- The core workflow is polished.
- The project has professional documentation.
- The application is responsive.
- Accessibility has been reviewed.
- Performance has been reviewed.
- Critical user workflows have automated tests.
- Generated code is suitable for demonstration and practical use.
- The GitHub repository clearly communicates the technical quality of the project.

---

# 13. Future — Advanced Product Possibilities

These features are intentionally outside the current product scope.

They may be considered after the core Formly product is mature.

## Cloud Persistence

Potential future capabilities:

- Cloud Form storage
- User accounts
- Authentication
- Cross-device synchronization

Possible technologies may include Cloudflare D1 or other storage solutions.

However, cloud persistence is not currently planned for the core product.

---

## Form Hosting

Potential future capability:

```text
Formly
    ↓
Publish
    ↓
Hosted Form
```

This would allow users to publish forms without integrating generated code into another website.

This is not part of the current product.

---

## Submission Management

Potential future capabilities:

- Form submissions
- Submission dashboard
- Submission history
- Export
- Notifications

This would fundamentally expand Formly from a Form Builder into a hosted form platform.

It should therefore be considered separately from the current product.

---

## Collaboration

Potential future capabilities:

- Team accounts
- Shared Forms
- Permissions
- Comments
- Collaboration

These features are not currently planned.

---

# 14. SaaS Possibility

Formly may eventually evolve into a SaaS product.

A possible future architecture could be:

```text
User
 ↓
Authentication
 ↓
Cloud Form Storage
 ↓
Form Builder
 ↓
Publish
 ↓
Hosted Form
 ↓
Submission Management
```

However, SaaS functionality is intentionally outside the current roadmap.

The current goal is to complete the practical Form Builder product first.

Do not introduce SaaS architecture prematurely.

---

# 15. Priority Rules

When deciding what to implement next, prioritize:

```text
1. Core product functionality
2. User experience
3. Generated code quality
4. Reliability
5. Accessibility
6. Responsive design
7. Internationalization
8. Performance
9. Testing
10. Portfolio presentation
11. Future features
```

Do not prioritize a feature merely because it demonstrates an interesting technology.

A feature should provide meaningful product value.

---

# 16. Scope Control

Formly intentionally avoids unnecessary product expansion.

Do not introduce:

- Authentication
- Cloud databases
- Server-side persistence
- Team management
- Form hosting
- Submission management

until the core Form Builder is complete and there is a clear product reason to do so.

The project should remain lightweight.

---

# 17. Phase Dependencies

The major dependencies are:

```text
Phase 1
Foundation
    ↓
Phase 2
Form Builder
    ↓
Phase 3
Preview
    ↓
Phase 4
Code Generator
    ↓
Phase 5
Local Persistence
    ↓
Phase 6
Quality / Accessibility / i18n
    ↓
Phase 7
Import / Export
    ↓
Phase 8
Templates
    ↓
Phase 9
Portfolio / Production
```

Some tasks may be developed in parallel when there is no dependency conflict.

However, the core product loop should be completed before significant future features are introduced.

---

# 18. Definition of MVP Complete

Formly MVP is complete when a user can:

```text
Open Formly
    ↓
Create Form
    ↓
Add Fields
    ↓
Configure Fields
    ↓
Reorder Fields
    ↓
Preview
    ↓
Generate HTML
    ↓
Generate CSS
    ↓
Generate JavaScript
    ↓
Copy / Export Code
    ↓
Reload Browser
    ↓
Restore Form from LocalStorage
```

without:

- Creating an account
- Logging in
- Using a server-side database
- Depending on a Formly backend

---

# 19. Definition of Product Complete

The practical Formly product is considered complete when the MVP has been expanded with:

```text
MVP
+
Responsive Design
+
Accessibility
+
Internationalization
+
Performance Optimization
+
Import / Export
+
Templates
+
Production Quality
+
Portfolio Presentation
```

The product should remain lightweight and focused.

---

# 20. Roadmap Success Criteria

The roadmap is successful when Formly achieves both goals:

## Product Goal

A user can quickly create a practical web form and obtain usable frontend code.

## Portfolio Goal

A developer reviewing the project can clearly see evidence of:

- React
- React Router v8
- TypeScript
- Vite
- Cloudflare Workers
- Form Schema design
- State management
- Component architecture
- Code generation
- Internationalization
- Accessibility
- Responsive design
- Testing
- Performance engineering
- Documentation

The technology should remain subordinate to the product.

The final result should be a project that is both:

> **Useful enough to use.**

and:

> **Well engineered enough to demonstrate professional development skills.**
