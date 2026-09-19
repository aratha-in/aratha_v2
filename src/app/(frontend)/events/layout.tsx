import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agency Events & Webinars | Tech Meetups | Aratha",
  description: "Check schedules for upcoming Aratha workshops, React Next.js coding bootcamps, and digital automation webinars.",
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
