// Pre-render every route to static HTML after the Vite client build.
// Each page gets its real rendered content, its own title, description,
// canonical and social tags in the raw HTML, so search engines can index
// each page on its own. Keep the leader descriptions in sync with
// src/data/leaders.js and the page components.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(rootDir, "dist");
const serverDir = path.join(rootDir, "dist-server");

const { render } = await import(path.join(serverDir, "entry-server.js"));

const SITE = "https://ritonvai.com";

const routes = [
  {
    path: "/",
    title: "মাহফুজুর রহমান রিটন | প্রশাসক, রাজশাহী সিটি কর্পোরেশন",
    description:
      "মাহফুজুর রহমান রিটন — প্রশাসক, রাজশাহী সিটি কর্পোরেশন। তাঁর রাজনৈতিক পথচলা, নেতৃত্ব, আন্দোলন-সংগ্রাম, জনসেবা ও বর্তমান দায়িত্ব সম্পর্কে বিস্তারিত জানুন।",
  },
  {
    path: "/leader/ziaur-rahman",
    title: "শহীদ রাষ্ট্রপতি জিয়াউর রহমান বীর উত্তম | মাহফুজুর রহমান রিটন",
    description:
      "শহীদ রাষ্ট্রপতি জিয়াউর রহমান বীর উত্তম কেন মাহফুজুর রহমান রিটনের অনুপ্রেরণা: মুক্তিযুদ্ধে সাহসী নেতৃত্ব, দেশপ্রেম, আত্মনির্ভর বাংলাদেশের স্বপ্ন ও জাতীয় ঐক্যের চিন্তা নিয়ে রিটনের নিজের ভাষায় লেখা।",
  },
  {
    path: "/leader/khaleda-zia",
    title: "দেশনেত্রী বেগম খালেদা জিয়া | মাহফুজুর রহমান রিটন",
    description:
      "দেশনেত্রী বেগম খালেদা জিয়া কেন মাহফুজুর রহমান রিটনের অনুপ্রেরণা: গণতন্ত্রের জন্য দীর্ঘ সংগ্রাম, দৃঢ়তা, কারাবরণের পরও না হার মানা ও বাংলাদেশের প্রথম নারী প্রধানমন্ত্রী হওয়ার যাত্রা নিয়ে রিটনের নিজের ভাষায় লেখা।",
  },
  {
    path: "/leader/tarique-rahman",
    title: "চেয়ারম্যান তারেক রহমান | মাহফুজুর রহমান রিটন",
    description:
      "চেয়ারম্যান তারেক রহমান কেন মাহফুজুর রহমান রিটনের অনুপ্রেরণা: তৃণমূলকেন্দ্রিক নেতৃত্ব, মানুষের কথা শোনা, সংগঠনকে মানুষের কাছে নিয়ে যাওয়া ও প্রতিকূলতায় সক্রিয় থাকার মানসিকতা নিয়ে রিটনের নিজের ভাষায় লেখা।",
  },
  {
    path: "/complaint",
    title: "অভিযোগ | মাহফুজুর রহমান রিটন",
    description:
      "রাজশাহী সিটি কর্পোরেশন সংক্রান্ত সমস্যা বা অভিযোগ সরাসরি প্রশাসক মাহফুজুর রহমান রিটনের কাছে জানান। সঠিক স্থান ও সমস্যা স্পষ্ট করে লিখলে বিষয়টি দ্রুত শনাক্ত করা সহজ হয়।",
  },
  {
    path: "/privacy-policy",
    title: "প্রাইভেসি পলিসি | মাহফুজুর রহমান রিটন",
    description:
      "ritonvai.com এর প্রাইভেসি পলিসি: মাহফুজুর রহমান রিটনের অফিসিয়াল ওয়েবসাইট কীভাবে দর্শনার্থীদের তথ্য সংগ্রহ, ব্যবহার ও সংরক্ষণ করে তা এখানে ব্যাখ্যা করা হয়েছে।",
  },
  {
    path: "/terms-and-conditions",
    title: "শর্তাবলী | মাহফুজুর রহমান রিটন",
    description:
      "ritonvai.com ব্যবহারের শর্তাবলী: মাহফুজুর রহমান রিটনের অফিসিয়াল ওয়েবসাইটের কনটেন্ট ব্যবহার, তথ্যের সঠিকতা ও বহিঃসংযোগ সম্পর্কে নিয়মাবলী।",
  },
];

function applyMeta(html, { title, description, path: routePath }) {
  // The host serves each pre-rendered route folder at a trailing slash
  // URL, so the canonical uses that same final URL.
  const url =
    routePath === "/" || routePath === "/404"
      ? SITE + routePath
      : SITE + routePath + "/";
  return html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta name="description" content=")[^"]*(")/,
      `$1${description}$2`
    )
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(
      /(<meta property="og:title" content=")[^"]*(")/,
      `$1${title}$2`
    )
    .replace(
      /(<meta property="og:description" content=")[^"]*(")/,
      `$1${description}$2`
    )
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(
      /(<meta name="twitter:title" content=")[^"]*(")/,
      `$1${title}$2`
    )
    .replace(
      /(<meta name="twitter:description" content=")[^"]*(")/,
      `$1${description}$2`
    );
}

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf8");

for (const route of routes) {
  const rendered = render(route.path);
  let html = applyMeta(template, route);
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${rendered}</div>`
  );
  const outFile =
    route.path === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, route.path.slice(1), "index.html");
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  console.log("pre-rendered", route.path);
}

// Static 404 page, served by the host with a real 404 status through
// public/_redirects. Rendered from the app's own NotFound route.
{
  const rendered = render("/404");
  let html = applyMeta(template, {
    title: "পেজ পাওয়া যায়নি | মাহফুজুর রহমান রিটন",
    description:
      "দুঃখিত, আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি। মাহফুজুর রহমান রিটনের অফিসিয়াল ওয়েবসাইটের হোম পেজে ফিরে যান।",
    path: "/404",
  });
  html = html
    .replace(
      '<meta name="robots" content="index, follow" />',
      '<meta name="robots" content="noindex, follow" />'
    )
    .replace('<div id="root"></div>', `<div id="root">${rendered}</div>`);
  fs.writeFileSync(path.join(distDir, "404.html"), html);
  console.log("pre-rendered /404.html");
}

// Copy any asset files the SSR build emitted (same content hashes as the
// client build) so pre-rendered image URLs resolve, then remove the
// server bundle so it is not deployed.
const ssrAssets = path.join(serverDir, "assets");
if (fs.existsSync(ssrAssets)) {
  const clientAssets = path.join(distDir, "assets");
  fs.mkdirSync(clientAssets, { recursive: true });
  for (const file of fs.readdirSync(ssrAssets)) {
    const target = path.join(clientAssets, file);
    if (!fs.existsSync(target)) {
      fs.copyFileSync(path.join(ssrAssets, file), target);
    }
  }
}
fs.rmSync(serverDir, { recursive: true, force: true });
console.log("prerender done");
