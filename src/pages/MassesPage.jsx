import WeekMassesTable from "../components/Masses/WeekMassesTable";
import { useMasses } from "../hooks/useMasses";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function MassesPage() {
  const { data: weekMasses, loading, error } = useMasses();
  if (loading)
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size={56} />
      </div>
    );
  if (error)
    return (
      <div className="text-center py-20 text-red-500">Lỗi tải lịch lễ!</div>
    );
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 dark:text-blue-200 mb-8">
          Lịch Thánh Lễ Trong Tuần
        </h1>
      </div>
      <div className="px-2 sm:px-4 md:px-8">
        <WeekMassesTable weekMasses={weekMasses || []} />
      </div>
    </main>
  );
}
