import React from "react";

interface SectionContent {
  title: string;
  description: string;
  content: {
    heading?: string;
    text: string;
  }[];
}

interface PrivacyContentProps {
  activeSection: string;
}

const sectionData: Record<string, SectionContent> = {
  privacy: {
    title: "Privacy Policy",
    description:
      "Your privacy is important to us. This section outlines how we collect, use, and protect your data when using PGNest.",
    content: [
      {
        text: `We collect only essential data like your name, email, mobile number, and preferences to improve your experience and match you with the most suitable PG listings. Your data is never sold or shared with third-party advertisers.

        We use secure encryption to protect your personal information and ensure our platform remains safe and trustworthy for all users. By using PGNest, you consent to our data practices.

        We follow strict internal protocols to prevent unauthorized access to your information. Our systems are regularly monitored and updated to address potential security vulnerabilities, ensuring a safe experience for everyone on our platform.

       We only retain your data for as long as it is necessary to provide you with the services you signed up for. Once your account is deactivated or deleted, your personal data is either removed from our system or anonymized for analytical purposes.

       PGNest is committed to transparency. If any changes are made to our privacy practices, users will be notified through email or platform notifications. We encourage you to review the policy periodically to stay informed about how your data is handled.

       If you have any concerns, questions, or would like to request a data deletion, you can contact our support team directly at  <span class="text-primary">support@pgnest.in</span>.`,
      },
    ],
  },

  terms: {
    title: "Terms & Conditions",
    description:
      "Please read our terms and conditions carefully before using PGNest. By accessing the platform, you agree to the following terms.",
    content: [
      {
        text: `PGNest provides a platform to connect renters and property owners. We do not own or operate the PG listings, and all agreements are strictly between the user and the owner.

Users are responsible for verifying property details and fulfilling payment obligations. PGNest is not liable for disputes arising between users and property owners.

Misuse of the platform, posting fake listings, or attempting to bypass verification steps may result in account suspension or removal.

By using PGNest, you agree to provide accurate and truthful information. Any attempt to impersonate another individual or misrepresent details may lead to immediate termination of your account.

PGNest reserves the right to modify, update, or discontinue any aspect of the platform at any time without prior notice. It is the user’s responsibility to stay updated with these changes.

All content, branding, and technology used on PGNest are the intellectual property of the platform and may not be copied or redistributed without written permission.

You must be at least 18 years old to use PGNest or have the consent of a parent or legal guardian.

Any legal disputes arising from the use of our platform shall be governed by the laws of India, with jurisdiction in Pune, Maharashtra.

Your continued use of PGNest implies your acceptance of these terms in full. If you disagree with any part of the terms, you should discontinue use of the platform immediately.`,
      },
    ],
  },
};

export default function PrivacyContent({ activeSection }: PrivacyContentProps) {
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
      <p
        style={{ whiteSpace: "pre-line" }}
        dangerouslySetInnerHTML={{ __html: item.text }}
      />
    </div>
  ))}
</div>
    </div>
  );
}
