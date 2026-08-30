import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { contact } from "../data/content";

const noticeIcons = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  ),
  hand: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21c-4-2.5-8-6-8-11a3 3 0 0 1 6 0" />
      <path d="M10 10V4a2 2 0 1 1 4 0v6" />
      <path d="M14 10V3a2 2 0 1 1 4 0v7" />
      <path d="M18 10V5a2 2 0 1 1 4 0v7c0 5-4 8.5-8 11" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  ),
};

const notices = [
  {
    icon: "shield",
    title: "গোপনীয়তা রক্ষা করা হয়",
    text: "জমা দেওয়া সকল অভিযোগ রেকর্ড করা হয়। ব্যক্তিগত তথ্য গোপনীয়ভাবে সংরক্ষণ করা হবে এবং শুধুমাত্র সংশ্লিষ্ট দাপ্তরিক কাজে ব্যবহার করা হবে।",
  },
  {
    icon: "clock",
    title: "তাৎক্ষণিক সমাধানের নিশ্চয়তা নেই",
    text: "অভিযোগ নিবন্ধনের অর্থ এই নয় যে সমস্যাটি সাথে সাথে সমাধান হবে। সংশ্লিষ্ট টিম বিষয়টি পর্যালোচনা করে প্রয়োজনে সরেজমিনে পরিদর্শন করবে।",
  },
  {
    icon: "hand",
    title: "সাধ্যমতো ব্যবস্থা নেওয়া হবে",
    text: "আমাদের সম্পদ ও সক্ষমতা সীমিত। তারপরও আপনাদের মতামত ও অভিযোগ গুরুত্বের সঙ্গে বিবেচনা করে যথাসম্ভব কার্যকর ব্যবস্থা নেওয়ার চেষ্টা করা হবে।",
  },
  {
    icon: "target",
    title: "স্পষ্ট ও নির্দিষ্ট করে লিখুন",
    text: "সঠিক স্থান, সমস্যা ও প্রয়োজনীয় তথ্য উল্লেখ করলে বিষয়টি দ্রুত শনাক্ত ও সংশ্লিষ্ট টিমের কাছে পৌঁছানো সহজ হবে।",
  },
];

export default function Complaint() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [complaint, setComplaint] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "অভিযোগ | মাহফুজুর রহমান রিটন";
    return () => {
      document.title = "মাহফুজুর রহমান রিটন | প্রশাসক, রাজশাহী সিটি কর্পোরেশন";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!complaint.trim()) return;

    const emailEntry = contact.social.find((s) => s.icon === "email");
    const email = emailEntry ? emailEntry.url.replace("mailto:", "") : "";
    const subject = encodeURIComponent("অভিযোগ - ওয়েবসাইট");
    const body = encodeURIComponent(
      `নাম: ${name || "উল্লেখ করেননি"}\nমোবাইল: ${mobile || "উল্লেখ করেননি"}\n\nঅভিযোগ:\n${complaint}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setName("");
    setMobile("");
    setComplaint("");
  };

  return (
    <>
      <Navbar />
      <main className="complaint-page">
        <div className="complaint-hero">
          <div className="container">
            <Link to="/" className="leader-back-link">
              ← হোমে ফিরুন
            </Link>
            <span className="complaint-hero-badge">অভিযোগ জানান</span>
            <h1 className="complaint-hero-title">আপনার অভিযোগ লিখুন</h1>
            <p className="complaint-hero-subtitle">
              রাজশাহী সিটি কর্পোরেশন সংক্রান্ত যেকোনো সমস্যা বা অভিযোগ সরাসরি আমাদের জানান।
            </p>
          </div>
        </div>

        <div className="container">
          <div className="complaint-layout">
            <aside className="complaint-notices">
              {notices.map((n, i) => (
                <div className="complaint-notice-item" key={i}>
                  <div className="complaint-notice-icon">{noticeIcons[n.icon]}</div>
                  <div>
                    <h3>{n.title}</h3>
                    <p>{n.text}</p>
                  </div>
                </div>
              ))}
            </aside>

            <div className="complaint-form-card">
              {submitted ? (
                <div className="complaint-success">
                  <div className="complaint-success-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <h3>ধন্যবাদ!</h3>
                  <p>আপনার অভিযোগ গ্রহণ করা হয়েছে। সংশ্লিষ্ট টিম শীঘ্রই বিষয়টি পর্যালোচনা করবে।</p>
                  <button type="button" className="btn-secondary" onClick={() => setSubmitted(false)}>
                    আরেকটি অভিযোগ জমা দিন
                  </button>
                </div>
              ) : (
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
                      rows="6"
                      value={complaint}
                      onChange={(e) => setComplaint(e.target.value)}
                      placeholder="সমস্যাটি স্পষ্ট, নির্দিষ্ট ও বিস্তারিতভাবে লিখুন..."
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary complaint-submit">
                    অভিযোগ পাঠান
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
