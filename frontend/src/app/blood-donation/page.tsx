"use client";

import { useEffect, useState } from "react";

export default function BloodDonationPage() {

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("ar");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [location, setLocation] = useState("");
const donorBloodType =
  typeof window !== "undefined"
    ? localStorage.getItem(
        "donorBloodType"
      )
    : "";
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

    const volunteerName =
      localStorage.getItem("volunteerName");

    const volunteerPhone =
      localStorage.getItem("volunteerPhone");

    if (volunteerName) {
      setName(volunteerName);
    }

    if (volunteerPhone) {
      setPhone(volunteerPhone);
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
        className={`max-w-2xl mx-auto p-8 rounded-xl shadow ${
          darkMode
            ? "bg-gray-800"
            : "bg-white"
        }`}
      >

        <h1 className="text-4xl font-bold text-red-600 text-center mb-8">
          {language === "ar"
  ? "🩸 التبرع بالدم"
  : "🩸 Blood Donation"}
        </h1>

        <p className="text-center mb-8">
         {language === "ar"
  ? "سجل بياناتك كمُتبرع بالدم لمساعدة المحتاجين بسرعة."
  : "Register as a blood donor to help people in need quickly."}
        </p>

        <div
          className={`p-4 rounded-lg mb-4 ${
            darkMode
              ? "bg-gray-700"
              : "bg-gray-100"
          }`}
        >
          <p>
            {language === "ar"
  ? "👤 الاسم:"
  : "👤 Name:"} {name}
          </p>

          <p className="mt-2">
           {language === "ar"
  ? "📞 الهاتف:"
  : "📞 Phone:"} {phone}
          </p>
        </div>

        <select
          value={bloodType}
          onChange={(e) =>
            setBloodType(e.target.value)
          }
          className={`w-full border p-3 rounded mb-4 ${
            darkMode
              ? "bg-gray-700 text-white"
              : "bg-white text-black"
          }`}
        >
          <option value="">
           {language === "ar"
  ? "اختر فصيلة الدم"
  : "Select Blood Type"}
          </option>

          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>

        <button
          onClick={() => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setLocation(
                  `${position.coords.latitude}, ${position.coords.longitude}`
                );
              }
            );
          }}
          className="w-full bg-blue-600 text-white p-3 rounded-lg mb-4"
        >
          {language === "ar"
  ? "📍 تحديد موقعي"
  : "📍 Use My Location"}
        </button>

        {location && (
          <p className="text-center mb-4">
            {language === "ar"
  ? `📍 ${location}`
  : `📍 Location: ${location}`}
          </p>
        )}

        <button
  onClick={async () => {

    if (!bloodType) {
      alert("يرجى اختيار فصيلة الدم");
      return;
    }

    if (!location) {
      alert("يرجى تحديد الموقع");
      return;
    }

    try {

      const response = await fetch(
        "https://mueen-project-production.up.railway.app/blood-donor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            bloodType,
            location,
          }),
        }
      );

      const data = await response.json();

    localStorage.setItem(
  "donorBloodType",
  bloodType
);

alert(data.message);

window.location.href =
  "/blood-requests";
    } catch (error) {

      alert("فشل التسجيل");

    }

  }}
  className="w-full bg-red-600 text-white p-3 rounded-lg"
>
  {language === "ar"
  ? "🩸 تسجيل كمتبرع"
  : "🩸 Register As Donor"}
</button>
      </div>
    </main>
  );
}