import LoadingSpinner from "../components/common/LoadingSpinner";
import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 dark:text-blue-200 mb-8">
          Liên hệ với Giáo Xứ Bắc Thịnh
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Thông tin liên hệ */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">
                Thông tin liên hệ
              </h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                <li>
                  <strong>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, TP.HCM
                </li>
                <li>
                  <strong>Điện thoại:</strong> 028 1234 5678
                </li>
                <li>
                  <strong>Email:</strong> info@giaoxuso.vn
                </li>
                <li>
                  <strong>Giờ lễ:</strong> 6:00, 18:00, 20:00
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4439.59528891074!2d105.49687817577023!3d18.84851755907349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139df9a7839fa49%3A0x3cda290423364c3!2zR2nDoW8gaOG7jSDEkeG7mWMgbOG6rXAgQuG6r2MgVGjhu4tuaA!5e1!3m2!1sen!2sus!4v1750827966525!5m2!1sen!2sus"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full rounded-lg"
                title="Bản đồ Giáo xứ Bắc Thịnh"
              ></iframe>
            </div>
          </div>
          {/* Form liên hệ */}
          <form
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">
              Gửi liên hệ
            </h2>
            {sent ? (
              <div className="text-green-600 text-center font-semibold py-8">
                Gửi liên hệ thành công! Chúng tôi sẽ phản hồi sớm nhất.
              </div>
            ) : loading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size={48} />
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                  required
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                />
                <textarea
                  placeholder="Nội dung liên hệ"
                  rows={5}
                  className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl mt-2"
                >
                  Gửi liên hệ
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
