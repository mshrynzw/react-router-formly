# Formly Product

## 1. Product Overview

### Product Name

Formly

### Tagline

> Build forms visually. Export clean code.

### Product Concept

Formly is a browser-based Form Builder that allows users to visually design forms without requiring advanced coding knowledge.

Users can:

1. Create a form visually.
2. Add and configure form fields.
3. Preview the form.
4. Generate clean HTML, CSS, and JavaScript.
5. Copy or export the generated code.
6. Integrate the generated code into their own website.

Formly does not provide a hosted form submission service.

The primary purpose of Formly is to help users create the structure, appearance, and client-side behavior of a form and obtain code that can be integrated into an existing website.

---

# 2. Product Vision

Formly aims to make form creation simpler for people who need a practical web form but do not want to manually write the HTML, CSS, and JavaScript required to build one.

The core experience is:

```text
Design
  ↓
Configure
  ↓
Preview
  ↓
Export
  ↓
Use on a website
```

````

The product should make this process feel simple and visual.

---

# 3. Core Value Proposition

The primary value of Formly is:

> Users can visually design a form in the browser and generate clean HTML, CSS, and JavaScript that can be used directly on their own website.

Formly reduces the need to manually implement:

- Form structure
- Form field markup
- Basic styling
- Client-side behavior
- Validation-related frontend code

The user should be able to focus on **what the form should look like and contain**, rather than how to manually implement it.

---

# 4. Target Users

Formly is primarily intended for:

- Web designers
- Web developers
- Freelance web creators
- Small web production teams
- Small business owners
- People creating simple websites
- Users who need simple forms without building a form system from scratch

The target user does not necessarily need to be an experienced frontend developer.

However, generated code is intended to be useful to people who can integrate HTML, CSS, and JavaScript into an existing website.

---

# 5. Primary User Problem

Creating a simple form for a website often requires several separate tasks:

```text
HTML
  +
CSS
  +
JavaScript
  +
Validation
  +
Responsive Design
```

For a relatively simple contact or inquiry form, this can require unnecessary implementation effort.

Formly addresses this problem by providing a visual interface for constructing the form and generating the corresponding frontend code.

---

# 6. Product Goals

Formly should:

- Make basic form creation visually understandable.
- Reduce repetitive frontend implementation work.
- Provide a fast Form Builder experience.
- Provide an accurate Preview.
- Generate readable HTML.
- Generate maintainable CSS.
- Generate understandable JavaScript.
- Support responsive form designs.
- Work without requiring user registration.
- Allow users to continue working with forms saved locally in their browser.
- Provide a practical tool that can actually be used for small web projects.
- Demonstrate strong frontend engineering practices as a portfolio project.

---

# 7. Product Non-Goals

Formly does not aim to become a complete hosted form-management platform.

The current product does not provide:

- User accounts
- Authentication
- Cloud-based Form storage
- Hosted form submission processing
- Submission management
- Email delivery
- CRM integration
- Database-backed form responses
- Server-side form submission infrastructure
- Multi-user collaboration
- Team management

These may be considered separately in the future, but they are not part of the current product scope.

---

# 8. Core User Flow

The primary user flow is:

```text
Open Formly
    ↓
Create a Form
    ↓
Add Fields
    ↓
Configure Fields
    ↓
Customize Form
    ↓
Preview
    ↓
Review Generated Code
    ↓
Export / Copy Code
    ↓
Integrate into Existing Website
```

The flow should not require:

- Registration
- Login
- Account creation
- Server-side project creation

---

# 9. Form Builder

The Form Builder is the core feature of Formly.

Users should be able to construct a form visually.

The Builder should provide an intuitive way to:

- Add fields
- Remove fields
- Select fields
- Reorder fields
- Configure field properties
- Configure validation-related properties
- Configure field labels
- Configure placeholders
- Configure options where applicable
- Preview the resulting form

The exact field types and configuration options are defined in the requirements and detailed design documentation.

---

# 10. Form Schema

Formly uses a structured Form Schema as the conceptual representation of a form.

The Form Schema represents information such as:

- Form structure
- Field types
- Field order
- Field IDs
- Labels
- Placeholders
- Required state
- Options
- Validation-related configuration
- Presentation-related configuration

The Form Schema should act as the canonical representation of the form.

Conceptually:

```text
Form Schema
     ↓
 ┌───┴────┐
 ↓        ↓
Preview  Generator
          ↓
    HTML / CSS / JS
```

The Builder should modify the Form Schema rather than maintaining independent representations of the same form.

---

# 11. Preview

Formly provides a Preview experience so users can verify the form before exporting it.

The Preview should represent the form as closely as practical to the generated output.

The Preview allows users to verify:

- Layout
- Field appearance
- Labels
- Input types
- Required indicators
- Buttons
- Responsive behavior
- General visual appearance

Preview behavior should remain consistent with the generated code.

---

# 12. Code Generation

Formly generates frontend code from the Form Schema.

The primary output formats are:

```text
HTML
CSS
JavaScript
```

The generated code should be:

- Readable
- Understandable
- Practical
- Maintainable
- Appropriate for direct integration into a website

The generated output should avoid unnecessary complexity.

---

# 13. HTML Output

The HTML generator should produce semantic and practical form markup.

Generated HTML should prioritize:

- Semantic elements
- Appropriate form controls
- Labels
- Accessible relationships
- Stable field identifiers
- Appropriate attributes
- Maintainable structure

Generated HTML should not contain unnecessary framework-specific dependencies.

The output should be usable independently of Formly.

---

# 14. CSS Output

The CSS generator should produce styles required to reproduce the configured form appearance.

Form appearance is stored as validated design tokens on the Form Schema (colors, radius, typography, spacing, shadow, optional Liquid Glass preset, optional page backdrop). Users configure color and layout tokens in Builder Design settings, and Liquid Glass / page backdrop from the Builder Preview background dialog. Preview and generated code both derive from the same tokens. Liquid Glass is off by default. Page backdrop images are allowlisted assets and can be shown or hidden independently of the glass preset.

Generated CSS should prioritize:

- Readability
- Maintainability
- Responsive behavior
- Clear selectors
- Minimal unnecessary rules

The default output is standalone raw CSS. Users may instead choose Tailwind CSS utility classes on the generated HTML. Tailwind mode still keeps semantic `formly-*` classes for generated JavaScript. Combined HTML in Tailwind mode may include the Tailwind Play CDN so a downloaded file is previewable; production sites should use their own Tailwind build.

The generated CSS should not require Formly itself to function.

Arbitrary user CSS is not accepted. Only allowlisted tokens (hex colors, numeric radii, font presets, Liquid Glass IDs, backdrop IDs) are persisted.

---

# 15. JavaScript Output

The JavaScript generator produces client-side behavior required by the generated form.

Depending on the configured form features, this may include:

- Client-side validation
- Interaction behavior
- Field-related behavior
- Form-related frontend logic

Generated JavaScript should remain understandable and should not depend unnecessarily on Formly's runtime.

Formly should not require the user to install a framework or package simply to use the generated code.

---

# 16. Code Export

Users should be able to obtain the generated code after creating their form.

The primary goal is to make the output easy to integrate into an existing website.

The product may provide:

- Code viewing
- Copy to clipboard
- Code export

The exact interaction is defined by the screen and detailed design documentation.

---

# 17. Local Storage

Formly does not require user accounts for the current product.

Form data should be stored locally in the browser using LocalStorage.

Conceptually:

```text
Form Builder
    ↓
Form Schema
    ↓
LocalStorage
```

This allows users to continue working with forms without creating an account.

LocalStorage is considered local application state and must not be treated as secure server-side storage.

---

# 18. No Login Requirement

The current version of Formly does not require authentication.

A user should be able to:

```text
Open Formly
    ↓
Create Form
    ↓
Edit Form
    ↓
Save locally
    ↓
Return later
```

without creating an account.

This reduces friction and supports the product's goal of providing a lightweight utility.

---

# 19. Browser-First Product

Formly is designed primarily as a browser-based application.

The user should not need to:

- Install desktop software
- Create an account
- Configure a backend
- Set up a database
- Install a development environment

to use the core Form Builder.

The core workflow should be possible directly in the browser.

---

# 20. Internationalization

Formly is designed with internationalization in mind.

The primary language is:

```text
Japanese
```

The application should also support:

```text
English
Chinese
Korean
```

Users should be able to switch the application language.

Internationalization applies to the Formly application UI.

Generated form content may contain user-defined text and should not automatically be translated by Formly unless explicitly supported by a future feature.

---

# 21. Responsive Design

Formly must support:

- Desktop
- Tablet
- Mobile

The Builder and Preview should remain usable across supported viewport sizes.

Responsive behavior should be considered part of the product rather than a final implementation detail.

---

# 22. Accessibility

Accessibility is part of the Formly product experience.

The application should support:

- Keyboard navigation
- Accessible labels
- Focus management
- Appropriate semantic HTML
- Accessible error states
- Sufficient color contrast
- Reduced motion preferences

Generated forms should also prioritize accessible markup where practical.

---

# 23. Performance Goals

Formly should feel fast and responsive.

Particular attention should be given to:

- Initial application loading
- Route navigation
- Form Builder interactions
- Field editing
- Field reordering
- Preview updates
- Code generation
- LocalStorage operations
- Mobile performance

The Builder should not become noticeably sluggish as the number of fields increases.

---

# 24. Security Goals

Formly must treat user-provided Form Schema data as untrusted input.

Particular attention should be given to:

- Generated HTML
- Generated CSS
- Generated JavaScript
- Preview rendering
- User-provided field values
- LocalStorage data
- Clipboard operations

Generated code must not be executed inside the main Formly application context merely because it was generated by Formly.

Security requirements are defined in:

`.cursor/rules/security.mdc`

---

# 25. Technical Product Positioning

Formly is intentionally designed as a practical frontend-focused application.

The project demonstrates:

- React
- React Router v8
- TypeScript
- Vite
- Tailwind CSS
- Component-based UI architecture
- Form Schema design
- Client-side state management
- Internationalization
- Form generation
- Code generation
- Responsive design
- Accessibility
- Automated testing
- Cloudflare Workers deployment

The technology should support the product rather than exist merely as a technology showcase.

---

# 26. Portfolio Objective

Formly has two purposes.

## Primary Purpose

Provide a genuinely usable lightweight Form Builder.

## Secondary Purpose

Demonstrate frontend engineering capabilities as a portfolio project.

The project should therefore demonstrate practical engineering rather than artificially adding features solely to increase technical complexity.

Important portfolio qualities include:

- Clear architecture
- Strong TypeScript usage
- React Router usage
- Reusable components
- Well-designed state management
- Form Schema architecture
- Code generation
- Responsive UI
- Internationalization
- Accessibility
- Testing
- Performance considerations
- Cloudflare deployment
- Clear documentation

---

# 27. What Formly Should Demonstrate

A person reviewing the project should be able to understand that Formly is not simply:

```text
React
+
A few components
```

Instead, it should demonstrate:

```text
React
   ↓
React Router
   ↓
Application Architecture
   ↓
Form Schema
   ↓
Builder
   ↓
Preview
   ↓
Code Generator
   ↓
HTML / CSS / JavaScript
```

This architecture should be understandable from the source code and documentation.

---

# 28. Product Principles

Formly follows these principles.

### Simple

The user should be able to create a basic form without unnecessary complexity.

### Visual

Users should be able to understand the form structure through the Builder.

### Practical

Generated output should be useful outside Formly.

### Lightweight

The product should not require an account or backend service for its core workflow.

### Maintainable

Generated code and the Formly codebase should remain understandable.

### Accessible

Both the application and generated forms should prioritize accessibility.

### Responsive

The product should work across desktop, tablet, and mobile.

### Fast

Builder interactions should remain responsive.

### Secure

Generated and user-provided content must be handled safely.

### Portfolio-Ready

The project should demonstrate real engineering practices rather than artificial complexity.

---

# 29. Current Product Scope

The current product focuses on:

```text
Form Creation
    ↓
Form Builder
    ↓
Field Configuration
    ↓
Form Preview
    ↓
HTML Generation
    ↓
CSS Generation
    ↓
JavaScript Generation
    ↓
Code Export
    ↓
LocalStorage Persistence
```

The product does not currently focus on:

```text
User Accounts
Cloud Storage
Form Submission Hosting
Submission Management
Email Delivery
CRM
Team Collaboration
```

---

# 30. Future Possibilities

The following capabilities may be considered in the future:

- Additional field types
- More advanced validation
- More customization options
- Form templates
- Import / export of Form Schema
- Advanced code generation options
- More advanced accessibility configuration
- Additional languages
- Cloud-based persistence
- User accounts
- Public form hosting
- Submission management

These are future possibilities, not current product requirements.

Future features must be evaluated against the product's core principle of remaining simple and practical.

---

# 31. Product Success Criteria

Formly can be considered successful when a user can:

1. Open the application without registering.
2. Create a form.
3. Add fields.
4. Configure the fields.
5. Reorder fields.
6. Preview the result.
7. Make adjustments based on the Preview.
8. Generate HTML, CSS, and JavaScript.
9. Copy or export the generated code.
10. Integrate the output into an existing website.
11. Return to the browser and continue working with locally saved form data.

The experience should be understandable without requiring extensive documentation.

---

# 32. Core Product Loop

The central Formly product loop is:

```text
Create
  ↓
Configure
  ↓
Preview
  ↓
Adjust
  ↓
Generate
  ↓
Export
```

This loop should remain the center of the product.

New features should improve this loop or provide clear supporting value.

Features that significantly distract from this loop should require strong justification.

---

# 33. Product Boundaries

Formly is a Form Builder and code generator.

It is not currently:

- A full CMS
- A form submission backend
- A CRM
- An email service
- A website builder
- A general-purpose page builder
- A project management application
- A collaboration platform

Maintaining these boundaries is important for keeping the product focused.

---

# 34. Product Direction

The long-term direction of Formly is to provide a lightweight, visually driven way to create practical web forms and integrate them into existing websites.

The product should evolve by improving:

```text
Builder
   ↓
Form Schema
   ↓
Preview
   ↓
Generated Code
```

rather than by adding unrelated application features.

---

# 35. Final Product Statement

Formly is a browser-based Form Builder for web designers, web creators, small businesses, and developers who need to create simple web forms without manually building every part from scratch.

Users can visually design a form, preview it, and export clean HTML, CSS, and JavaScript for use on their own website.

Formly requires no account for its core workflow and stores form data locally in the browser.

Its core promise is:

> **Build forms visually. Export clean code.**
````
