import axios from 'axios'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface InstanceParm {
  token?: string
}

export const apiInstance = (instanceParm: InstanceParm) =>
  axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
    headers: { Authorization: `Bearer ${instanceParm.token}` },
  })
