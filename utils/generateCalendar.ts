export const generateCalendar = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Tạo các ô trống cho những ngày đầu tuần của tháng trước
  const emptyDays = firstDay.getDay();
  const days = [];

  // Thêm các ô trống cho những ngày của tháng trước
  for (let i = 0; i < emptyDays; i++) {
    days.push(null);
  }

  // Thêm các ngày của tháng hiện tại
  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(year, month, day));
  }

  // Thêm các ô trống cho những ngày cuối tuần của tháng sau (nếu cần)
  const totalCells = Math.ceil(days.length / 7) * 7;
  while (days.length < totalCells) {
    days.push(null);
  }

  return days;
};