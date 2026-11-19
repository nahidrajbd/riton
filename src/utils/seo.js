// Per page SEO meta for client side navigation.
// The build also pre-renders each route with the same values in
// scripts/prerender.mjs, so crawlers see them in the raw HTML.

export const SITE_URL = "https://ritonvai.com";

export const HOME_META = {
  title: "মাহফুজুর রহমান রিটন | প্রশাসক, রাজশাহী সিটি কর্পোরেশন",
  description:
    "মাহফুজুর রহমান রিটন — প্রশাসক, রাজশাহী সিটি কর্পোরেশন। তাঁর রাজনৈতিক পথচলা, নেতৃত্ব, আন্দোলন-সংগ্রাম, জনসেবা ও বর্তমান দায়িত্ব সম্পর্কে বিস্তারিত জানুন।",
  path: "/",
};

function setTag(selector, create, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  return el;
}

export function setPageMeta({ title, description, path }) {
  const cleanPath = path || "/";
  // The host serves each pre-rendered route folder at a trailing slash
  // URL, so the canonical uses that same final URL.
  const url =
    cleanPath === "/" ? SITE_URL + "/" : SITE_URL + cleanPath + "/";
  document.title = title;

  setTag('meta[name="description"]', () => document.createElement("meta"), {
    name: "description",
    content: description,
  });
  setTag('link[rel="canonical"]', () => document.createElement("link"), {
    rel: "canonical",
    href: url,
  });
  setTag('meta[property="og:title"]', () => document.createElement("meta"), {
    property: "og:title",
    content: title,
  });
  setTag(
    'meta[property="og:description"]',
    () => document.createElement("meta"),
    { property: "og:description", content: description }
  );
  setTag('meta[property="og:url"]', () => document.createElement("meta"), {
    property: "og:url",
    content: url,
  });
  setTag('meta[name="twitter:title"]', () => document.createElement("meta"), {
    name: "twitter:title",
    content: title,
  });
  setTag(
    'meta[name="twitter:description"]',
    () => document.createElement("meta"),
    { name: "twitter:description", content: description }
  );
}

export function resetHomeMeta() {
  setPageMeta(HOME_META);
}
