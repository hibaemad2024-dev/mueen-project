"use client";

import { useEffect, useState } from "react";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState<number[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/requests")
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-700 mb-2">
          الطلبات المسجلة
        </h1>

        <p className="text-gray-600 mb-6">
          جميع الطلبات المرسلة عبر نظام HelpNet AI
        </p>

        <div className="bg-white shadow-lg rounded-xl p-4 mb-6">
          <h2 className="text-xl font-semibold">
            عدد الطلبات: {requests.length}
          </h2>
        </div>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-center">ID</th>
                <th className="p-3 text-center">نوع الطلب</th>
                <th className="p-3 text-center">العمر</th>
                <th className="p-3 text-center">الموقع</th>
                <th className="p-3 text-center">الخطورة</th>
                <th className="p-3 text-center">الوصف</th>
                <th className="p-3 text-center">المساعدة</th>
              </tr>
            </thead>

            <tbody>

              {requests.map((item: any) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3 text-center">{item.id}</td>
                  <td className="p-3 text-center">{item.requestType}</td>
                  <td className="p-3 text-center">{item.age}</td>
                  <td className="p-3 text-center">

  <a
    href={`https://www.google.com/maps?q=${item.location}`}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
  >
    📍 عرض الموقع
  </a>

</td>
                  <td className="p-3 text-center">

  <span
  className={`px-4 py-2 rounded-full text-white whitespace-nowrap ${
      item.urgency === "طارئة جدا"
        ? "bg-red-600"
        : item.urgency === "متوسطة"
        ? "bg-yellow-500"
        : "bg-green-600"
    }`}
  >
    {item.urgency}
  </span>

</td>
                  <td className="p-3 text-center">{item.description}</td>
                  <td className="p-3 text-center">

  <td className="p-3 text-center">

  {acceptedRequests.includes(item.id) ? (

    <span className="bg-green-600 text-white px-4 py-2 rounded-lg">
      ✅ تم استلام الحالة
    </span>

  ) : (

    <button
      onClick={() =>
        setAcceptedRequests([
          ...acceptedRequests,
          item.id,
        ])
      }
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
    >
      🤝 أستطيع المساعدة
    </button>

  )}

</td>

</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}