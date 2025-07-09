import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: "General & Account Related",
    items: [
      {
        question: "How do I search for PGs?",
        answer:
          "Use our advanced search filters to explore listings based on location, budget, gender preference, and amenities.",
      },
      {
        question: "Is there a fee to use the platform?",
        answer:
          "Browsing and contacting PG owners is free. We may charge for premium visibility or assistance services.",
      },
      {
      question: "How do I create an account?",
      answer:
        "Click on the 'Sign Up' button and fill in your basic details. You'll need to verify your email and mobile number to activate your account.",
    },
   
    {
      question: "Why is email and mobile verification necessary?",
      answer:
        "Verification helps us ensure that users on our platform are genuine. It helps us eliminate brokers and maintain a trusted community.",
    },
    {
      question: "How will I know if my account is verified?",
      answer:
        "You will receive an SMS and email notification once your account has been successfully verified.",
    },
    {
      question: "Can I delete or deactivate my account?",
      answer:
        "Yes, please reach out to our support team through the Contact Us page to request account deletion or deactivation.",
    },
    {
      question: "Is my personal data safe on PGNest?",
      answer:
        "Yes, we follow strict data protection protocols. Your personal details are never shared with third parties without your consent.",
    }
    ],
  },
  {
    title: "Owners Related",
    items: [
      {
      question: "Are the PGs verified?",
      answer:
        "Yes, our team verifies listings and conducts regular audits to maintain authenticity.",
    },
    {
      question: "How can I list my PG property?",
      answer:
        "You can register as an owner on PGNest and submit your property details along with photos and verification documents.",
    },
    {
      question: "How long does it take to approve my listing?",
      answer:
        "Once submitted with all required details, listings are typically reviewed and approved within 24–48 hours.",
    },
    {
      question: "What documents are required to verify my PG property?",
      answer:
        "You may need to provide valid ID proof, property ownership documents, and recent photographs of the property.",
    },
    {
      question: "Can I edit or update my PG listing later?",
      answer:
        "Yes, owners can log in to their dashboard at any time to update availability, pricing, photos, or other details.",
    },
   
    {
      question: "What should I do if my listing is not showing up?",
      answer:
        "Ensure that your listing is verified and not missing any required details. If issues persist, contact our support team for assistance.",
    }
    ],
  },
  {
    title: "Tenant/Seekers Related",
    items: [
      {
      question: "Why do I need a verified account to use PGNest.in services?",
      answer:
        "To ensure a broker-free experience, we verify each user before activating their account.",
    },
    {
      question: "How do I book a PG after finding a suitable one?",
      answer:
        "Once you find a PG, you can directly contact the property owner through the platform and proceed with the booking process.",
    },
    {
      question: "Do I need to pay a broker or commission fee?",
      answer:
        "No, PGNest is a completely broker-free platform. You deal directly with verified property owners without any middlemen.",
    },
    {
      question: "Can I visit the PG property before booking?",
      answer:
        "Yes, you can request an in-person visit or ask for a virtual tour directly from the property owner.",
    },
    {
      question: "What if I face issues with the property after moving in?",
      answer:
        "We encourage open communication with the property owner. You can also report any serious issues to our support team.",
    },
    {
      question: "Can I filter PGs based on gender, amenities, or budget?",
      answer:
        "Absolutely! Our advanced search filters help you shortlist PGs by gender preference, amenities, location, and budget range.",
    },
    {
      question: "Are short-term stays allowed?",
      answer:
        "Some PGs do allow short-term stays. Please check the listing details or contact the owner directly for confirmation.",
    },
    {
      question: "How can I cancel a booking or inquiry?",
      answer:
        "You can manage your inquiries and cancel a booking directly from your PGNest dashboard or by contacting the owner.",
    },
    {
      question: "Can I get a refund if I cancel after paying?",
      answer:
        "Refund policies vary by property. Always confirm the cancellation and refund terms with the owner before making any payment.",
    },
    {
      question: "How often is availability updated?",
      answer:
        "Availability is updated regularly by property owners to reflect real-time status, ensuring accurate listings for seekers.",
    }
    ],
  },
  {
    title: "NRI Related",
    items: [
     {
      question: "How long does it take for mobile number verification?",
      answer: "Usually less than 4 hours by our CSR team.",
    },
    {
      question: "How will I know if my account is verified?",
      answer:
        "You will be notified via email and SMS once verification is complete.",
    },
    {
      question: "Can NRIs list their PG property on PGNest?",
      answer:
        "Yes, NRIs can list properties on PGNest by providing valid ownership documents and completing identity verification.",
    },
    {
      question: "Can I manage my property remotely from abroad?",
      answer:
        "Yes, you can manage listings, respond to inquiries, and update availability from anywhere through your PGNest dashboard.",
    },
    {
      question: "What if I don’t have an Indian mobile number?",
      answer:
        "We recommend using an Indian mobile number for verification. If you don’t have one, contact our support team for alternative options.",
    },
    {
      question: "Can I assign a local caretaker to handle property visits?",
      answer:
        "Yes, you can mention a local contact person or caretaker in your listing details to assist with property visits.",
    },
    {
      question: "Is there any special support for NRI property owners?",
      answer:
        "Yes, we offer dedicated support for NRIs including flexible verification, listing help, and remote management guidance.",
    },
    {
      question: "Can tenants from abroad use the platform to find PGs in India?",
      answer:
        "Absolutely. International users can search for PGs in India and contact owners after verification, even before arriving in India.",
    },
    {
      question: "How do NRIs receive payments from tenants?",
      answer:
        "You can receive rent payments through UPI, bank transfers, or any mutually agreed method with the tenant. International remittances are not supported through PGNest.",
    }
    ],
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion-container">
      <h2 className="h4 mb-4">Frequently Asked Questions</h2>
      {faqData.map((category, index) => (
        <div
          key={index}
          className="mb-3 border rounded shadow-sm btn-w"
        >
          <button
            className="w-100 text-start p-3 bg-white border-0 d-flex justify-content-between align-items-center"
            onClick={() => toggleIndex(index)}
            style={{ cursor: "pointer" }}
          >
            <strong>{category.title}</strong>
            <span>{openIndex === index ? "▲" : "▼"}</span>
          </button>
          {openIndex === index && (
            <div className="p-3 pt-0">
              {category.items.map((item, idx) => (
                <div key={idx} className="mb-2" >
                  <h6>{item.question}</h6>
                  <p className="text-muted">{item.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
