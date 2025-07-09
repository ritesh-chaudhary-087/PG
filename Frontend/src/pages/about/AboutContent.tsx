import React from "react";
import FaqAccordion from "../about/FaqAccordion"; 
import OwnerSection from "../about/OwnerSection";

interface SectionContent {
  title: string;
  description: string;
  content: {
    heading?: string;
    text: string;
  }[];
}

interface AboutContentProps {
  activeSection: string;
}

const sectionData: Record<string, SectionContent> = {
  about: {
    title: "About Us",
    description:
      "Welcome to PGNest — Pune's most trusted platform for discovering safe, affordable, and comfortable Paying Guest (PG) accommodations.",
    content: [
      {
        text: `Founded in Pune, PGNest was born out of a desire to simplify the often frustrating and overwhelming process of finding PG (paying guest) accommodations. We observed the challenges people face — lack of transparency, unreliable listings, unnecessary broker interference, and misleading images — and decided to change the experience for good.


        Whether you're a student, a working professional, or new to the city, PGNest is designed to help you find the perfect place to stay — quickly, confidently, and without hassle.


        At PGNest, we believe in trust and convenience. That’s why every listing is verified, availability is updated in real-time, and communication with property owners is direct and seamless. No more endless site visits, unclear terms, or last-minute surprises.


        Our platform empowers renters with all the tools they need — powerful filters, secure payment options, user reviews, and neighborhood insights — to make informed decisions. We’re committed to making your PG-hunting journey stress-free, transparent, and reliable.


        PGNest isn’t just a listing platform — it’s your trusted housing partner.,`, 
      },
    ],
  },
 
  team: {
    title: "Our Team",
    description:
      "A passionate team of developers, designers, and customer support professionals who keep things running smoothly.",
    content: [
      {
       
         text: `PGNest was founded by a passionate team of young professionals who personally experienced the frustrations of finding PG accommodations — overpriced rooms, unverified listings, misleading photos, and unnecessary involvement of middlemen.

         Each of us, at some point, struggled through the outdated and inefficient PG-hunting process, and we knew there had to be a better way.

         As we spoke to more students and working professionals across cities, one thing became clear — this was not just our problem. It was everyone’s problem.

         Whether it was dealing with brokers demanding unjustified commissions, or wasting time on visits to properties that looked nothing like the photos, the pain was universal. And no one seemed to be solving it at the root level.

         That’s when PGNest was born — not just as a platform, but as a mission to eliminate these inefficiencies and bring transparency, trust, and technology into the PG rental space.

         Our goal is to create a truly broker-free ecosystem where users can connect directly with verified property owners, explore listings confidently, and secure accommodations that truly match their preferences — all without stepping outside or being misled.`,
    },
    ],
  },
};

export default function AboutContent({ activeSection }: AboutContentProps) {
  if (activeSection === "faq") {
    return (
      <div className="card shadow-sm p-4 w-100 h-100 overflow-auto">
        <FaqAccordion />
      </div>
    );
  }

  if (activeSection === "owners") {
    return <OwnerSection />; 
  }

  const section = sectionData[activeSection];

  return (
    <div className="card shadow-sm p-4 w-100 h-100 overflow-auto">
      <h2 className="h4 mb-2">{section?.title}</h2>
      <p className="text-muted mb-4">{section?.description}</p>

      <div>
        {section?.content.map((item, index) => (
          <div key={index} className="mb-3">
            {item.heading && (
              <h5 className="fw-semibold mb-1">{item.heading}</h5>
            )}
            <p style={{ whiteSpace: "pre-line" }}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

