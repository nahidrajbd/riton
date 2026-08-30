import { useEffect, useRef, useState } from "react";
import { contact } from "../data/content";

const socialIcons = {
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="#fff" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
};

function ComplaintForm() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [complaint, setComplaint] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!complaint.trim()) return;

    const subject = encodeURIComponent("অভিযোগ - ওয়েবসাইট");
    const body = encodeURIComponent(
      `নাম: ${name || "উল্লেখ করেননি"}\nমোবাইল: ${mobile || "উল্লেখ করেননি"}\n\nঅভিযোগ:\n${complaint}`
    );
    const emailEntry = contact.social.find((s) => s.icon === "email");
    const email = emailEntry ? emailEntry.url.replace("mailto:", "") : "";
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setName("");
    setMobile("");
    setComplaint("");
  };

  return (
    <form className="complaint-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="complaint-name">নাম (অপশনাল)</label>
        <input
          id="complaint-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার নাম"
        />
      </div>

      <div className="form-field">
        <label htmlFor="complaint-mobile">মোবাইল (অপশনাল)</label>
        <input
          id="complaint-mobile"
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="০১XXXXXXXXX"
        />
      </div>

      <div className="form-field">
        <label htmlFor="complaint-message">অভিযোগ</label>
        <textarea
          id="complaint-message"
          rows="5"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="আপনার অভিযোগ লিখুন"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        পাঠান
      </button>

      {submitted && (
        <p className="form-success">ধন্যবাদ, আপনার অভিযোগ গ্রহণ করা হয়েছে।</p>
      )}
    </form>
  );
}

export default function Contact() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="reveal" ref={ref}>
          <span className="section-label">যোগাযোগ করুন</span>
          <h2 className="section-heading" id="contact-heading">
            {contact.heading}
          </h2>
          <div className="divider center" />

          <div className="contact-columns">
            <div className="contact-column">
              <h3 className="contact-column-heading">যোগাযোগ</h3>
              <p style={{ color: "#4a5568", fontSize: "1.05rem" }}>
                {contact.description}
              </p>

              <div className="social-grid">
                {contact.social.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    className={`social-btn ${s.icon}`}
                    target={s.icon !== "email" ? "_blank" : undefined}
                    rel={s.icon !== "email" ? "noopener noreferrer" : undefined}
                    aria-label={`${s.label}-এ যোগাযোগ করুন`}
                  >
                    {socialIcons[s.icon]}
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-column">
              <h3 className="contact-column-heading">অভিযোগ</h3>
              <ComplaintForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
