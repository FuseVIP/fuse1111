import { PageHeader } from "@/components/page-header"
import { CtaSection } from "@/components/cta-section"
import { AppStoreButton } from "@/components/app-store-button"
import { Button } from "@/components/ui/button"
import { MissionAnimation } from "@/components/mission-animation-iframe"
import { MissionHeadlineAnimation } from "@/components/mission-headline-animation"
import { BubbleAnimation } from "@/components/bubble-animation"
import Image from "next/image"
import { ExternalLink, Linkedin } from "lucide-react"

export default function AboutUsPage() {
  const teamMembers = [
    {
      name: "Raul Salazar",
      position: "CEO & Founder",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-r2koYBigCOYP9UVZeK8ifY8FxKm7BH.jpeg",
      bio: "Raul Salazar is the visionary founder and CEO of Fuse.vip. With a background in Communication and Media Studies from Pepperdine University, Fresno St., and Cal St. San Bernardino, Raul combines his expertise in digital marketing, blockchain technology, and customer engagement to revolutionize loyalty programs. His passion for innovation and commitment to creating value for businesses drives the company's mission forward. Under his leadership, Fuse.vip is pioneering the integration of blockchain with traditional loyalty systems to create more meaningful customer connections.",
      linkedin: "https://www.linkedin.com/in/raul-salazar-6b9967165",
    },
    {
      name: "Charlie Welch",
      position: "CFO",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0660.png-CyInaWyyyX41gde469uNWUTjHjSftY.jpeg",
      bio: "Charlie Welch leads our financial strategy with expertise in blockchain economics and sustainable business models. With a strong background in professional sports, Charlie played Professional Baseball for the Seattle Mariners after his collegiate career at Pepperdine University and Arkansas. His competitive drive and strategic thinking translate seamlessly into the financial world, where he applies analytical precision to optimize our blockchain-based loyalty solutions. Charlie's unique perspective combines athletic discipline with financial acumen, enabling him to develop innovative funding strategies and economic models that drive Fuse.vip's growth and sustainability in the rapidly evolving digital loyalty space.",
      linkedin: "https://www.linkedin.com/in/charlie-welch-793579225/",
    },
    {
      name: "Dylan Silver",
      position: "Head of Design",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FullSizeRender-ioieAVrCs6mG19MCUWlv2UjMh8HL5W.jpeg",
      bio: "Dylan Silver brings creative vision and user-centered design principles to all our projects. A graduate of Cal St. San Bernardino with a Bachelor's in Kinesiology, Dylan's understanding of human movement and interaction informs his approach to creating intuitive, engaging user experiences. His expertise spans UI/UX design, brand identity, and digital product development, with a particular focus on creating seamless customer journeys within loyalty programs. Dylan's multidisciplinary background allows him to bridge the gap between technical functionality and aesthetic appeal, resulting in digital experiences that are both beautiful and highly functional. His work has been instrumental in developing Fuse.vip's distinctive visual language and user-friendly platform.",
    },
  ]

  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="OUR STORY"
        description="We are a team of passionate Digital Age Experts committed to revolutionizing loyalty programs through blockchain technology."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-3xl font-bold">Our Mission</h2>
                <MissionHeadlineAnimation />
                <BubbleAnimation />
              </div>
              <p className="text-[#4a4a4a] mb-6">
                At Fuse.vip, our mission is to empower businesses with innovative loyalty solutions that drive
                engagement, enhance customer experiences, and create lasting value. We believe that loyalty programs
                should be more than just points and rewards – they should be a seamless extension of your brand that
                creates meaningful connections with your customers.
              </p>
              <p className="text-[#4a4a4a] mb-6">
                Fuse.vip is pioneering the integration of blockchain technology with traditional loyalty programs,
                creating a new paradigm for customer engagement. Our team combines expertise in blockchain, digital
                marketing, and customer experience to deliver solutions that are both innovative and practical.
              </p>
              <p className="text-[#4a4a4a]">
                We're committed to staying at the forefront of technological innovation, continuously evolving our
                platform to provide our clients with the most effective loyalty solutions available in the digital age.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              <div className="w-full max-w-md">
                <MissionAnimation />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1A1A1A] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Xaman Integration</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              We've partnered with Xaman to provide secure, blockchain-based authentication for our loyalty platform.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="md:w-1/3 text-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xaman-logo-J6kQDGmHNAw1OC3KOJz5MFo9DNOUFO.png"
                width={150}
                height={150}
                alt="Xaman Logo"
                className="mx-auto mb-6"
              />
              <h3 className="text-xl font-bold mb-4">Secure Authentication</h3>
              <p className="text-white/80">
                Xaman provides secure, decentralized authentication for your loyalty program members, ensuring their
                data and rewards are protected.
              </p>
            </div>

            <div className="md:w-1/3 text-center">
              <AppStoreButton className="mx-auto mb-6" />
              <p className="text-white/80">
                Download the Xaman app to start managing your loyalty rewards securely on the blockchain.
              </p>
              <a
                href="https://warm-libra-173.notion.site/Fuse-Vip-Whitepaper-1e45aebd663280e5b07cc2d24e18a2eb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4"
              >
                <Button className="border border-[#3A56FF] text-[#3A56FF] bg-transparent hover:bg-[#3A56FF]/10 px-6 py-3 rounded-lg font-medium flex items-center justify-center">
                  Read More
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9fa] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto">
              These core principles guide everything we do and shape how we work with our clients and each other.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-4 text-[#3A56FF]">Innovation</h3>
              <p className="text-[#4a4a4a]">
                We embrace creativity and forward-thinking to develop solutions that address current needs and
                anticipate future challenges in the loyalty space.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-4 text-[#3A56FF]">Security</h3>
              <p className="text-[#4a4a4a]">
                We are committed to providing the highest level of security for our clients' loyalty programs and their
                customers' data through blockchain technology.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-4 text-[#3A56FF]">Collaboration</h3>
              <p className="text-[#4a4a4a]">
                We believe in the power of partnerships, both within our organization and with our clients, to create
                loyalty ecosystems that benefit everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto">
              Our diverse team of experts brings together a wealth of experience in blockchain, loyalty programs, and
              customer engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-xl">{member.name}</h3>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0A66C2] hover:text-[#0A66C2]/80 transition-colors"
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                  <p className="text-[#3A56FF] mb-4">{member.position}</p>
                  <p className="text-[#4a4a4a] text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
