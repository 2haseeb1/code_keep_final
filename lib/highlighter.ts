// File: lib/highlighter.ts

import hljs from "highlight.js/lib/core"; // শুধুমাত্র মূল লাইব্রেরিটি import করুন

// আপনার প্রয়োজনীয় ল্যাঙ্গুয়েজগুলো import করুন
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";
import xml from "highlight.js/lib/languages/xml"; // HTML/JSX/TSX-এর জন্য জরুরি
import bash from "highlight.js/lib/languages/bash"; // টার্মিনাল কমান্ডের জন্য

// ল্যাঙ্গুয়েজগুলোকে রেজিস্টার করুন
// প্রথম আর্গুমেন্ট হলো সেই নাম যা আপনি আপনার কোডে ব্যবহার করবেন
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("bash", bash);

// এখন hljs অবজেক্টটিকে export করুন
export default hljs;
