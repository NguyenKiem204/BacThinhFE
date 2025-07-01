import HeroSection from "@components/Home/HeroSection";
import TodayMasses from "@components/Home/TodayMasses";
import TodayReadings from "@components/Home/TodayReadings";
import NewsSection from "@components/Home/NewsSection";
import EventsSection from "@components/Home/EventsSection";
import PrayersSection from "@components/Home/PrayersSection";
import MediaSection from "@components/Home/MediaSection";
import StatsSection from "@components/Home/StatsSection";
import LoadingSpinner from "@components/common/LoadingSpinner";
import { useEvents } from "../hooks/useEvents";
import { useNews } from "../hooks/useNews";
import { useMedia } from "../hooks/useMedia";
import { usePrayers } from "../hooks/usePrayers";

function SectionSkeleton({ children }) {
  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-96 mx-auto animate-pulse"></div>
      </div>
      {children}
    </section>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
    </div>
  );
}

function GridSkeleton({ cols = 2 }) {
  return (
    <div className={`grid lg:grid-cols-${cols} gap-8`}>
      {Array.from({ length: cols }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

export default function HomePage() {
  const { data: events, loading: loadingEvents } = useEvents();
  const { data: news, loading: loadingNews } = useNews();
  const { data: media, loading: loadingMedia } = useMedia();
  const { data: prayers, loading: loadingPrayers } = usePrayers();

  const isLoading =
    loadingEvents || loadingNews || loadingMedia || loadingPrayers;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section - Full width */}
      <HeroSection />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Today's Info Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Thông tin hôm nay
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Lịch lễ và bài đọc phụng vụ cho ngày hôm nay
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <TodayMasses />
            <TodayReadings />
          </div>
        </section>

        {/* News Section */}
        {loadingNews ? (
          <SectionSkeleton>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </SectionSkeleton>
        ) : (
          <section className="mb-16">
            <NewsSection news={news} />
          </section>
        )}

        {/* Events Section */}
        {loadingEvents ? (
          <SectionSkeleton>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3"></div>
                  <div className="h-8 bg-blue-200 dark:bg-blue-700 rounded w-24"></div>
                </div>
              ))}
            </div>
          </SectionSkeleton>
        ) : (
          <section className="mb-16">
            <EventsSection events={events} />
          </section>
        )}

        {/* Prayers & Media Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Kinh nguyện & Thư viện
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Khám phá các kinh nguyện và hình ảnh từ cộng đoàn
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {loadingPrayers ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"
                    ></div>
                  ))}
                </div>
              </div>
            ) : (
              <PrayersSection prayers={prayers} />
            )}

            {loadingMedia ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-24 bg-gray-200 dark:bg-gray-700 rounded"
                    ></div>
                  ))}
                </div>
              </div>
            ) : (
              <MediaSection media={media} />
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section>
          <StatsSection />
        </section>
      </div>

      {/* Global Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl">
            <LoadingSpinner size={64} />
            <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
              Đang tải dữ liệu...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
