import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { contact } from "../data/content";

export default function Complaint() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [complaint, setComplaint] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <main className="legal-page">
        <div className="container legal-page-inner">
          <Link to="/" className="leader-back-link">
            ← হোমে ফিরুন
          </Link>
          <h1 className="legal-page-title">অভিযোগ</h1>
          <div className="divider" />

          <div className="complaint-disclaimer">
            <h2>অভিযোগ সংক্রান্ত গুরুত্বপূর্ণ তথ্য</h2>
            <p>
              এই ওয়েবসাইটের মাধ্যমে জমা দেওয়া সকল অভিযোগ রেকর্ড করা হয়।
              অভিযোগকারীর ব্যক্তিগত তথ্য গোপনীয়ভাবে সংরক্ষণ করা হবে এবং
              শুধুমাত্র সংশ্লিষ্ট দাপ্তরিক কাজে ব্যবহার করা হবে।
            </p>
            <p>
              অভিযোগ নিবন্ধন করার অর্থ এই নয় যে সমস্যাটি তাৎক্ষণিকভাবে
              সমাধান করা হবে। অভিযোগ পাওয়ার পর সংশ্লিষ্ট টিম বিষয়টি
              পর্যালোচনা ও বিশ্লেষণ করবে এবং প্রয়োজন অনুযায়ী সরেজমিনে
              পরিদর্শনের উদ্যোগ নেওয়া হবে।
            </p>
            <p>
              আমাদের সম্পদ ও সক্ষমতা সীমিত। তারপরও ওয়েবসাইটের মাধ্যমে
              পাওয়া আপনাদের মতামত ও অভিযোগের অধিকাংশ বিষয় গুরুত্বের সঙ্গে
              বিবেচনা করে যথাসম্ভব কার্যকর ব্যবস্থা নেওয়ার চেষ্টা করা হবে।
            </p>
            <p>
              অভিযোগ জানানোর সময় সমস্যাটি "স্পষ্ট, নির্দিষ্ট ও
              বিস্তারিতভাবে" উল্লেখ করুন। সঠিক স্থান, সমস্যা, প্রয়োজনীয়
              তথ্য এবং সম্ভব হলে অন্যান্য প্রমাণ সংযুক্ত করলে বিষয়টি দ্রুত
              শনাক্ত ও সংশ্লিষ্ট টিমের কাছে পৌঁছানো সহজ হবে।
            </p>
          </div>

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
                placeholder="আপনার অভিযোগ লিখুন"
                required
              />
            </div>

            <button type="submit" className="btn-primary">
              পাঠান
            </button>

            {submitted && (
              <p className="form-success">
                ধন্যবাদ, আপনার অভিযোগ গ্রহণ করা হয়েছে।
              </p>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
