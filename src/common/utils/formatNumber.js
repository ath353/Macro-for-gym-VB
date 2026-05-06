/**
 * Format số có dấu phân cách nghìn
 * @param {number} num
 * @returns {string}
 */
export function formatNumber(num) {
  if (num == null || Number.isNaN(num)) return "0";
  return Math.round(num).toLocaleString("vi-VN");
}
