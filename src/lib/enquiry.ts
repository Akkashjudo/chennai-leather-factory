export const enquiryTypes = [
  { value: "wholesale", label: "I need wholesale products" },
  { value: "private-label", label: "I want private-label manufacturing" },
  { value: "custom", label: "I need custom leather products" },
  { value: "retailer", label: "I am a retailer / reseller" },
  { value: "other", label: "Other" },
] as const;

export type EnquiryType = (typeof enquiryTypes)[number]["value"];

export type Enquiry = {
  type: EnquiryType;
  name: string;
  phone: string;
  business?: string;
  city?: string;
  requirement?: string;
  quantity?: string;
  message?: string;
};

export function enquiryLabel(type: EnquiryType) {
  return enquiryTypes.find((t) => t.value === type)?.label ?? "Other";
}

/** Plain-text summary used for WhatsApp hand-off and webhook payloads. */
export function formatEnquiry(e: Enquiry) {
  const lines = [
    "Hi Chennai Leather Factory, I'd like to make an enquiry.",
    "",
    `Enquiry: ${enquiryLabel(e.type)}`,
    `Name: ${e.name}`,
    `Phone: ${e.phone}`,
    e.business ? `Business: ${e.business}` : null,
    e.city ? `City: ${e.city}` : null,
    e.requirement ? `Requirement: ${e.requirement}` : null,
    e.quantity ? `Approx. quantity: ${e.quantity}` : null,
    e.message ? `Message: ${e.message}` : null,
  ];
  return lines.filter((l): l is string => l !== null).join("\n");
}

export function validateEnquiry(input: unknown): { ok: true; data: Enquiry } | { ok: false; error: string } {
  if (!input || typeof input !== "object") return { ok: false, error: "Invalid request." };
  const o = input as Record<string, unknown>;
  const str = (k: string, max = 500) => (typeof o[k] === "string" ? (o[k] as string).trim().slice(0, max) : "");
  const type = str("type") as EnquiryType;
  if (!enquiryTypes.some((t) => t.value === type)) return { ok: false, error: "Please choose an enquiry type." };
  const name = str("name", 120);
  const phone = str("phone", 30);
  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  if (phone.replace(/\D/g, "").length < 8) return { ok: false, error: "Please enter a valid phone number." };
  return {
    ok: true,
    data: {
      type,
      name,
      phone,
      business: str("business", 160),
      city: str("city", 80),
      requirement: str("requirement", 300),
      quantity: str("quantity", 80),
      message: str("message", 2000),
    },
  };
}
