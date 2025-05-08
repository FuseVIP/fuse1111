import { RegisterForm } from "@/components/auth/register-form"
import { PageHeader } from "@/components/page-header"
import { CtaSection } from "@/components/cta-section"

export default function RegisterPage() {
  return (
    <div className="container max-w-screen-xl mx-auto py-12">
      <PageHeader
        title="Create Your Account"
        subtitle="JOIN FUSE.VIP"
        description="Sign up to access exclusive features, manage your loyalty cards, and connect with businesses. Business owners can apply for dashboard access during registration."
      />

      <div className="mt-8 mb-16">
        <RegisterForm />
      </div>

      <CtaSection />
    </div>
  )
}
