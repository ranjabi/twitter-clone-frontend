import axios from 'axios'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const apiInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
})

export const getColorFromUserId = (id: number) => {
  const colorMap: { [key: number]: string } = {
    1: 'bg-green-500',
    2: 'bg-red-500',
    3: 'bg-blue-500',
    4: 'bg-yellow-500',
    5: 'bg-purple-500',
    6: 'bg-pink-500',
    7: 'bg-indigo-500',
    8: 'bg-teal-500',
    9: 'bg-orange-500',
    10: 'bg-gray-500',
  }

  const rating = (id % 10) + 1

  return colorMap[rating]
}
