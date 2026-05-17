/**
 * 日本語をメインにした日付フォーマット
 */
export const formatDate = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // 今日の日付と比較
    if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    ) {
      return "今日";
    }

    // 昨日と比較
    if (
      date.getFullYear() === yesterday.getFullYear() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getDate() === yesterday.getDate()
    ) {
      return "昨日";
    }

    // それ以外は YYYY/MM/DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  } catch {
    return "---";
  }
};

/**
 * 時間を含めたより詳細なフォーマット
 */
export const formatDateTime = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${formatDate(isoString)} ${hours}:${minutes}`;
  } catch {
    return "---";
  }
};
