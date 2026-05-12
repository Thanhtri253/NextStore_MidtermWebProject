// utils/format.ts
// Dùng hàm này thay cho .toLocaleString() để tránh hydration mismatch.
// Server và browser đều cho kết quả giống nhau.

export function formatPrice(n: number): string {
  return "$" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatNumber(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
