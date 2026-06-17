"use client";

import { useEffect, useState } from "react";

export default function ServicesPage() {

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

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-blue-700 mb-3">
          {language === "ar"
  ? "🏥 الخدمات القريبة"
  : "🏥 Nearby Services"}
        </h1>

        <p
          className={`text-center mb-8 ${
            darkMode
              ? "text-gray-300"
              : "text-gray-600"
          }`}
        >
         {language === "ar"
  ? "الوصول السريع إلى الخدمات المهمة القريبة منك"
  : "Quick Access To Important Services Near You"}
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          <a
            href="https://www.google.com/maps/search/hospital+near+me"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-8 rounded-xl shadow-lg text-center hover:shadow-xl ${
              darkMode
                ? "bg-gray-800 text-white"
                : "bg-white"
            }`}
          >
            <div className="text-5xl mb-4">🏥</div>

            <h2 className="text-xl font-bold">
              {language === "ar"
  ? "أقرب مستشفى"
  : "Nearest Hospital"}
            </h2>
          </a>

          <a
            href="https://www.google.com/maps/search/pharmacy+near+me"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-8 rounded-xl shadow-lg text-center hover:shadow-xl ${
              darkMode
                ? "bg-gray-800 text-white"
                : "bg-white"
            }`}
          >
            <div className="text-5xl mb-4">💊</div>

            <h2 className="text-xl font-bold">
             {language === "ar"
  ? "أقرب صيدلية"
  : "Nearest Pharmacy"}
            </h2>
          </a>

          <a
            href="https://www.google.com/maps/search/police+station+near+me"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-8 rounded-xl shadow-lg text-center hover:shadow-xl ${
              darkMode
                ? "bg-gray-800 text-white"
                : "bg-white"
            }`}
          >
            <div className="text-5xl mb-4">🚓</div>

            <h2 className="text-xl font-bold">
             {language === "ar"
  ? "أقرب مركز شرطة"
  : "Nearest Police Station"}
            </h2>
          </a>

        </div>

      </div>

    </main>
  );
}