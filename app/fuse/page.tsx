import { PageHeader } from "@/components/page-header"
import { CtaSection } from "@/components/cta-section"
import { ArrowRight, CheckCircle2, Wallet, LayoutGrid, Server, Code } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { XrpPrice } from "@/components/xrp-price"
import { LottieAnimation } from "@/components/lottie-animation"

export default function FusePage() {
  const benefits = [
    "Seamless customer loyalty program integration",
    "Automated reward distribution through XRP WebHooks",
    "Enhanced customer engagement and retention",
    "Transparent transaction history on the blockchain",
    "Reduced operational costs for loyalty management",
    "Ability to create custom reward tiers and incentives",
  ]

  const steps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "We'll assess your business needs and determine the best token integration strategy.",
    },
    {
      number: "02",
      title: "Integration Planning",
      description: "Our team will develop a custom integration plan for your specific business needs.",
    },
    {
      number: "03",
      title: "Digital Needs Assessment",
      description:
        "We'll analyze your existing systems and identify the optimal integration points for Fuse.Vip tokens.",
    },
    {
      number: "04",
      title: "Token Integration",
      description: "Based on the assessment, we'll develop a customized token adoption strategy for your business.",
    },
    {
      number: "05",
      title: "Implementation",
      description: "Our certified advisors will help you implement the token system and train your team.",
    },
    {
      number: "06",
      title: "Ongoing Support",
      description:
        "We provide continuous support to ensure your token system runs smoothly and evolves with your business needs.",
    },
  ]

  const useCases = [
    {
      title: "Customer Relationship Management (CRM)",
      description:
        "Reimagine customer relationships with automated loyalty mechanics, token-driven engagement strategies, and blockchain-backed behavioral insights — all powered by the FUSE network.",
      icon: <LayoutGrid className="w-12 h-12 text-[#316bff]" />,
      benefits: [
        "Reward profile completion and survey participation with FUSE tokens",
        "Dynamically assign loyalty tiers based on frequency of visits and token balance",
        "Enable VIP-only perks or events using token-gated access",
        "Monitor lifetime customer value and reward triggers on-chain with zero risk of manipulation",
      ],
    },
    {
      title: "Web3 Services Integration",
      description:
        "Fuse.vip enables any business to unlock blockchain utility without needing technical expertise — from decentralized payment rails to customer-level token benefits, we bridge the gap with simplicity.",
      icon: <Code className="w-12 h-12 text-[#316bff]" />,
      benefits: [
        "Plug-and-play wallet connection for customers via Xaman and XRP",
        "Token-based loyalty badges and scannable digital membership cards",
        "On-chain identity management for secure, reward-based authentication",
        "Built-in customer voting modules for feedback and governance (coming soon)",
      ],
    },
    {
      title: "Software as a Service (SaaS)",
      description:
        "FUSE empowers small businesses to run like enterprises — offering a token-based SaaS model that unlocks access to 1,000s of AI-powered automations for customer acquisition, retention, and operational scale.",
      icon: <Server className="w-12 h-12 text-[#316bff]" />,
      benefits: [
        "Instant access to tailored AI workflows via Zapier & n8n for outreach, follow-ups, and smart segmentation",
        "T-shirt sized growth tiers — Small, Medium, Large — activated by $FUSE holdings",
        "Token-gated upgrades that evolve with business needs (e.g., CRM, email automation, reputation management)s",
        "Hold more $FUSE = unlock more tools. Simple, scalable, and entirely no-code. Upgrade pathways that give small teams Fortune 500 functionality.",
      ],
    },
  ]

  return (
    <>
      <div className="relative">
        {/* Lottie Animation Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden opacity-15 z-0">
          <LottieAnimation
            src="https://lottie.host/27edf0b3-aedc-4ff8-85cb-30140a74eda5/Sz0NFk3o3r.lottie"
            width="100%"
            height="100%"
            className="scale-125 object-cover"
          />
        </div>

        {/* Semi-transparent gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/90 z-10"></div>

        {/* Page Header Content */}
        <div className="relative z-20">
          <PageHeader
            title="Fuse.Vip Token"
            subtitle="LOYALTY REIMAGINED"
            description="Transform your business with blockchain-powered loyalty through our Fuse.Vip token, designed to revolutionize customer engagement and rewards."
          />
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">What is Fuse.Vip Token?</h2>
              <p className="text-[#4a4a4a] mb-6">
                The Fuse.Vip Token is a native digital asset built on the XRP Ledger, engineered to redefine how
                businesses cultivate customer loyalty and long-term engagement. Launching on June 15, 2025, it merges
                traditional reward systems with next-generation blockchain utility.
              </p>
              <p className="text-[#4a4a4a] mb-6">
                By leveraging the Fuse.Vip Token, participating businesses can deploy frictionless loyalty
                infrastructures that elevate retention, incentivize repeat behavior, and foster deeper customer
                relationships - all through fast, secure, and transparent transactions.
              </p>
              <p className="text-[#4a4a4a]">
                As an accredited digital solutions partner, Fuse.Vip offers expert support in token integration and
                strategy design, ensuring businesses unlock scalable value and optimize the customer experience through
                tailored adoption frameworks.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fuse-token-cVZqlFSRtwajwj78HxXV8wNGxxBtqg.png"
                  width={400}
                  height={400}
                  alt="Fuse.Vip Token"
                  className="mx-auto rounded-lg shadow-lg animate-pulse"
                />
                <div className="absolute inset-0 bg-gradient-radial from-[#3A56FF20] to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9fa] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Benefits of Fuse.Vip Token</h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto">
              Our token system offers numerous advantages for businesses looking to enhance their digital presence and
              customer engagement strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start bg-white p-6 rounded-lg shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-[#316bff] mr-3 flex-shrink-0 mt-0.5" />
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Token Use Cases Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center mb-12">
            <div className="hidden md:block md:w-1/4">
              <LottieAnimation
                src="https://lottie.host/b41b3564-35ed-4254-93d3-47dc7b0ef90b/806H2SAF2f.lottie"
                width="200px"
                height="200px"
              />
            </div>
            <div className="md:w-1/2 text-center">
              <h2 className="text-3xl font-bold mb-4">Token Use Cases</h2>
              <p className="text-[#4a4a4a] max-w-2xl mx-auto">
                Discover how Fuse.Vip tokens can revolutionize different aspects of your business operations.
              </p>
            </div>
            <div className="hidden md:block md:w-1/4">
              <LottieAnimation
                src="https://lottie.host/b7c330dc-5b31-42c4-aaf7-dd7c1cd187c3/UPgItnnQLJ.lottie"
                width="200px"
                height="200px"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="mb-6 flex justify-center">{useCase.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-center">{useCase.title}</h3>
                <p className="text-[#4a4a4a] mb-6 text-center">{useCase.description}</p>
                <ul className="space-y-3">
                  {useCase.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#316bff] mr-3 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{benefit}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How We Help You Integrate Fuse.Vip Token</h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto">
              Our streamlined process makes it easy for your business to benefit from blockchain-based loyalty programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="border border-gray-200 rounded-lg p-6">
                <div className="text-[#316bff] font-bold text-4xl mb-4">{step.number}</div>
                <h3 className="font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-[#4a4a4a]">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/register-business"
              className="bg-[#316bff] text-white px-6 py-3 rounded-md inline-flex items-center"
            >
              Start Your Token Integration
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#e9f3ff] py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Xaman Wallet Integration</h2>
              <p className="text-[#4a4a4a] mb-6">
                Our platform seamlessly integrates with Xaman (formerly XUMM), the leading wallet for the XRP Ledger.
                This integration allows your customers to easily manage their Fuse.Vip tokens and interact with your
                loyalty program.
              </p>
              <p className="text-[#4a4a4a] mb-6">Benefits of Xaman integration include:</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#316bff] mr-3 flex-shrink-0 mt-0.5" />
                  <p>Secure wallet connection for customers</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#316bff] mr-3 flex-shrink-0 mt-0.5" />
                  <p>Simple token transactions and rewards redemption</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#316bff] mr-3 flex-shrink-0 mt-0.5" />
                  <p>Transparent transaction history</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#316bff] mr-3 flex-shrink-0 mt-0.5" />
                  <p>Enhanced security through blockchain technology</p>
                </li>
              </ul>
              <div className="flex space-x-4">
                <button className="bg-[#316bff] text-white px-6 py-3 rounded-md inline-flex items-center">
                  <Wallet className="mr-2 h-4 w-4" />
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Token Launch Timeline</h3>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    Coming Soon
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#316bff] rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Development Phase</h4>
                      <p className="text-sm text-gray-500">Completed</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#316bff] rounded-full flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Testing & Auditing</h4>
                      <p className="text-sm text-gray-500">In Progress</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
                      3
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Pre-Launch Partners</h4>
                      <p className="text-sm text-gray-500">Q1 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
                      4
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Public Launch</h4>
                      <p className="text-sm text-gray-500">June 15, 2025</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <XrpPrice />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Early Access Program</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Be among the first businesses to integrate the Fuse.Vip Token into your loyalty program. Early adopters
            receive exclusive benefits, including premium support and bonus token allocations.
          </p>
          <div className="bg-[#3A56FF20] border border-[#3A56FF] p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-left">
                <h3 className="text-xl font-bold mb-4">Early Adopter Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#3A56FF] mr-3 flex-shrink-0 mt-0.5" />
                    <p>Priority onboarding and setup</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#3A56FF] mr-3 flex-shrink-0 mt-0.5" />
                    <p>5% bonus token allocation</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#3A56FF] mr-3 flex-shrink-0 mt-0.5" />
                    <p>Dedicated integration specialist</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#3A56FF] mr-3 flex-shrink-0 mt-0.5" />
                    <p>Featured in our launch marketing</p>
                  </li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold mb-4">Program Timeline</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#3A56FF] mr-3 flex-shrink-0 mt-0.5" />
                    <p>Applications open: March 2025</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#3A56FF] mr-3 flex-shrink-0 mt-0.5" />
                    <p>Partner selection: March-May 2025</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#3A56FF] mr-3 flex-shrink-0 mt-0.5" />
                    <p>Integration period: May-June 2025</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#3A56FF] mr-3 flex-shrink-0 mt-0.5" />
                    <p>Public launch: June 15, 2025</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <Link
                href="/register-business"
                className="bg-[#3A56FF] text-white px-8 py-4 rounded-md inline-flex items-center text-lg font-medium"
              >
                Join Our Network Free and Earn Rewards Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
