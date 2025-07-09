import { useState } from "react";
import PrivacySidebar from "./PrivacySidebar";
import PrivacyContent from "./PrivacyContent";
import Navbar from "../../components/navbar/navbar";
import FooterTop from "../../components/footer-top";
import Footer from "../../components/footer";

interface Section {
  id: string;
  title: string;
}

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState<string>("privacy");

  const sections: Section[] = [
    { id: "privacy", title: "privacy policy" },
    { id: "terms", title: "Terms & Conditions" },
  ];

  return (
    <>
    <Navbar transparent={false}/>   
    <div className="container-fluid py-5">
      <div className="row">
        <div className="col-md-4 mb-4">
          <PrivacySidebar
            sections={sections}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
        <div className="col-md-8">
          <PrivacyContent activeSection={activeSection} />
        </div>
      </div>
    </div>
    <FooterTop bg="theme-bg"/>
    <Footer />
     </>
  );
 
}
