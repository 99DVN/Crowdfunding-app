import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function shortenAddress(address?: string): string | undefined {
  if (address) {
    const start = address.substring(0, 6); // giữ nguyên '0x' và thêm một số ký tự đầu
    const end = address.substring(address.length - 4); // giữ một số ký tự cuối

    return `${start}...${end}`;
  } else {
    return undefined;
  }
}

export function cn(...className: ClassValue[]) {
  return twMerge(clsx(className));
}
