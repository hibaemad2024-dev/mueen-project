"use client";

import { useEffect, useState } from "react";

export default function EmergencyPage() {

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("ar");

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
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-red-600 text-center mb-8">
          {language === "ar"
  ? "🚨 أرقام الطوارئ"
  : "🚨 Emergency Numbers"}
        </h1>

        <div className="grid gap-4">

         <div
  className={`p-6 rounded-xl shadow text-center ${
    darkMode
      ? "bg-gray-800 text-white"
      : "bg-white"
  }`}
>
            <h2 className="text-2xl font-bold">
              {language === "ar"
  ? "🚑 الإسعاف"
  : "🚑 Ambulance"}
            </h2>

            <p className="text-3xl text-red-600 mt-2">
              122
            </p>
          </div>

         <div
  className={`p-6 rounded-xl shadow text-center ${
    darkMode
      ? "bg-gray-800 text-white"
      : "bg-white"
  }`}
>
            <h2 className="text-2xl font-bold">
              {language === "ar"
  ? "🚒 الدفاع المدني / الإطفاء"
  : "🚒 Civil Defense / Fire Department"}
            </h2>

            <p className="text-3xl text-red-600 mt-2">
              115
            </p>
          </div>

          <div
  className={`p-6 rounded-xl shadow text-center ${
    darkMode
      ? "bg-gray-800 text-white"
      : "bg-white"
  }`}
>
            <h2 className="text-2xl font-bold">
              {language === "ar"
  ? "👮 الشرطة"
  : "👮 Police"}
            </h2>

            <p className="text-3xl text-red-600 mt-2">
              104
            </p>
          </div>

          <div
  className={`p-6 rounded-xl shadow text-center ${
    darkMode
      ? "bg-gray-800 text-white"
      : "bg-white"
  }`}
>
            <h2 className="text-2xl font-bold">
             {language === "ar"
  ? "☎️ عمليات وزارة الداخلية"
  : "☎️ Ministry of Interior Operations"}
            </h2>

            <p className="text-3xl text-red-600 mt-2">
              130
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}