import { SignUp, UserProfile } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex mt-12 justify-center">
      <SignUp />
    </div>
  )
}
