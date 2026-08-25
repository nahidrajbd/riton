import { Link } from "react-router-dom";
import { footer, navLinks } from "../data/content";

export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>{footer.name}</h3>
            <p>{footer.position}</p>
          </div>
          <div className="footer-nav">
            <h4>নেভিগেশন</h4>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{footer.copyright}</p>
          <ul className="footer-legal">
            <li>
              <Link to="/privacy-policy">প্রাইভেসি পলিসি</Link>
            </li>
            <li>
              <Link to="/terms-and-conditions">শর্তাবলী</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
