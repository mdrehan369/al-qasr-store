import { Camera, Mail, Phone } from "lucide-react";

export const INSTAGRAM_URL = "https://instagram.com/al_qasr_fragrance";
export const EMAIL_ID = "mailto:alqasr337@gmail.com";
export const PHONE_NO = "+919123680629";
export const WHATSAPP_NO = `https://wa.me/${PHONE_NO}`;

export const contactLinks = [
  { label: "Whatsapp us", href: WHATSAPP_NO, icon: Phone },
  { label: "Email", href: EMAIL_ID, icon: Mail },
  {
    label: "Instagram",
    href: INSTAGRAM_URL,
    icon: Camera,
  },
];
