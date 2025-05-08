import { PageHeader } from "@/components/page-header"
import { CtaSection } from "@/components/cta-section"
import { Star } from "lucide-react"

export default function ReviewsPage() {
  const testimonials = [
    {
      name: "Gordon Amerson",
      company: "The PrincipalED Leader, LLC",
      rating: 5,
    },
    {
      name: "Jeff Barlow",
      company: "Jeff Barlow DDS",
      rating: 5,
    },
    {
      name: "Rakesh Patel",
      company: "Rakesh Patel DDS Inc.",
      rating: 4,
    },
    {
      name: "HoneyBelle",
      company: "@livehoneybelle",
      rating: 5,
    },
    {
      name: "Gabi Jimenez",
      company: "Protein Plus",
      rating: 5,
    },
    {
      name: "Art Salazar",
      company: "The Art of Pitching Corp",
      rating: 5,
    },
  ]

  return (
    <>
      <PageHeader
        title="Client Reviews"
        subtitle="SUCCESS STORIES"
        description="Don't just take our word for it. See what our clients have to say about working with Apex Digital."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Testimonials</h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto">
              We're proud of the relationships we've built with our clients and the results we've helped them achieve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-[#4a4a4a]">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[#4a4a4a]">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Client Satisfaction</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-[#316bff] mb-2">98%</div>
              <p className="text-[#4a4a4a]">Client Satisfaction Rate</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-[#316bff] mb-2">250+</div>
              <p className="text-[#4a4a4a]">VIP's Fusing</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-[#316bff] mb-2">100%</div>
              <p className="text-[#4a4a4a]">Repeat Business Rate</p>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
