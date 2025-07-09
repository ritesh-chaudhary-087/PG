import React from "react";

interface AboutSection {
  id: string;
  title: string;
}

interface PrivacySidebarProps {
  sections: AboutSection[];
  activeSection: string;
  setActiveSection: (id: string) => void;
}

export default function PrivacySidebar({
  sections,
  activeSection,
  setActiveSection,
}: PrivacySidebarProps) {
  return (
    <div className="w-100 w-md-25 bg-light border rounded shadow-sm mb-4 mb-md-0">
      <nav className="p-4">
        <ul className="list-unstyled">
          {sections.map((section) => (
            <li key={section.id} className="mb-2">
              <button
                onClick={() => setActiveSection(section.id)}
                className={`btn w-100 text-start p-2 rounded ${
                  activeSection === section.id
                    ? "text-white fw-semibold"
                    : "btn-light text-dark border"
                }`}
                style={{
                  backgroundColor:
                    activeSection === section.id ? "#074da3" : "#ffffff",
                  borderColor:
                    activeSection === section.id ? "#074da3" : "#ced4da",
                }}
              >
                <span className="small">{section.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
