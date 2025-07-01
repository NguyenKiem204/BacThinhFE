import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  ExternalLink,
} from "lucide-react";
import logo from "@assets/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Lịch lễ", href: "/masses" },
    { name: "Tin tức", href: "/news" },
    { name: "Sự kiện", href: "/events" },
    { name: "Kinh nguyện", href: "/prayers" },
    { name: "Thư viện", href: "/media" },
    { name: "Liên hệ", href: "/contact" },
    { name: "Về chúng tôi", href: "/about" },
  ];

  const services = [
    { name: "Thánh lễ hàng ngày", href: "/masses" },
    { name: "Lễ cưới", href: "/services/wedding" },
    { name: "Lễ rửa tội", href: "/services/baptism" },
    { name: "Lễ an táng", href: "/services/funeral" },
    { name: "Từ thiện", href: "/charity" },
    { name: "Giáo lý", href: "/catechesis" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com/giaoxuso",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/giaoxuso",
      color: "hover:text-pink-600",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://youtube.com/giaoxuso",
      color: "hover:text-red-600",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={logo}
                  alt="Logo Giáo Xứ Bắc Thịnh"
                  className="w-12 h-12 rounded-lg object-cover bg-white shadow"
                />
                <div>
                  <h3 className="text-xl font-bold">Giáo Xứ Bắc Thịnh</h3>
                  <p className="text-gray-400 text-sm">Cộng đoàn đức tin</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Giáo Xứ Bắc Thịnh là một cộng đoàn Kitô giáo sôi động, nơi mọi
                người được mời gọi sống đức tin và phục vụ tha nhân trong tình
                yêu của Chúa.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>123 Đường ABC, Quận XYZ, TP.HCM</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-green-400" />
                  <span>028 1234 5678</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-yellow-400" />
                  <span>info@giaoxuso.vn</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span>Thánh lễ: 6:00, 18:00, 20:00</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white">
                Liên kết nhanh
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:scale-150 transition-transform duration-200"></span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Services */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Dịch vụ</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li
                    key={service.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={service.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-green-400 rounded-full group-hover:scale-150 transition-transform duration-200"></span>
                      {service.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Google Maps & Social */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white">
                Bản đồ & Mạng xã hội
              </h4>

              {/* Google Maps */}
              <div className="mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4439.59528891074!2d105.49687817577023!3d18.84851755907349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139df9a7839fa49%3A0x3cda290423364c3!2zR2nDoW8gaOG7jSDEkeG7mWMgbOG6rXAgQuG6r2MgVGjhu4tuaA!5e1!3m2!1sen!2sus!4v1750827966525!5m2!1sen!2sus"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full rounded-lg"
                  title="Giáo xứ Số trên Google Maps"
                ></iframe>
                <motion.a
                  href="https://maps.google.com/?q=Giáo+xứ+Số+TPHCM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm mt-2 transition-colors duration-200"
                  whileHover={{ x: 3 }}
                >
                  Xem trên Google Maps
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>

              {/* Social Links */}
              <div>
                <h5 className="text-sm font-medium text-gray-400 mb-3">
                  Theo dõi chúng tôi
                </h5>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-300 transition-all duration-200 ${social.color}`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} Giáo Xứ Bắc Thịnh. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a
                href="/privacy"
                className="hover:text-white transition-colors duration-200"
              >
                Chính sách bảo mật
              </a>
              <a
                href="/terms"
                className="hover:text-white transition-colors duration-200"
              >
                Điều khoản sử dụng
              </a>
              <a
                href="/sitemap"
                className="hover:text-white transition-colors duration-200"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
