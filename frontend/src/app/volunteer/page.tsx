"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function VolunteerPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("ar");
const [name, setName] = useState("");
const [phone, setPhone] = useState("");
useEffect(() => {
  const savedMode = localStorage.getItem("darkMode");

  if (savedMode === "true") {
    setDarkMode(true);
  }
  const savedLanguage =
  localStorage.getItem("language");

if (savedLanguage) {
  setLanguage(savedLanguage);
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
  className={`max-w-xl mx-auto p-6 rounded-xl shadow ${
    darkMode
      ? "bg-gray-800 text-white"
      : "bg-white"
  }`}
>

        <h1 className="text-3xl font-bold text-green-600 text-center mb-6">
          {language === "ar"
  ? "🤝 التسجيل كمتطوع"
  : "🤝 Volunteer Registration"}
        </h1>

        <input
  value={name}
  onChange={(e) => setName(e.target.value)}
  className={`w-full border p-3 rounded mb-4 ${
    darkMode
      ? "bg-gray-700 text-white placeholder:text-gray-400"
      : "bg-white text-black"
  }`}
  placeholder={
  language === "ar"
    ? "الاسم الكامل"
    : "Full Name"
}
/>

        <input
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  className={`w-full border p-3 rounded mb-4 ${
    darkMode
      ? "bg-gray-700 text-white placeholder:text-gray-400"
      : "bg-white text-black"
  }`}
  placeholder={
  language === "ar"
    ? "رقم الهاتف"
    : "Phone Number"
}
/>

        <div className="grid grid-cols-2 gap-3">

          <Link href="/blood-donation">
  <button className="border rounded-lg p-3 w-full">
    {language === "ar"
  ? "🩸 متبرع دم"
  : "🩸 Blood Donor"}
  </button>
</Link>
          <button className="border rounded-lg p-3">
            {language === "ar"
  ? "💊 توفير دواء"
  : "💊 Provide Medicine"}
          </button>

          <button className="border rounded-lg p-3">
            {language === "ar"
  ? "🚗 نقل مرضى"
  : "🚗 Patient Transport"}
          </button>

          <button className="border rounded-lg p-3">
            {language === "ar"
  ? "🍲 توزيع طعام"
  : "🍲 Food Distribution"}
          </button>

          <button className="border rounded-lg p-3 col-span-2">
            {language === "ar"
  ? "👕 توزيع ملابس"
  : "👕 Clothes Distribution"}
          </button>
          <button
  onClick={() => {
    if (!name || !phone) {
      alert("يرجى إدخال الاسم ورقم الهاتف");
      return;
    }

    localStorage.setItem("volunteerName", name);
    localStorage.setItem("volunteerPhone", phone);

    alert("تم حفظ بيانات المتطوع بنجاح ✅");
  }}
  className="w-full bg-blue-600 text-white p-3 rounded-lg mt-6"
>
  {language === "ar"
  ? "💾 حفظ البيانات"
  : "💾 Save Data"}
</button>

<Link href="/volunteer-dashboard">
  <button className="w-full bg-green-600 text-white p-3 rounded-lg mt-3">
    {language === "ar"
  ? "📋 لوحة المتطوعين"
  : "📋 Volunteer Dashboard"}
  </button>
</Link>

<button
  onClick={() => {
    localStorage.removeItem("volunteerName");
    localStorage.removeItem("volunteerPhone");

    alert("تم حذف بيانات المتطوع");
  }}
  className="w-full bg-red-600 text-white p-3 rounded-lg mt-3"
>
 {language === "ar"
  ? "🗑️ حذف بيانات المتطوع"
  : "🗑️ Delete Volunteer Data"}
</button>


        </div>

      </div>

    </main>
  );
}