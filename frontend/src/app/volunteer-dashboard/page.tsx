"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function VolunteerDashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [volunteerLocation, setVolunteerLocation] = useState("");
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
  useEffect(() => {
    fetch("http://localhost:5000/requests")
      .then((res) => res.json())
      .then((data) => {

  const filteredData = data.filter(
  (item: any) =>
    item.requestType !== "متبرع دم"
);

const sortedData = [...filteredData].sort(
  (a: any, b: any) => {

    const priority: Record<string, number> = {
  "طارئة جدا": 3,
  "متوسطة": 2,
  "عادية": 1
};
    return (
      (priority[b.urgency] || 0) -
      (priority[a.urgency] || 0)
    );

  });

  setRequests(sortedData);

});
  }, []);
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
      <div className="max-w-5xl mx-auto">
      <div className="flex justify-center gap-4 mb-6">

  <Link href="/completed-requests">
    <button className="bg-green-700 text-white px-4 py-2 rounded-lg">
      {language === "ar"
  ? "📂 الحالات المكتملة"
  : "📂 Completed Requests"}
    </button>
  </Link>

  <button
    onClick={getVolunteerLocation}
    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
  >
    {language === "ar"
  ? "📍 استخدام موقعي الحالي"
  : "📍 Use My Current Location"}
  </button>


{volunteerLocation && (

  <p className="text-center text-green-600 mb-6">
   {language === "ar"
  ? "تم تحديد موقع المتطوع بنجاح 📍"
  : "Volunteer Location Selected Successfully 📍"}
  </p>

)}
</div>
        <div className="grid md:grid-cols-4 gap-4 mb-8">

  <div className={`p-4 rounded-xl shadow text-center ${
  darkMode
    ? "bg-gray-800 text-white"
    : "bg-white"
}`}>
    <h3 className="font-bold">{language === "ar"
  ? "📋 جميع الحالات"
  : "📋 All Requests"}</h3>
    <p className="text-2xl">{requests.filter(
  (item: any) => item.status !== "مكتمل"
).length}</p>
  </div>

  <div 
  className={`p-4 rounded-xl shadow text-center ${
    darkMode
      ? "bg-red-900 text-white"
      : "bg-red-100"
  }`}
>
    <h3 className="font-bold">{language === "ar"
  ? "🔴 الطارئة"
  : "🔴 Urgent"}</h3>
    <p className="text-2xl">
      {
        requests.filter(
  (item: any) =>
    item.urgency === "طارئة جدا" &&
    item.status !== "مكتمل"
).length
      }
    </p>
  </div>

  <div
  className={`p-4 rounded-xl shadow text-center ${
    darkMode
      ? "bg-yellow-800 text-white"
      : "bg-yellow-100"
  }`}
>
    <h3 className="font-bold">{language === "ar"
  ? "🟡 المتوسطة"
  : "🟡 Medium"}</h3>
    <p className="text-2xl">
      {
        requests.filter(
  (item: any) =>
    item.urgency === "متوسطة" &&
    item.status !== "مكتمل"
).length
      }
    </p>
  </div>

  <div
  className={`p-4 rounded-xl shadow text-center ${
    darkMode
      ? "bg-green-900 text-white"
      : "bg-green-100"
  }`}
>
    <h3 className="font-bold">{language === "ar"
  ? "🟢 العادية"
  : "🟢 Normal"}</h3>
    <p className="text-2xl">
      {
        requests.filter(
  (item: any) =>
    item.urgency === "عادية" &&
    item.status !== "مكتمل"
).length
      }
    </p>
  </div>

</div>
        
        <div className="grid gap-6">

          {requests
  .filter((item: any) => item.status !== "مكتمل")
  .map((item: any) => (
            <div
              key={item.id}
              className={`rounded-xl shadow-lg p-6 ${
  darkMode
    ? "bg-gray-800 text-white"
    : "bg-white"
}`}
            >
              <h2 className="text-2xl font-bold mb-3">

  {
  item.requestType === "دواء"
    ? (language === "ar" ? "💊 دواء" : "💊 Medicine")
  : item.requestType === "إسعاف"
    ? (language === "ar" ? "🚑 إسعاف" : "🚑 Ambulance")
  : item.requestType === "طعام"
    ? (language === "ar" ? "🍲 طعام" : "🍲 Food")
  : item.requestType === "ملابس"
    ? (language === "ar" ? "👕 ملابس" : "👕 Clothes")
  : item.requestType === "دعم مالي"
    ? (language === "ar" ? "💰 دعم مالي" : "💰 Financial Support")
  : item.requestType
}

</h2>
              <div className="mb-4">

  {
  item.urgency === "طارئة جدا"
    ? (language === "ar"
        ? "طارئة جدا"
        : "Very Urgent")
  : item.urgency === "متوسطة"
    ? (language === "ar"
        ? "متوسطة"
        : "Medium")
  : item.urgency === "عادية"
    ? (language === "ar"
        ? "عادية"
        : "Normal")
  : item.urgency
}

</div>

              <p className="mb-2">
                {language === "ar"
  ? "العمر:"
  : "Age:"} {item.age}
              </p>
              <p className="mb-2 text-green-600 font-bold">
               📞 {item.phone}
              </p>

              <p className="mb-2">
                 {item.description}
              </p>
              {item.requestType === "دعم مالي" &&
 item.financialType && (
  <p className="mt-2">
    {language === "ar"
      ? "💰 نوع الدعم: "
      : "💰 Support Type: "}

    {item.financialType === "عملية جراحية"
      ? (language === "ar" ? "عملية جراحية" : "Surgery")
      : item.financialType === "إيجار منزل"
      ? (language === "ar" ? "إيجار منزل" : "House Rent")
      : item.financialType === "شراء دواء"
      ? (language === "ar" ? "شراء دواء" : "Buy Medicine")
      : item.financialType === "جهاز طبي"
      ? (language === "ar" ? "جهاز طبي" : "Medical Device")
      : item.financialType === "مستلزمات منزلية"
      ? (language === "ar" ? "مستلزمات منزلية" : "Home Essentials")
      : item.financialType === "رسوم دراسة"
      ? (language === "ar" ? "رسوم دراسة" : "Education Fees")
      : item.financialType === "أخرى"
      ? (language === "ar" ? "أخرى" : "Other")
      : item.financialType}
  </p>
)}
              {item.image && (
  <img
    src={`http://localhost:5000/uploads/${item.image}`}
    alt="صورة الحالة"
    className="w-full max-w-sm rounded-lg mt-3"
  />
)}
              {volunteerLocation && (
  <p className="mb-2 text-purple-600">
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

              <div className="flex gap-3 mt-4">

 <a
  href={`https://www.google.com/maps?q=${item.location}`}
  target="_blank"
  className="mb-2 text-blue-600 block"
>
 {language === "ar"
  ? "📍 فتح الموقع على الخريطة"
  : "📍 Open Location On Map"}
</a>

  {item.status === "مكتمل" ? (

  <span className="bg-green-700 text-white px-4 py-2 rounded-lg">
   {language === "ar"
  ? "✅ مكتمل"
  : "✅ Completed"}
  </span>

) : item.status === "قيد المساعدة" ? (

  <div className="flex gap-2">

    <span className="bg-yellow-600 text-white px-4 py-2 rounded-lg">
      {language === "ar"
  ? "🟡 قيد المساعدة"
  : "🟡 In Progress"}
    </span>

    <button
      onClick={async () => {

        try {

          const response = await fetch(
            `http://localhost:5000/request-complete/${item.id}`,
            {
              method: "PUT",
            }
          );

          const result = await response.json();

          alert(result.message);

          window.location.reload();

        } catch (error) {

          console.log(error);

          alert("فشل إنهاء الحالة");

        }

      }}
      className="bg-green-700 text-white px-4 py-2 rounded-lg"
    >
      {language === "ar"
  ? "✅ إنهاء الحالة"
  : "✅ Complete Request"}
    </button>

  </div>

) : (

  <button
    onClick={async () => {
      const volunteerName =
  localStorage.getItem("volunteerName");

const volunteerPhone =
  localStorage.getItem("volunteerPhone");

if (!volunteerName || !volunteerPhone) {
  alert(
    "يرجى إكمال بيانات المتطوع أولاً من صفحة التطوع"
  );
  return;
}

      try {

        const volunteerName =
  localStorage.getItem("volunteerName");

const volunteerPhone =
  localStorage.getItem("volunteerPhone");

const response = await fetch(
  `http://localhost:5000/request/${item.id}`,
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

        const result = await response.json();

        alert(result.message);

        window.location.reload();

      } catch (error) {

        console.log(error);

        alert("فشل تحديث الحالة");

      }

    }}
    className="bg-green-600 text-white px-4 py-2 rounded-lg"
  >
    {language === "ar"
  ? "🤝 أستطيع المساعدة"
  : "🤝 I Can Help"}
  </button>

)}

              </div>

            </div>
          ))}

        </div>

      </div>

    </main>
  );
}