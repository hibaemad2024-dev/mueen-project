"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("ar");
  const [requests, setRequests] = useState([]);
  useEffect(() => {
  const savedMode = localStorage.getItem("darkMode");

  if (savedMode === "true") {
    setDarkMode(true);
  }
}, []);
useEffect(() => {
  const savedLanguage = localStorage.getItem("language");

  if (savedLanguage) {
    setLanguage(savedLanguage);
  }
}, []);
useEffect(() => {
  fetch("https://mueen-project-production.up.railway.app/requests")
    .then((res) => res.json())
    .then((data) => setRequests(data));
}, []);
  return (
    <main
  className={`min-h-screen flex flex-col items-center justify-center p-8 ${
    darkMode
      ? "bg-gray-900 text-white"
      : "bg-gray-100"
  }`}
>

     <div
  className={`shadow-lg rounded-2xl p-10 max-w-4xl text-center transition-all duration-300 ${
    darkMode
      ? "bg-gray-800 text-white"
      : "bg-white"
  }`}
>
       <button
  onClick={() => {
  setDarkMode(!darkMode);

  localStorage.setItem(
    "darkMode",
    (!darkMode).toString()
  );
}}
  className={`mb-4 px-5 py-2 rounded-lg transition-all ${
    darkMode
      ? "bg-yellow-500 text-black"
      : "bg-gray-800 text-white"
  }`}
>
 {
  darkMode
    ? (
        language === "ar"
          ? "☀️ الوضع النهاري"
          : "☀️ Light Mode"
      )
    : (
        language === "ar"
          ? "🌙 الوضع الليلي"
          : "🌙 Dark Mode"
      )
}
</button>
<div className="mb-4 flex justify-center gap-2">

  <button
    onClick={() => {
  setLanguage("ar");
  localStorage.setItem("language", "ar");
}}
    className="bg-green-600 text-white px-4 py-2 rounded-lg"
  >
    العربية
  </button>

  <button
    onClick={() => {
  setLanguage("en");
  localStorage.setItem("language", "en");
}}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
    English
  </button>

</div>
<div className="text-7xl mb-4">
  🏥
</div>
        <h1 className="text-6xl font-extrabold text-blue-700 mb-4">
  {language === "ar" ? "مُعين" : "MUEEN"}
</h1>

        <p className="mt-4 text-xl text-gray-700">
  {language === "ar"
    ? "منصة المساعدة المجتمعية الذكية"
    : "Smart Community Assistance Platform"}
</p>

        <p className="mt-3 text-gray-500">
  {language === "ar"
    ? "ربط المحتاجين بالمتطوعين والخدمات الأساسية بسرعة وأمان باستخدام تقنيات ذكية لتحديد الأولويات وتنظيم الاستجابة."
    : "Connecting people in need with volunteers and essential services quickly and safely using smart technologies."}
</p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <Link href="/request">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
             {language === "ar"
  ? "طلب مساعدة"
  : "Request Help"}
            </button>
          </Link>

      
          <Link href="/volunteer">
  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
    {language === "ar"
  ? "🤝 أريد التطوع"
  : "🤝 Volunteer"}
  </button>
</Link>
<Link href="/blood-donation">
  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg">
    {language === "ar"
      ? "🩸 التبرع بالدم"
      : "🩸 Blood Donation"}
  </button>
</Link>
<Link href="/services">
  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
    {language === "ar"
  ? "🏥 الخدمات القريبة"
  : "🏥 Nearby Services"}
  </button>
</Link>
<Link href="/emergency">
  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg">
{language === "ar"
  ? "🚑 أرقام الطوارئ"
  : "🚑 Emergency Numbers"}
  </button>
</Link>
<Link href="/about">
  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
   {language === "ar"
  ? "ℹ️ عن مُعين"
  : "ℹ️ About MUEEN"}
  </button>
</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-10 mb-8">

  <div
  className={`p-4 rounded-xl shadow ${
    darkMode
      ? "bg-gray-700"
      : "bg-white"
  }`}
>
    <h3
  className={`font-bold ${
    darkMode ? "text-white" : "text-blue-700"
  }`}
>
      {language === "ar"
  ? "📋 جميع الحالات"
  : "📋 All Requests"}
    </h3>
    <p className="text-3xl mt-2">
      {requests.length}
    </p>
  </div>

  <div
  className={`p-4 rounded-xl shadow ${
    darkMode
      ? "bg-gray-700"
      : "bg-white"
  }`}
>
    <h3
  className={`font-bold ${
    darkMode ? "text-white" : "text-yellow-600"
  }`}
>
      {language === "ar"
  ? "🟡 قيد المساعدة"
  : "🟡 In Progress"}
    </h3>
    <p
  className={`text-3xl mt-2 ${
    darkMode ? "text-white" : "text-black"
  }`}
>
      {
        requests.filter(
          (item: any) =>
            item.status === "قيد المساعدة"
        ).length
      }
    </p>
  </div>

 <div
  className={`p-4 rounded-xl shadow ${
    darkMode
      ? "bg-gray-700"
      : "bg-white"
  }`}
>
    <h3
  className={`font-bold ${
    darkMode ? "text-white" : "text-green-600"
  }`}
>
     {language === "ar"
  ? "✅ مكتملة"
  : "✅ Completed"}
    </h3>
   <p
  className={`text-3xl mt-2 ${
    darkMode ? "text-white" : ""
  }`}
>
      {
        requests.filter(
          (item: any) =>
            item.status === "مكتمل"
        ).length
      }
    </p>
  </div>

</div>

<div className="mt-10">

  <h2 className="text-2xl font-bold text-center mb-6">
    {language === "ar"
      ? "⭐ مميزات مُعين"
      : "⭐ MUEEN Features"}
  </h2>

</div>
        <div className="grid md:grid-cols-3 gap-4 mt-10">

          <div className="bg-blue-50 p-4 rounded-xl">
            <h3 className="font-bold text-blue-700">
             {language === "ar"
  ? "سرعة الاستجابة"
  : "Fast Response"}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {language === "ar"
  ? "استقبال الطلبات بشكل فوري."
  : "Instant request processing."}
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl">
            <h3 className="font-bold text-green-700">
{language === "ar"
  ? "إدارة الطلبات"
  : "Request Management"}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
{language === "ar"
  ? "حفظ وتنظيم جميع الطلبات."
  : "Store and organize all requests."}
            </p>
          </div>

          <div className="bg-red-50 p-4 rounded-xl">
            <h3 className="font-bold text-red-700">
{language === "ar"
  ? "حالات الطوارئ"
  : "Emergency Cases"}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
{language === "ar"
  ? "دعم النداءات العاجلة مستقبلاً."
  : "Support urgent emergency calls."}
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}