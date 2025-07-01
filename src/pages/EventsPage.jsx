import EventsSection from "../components/Home/EventsSection";
import { useEvents } from "../hooks/useEvents";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function EventsPage() {
  const { data: events, loading, error } = useEvents();
  if (loading)
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size={56} />
      </div>
    );
  if (error)
    return (
      <div className="text-center py-20 text-red-500">Lỗi tải sự kiện!</div>
    );
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 dark:text-blue-200 mb-8">
          Sự kiện Giáo Xứ Bắc Thịnh
        </h1>
        <EventsSection events={events} showAll />
      </div>
    </main>
  );
}
