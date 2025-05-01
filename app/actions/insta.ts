'use server'

import { UserInfoResponse, UserMediasResponse } from "@/types/instagram";

async function loginToInstagram(): Promise<any> {
  return await fetch(`${process.env.INSTAGRAM_API_URL!}/auth/login_by_sessionid`, {
    method: 'POST',
    body: JSON.stringify({
      sessionid: process.env.SESSION_ID,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  }).then((res) => res.json());
}

async function getUserInfo(username: string): Promise<UserInfoResponse> {
  return await fetch(`${process.env.INSTAGRAM_API_URL!}/user/info_by_username`, {
    method: 'POST',
    body: new URLSearchParams({
      sessionid: process.env.SESSION_ID!,
      username,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => res.json());
}

async function getUserPosts(userId: string, amount: number): Promise<UserMediasResponse> {
  return await fetch(`${process.env.INSTAGRAM_API_URL!}/media/user_medias`, {
    method: 'POST',
    body: new URLSearchParams({
      sessionid: process.env.SESSION_ID!,
      user_id: userId,
      amount: amount.toString(),
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => res.json());
}