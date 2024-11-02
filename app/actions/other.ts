'use server'

import { headers } from 'next/headers'

export async function getUserIP(): Promise<string> {
  const forwardedFor = headers().get('x-forwarded-for')
  if (forwardedFor) {
    // Get the first IP in the list (client's IP)
    const ips = forwardedFor.split(',')
    return extractIPv4(ips[0].trim())
  }

  const realIP = headers().get('x-real-ip')
  if (realIP) {
    return extractIPv4(realIP)
  }

  return 'Unknown'
}

function extractIPv4(ip: string): string {
  // Check if it's an IPv4-mapped IPv6 address
  if (ip.startsWith('::ffff:')) {
    return ip.substring(7)
  }

  // Check if it's a valid IPv4 address
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
  if (ipv4Regex.test(ip)) {
    return ip
  }

  // If it's neither, return 'Unknown'
  return 'Unknown'
}