import { LoginForm } from "@/components/auth/login-form"
import { PageHeader } from "@/components/page-header"

export default function LoginPage() {
  return (
    <div className="container max-w-screen-xl mx-auto py-12">
      <PageHeader title="Sign In" description="Sign in to access your account and manage your business" />
      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  )
}
