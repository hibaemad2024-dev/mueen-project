"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function RequestPage() {
const [requestType, setRequestType] = useState("");
const [description, setDescription] = useState("");
const [phone, setPhone] = useState("");
const [age, setAge] = useState("");
const [location, setLocation] = useState("");
const [urgency, setUrgency] = useState("");
const [image, setImage] = useState<File | null>(null);
const [bloodType, setBloodType] = useState("");
const [financialType, setFinancialType] = useState("");
const [language, setLanguage] = useState("ar");
const [darkMode, setDarkMode] = useState(false);
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
const getLocation = () => {
if (!navigator.geolocation) {
alert("المتصفح لا يدعم GPS");
return;
}


navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    setLocation(`${lat}, ${lng}`);

    alert("تم تحديد الموقع بنجاح 📍");
  },
  () => {
    alert("يرجى السماح بالوصول إلى الموقع");
  }
);


};
const suggestUrgency = (text: string) => {

  const urgentWords = [
    "نزيف",
    "حادث",
    "اختناق",
    "إغماء",
    "حريق",
    "إسعاف",
    "طارئ"
  ];

  const mediumWords = [
    "دواء",
    "علاج",
    "مريض",
    "عملية",
    "مستشفى"
  ];

  const lowerText = text.toLowerCase();

  if (
    urgentWords.some(word =>
      lowerText.includes(word)
    )
  ) {
    setUrgency("طارئة جدا");
  }
  else if (
    mediumWords.some(word =>
      lowerText.includes(word)
    )
  ) {
    setUrgency("متوسطة");
  }
  else {
    setUrgency("عادية");
  }

};
const handleSubmit = async () => {

  try {

    const formData = new FormData();

    formData.append("requestType", requestType);
    formData.append("age", age);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("urgency", urgency);
    formData.append("phone", phone);
    formData.append("bloodType", bloodType);
    formData.append("financialType", financialType);

    if (image) {
      formData.append("image", image);
    }
console.log("bloodType =", bloodType);
console.log("financialType =", financialType);
    const response = await fetch(
      "http://localhost:5000/request",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    alert(result.message);

  } catch (error) {

    console.log(error);

    alert("فشل الاتصال بالخادم");

  }

};

return ( <main
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

    <h1 className="text-3xl font-bold text-red-600 text-center mb-6">
      {language === "ar"
  ? "🚨 أحتاج مساعدة الآن"
  : "🚨 I Need Help Now"}
    </h1>
<Link href="/emergency">

  <div className="bg-red-600 text-white text-center p-4 rounded-xl mb-6 cursor-pointer hover:bg-red-700">

   {language === "ar"
  ? "🚑 أرقام الطوارئ"
  : "🚑 Emergency Numbers"}
  </div>

</Link>
    <div className="grid grid-cols-2 gap-4 mb-6">

      <button
        type="button"
        onClick={() => setRequestType("متبرع دم")}
        className={`p-4 rounded-lg border text-lg ${
  requestType === "متبرع دم"
    ? "bg-red-600 text-white"
    : darkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-black"
}`}
      >
      {language === "ar" ? "🩸 دم" : "🩸 Blood"}
      </button>

      <button
        type="button"
        onClick={() => setRequestType("دواء")}
        className={`p-4 rounded-lg border text-lg ${
          requestType === "دواء"
            ? "bg-blue-600 text-white"
            : darkMode
? "bg-gray-800 text-white"
: "bg-white text-black"
        }`}
      >
        {language === "ar" ? "💊 دواء" : "💊 Medicine"}
      </button>

      <button
        type="button"
        onClick={() => setRequestType("إسعاف")}
        className={`p-4 rounded-lg border text-lg ${
          requestType === "إسعاف"
            ? "bg-green-600 text-white"
           : darkMode
? "bg-gray-800 text-white"
: "bg-white text-black"
        }`}
      >
        {language === "ar" ? "🚑 إسعاف" : "🚑 Ambulance"}
      </button>

      <button
        type="button"
        onClick={() => setRequestType("طعام")}
        className={`p-4 rounded-lg border text-lg ${
          requestType === "طعام"
            ? "bg-orange-500 text-white"
           : darkMode
? "bg-gray-800 text-white"
: "bg-white text-black"
        }`}
      >
        {language === "ar" ? "🍲 طعام" : "🍲 Food"}
      </button>

      <button
        type="button"
        onClick={() => setRequestType("ملابس")}
        className={`p-4 rounded-lg border text-lg col-span-2 ${
          requestType === "ملابس"
            ? "bg-purple-600 text-white"
           : darkMode
? "bg-gray-800 text-white"
: "bg-white text-black"
        }`}
      >
        {language === "ar" ? "👕 ملابس" : "👕 Clothes"}
      </button>
<button
  type="button"
  onClick={() => setRequestType("دعم مالي")}
  className={`p-4 rounded-lg border text-lg col-span-2 ${
    requestType === "دعم مالي"
      ? "bg-yellow-600 text-white"
      : darkMode
      ? "bg-gray-800 text-white"
      : "bg-white text-black"
  }`}
>
  {language === "ar"
  ? "💰 دعم مالي"
  : "💰 Financial Support"}
</button>
    </div>
{requestType === "متبرع دم" && (
  <select
    value={bloodType}
    onChange={(e) => setBloodType(e.target.value)}
    className={`w-full border p-3 rounded mb-4 ${
      darkMode
        ? "bg-gray-800 text-white"
        : "bg-white text-black"
    }`}
  >
    <option value="">{language === "ar"
  ? "اختر فصيلة الدم المطلوبة"
  : "Select Required Blood Type"}</option>
    <option>A+</option>
    <option>A-</option>
    <option>B+</option>
    <option>B-</option>
    <option>AB+</option>
    <option>AB-</option>
    <option>O+</option>
    <option>O-</option>
  </select>
)}
{requestType === "دعم مالي" && (
  <select
    value={financialType}
    onChange={(e) => setFinancialType(e.target.value)}
    className={`w-full border p-3 rounded mb-4 ${
      darkMode
        ? "bg-gray-800 text-white"
        : "bg-white text-black"
    }`}
  >
    <option value=""> {language === "ar"
  ? "اختر نوع الدعم"
  : "Select Support Type"}</option>
   <option value="عملية جراحية">
  {language === "ar"
    ? "عملية جراحية"
    : "Surgery"}
</option>

<option value="إيجار منزل">
  {language === "ar"
    ? "إيجار منزل"
    : "House Rent"}
</option>

<option value="شراء دواء">
  {language === "ar"
    ? "شراء دواء"
    : "Buy Medicine"}
</option>

<option value="جهاز طبي">
  {language === "ar"
    ? "جهاز طبي"
    : "Medical Device"}
</option>

<option value="مستلزمات منزلية">
  {language === "ar"
    ? "مستلزمات منزلية"
    : "Home Essentials"}
</option>

<option value="رسوم دراسة">
  {language === "ar"
    ? "رسوم دراسة"
    : "Education Fees"}
</option>

<option value="أخرى">
  {language === "ar"
    ? "أخرى"
    : "Other"}
</option>
  </select>
)}
    <h2 className="text-lg font-semibold mb-3">
     {language === "ar"
  ? "الفئة العمرية"
  : "Age Group"}
    </h2>

    <div className="grid grid-cols-2 gap-3 mb-4">

      <button
        type="button"
        onClick={() => setAge("1-10")}
        className={`p-3 rounded-lg border ${
          age === "1-10"
            ? "bg-blue-600 text-white"
           : darkMode
? "bg-gray-800 text-white"
: "bg-white text-black"
        }`}
      >
        👶 1 - 10
      </button>

      <button
        type="button"
        onClick={() => setAge("11-20")}
        className={`p-3 rounded-lg border ${
          age === "11-20"
            ? "bg-blue-600 text-white"
            : darkMode
? "bg-gray-800 text-white"
: "bg-white text-black"
        }`}
      >
        🧒 11 - 20
      </button>

      <button
        type="button"
        onClick={() => setAge("21-40")}
        className={`p-3 rounded-lg border ${
          age === "21-40"
            ? "bg-blue-600 text-white"
           : darkMode
? "bg-gray-800 text-white"
: "bg-white text-black"
        }`}
      >
        🧑 21 - 40
      </button>

      <button
        type="button"
        onClick={() => setAge("41-60")}
        className={`p-3 rounded-lg border ${
          age === "41-60"
            ? "bg-blue-600 text-white"
            : darkMode
? "bg-gray-800 text-white"
: "bg-white text-black"
        }`}
      >
        👨‍🦳 41 - 60
      </button>

      <button
        type="button"
        onClick={() => setAge("60+")}
        className={`p-3 rounded-lg border col-span-2 ${
          age === "60+"
            ? "bg-blue-600 text-white"
           : darkMode
? "bg-gray-800 text-white"
: "bg-white text-black"
        }`}
      >
        {language === "ar"
  ? "🩺 أكثر من 60"
  : "🩺 Over 60"}
      </button>

    </div>

    <div className="mb-4">

      <button
        type="button"
        onClick={getLocation}
        className="w-full bg-blue-600 text-white p-3 rounded-lg"
      >
        {language === "ar"
  ? "📍 استخدام موقعي الحالي"
  : "📍 Use My Current Location"}
      </button>

      {location && (
        <p className="mt-2 text-green-600 text-center">
         {language === "ar"
  ? "تم تحديد الموقع بنجاح 📍"
  : "Location Selected Successfully 📍"}
        </p>
      )}

    </div>
<h2 className="text-lg font-semibold mb-3">
 {language === "ar"
  ? "مستوى الخطورة"
  : "Urgency Level"}
</h2>

<div className="grid grid-cols-3 gap-3 mb-4">

  <button
    type="button"
    onClick={() => setUrgency("طارئة جدا")}
    className={`p-3 rounded-lg border ${
      urgency === "طارئة جدا"
        ? "bg-red-600 text-white"
      : darkMode
? "bg-gray-800 text-white"
: "bg-white text-black"
    }`}
  >
   {language === "ar"
  ? "🔴 طارئة جدًا"
  : "🔴 Very Urgent"}
  </button>

  <button
    type="button"
    onClick={() => setUrgency("متوسطة")}
    className={`p-3 rounded-lg border ${
      urgency === "متوسطة"
        ? "bg-yellow-500 text-white"
       : darkMode
? "bg-gray-800 text-white"
: "bg-white text-black"
    }`}
  >
   {language === "ar"
  ? "🟡 متوسطة"
  : "🟡 Medium"}
  </button>

  <button
    type="button"
    onClick={() => setUrgency("عادية")}
    className={`p-3 rounded-lg border ${
      urgency === "عادية"
        ? "bg-green-600 text-white"
        : darkMode
? "bg-gray-800 text-white"
: "bg-white text-black"
    }`}
  >
    {language === "ar"
  ? "🟢 عادية"
  : "🟢 Normal"}
  </button>

</div>
<div className="mb-4">

  <label className="block mb-2 font-semibold">
   {language === "ar"
  ? "📷 إرفاق صورة (اختياري)"
  : "📷 Attach Image (Optional)"}
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    }}
    className="w-full border p-2 rounded"
  />

</div>
<input
  type="text"
 placeholder={
  language === "ar"
    ? "📞 رقم الهاتف"
    : "📞 Phone Number"
}
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  className={`w-full border p-3 rounded mb-4 ${
    darkMode
      ? "bg-gray-800 text-white"
      : "bg-white text-black"
  }`}
/>
   <textarea
  className={`w-full border p-3 rounded mb-4 placeholder:text-gray-400 ${
    darkMode
      ? "bg-gray-800 text-white"
      : "bg-white text-black"
  }`}
  style={{ color: darkMode ? "white" : "black" }}
 placeholder={
  language === "ar"
    ? "اكتب وصف الحالة"
    : "Describe The Situation"
}
  value={description}
  onChange={(e) => {
    setDescription(e.target.value);
    suggestUrgency(e.target.value);
  }}
></textarea>

    <button
      className="w-full bg-red-600 text-white p-3 rounded-lg text-lg"
      onClick={handleSubmit}
    >
{language === "ar"
  ? "إرسال طلب المساعدة"
  : "Submit Request"}
    </button>

  </div>

</main>

);
}
