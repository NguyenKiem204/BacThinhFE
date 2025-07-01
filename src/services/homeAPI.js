export async function getTodayMasses() {
    return [
      { id: 1, time: "2024-06-25T06:00:00", name: "Lễ sáng" },
      { id: 2, time: "2024-06-25T18:00:00", name: "Lễ chiều" },
    ];
  }
  export async function getTodayReadings() {
    return { id: 1, summary: "Bài đọc hôm nay: ... (tóm tắt)" };
  }
  export async function getLatestNews() {
    return [
      { id: 1, title: "Thông báo 1", summary: "Nội dung thông báo 1..." },
      { id: 2, title: "Tin tức 2", summary: "Nội dung tin tức 2..." },
    ];
  }
  export async function getUpcomingEvents() {
    return [
      { id: 1, title: "Sự kiện A", date: "2024-07-01", image: "/assets/event1.jpg", description: "Mô tả sự kiện A" },
      { id: 2, title: "Sự kiện B", date: "2024-07-10", image: "/assets/event2.jpg", description: "Mô tả sự kiện B" },
    ];
  }
  export async function getFeaturedPrayers() {
    return [
      { id: 1, title: "Kinh Sáng", excerpt: "Lạy Chúa, con cảm tạ..." },
      { id: 2, title: "Kinh Tối", excerpt: "Lạy Chúa, xin gìn giữ..." },
    ];
  }
  export async function getLatestMedia() {
    return [
      { id: 1, title: "Thánh ca 1", thumbnail: "/assets/media1.jpg", url: "/media/song1.mp3" },
      { id: 2, title: "Bài giảng 1", thumbnail: "/assets/media2.jpg", url: "/media/song2.mp3" },
    ];
  }
  export async function getStats() {
    return { catholics: 1234, baptisms: 56, events: 7, media: 12 };
  }