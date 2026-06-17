"use client";

import { useEffect, useState } from "react";

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false);
const [language, setLanguage] = useState("ar");

useEffect(() => {
  const savedLanguage = localStorage.getItem("language");

  if (savedLanguage) {
    setLanguage(savedLanguage);
  }
}, []);
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");

    if (savedMode === "true") {
      setDarkMode(true);
    }
  }, []);

  return (
    <main
      className={`min-h-screen p-8 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto p-8 rounded-xl shadow ${
          darkMode
            ? "bg-gray-800"
            : "bg-white"
        }`}
      >
        <h1 className="text-4xl font-bold text-green-600 text-center mb-8">
          {language === "ar"
           ? "💙 عن مُعين"
           : "💙 About MUEEN"}
        </h1>

        <p className="mb-6 text-lg">
         {language === "ar"
          ? "مُعين منصة ذكية تهدف إلى ربط المحتاجين بالمتطوعين والمتبرعين لتقديم المساعدة بسرعة وكفاءة باستخدام التقنيات الحديثة."
          : "MUEEN is a smart platform that connects people in need with volunteers and donors to provide fast and efficient assistance using modern technologies."}
        </p>

        <h2 className="text-2xl font-bold mb-4">
          {language === "ar"
           ? "🎯 أهداف المشروع"
           : "🎯 Project Goals"}
        </h2>

        <ul className="list-disc mr-6 mb-6 space-y-2">
          <li>
  {language === "ar"
    ? "تسهيل طلب المساعدة الإنسانية."
    : "Facilitating humanitarian assistance requests."}
</li>

<li>
  {language === "ar"
    ? "ربط المحتاجين بالمتطوعين القريبين."
    : "Connecting people in need with nearby volunteers."}
</li>

<li>
  {language === "ar"
    ? "تحديد أولويات الحالات حسب درجة الخطورة."
    : "Prioritizing cases according to urgency."}
</li>

<li>
  {language === "ar"
    ? "توفير استجابة أسرع للحالات العاجلة."
    : "Providing faster responses for urgent cases."}
</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">
          {language === "ar"
          ? "⚙️ التقنيات المستخدمة"
          : "⚙️ Technologies Used"}
        </h2>

        <ul className="list-disc mr-6 mb-6 space-y-2">
          <li>Next.js</li>
          <li>TypeScript</li>
          <li>Node.js</li>
          <li>MySQL</li>
          <li>GPS Location Services</li>
          <li>AI Priority Analysis</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">
           {language === "ar"
            ? "👩‍🏫 الإشراف"
            : "👩‍🏫 Supervision"}
</h2>

<p className="mb-6">
  م.م مروة علي عبد الصمد
</p>

<h2 className="text-2xl font-bold mb-4">
  {language === "ar"
  ? "👥 فريق العمل"
  : "👥 Team Members"}
</h2>

<ul className="list-disc mr-6 mb-6 space-y-2">
  <li>هبة عماد</li>
  <li>محمد عبد الله</li>
  <li>آمنة قاسم</li>
  <li>فاطمة عبد الزهراء</li>
</ul>


<p className="text-lg font-bold">
  {language === "ar"
    ? "مشروع مُعين"
    : "MUEEN Project"}
</p>

<p className="mt-2">
  {language === "ar"
    ? "مشروع مشارك في البطولة الوطنية الجامعية للروبوتات والذكاء الاصطناعي"
    : "A project participating in the National University Championship for Robotics and Artificial Intelligence"}
</p>

<p className="mt-2 text-xl font-bold text-green-600">
  NURAI 2026
</p>
      </div>
    </main>
  );
}