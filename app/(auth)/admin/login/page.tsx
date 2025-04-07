import { SignIn } from "@clerk/nextjs"

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Admin Portal
          </h2>
        </div>
        <SignIn path="/admin/login" routing="path" signUpUrl="/admin/signup" />
      </div>
    </div>
  )
}
