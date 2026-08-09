# Formly Roadmap

---

# 1. Roadmap Overview

Formly is developed as a lightweight, practical Form Builder that allows users to visually create forms, configure validation and submission behavior, preview the result, and export clean HTML, CSS, and JavaScript.

The development roadmap prioritizes:

1. A working core product
2. A simple and intuitive Form Builder
3. Accurate Preview
4. Form validation
5. Practical form submission
6. High-quality generated code
7. Local persistence without requiring an account
8. Accessibility, responsive design, and internationalization
9. Features that improve practical usability
10. Portfolio and production quality

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
Form Schema Import / Export
    ↓
Phase 8
Form Templates
    ↓
Phase 9
Portfolio / Production Quality
    ↓
Future
Advanced Product Features
```

The phases are ordered by dependency and product value.

Do not implement future phases prematurely when they would complicate the core product.

The core product loop is:

```text
Build
  ↓
Configure
  ↓
Validate
  ↓
Preview
  ↓
Generate
  ↓
Export
  ↓
Submit
```

Form Submission is part of the practical core product.

However, Formly itself does not become a hosted submission platform in the MVP.

---

# 3. MVP Definition

The MVP is the smallest version of Formly that provides the core product value.

The MVP consists of:

```text
Form Builder
    ↓
Field Configuration
    ↓
Form Validation
    ↓
Form Submission Configuration
    ↓
Form Schema
    ↓
Preview
    ↓
Submission Preview
    ↓
HTML / CSS / JavaScript Generation
    ↓
Code Export / Copy
    ↓
LocalStorage
    ↓
Usable Generated Form
```

The MVP should allow a user to:

1. Create a form.
2. Add fields.
3. Configure fields.
4. Configure validation.
5. Configure form submission.
6. Preview the form.
7. Test form interaction.
8. Generate HTML / CSS / JavaScript.
9. Export or copy the generated code.
10. Integrate the generated form into another website.
11. Submit the generated form.

The MVP does not require:

- User accounts
- Authentication
- Cloud database
- Cloud form storage
- Formly Hosted Submission Endpoint
- Submission data storage
- Submission management
- Team collaboration
- SaaS functionality

The MVP should be usable entirely from the browser.

## Important Submission Boundary

Formly supports form submission as part of the generated form.

However:

```text
Formly
    ↓
Build Form
    ↓
Configure Submission
    ↓
Generate Code
    ↓
Export
    ↓
User Website
    ↓
Submit to configured endpoint
```

Formly does not store or manage submitted data in the MVP.

Formly is a Form Builder and Code Generator, not a hosted form submission platform.

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

- [x] Confirm React Router v8 configuration
- [x] Confirm Vite configuration
- [x] Confirm TypeScript configuration
- [x] Confirm Tailwind CSS configuration
- [x] Confirm shadcn/ui integration
- [x] Confirm ESLint configuration
- [x] Confirm Prettier configuration

### Development Environment

- [x] Configure `.vscode/settings.json`
- [x] Configure `.vscode/extensions.json`
- [x] Configure `.cursor/rules/`
- [x] Configure testing tools
- [x] Configure development scripts

### Cloudflare

- [x] Confirm Cloudflare Workers development environment
- [x] Confirm local Worker development
- [x] Confirm production build
- [ ] Confirm Cloudflare deployment
- [ ] Confirm production application startup

Note: Deployment verification requires Cloudflare credentials and is intentionally left unchecked until `pnpm deploy` is run in a configured environment.

### Documentation

- [x] Product documentation
- [x] Requirements documentation
- [x] Basic design documentation
- [x] Architecture documentation
- [x] Screen list
- [x] UI guideline
- [x] Component design
- [x] Development log

Documentation alignment note (2026-08-09):

- MVP Canonical Routes: `/`, `/builder`, `/preview`, `/code`, `/settings`
- Future multi-form routes (`/forms/:formId/...`) are documented but not in MVP scope
- Canonical numbered docs are `05_component_design.md` and `06_ui-guideline.md`
- MVP has no `05_database.md` / `06_api.md`

See `docs/development-log.md`.

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
Configure Validation
    ↓
Configure Submission
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
- Field duplication
- Field reordering
- Basic form settings
- Form validation
- Form submission configuration

## Initial Field Types

The initial field types should focus on common web forms.

The initial supported fields are:

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
- Validation configuration
- Submission configuration
- Relevant field configuration

The Form Schema should become the source of truth for:

```text
Builder
Preview
Generator
Persistence
Submission
```

## Form Validation

The Builder should allow users to configure common validation rules.

Initial validation rules:

- Required
- Min Length
- Max Length
- Min
- Max
- Pattern

Validation configuration should be represented in the Form Schema.

## Form Submission

The Builder should allow users to configure how the generated form is submitted.

Initial submission settings:

- Form Action
- HTTP Method
- Submit Button Label

Supported HTTP methods:

- GET
- POST

Default:

```text
POST
```

The exact submission behavior should be defined in:

`docs/03_detail_design.md`

## Tasks

### Form Schema

- [x] Define Form Schema
- [x] Define Form metadata
- [x] Define field types
- [x] Define field configuration types
- [x] Define validation configuration
- [x] Define submission configuration
- [x] Define Schema version

### Builder

- [x] Implement field palette
- [x] Implement field list
- [x] Implement field selection
- [x] Implement field editor
- [x] Implement add field
- [x] Implement remove field
- [x] Implement duplicate field
- [x] Implement reorder field
- [x] Implement field configuration
- [x] Implement basic form settings

### Validation

- [x] Implement Required configuration
- [x] Implement Min Length configuration
- [x] Implement Max Length configuration
- [x] Implement Min configuration
- [x] Implement Max configuration
- [x] Implement Pattern configuration
- [x] Implement validation configuration UI

### Submission

- [x] Implement Submit Button
- [x] Implement Submit Button Label
- [x] Implement Form Action configuration
- [x] Implement HTTP Method configuration
- [x] Implement Submission Settings UI

### Testing

- [x] Add unit tests for Form Schema
- [x] Add validation tests
- [x] Add submission configuration tests
- [x] Add Builder interaction tests

Note: Field reordering is implemented with accessible Move Up / Move Down controls.
Drag-and-drop can be added later without changing the Form Schema contract.

## Completion Criteria

Phase 2 is complete when a user can:

1. Create a form.
2. Add supported fields.
3. Select a field.
4. Configure a field.
5. Configure validation.
6. Configure submission.
7. Reorder fields.
8. Delete fields.
9. Configure Submit Button.
10. See the Form Schema update correctly.
11. Continue editing without data corruption.

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
- Builder Preview
- Field rendering
- Form layout
- Responsive Preview
- Basic interaction
- Client-side validation behavior
- Submission behavior
- Submission Success State
- Submission Error State
- Preview error handling

## Builder Preview

The Builder should include an integrated Preview capability.

The integrated Preview allows users to verify changes without leaving the Builder.

## Full Preview

The application should also provide a dedicated Preview route.

```text
/preview
```

## Submission Preview

Preview should allow users to verify the form submission flow.

However, Preview must not unintentionally submit test data to an external production endpoint.

Preview should use a safe submission mechanism such as Mock Submission where appropriate.

## Tasks

- [x] Implement Preview route/view
- [x] Implement Builder Preview
- [x] Render supported field types
- [x] Render labels
- [x] Render placeholders
- [x] Render required indicators
- [x] Render buttons
- [x] Render validation states
- [x] Implement responsive Preview
- [x] Implement Preview states
- [x] Implement Submission Preview
- [x] Implement Submission Success State
- [x] Implement Submission Error State
- [x] Synchronize Builder and Preview
- [x] Add Preview tests
- [x] Add validation interaction tests
- [x] Add submission interaction tests
- [x] Review Preview security boundary

## Completion Criteria

Phase 3 is complete when:

- [x] Preview accurately reflects the Form Schema.
- [x] Builder changes are reflected in Preview.
- [x] Supported field types render correctly.
- [x] Validation behavior can be verified.
- [x] Submission behavior can be verified safely.
- [x] Submission Success State can be displayed.
- [x] Submission Error State can be displayed.
- [x] Preview works on desktop.
- [x] Preview works on mobile.
- [x] Preview does not execute untrusted generated code inside the main application context.
- [x] Preview does not unintentionally submit test data to external production endpoints.

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
- Form submission code generation
- Validation code generation

## HTML Generator

Generate:

- Semantic form markup
- `<form>`
- `action`
- `method`
- Labels
- Inputs
- Appropriate field attributes
- Stable IDs
- Accessible relationships
- Submit Button
- Validation attributes where appropriate

## CSS Generator

Generate:

- Form styles
- Field styles
- Button styles
- Responsive styles
- Configured visual styles
- Validation states
- Submission states

## JavaScript Generator

Generate frontend behavior such as:

- Client-side validation
- Field behavior
- Form-related interactions
- Submission handling
- Submission error handling
- Submission success handling

Generated JavaScript must remain independent from the Formly application runtime.

## Form Submission Code Generation

Submission configuration from the Form Schema must be reflected in the generated code.

For standard HTML form submission:

```html
<form action="..." method="POST"></form>
```

The generated code should contain the configured:

- Form Action
- HTTP Method
- Submit Button

If JavaScript-based submission handling is required, the necessary behavior should be generated into the JavaScript output.

## Tasks

### Generator Architecture

- [x] Design generator architecture
- [x] Define generator interfaces
- [x] Define generator output structure

### HTML

- [x] Implement HTML generator
- [x] Generate form element
- [x] Generate action
- [x] Generate method
- [x] Generate fields
- [x] Generate labels
- [x] Generate validation attributes
- [x] Generate Submit Button
- [x] Generate accessible relationships

### CSS

- [x] Implement CSS generator
- [x] Generate form styles
- [x] Generate field styles
- [x] Generate button styles
- [x] Generate responsive styles
- [x] Generate validation states
- [x] Generate submission states

### JavaScript

- [x] Implement JavaScript generator
- [x] Implement client-side validation generation
- [x] Implement submission handling generation
- [x] Implement submission error handling
- [x] Implement submission success handling

### Code Viewer / Export

- [x] Implement generated-code viewer
- [x] Implement syntax highlighting
- [x] Implement copy to clipboard
- [x] Implement code export

### Testing

- [x] Add generator unit tests
- [x] Add validation generation tests
- [x] Add submission generation tests
- [x] Add escaping tests
- [x] Add malicious-input tests
- [x] Verify generated output against Preview

## Completion Criteria

Phase 4 is complete when:

- [x] A Form Schema can generate HTML.
- [x] A Form Schema can generate CSS.
- [x] A Form Schema can generate JavaScript.
- [x] Submission configuration is reflected in generated code.
- [x] Validation configuration is reflected in generated code.
- [x] Generated output is readable.
- [x] Generated output is maintainable.
- [x] Generated output can be copied.
- [x] Generated output can be exported.
- [x] Generated output does not require Formly itself to run.
- [x] Generated output can submit to the configured endpoint.
- [x] Generated output is tested against representative Form Schemas.

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
- Submission configuration survives page reload.
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
- [ ] Submission UI responsive behavior

### Accessibility

- [ ] Keyboard navigation
- [ ] Focus management
- [ ] Accessible field labels
- [ ] Accessible buttons
- [ ] Accessible error states
- [ ] Accessible success states
- [ ] Screen reader considerations
- [ ] Color contrast
- [ ] Reduced motion
- [ ] Generated form accessibility
- [ ] Submission state accessibility

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
- [ ] Validation UI
- [ ] Submission UI
- [ ] Preview UI
- [ ] Code UI
- [ ] Error messages
- [ ] Success messages
- [ ] Empty states
- [ ] Loading states

### UI Quality

- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Success feedback
- [ ] Submission feedback
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
- [ ] Submission Preview performance review
- [ ] Mobile performance review

## Completion Criteria

Phase 6 is complete when:

- The application works comfortably on desktop and mobile.
- Core workflows are keyboard accessible.
- Supported languages work correctly.
- Major UI states are implemented.
- Submission states are accessible.
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

Submission configuration must be included in the exported Form Schema.

## Tasks

- [ ] Define export format
- [ ] Define schema version
- [ ] Define submission schema representation
- [ ] Implement export
- [ ] Implement import
- [ ] Validate imported schema
- [ ] Validate imported submission configuration
- [ ] Reject invalid schemas
- [ ] Handle unsupported schema versions
- [ ] Add import/export tests
- [ ] Document the schema format

## Completion Criteria

Phase 7 is complete when:

- A Form can be exported.
- Exported Form data can be imported.
- Imported data produces the same Form Schema.
- Submission configuration is preserved.
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

Templates must use the canonical Form Schema.

Templates may include:

- Field configuration
- Validation configuration
- Submission configuration
- Presentation configuration

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
- Template submission configuration works correctly.

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
- [ ] Validation demonstration
- [ ] Submission configuration demonstration
- [ ] Preview demonstration
- [ ] Code generation demonstration
- [ ] Generated form submission demonstration

### Generated Code Quality

- [ ] Review generated HTML quality
- [ ] Review generated CSS quality
- [ ] Review generated JavaScript quality
- [ ] Review generated submission code
- [ ] Improve readability
- [ ] Reduce unnecessary generated code
- [ ] Improve accessibility
- [ ] Improve responsive behavior
- [ ] Review validation behavior
- [ ] Review submission behavior

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
- [ ] Generated form validation accessibility review
- [ ] Generated form submission state accessibility review

### Testing

- [ ] Unit test coverage review
- [ ] Integration test coverage review
- [ ] Critical E2E workflows
- [ ] Form Builder E2E workflow
- [ ] Validation E2E workflow
- [ ] Preview E2E workflow
- [ ] Submission E2E workflow
- [ ] Code generation E2E workflow
- [ ] i18n E2E workflow

### Documentation

- [ ] README
- [ ] Architecture documentation
- [ ] Development documentation
- [ ] Usage documentation
- [ ] Form Schema documentation
- [ ] Generated code documentation
- [ ] Submission configuration documentation

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
- Generated forms can be demonstrated submitting successfully.
- The GitHub repository clearly communicates the technical quality of the project.

---

# 13. Future — Advanced Product Possibilities

These features are intentionally outside the current product scope.

They may be considered after the core Formly product is mature.

---

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

## Form Submission Platform

Potential future capability:

```text
Formly
    ↓
Hosted Submission Endpoint
    ↓
Submission Storage
    ↓
Submission Management
```

Potential capabilities:

- Hosted Submission Endpoint
- Submission Data Storage
- Submission Management Dashboard
- Submission History
- Submission Export
- Email Notifications
- Webhook
- Spam Protection

This would fundamentally expand Formly from a Form Builder into a hosted form platform.

It should therefore be considered separately from the current product.

The MVP only requires generated forms to be able to submit to a configured endpoint.

---

## Collaboration

Potential future capabilities:

- Team accounts
- Shared Forms
- Permissions
- Comments
- Collaboration
- Real-time editing

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
3. Form usability
4. Generated code quality
5. Form submission reliability
6. Reliability
7. Accessibility
8. Responsive design
9. Internationalization
10. Performance
11. Testing
12. Portfolio presentation
13. Future features
```

Do not prioritize a feature merely because it demonstrates an interesting technology.

A feature should provide meaningful product value.

Form Submission is considered part of core product functionality.

However, Submission Management is considered a future product expansion.

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
- SaaS functionality

until the core Form Builder is complete and there is a clear product reason to do so.

The project should remain lightweight.

## Important Distinction

The following are part of the current product:

- Form submission configuration
- Form validation
- Generated form submission
- Submission Success State
- Submission Error State

The following are not part of the current product:

- Formly Hosted Submission Endpoint
- Submission Data Storage
- Submission Dashboard
- Submission History
- Email Notifications
- Webhook
- Form hosting

This distinction must be maintained throughout development.

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

The core product loop spans multiple phases:

```text
Phase 2
Build / Configure
    ↓
Phase 3
Validate / Preview
    ↓
Phase 4
Generate / Export
    ↓
Generated Form
    ↓
Submit
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
Configure Validation
    ↓
Configure Submission
    ↓
Reorder Fields
    ↓
Preview
    ↓
Validate Form
    ↓
Test Submission
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
    ↓
Integrate Generated Form
    ↓
Submit Form
```

without:

- Creating an account
- Logging in
- Using a server-side database
- Depending on a Formly backend
- Using Formly-hosted submission infrastructure

The generated form must be able to submit using the configured submission settings.

The MVP does not require Formly to receive or store submitted data.

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

The following are intentionally outside the Product Complete definition:

```text
Authentication
Cloud Database
Form Hosting
Submission Management
SaaS
Collaboration
```

These remain future possibilities.

---

# 20. Roadmap Success Criteria

The roadmap is successful when Formly achieves both goals:

## Product Goal

A user can quickly:

```text
Create a practical web form
        ↓
Configure validation
        ↓
Configure submission
        ↓
Preview it
        ↓
Generate usable frontend code
        ↓
Integrate it into a website
        ↓
Submit the form
```

without requiring a Formly account or Formly backend.

## Portfolio Goal

A developer reviewing the project can clearly see evidence of:

- React
- React Router v8
- TypeScript
- Vite
- Cloudflare Workers
- Form Schema design
- Form Builder architecture
- Form validation
- Form submission architecture
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

> Useful enough to use.

and:

> Well engineered enough to demonstrate professional development skills.
