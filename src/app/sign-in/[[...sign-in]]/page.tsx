import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex mt-12 justify-center">
      <SignIn />
    </div>
  )
}
