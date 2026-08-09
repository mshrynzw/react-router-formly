import type { FormTemplateDefinition } from "@/features/templates/types";

export const FORM_TEMPLATES: FormTemplateDefinition[] = [
  {
    id: "blank",
    category: "general",
    nameKey: "templates.items.blank.name",
    descriptionKey: "templates.items.blank.description",
    defaultFormName: "Untitled Form",
    defaultFormDescription: "",
    fields: [{ type: "submit", label: "Submit", required: false }],
    submission: { action: "", method: "POST" },
  },
  {
    id: "contact",
    category: "business",
    nameKey: "templates.items.contact.name",
    descriptionKey: "templates.items.contact.description",
    defaultFormName: "Contact Form",
    defaultFormDescription: "Get in touch with a simple contact form.",
    fields: [
      {
        type: "text",
        label: "Name",
        name: "name",
        placeholder: "Your name",
        required: true,
        validation: { maxLength: 100 },
      },
      {
        type: "email",
        label: "Email",
        name: "email",
        placeholder: "you@example.com",
        required: true,
      },
      {
        type: "textarea",
        label: "Message",
        name: "message",
        placeholder: "How can we help?",
        required: true,
        validation: { minLength: 10, maxLength: 2000 },
      },
      { type: "submit", label: "Send message", required: false },
    ],
    submission: { action: "", method: "POST" },
  },
  {
    id: "inquiry",
    category: "business",
    nameKey: "templates.items.inquiry.name",
    descriptionKey: "templates.items.inquiry.description",
    defaultFormName: "Inquiry Form",
    defaultFormDescription: "Collect product or service inquiries.",
    fields: [
      {
        type: "text",
        label: "Name",
        name: "name",
        required: true,
      },
      {
        type: "email",
        label: "Email",
        name: "email",
        required: true,
      },
      {
        type: "select",
        label: "Topic",
        name: "topic",
        required: true,
        options: [
          { label: "Product", value: "product" },
          { label: "Pricing", value: "pricing" },
          { label: "Support", value: "support" },
          { label: "Other", value: "other" },
        ],
      },
      {
        type: "textarea",
        label: "Details",
        name: "details",
        required: true,
        validation: { maxLength: 2000 },
      },
      { type: "submit", label: "Submit inquiry", required: false },
    ],
    submission: { action: "", method: "POST" },
  },
  {
    id: "feedback",
    category: "feedback",
    nameKey: "templates.items.feedback.name",
    descriptionKey: "templates.items.feedback.description",
    defaultFormName: "Feedback Form",
    defaultFormDescription: "Collect ratings and written feedback.",
    fields: [
      {
        type: "text",
        label: "Name",
        name: "name",
        required: false,
      },
      {
        type: "radio",
        label: "Overall rating",
        name: "rating",
        required: true,
        options: [
          { label: "Excellent", value: "excellent" },
          { label: "Good", value: "good" },
          { label: "Average", value: "average" },
          { label: "Poor", value: "poor" },
        ],
      },
      {
        type: "textarea",
        label: "Comments",
        name: "comments",
        required: true,
        validation: { maxLength: 2000 },
      },
      { type: "submit", label: "Send feedback", required: false },
    ],
    submission: { action: "", method: "POST" },
  },
  {
    id: "newsletter",
    category: "general",
    nameKey: "templates.items.newsletter.name",
    descriptionKey: "templates.items.newsletter.description",
    defaultFormName: "Newsletter Signup",
    defaultFormDescription: "A simple email signup form.",
    fields: [
      {
        type: "email",
        label: "Email",
        name: "email",
        placeholder: "you@example.com",
        required: true,
      },
      {
        type: "checkbox",
        label: "I agree to receive updates",
        name: "consent",
        required: true,
      },
      { type: "submit", label: "Subscribe", required: false },
    ],
    submission: { action: "", method: "POST" },
  },
  {
    id: "reservation",
    category: "business",
    nameKey: "templates.items.reservation.name",
    descriptionKey: "templates.items.reservation.description",
    defaultFormName: "Reservation Form",
    defaultFormDescription: "Collect reservation requests.",
    fields: [
      {
        type: "text",
        label: "Name",
        name: "name",
        required: true,
      },
      {
        type: "email",
        label: "Email",
        name: "email",
        required: true,
      },
      {
        type: "number",
        label: "Number of guests",
        name: "guests",
        required: true,
        validation: { min: 1, max: 50, step: 1 },
      },
      {
        type: "textarea",
        label: "Notes",
        name: "notes",
        required: false,
        validation: { maxLength: 1000 },
      },
      { type: "submit", label: "Request reservation", required: false },
    ],
    submission: { action: "", method: "POST" },
  },
];

export function getFormTemplateById(id: string): FormTemplateDefinition | undefined {
  return FORM_TEMPLATES.find((template) => template.id === id);
}

export function listFormTemplates(category?: FormTemplateDefinition["category"] | "all") {
  if (!category || category === "all") {
    return FORM_TEMPLATES;
  }

  return FORM_TEMPLATES.filter((template) => template.category === category);
}
