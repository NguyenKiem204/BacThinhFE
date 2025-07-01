import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";

export default function WeekMassesTable({ weekMasses }) {
  if (!Array.isArray(weekMasses) || weekMasses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-300">
        Không có dữ liệu lịch lễ tuần.
      </div>
    );
  }

  // Hàm so sánh giờ dạng 'HH:mm'
  function compareTime(a, b) {
    const [ah, am] = a.split(":").map(Number);
    const [bh, bm] = b.split(":").map(Number);
    return ah !== bh ? ah - bh : am - bm;
  }

  // Lấy tất cả các khung giờ xuất hiện trong tuần, sắp xếp tăng dần
  const allTimes = Array.from(
    new Set(weekMasses.flatMap((day) => day.masses.map((m) => m.time)))
  ).sort(compareTime);

  return (
    <section className="py-16">
      <div className="w-full px-2 sm:px-4 md:px-8 overflow-x-auto">
        <table className="min-w-[700px] md:min-w-full border-collapse rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg table-fixed">
          <colgroup>
            <col style={{ width: "90px" }} />
            {weekMasses.map((_, idx) => (
              <col key={idx} style={{ width: `${100 / weekMasses.length}%` }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-left align-middle min-w-[90px] h-16">
                Giờ
              </th>
              {weekMasses.map((day, idx) => (
                <th
                  key={idx}
                  className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-center align-middle min-w-[120px] h-16"
                >
                  <div className="font-semibold">{day.day}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-300">
                    {day.date}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allTimes.map((time, rowIdx) => (
              <tr
                key={time}
                className={
                  rowIdx % 2 === 0
                    ? "even:bg-gray-50 dark:even:bg-gray-900/30"
                    : ""
                }
              >
                <td className="p-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap border-t border-gray-200 dark:border-gray-700 align-middle min-w-[90px] h-16 text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <Clock className="w-4 h-4 text-blue-500" />
                    {time}
                  </div>
                </td>
                {weekMasses.map((day, idx) => {
                  const masses = day.masses.filter((m) => m.time === time);
                  return (
                    <td
                      key={idx}
                      className="p-2 text-gray-700 dark:text-gray-200 align-middle border-t border-gray-200 dark:border-gray-700 min-w-[100px] h-16 text-center min-h-[48px]"
                    >
                      {masses.length === 0 ? (
                        <span className="text-gray-400 italic">-</span>
                      ) : (
                        masses.map((mass, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`w-full h-full min-h-[48px] flex flex-col items-center justify-center rounded-lg p-1 shadow-sm bg-blue-50 dark:bg-blue-900/30 mb-2 last:mb-0 truncate ${
                              mass.isSolemn
                                ? "border-2 border-yellow-500 bg-yellow-100 dark:bg-yellow-900/50"
                                : ""
                            }`}
                          >
                            <div className="flex items-center gap-1 text-sm font-medium justify-center w-full truncate">
                              {mass.isSolemn && (
                                <span
                                  title="Lễ trọng"
                                  className="text-yellow-600 dark:text-yellow-300"
                                >
                                  🔥
                                </span>
                              )}
                              <span
                                className="truncate"
                                title={mass.specialName || mass.type}
                              >
                                {mass.specialName || mass.type}
                              </span>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
