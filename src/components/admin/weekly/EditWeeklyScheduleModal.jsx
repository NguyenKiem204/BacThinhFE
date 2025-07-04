import React, { useState, useEffect } from "react";
import { updateWeeklySchedule } from "../../../services/adminWeeklyScheduleAPI";
import toast from "react-hot-toast";

const daysOfWeek = [
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
  "Chủ nhật",
];

const emptyMass = () => ({
  time: "",
  type: "",
  celebrant: "",
  specialName: "",
  note: "",
  isSolemn: false,
});

const EditWeeklyScheduleModal = ({ open, schedule, onClose, onSuccess }) => {
  const [weekStartDate, setWeekStartDate] = useState("");
  const [weekEndDate, setWeekEndDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dailySchedules, setDailySchedules] = useState([]);
  const [expanded, setExpanded] = useState(Array(7).fill(false));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && schedule) {
      setWeekStartDate(schedule.weekStartDate || "");
      setWeekEndDate(schedule.weekEndDate || "");
      setTitle(schedule.title || "");
      setDescription(schedule.description || "");
      let daily = daysOfWeek.map((day, idx) => {
        const found = (schedule.dailySchedules || []).find(
          (d) => d.dayOfWeek === day
        );
        return found
          ? { ...found, masses: found.masses ? [...found.masses] : [] }
          : { dayOfWeek: day, date: "", masses: [] };
      });
      setDailySchedules(daily);
      setExpanded(Array(7).fill(false));
    }
  }, [open, schedule]);

  const handleAddMass = (dayIdx) => {
    setDailySchedules((prev) => {
      const copy = [...prev];
      copy[dayIdx].masses.push(emptyMass());
      return copy;
    });
  };

  const handleRemoveMass = (dayIdx, massIdx) => {
    setDailySchedules((prev) => {
      const copy = [...prev];
      copy[dayIdx].masses.splice(massIdx, 1);
      return copy;
    });
  };

  const handleMassChange = (dayIdx, massIdx, field, value) => {
    setDailySchedules((prev) => {
      const copy = [...prev];
      copy[dayIdx].masses[massIdx][field] = value;
      return copy;
    });
  };

  const handleDateChange = (dayIdx, value) => {
    setDailySchedules((prev) => {
      const copy = [...prev];
      copy[dayIdx].date = value;
      return copy;
    });
  };

  const handleExpand = (idx) => {
    setExpanded((prev) => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!weekStartDate || !weekEndDate || !title) {
      setError("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        weekStartDate,
        weekEndDate,
        title,
        description,
        dailySchedules: dailySchedules.map((d) => ({
          ...d,
          masses: d.masses.filter((m) => m.time && m.type && m.celebrant),
        })),
      };
      await updateWeeklySchedule(schedule.id, payload);
      toast.success("Cập nhật lịch tuần thành công!");
      setLoading(false);
      onSuccess && onSuccess();
      onClose && onClose();
    } catch (err) {
      setLoading(false);
      toast.error("Cập nhật lịch tuần thất bại!");
      setError(err?.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-3xl p-0 relative max-h-[90vh] flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="p-6 overflow-y-auto flex-1">
            <h2 className="text-xl font-bold mb-4 text-center">
              Chỉnh sửa lịch thánh lễ tuần
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Ngày bắt đầu tuần *
                </label>
                <input
                  type="date"
                  className="w-full border px-2 py-2 rounded-lg dark:bg-gray-900 dark:text-white dark:border-gray-700"
                  value={weekStartDate}
                  onChange={(e) => setWeekStartDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Ngày kết thúc tuần *
                </label>
                <input
                  type="date"
                  className="w-full border px-2 py-2 rounded-lg dark:bg-gray-900 dark:text-white dark:border-gray-700"
                  value={weekEndDate}
                  onChange={(e) => setWeekEndDate(e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Tiêu đề *
                </label>
                <input
                  type="text"
                  className="w-full border px-2 py-2 rounded-lg dark:bg-gray-900 dark:text-white dark:border-gray-700"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Mô tả</label>
                <textarea
                  className="w-full border px-2 py-2 rounded-lg dark:bg-gray-900 dark:text-white dark:border-gray-700"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">
                Danh sách 7 ngày trong tuần
              </h3>
              <div className="space-y-2">
                {dailySchedules.map((day, dayIdx) => (
                  <div
                    key={day.dayOfWeek}
                    className="border rounded-lg p-2 bg-gray-50 dark:bg-gray-900"
                  >
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => handleExpand(dayIdx)}
                    >
                      <div className="font-bold">{day.dayOfWeek}</div>
                      <button
                        type="button"
                        className="text-blue-600 text-xs underline"
                      >
                        {expanded[dayIdx] ? "Ẩn" : "Hiện"}
                      </button>
                    </div>
                    {expanded[dayIdx] && (
                      <div className="mt-2 space-y-2">
                        <div className="flex flex-col md:flex-row gap-2 mb-2">
                          <label className="text-sm font-medium">Ngày</label>
                          <input
                            type="date"
                            className="border px-2 py-1 rounded-lg dark:bg-gray-900 dark:text-white dark:border-gray-700"
                            value={day.date}
                            onChange={(e) =>
                              handleDateChange(dayIdx, e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          {day.masses.map((mass, massIdx) => (
                            <div
                              key={mass.id || massIdx}
                              className="border rounded p-2 bg-white dark:bg-gray-800 flex flex-col gap-2"
                            >
                              <div className="flex flex-wrap gap-2">
                                <input
                                  type="time"
                                  className="border px-2 py-1 rounded-lg w-28 dark:bg-gray-900 dark:text-white dark:border-gray-700"
                                  value={mass.time}
                                  onChange={(e) =>
                                    handleMassChange(
                                      dayIdx,
                                      massIdx,
                                      "time",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Giờ"
                                  required
                                />
                                <input
                                  type="text"
                                  className="border px-2 py-1 rounded-lg w-36 dark:bg-gray-900 dark:text-white dark:border-gray-700"
                                  value={mass.type}
                                  onChange={(e) =>
                                    handleMassChange(
                                      dayIdx,
                                      massIdx,
                                      "type",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Loại thánh lễ"
                                  required
                                />
                                <input
                                  type="text"
                                  className="border px-2 py-1 rounded-lg w-36 dark:bg-gray-900 dark:text-white dark:border-gray-700"
                                  value={mass.celebrant}
                                  onChange={(e) =>
                                    handleMassChange(
                                      dayIdx,
                                      massIdx,
                                      "celebrant",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Chủ tế"
                                  required
                                />
                                <input
                                  type="text"
                                  className="border px-2 py-1 rounded-lg w-36 dark:bg-gray-900 dark:text-white dark:border-gray-700"
                                  value={mass.specialName}
                                  onChange={(e) =>
                                    handleMassChange(
                                      dayIdx,
                                      massIdx,
                                      "specialName",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Tên đặc biệt"
                                />
                                <input
                                  type="text"
                                  className="border px-2 py-1 rounded-lg w-36 dark:bg-gray-900 dark:text-white dark:border-gray-700"
                                  value={mass.note}
                                  onChange={(e) =>
                                    handleMassChange(
                                      dayIdx,
                                      massIdx,
                                      "note",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Ghi chú"
                                />
                                <label className="flex items-center gap-1 text-xs">
                                  <input
                                    type="checkbox"
                                    checked={mass.isSolemn}
                                    onChange={(e) =>
                                      handleMassChange(
                                        dayIdx,
                                        massIdx,
                                        "isSolemn",
                                        e.target.checked
                                      )
                                    }
                                  />
                                  Thánh lễ trọng
                                </label>
                                <button
                                  type="button"
                                  className="text-red-600 text-xs underline ml-2"
                                  onClick={() =>
                                    handleRemoveMass(dayIdx, massIdx)
                                  }
                                >
                                  Xóa
                                </button>
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded text-xs"
                            onClick={() => handleAddMass(dayIdx)}
                          >
                            + Thêm thánh lễ
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {error && (
              <div className="text-red-600 mb-2 text-center">{error}</div>
            )}
          </div>
          <div className="flex justify-end gap-2 p-6 pt-0 bg-white dark:bg-gray-800 sticky bottom-0 z-10 border-t dark:border-gray-700">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
              onClick={onClose}
              disabled={loading}
            >
              Đóng
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWeeklyScheduleModal;
