import React from "react";
import img1 from "../../assets/img/user-8.jpg";
import img2 from "../../assets/img/user-2.jpg";
const owners = [
  {
    name: "Mr. Rohit Kulkarni",
    role: "Founder and CEO",
    description:
      "With a strong background in real estate and tech, he envisioned a digital-first PG search solution for Indian cities.",
    image: img1,
  },
  {
    name: "Ms. Sneha Patil",
    role: "Co-Founder",
    description:
      "A UX strategist committed to creating a user-friendly and accessible experience for renters and owners alike.",
    image: img2,
  },
];

export default function OwnerSection() {
  return (
    <div className="card shadow-sm p-4 w-100 h-100 overflow-auto">
      <h2 className="h4 mb-3 text-center text-primary">Our Owners</h2>
      <p className="text-muted mb-4 text-center">
        Meet the visionaries behind our platform who laid the foundation of this initiative.
      </p>

      <div className="row g-4">
        {owners.map((owner, index) => (
          <div className="col-12 col-md-6" key={index}>
            <div className="card h-100 border-0 shadow-sm p-3 text-center">
              <img
                src={owner.image}
                alt={owner.name}
                className="rounded-circle mx-auto mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <h5 className="fw-bold text-primary">{owner.name}</h5>
              <div className="text-muted">{owner.role}</div>
              <p className="small mt-2">{owner.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
