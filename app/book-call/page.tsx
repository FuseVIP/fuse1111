import { PageHeader } from "@/components/page-header"
import { GoogleCalendarButton } from "@/components/google-calendar-button"

export default function BookCallPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Book a Call"
        description="Schedule a time to speak with our team about how Fuse.Vip can help your business grow."
      />

      <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Select a Time That Works for You</h2>

        <p className="text-gray-600 mb-8 text-center">
          Our team is ready to answer your questions and help you get started with Fuse.Vip. Choose a convenient time
          from our calendar below.
        </p>

        <div className="flex justify-center mb-8">
          <GoogleCalendarButton label="Book an appointment" color="#3A56FF" className="inline-block" />
        </div>

        <div className="text-sm text-gray-500 text-center">
          <p>
            Can't find a suitable time? Email us at{" "}
            <a href="mailto:support@fuse.vip" className="text-blue-600 hover:underline">
              support@fuse.vip
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
