import { site } from "./site";

/** Every WhatsApp entry point carries its intent so CLF can triage leads at a glance. */
export const whatsappMessages = {
  product: "Hi Chennai Leather Factory, I'd like to know more about your leather products.",
  custom: "Hi Chennai Leather Factory, I have a jacket reference and would like to discuss customization.",
  wholesale: "Hi Chennai Leather Factory, I'd like to enquire about wholesale leather products.",
  privateLabel: "Hi Chennai Leather Factory, I'm interested in private-label leather manufacturing.",
  visit: "Hi Chennai Leather Factory, I'd like to visit your store. Could you share the best time to come?",
} as const;

export type WhatsAppIntent = keyof typeof whatsappMessages;

export function whatsappLink(intentOrText: WhatsAppIntent | (string & {})): string {
  const text =
    Object.hasOwn(whatsappMessages, intentOrText)
      ? whatsappMessages[intentOrText as WhatsAppIntent]
      : intentOrText;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function categoryWhatsappLink(category: string): string {
  return whatsappLink(`Hi Chennai Leather Factory, I'm interested in your ${category}. Could you share what's currently available?`);
}
