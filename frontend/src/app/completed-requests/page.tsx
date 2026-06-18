"use client";

import { useEffect, useState } from "react";

export default function CompletedRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");

    if (savedMode === "true") {
      setDarkMode(true);
    }

    fetch("https://mueen-project-production.up.railway.app/request"
)
      .then((res) => res.json())
      .then((data) => {
        const completed = data.filter(
          (item: any) => item.status === "مكتمل"
        );

        setRequests(completed);
      });
  }, []);

  return (
    <main
      className={`min-h-screen p-8 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100"
      }`}
    >
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-green-600 mb-8">
          📂 الحالات المكتملة
        </h1>

        <div className="grid gap-6">

          {requests.map((item: any) => (
            <div
              key={item.id}
              className={`rounded-xl shadow-lg p-6 ${
                darkMode
                  ? "bg-gray-800 text-white"
                  : "bg-white"
              }`}
            >
              <h2 className="text-2xl font-bold mb-3">
                {item.requestType}
              </h2>

              <p className="mb-2">
                العمر: {item.age}
              </p>

              <p className="mb-2">
                {item.description}
              </p>

              <span className="bg-green-700 text-white px-4 py-2 rounded-lg">
                ✅ مكتمل
              </span>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}