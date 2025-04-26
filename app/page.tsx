import { UserInfoResponse, UserMediasResponse } from "@/types/instagram"
import { Suspense } from "react"

export default async function Landing() {
  // const login = await fetch(`${process.env.INSTAGRAM_API_URL!}/auth/login_by_sessionid`, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     sessionid: process.env.SESSION_ID,
  //   }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //   },
  // }).then((res) => res.json())

  const user: UserInfoResponse = await fetch(`${process.env.INSTAGRAM_API_URL!}/user/info_by_username`, {
    method: 'POST',
    body: new URLSearchParams({
      sessionid: process.env.SESSION_ID!,
      username: 'dancpluz',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => res.json())

  const posts: UserMediasResponse = await fetch(`${process.env.INSTAGRAM_API_URL!}/media/user_medias`, {
    method: 'POST',
    body: new URLSearchParams({
      sessionid: process.env.SESSION_ID!,
      user_id: user.pk,
      amount: 6,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => res.json())

  return (
    <>
      {/* <Suspense fallback={<div>Loading...</div>}>
        <pre>
          {JSON.stringify(user, null, 2)}
        </pre>
      </Suspense> */}
      <div className='h-screen flex flex-col items-center justify-center p-16'>
        <h1 className="title-bar-text">Minha bunda</h1>
        <div className="window p-5">
          <div className="title-bar max-h-0 min-h-7">
            <h1 className="title-bar-text text-sx">me de a bunda</h1>
            <div className="title-bar-controls">
              <button aria-label="Minimize"/>
              <button aria-label="Maximize"/>
              <button aria-label="Close"/>
            </div>
          </div>
          <div className="window-body">
            <button className="xp-button">
              Sim
            </button>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <pre>
          {JSON.stringify(posts, null, 2)}
        </pre>
      </Suspense>
    </>
  )
}
