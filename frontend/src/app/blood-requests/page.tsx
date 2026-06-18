"use client";

import { useEffect, useState } from "react";

export default function BloodRequestsPage() {

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("ar");
  const [volunteerLocation, setVolunteerLocation] = useState("");
  const [requests, setRequests] = useState([]);
  const donorBloodType =
  typeof window !== "undefined"
    ? localStorage.getItem("donorBloodType")
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
    fetch("https://mueen-project-production.up.railway.app/request")
  .then((res) => res.json())
  .then((data) => {
    setRequests(data);
  })
  .catch((err) => {
    console.log(err);
  });
  }, []);
const calculateDistance = (
  volunteerLoc: string,
  requestLoc: string
) => {

  if (!volunteerLoc || !requestLoc) {
    return null;
  }

  const [lat1, lon1] = volunteerLoc
    .split(",")
    .map(Number);

  const [lat2, lon2] = requestLoc
    .split(",")
    .map(Number);

  const distance = Math.sqrt(
    Math.pow(lat2 - lat1, 2) +
    Math.pow(lon2 - lon1, 2)
  );

  return (distance * 111).toFixed(1);
};

const getVolunteerLocation = () => {

  if (!navigator.geolocation) {
    alert("المتصفح لا يدعم GPS");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setVolunteerLocation(`${lat}, ${lng}`);

      alert("تم تحديد موقع المتطوع بنجاح 📍");

    },
    () => {
      alert("يرجى السماح بالوصول إلى الموقع");
    }
  );

};
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
        <h1 className="text-4xl font-bold text-red-600 text-center mb-8">
          {language === "ar"
  ? "🩸 المحتاجون للدم"
  : "🩸 Blood Requests"}
        </h1>
        <button
  onClick={getVolunteerLocation}
  className="w-full bg-blue-600 text-white p-3 rounded-lg mb-6"
>
  {language === "ar"
  ? "📍 تحديد موقعي"
  : "📍 Use My Location"}
</button>

        {requests.length === 0 ? (

  <p className="text-center text-lg">
   {language === "ar"
  ? "لا توجد طلبات دم حالياً"
  : "No Blood Requests Available"}
  </p>

) : (

  requests.map((item: any) => (

    <div
      key={item.id}
      className={`p-4 rounded-lg mb-4 border ${
        darkMode
          ? "bg-gray-700"
          : "bg-gray-100"
      }`}
    >

      <h3 className="font-bold text-red-600 text-xl">
        {language === "ar"
  ? "🩸 طلب تبرع بالدم"
  : "🩸 Blood Donation Request"}
      </h3>

      <a
  href={`https://www.google.com/maps?q=${item.location}`}
  target="_blank"
  className="mt-2 text-blue-600 block"
>
  {language === "ar"
  ? "📍 فتح الموقع على الخريطة"
  : "📍 Open Location On Map"}
</a>

{volunteerLocation && (
  <p className="mt-2 text-purple-600">
    {language === "ar"
  ? `📏 تبعد تقريبًا ${calculateDistance(
      volunteerLocation,
      item.location
    )} كم`
  : `📏 About ${calculateDistance(
      volunteerLocation,
      item.location
    )} km away`}
  </p>
)}

      <p className="mt-2">
      {language === "ar"
  ? "📞 الهاتف:"
  : "📞 Phone:"} {item.phone}
      </p>
      {item.bloodType && (
  <p className="mt-2">
    {language === "ar"
  ? `🩸 فصيلة الدم المطلوبة: ${item.bloodType}`
  : `🩸 Required Blood Type: ${item.bloodType}`} {item.bloodType}
  </p>
)}
{donorBloodType &&
 item.bloodType && (
  <p
    className={`mt-2 font-bold ${
      donorBloodType === item.bloodType
        ? "text-green-500"
        : "text-red-500"
    }`}
  >
   {donorBloodType &&
 item.bloodType && (
  <p
    className={`mt-2 font-bold ${
      donorBloodType === item.bloodType
        ? "text-green-500"
        : "text-red-500"
    }`}
  >
    {donorBloodType === item.bloodType
      ? (language === "ar"
          ? "✅ الفصيلة متوافقة"
          : "✅ Compatible Blood Type")
      : (language === "ar"
          ? "❌ الفصيلة غير متوافقة"
          : "❌ Incompatible Blood Type")}
  </p>
)}
  </p>
)}

      <p className="mt-2">
        {language === "ar"
  ? `🚨 الحالة: ${item.urgency}`
  : `🚨 Urgency: ${item.urgency}`}
      </p>
      <p className="mt-2">
  {language === "ar"
  ? `📌 حالة الطلب: ${item.status}`
  : `📌 Request Status: ${item.status}`}
</p>
{item.status === "قيد المساعدة" &&
 item.volunteerName ===
 localStorage.getItem("volunteerName") && (

  <button
    onClick={async () => {

      try {

        const response = await fetch(
          `https://mueen-project-production.up.railway.app/request-complete/${item.id}`,
          {
            method: "PUT",
          }
        );

        const data = await response.json();

        alert(data.message);

        window.location.reload();

      } catch (error) {

        alert("فشل إكمال الحالة");

      }

    }}
    className="mt-4 w-full bg-blue-600 text-white p-3 rounded-lg"
  >
    {language === "ar"
  ? "✅ إكمال الحالة"
  : "✅ Complete Request"}
  </button>
)}
{item.status === "مفتوح" && (
  <button
    onClick={async () => {

      const volunteerName =
        localStorage.getItem("volunteerName");

      const volunteerPhone =
        localStorage.getItem("volunteerPhone");

      if (!volunteerName || !volunteerPhone) {
        alert(
          "يرجى إكمال بيانات المتطوع أولاً"
        );
        return;
      }

      try {

        const response = await fetch(
          `https://mueen-project-production.up.railway.app/request/${item.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              volunteerName,
              volunteerPhone,
            }),
          }
        );

        const data = await response.json();

        alert(data.message);

        window.location.reload();

      } catch (error) {

        alert("فشل تحديث الحالة");

      }

    }}
    className="mt-4 w-full bg-green-600 text-white p-3 rounded-lg"
  >
    {language === "ar"
  ? "🤝 أستطيع المساعدة"
  : "🤝 I Can Help"}
  </button>
)}
    </div>

  ))

)}

      </div>
    </main>
  );
}