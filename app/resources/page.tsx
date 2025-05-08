"use client"

import { PageHeader } from "@/components/page-header"
import { CtaSection } from "@/components/cta-section"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

export default function ResourcesPage() {
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [showSustainability, setShowSustainability] = useState(false)
  const [showAutomation, setShowAutomation] = useState(false)

  // YouTube video ID
  const youtubeVideoId = "Zi2A7gFMzpQ"

  return (
    <>
      <PageHeader
        title="Resources"
        subtitle="KNOWLEDGE CENTER"
        description="Access valuable insights, guides, and tools to help you navigate your loyalty journey."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Learn More About Fuse.Vip</h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto">
              Discover how our platform can help transform your business and customer relationships.
            </p>
          </div>

          {/* Video section */}
          <AnimatedSection>
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <a
                href={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                Watch Video
              </a>
            </div>
          </AnimatedSection>

          {/* Toggle sections */}
          <div className="max-w-3xl mx-auto space-y-4">
            {/* Privacy Policy Section */}
            <AnimatedSection>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setShowPrivacy(!showPrivacy)}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  aria-expanded={showPrivacy}
                >
                  <span className="font-medium text-lg">Privacy Policy</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                      showPrivacy ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {showPrivacy && (
                  <div className="p-4 bg-white">
                    <p className="text-[#4a4a4a]">
                      <strong>Introduction</strong>
                      <br />
                      <br />
                      This Privacy Policy explains how our company ("we," "us," or "our") collects, uses, stores, and
                      protects your personal information when you use our web application ("Service"). We are committed
                      to safeguarding your privacy and use only the minimum information necessary to provide the
                      Service. By using the Service or creating an account, you agree to the collection and use of
                      information as described in this Privacy Policy. This Privacy Policy is intended for users in the
                      United States and is written in accordance with applicable U.S. laws and best practices.
                      <br />
                      <br />
                      <strong>Information We Collect</strong>
                      <br />
                      <br />
                      <strong>Personal Information You Provide:</strong> When you create an account, we only require an
                      email address. Business account users may be asked to provide additional details for verification
                      purposes, such as business name, address, or documentation proving a valid business. We may also
                      collect any information you voluntarily provide to us (for example, if you contact support or
                      submit information through our Service).
                      <br />
                      <br />
                      <strong>Information from Business Owners:</strong> If you register as a business owner, we may
                      collect details related to your business identity and verification status (e.g. proof of business
                      registration or tax ID) to ensure eligibility. This information is used strictly for verifying
                      your business account and enabling features like referral tracking and $fuse token rewards.
                      <br />
                      <br />
                      <strong>Automatically Collected Data:</strong> We collect some information automatically when you
                      use our Service, which may include:
                      <br />
                      <br />- <strong>Device and Log Information:</strong> IP address, browser type, device type,
                      operating system, and timestamps of visits. This data is collected to maintain the security of the
                      Service and to monitor aggregate usage (e.g. logging sign-in activity or referral link clicks).
                      <br />- <strong>Cookies:</strong> We use essential cookies and similar technologies to manage your
                      login session and preferences. These cookies are only used to provide core functionality (such as
                      keeping you logged in and securing your session) and not for advertising or third-party analytics.
                      We do not use any third-party tracking or analytics tools, so your usage data is not shared with
                      advertising networks. You can set your browser to refuse cookies; however, doing so may affect
                      certain features like staying logged in.
                      <br />
                      <br />
                      We do not collect any sensitive personal information such as physical addresses (unless provided
                      for business verification), government IDs, financial account numbers (except as handled by Stripe
                      for payments), or any data on racial or ethnic origin, health, or similar categories. The Service
                      is designed to operate with minimal personal data collection to respect your privacy.
                    </p>
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Terms of Service Section */}
            <AnimatedSection delay={0.1}>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setShowTerms(!showTerms)}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  aria-expanded={showTerms}
                >
                  <span className="font-medium text-lg">Terms of Service</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                      showTerms ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {showTerms && (
                  <div className="p-4 bg-white">
                    <p className="text-[#4a4a4a]">
                      <strong>Introduction and Acceptance of Terms</strong>
                      <br />
                      <br />
                      These Terms of Service ("Terms") govern your access to and use of our web application and related
                      services (collectively, the "Service"). By accessing, browsing, or using the Service (including by
                      creating an account), you acknowledge that you have read, understood, and agree to be bound by
                      these Terms, as well as our Privacy Policy. If you do not agree with these Terms or the Privacy
                      Policy, you must not use the Service.
                      <br />
                      <br />
                      <strong>Account Creation and Eligibility</strong>
                      <br />
                      <br />- <strong>Account Registration:</strong> To use certain features of the Service, you may
                      need to create an account. When you register, you agree to provide accurate, current, and complete
                      information about yourself and to keep this information updated. We reserve the right to suspend
                      or terminate your account if any information provided proves to be inaccurate, outdated, or
                      incomplete.
                      <br />- <strong>Account Security:</strong> You are responsible for maintaining the confidentiality
                      of your account credentials and for all activities that occur under your account. You agree to
                      notify us immediately of any unauthorized use of your account or any other breach of security. We
                      cannot and will not be liable for any loss or damage arising from your failure to comply with this
                      obligation.
                      <br />- <strong>Minimum Age:</strong> You must be at least 18 years old (or the age of majority in
                      your state/jurisdiction) to create an account and use the Service. Individuals under 18 are not
                      permitted to use this platform.
                      <br />- <strong>Business Accounts:</strong> If you register as a business, you represent and
                      warrant that you have the authority to bind that business to these Terms and that you are at least
                      18 years old. You also agree to provide accurate business information and to comply with all
                      applicable laws related to your business operations.
                      <br />
                      <br />
                      <strong>$FUSE Token Rewards Program</strong>
                      <br />
                      <br />- <strong>Program Description:</strong> Our Service includes a rewards program where users
                      can earn $fuse tokens for certain activities, such as referring new users or businesses to the
                      platform. These tokens exist on the XRP Ledger blockchain and may have various uses within our
                      ecosystem.
                      <br />- <strong>Not Investment Advice or Financial Advice:</strong> We provide the $fuse token
                      rewards as a loyalty and engagement program, not as an investment product. Nothing on our Service
                      constitutes financial or investment advice. We are not registered investment advisors or brokers.
                      You should not participate in the token program with an expectation of profit based on the work of
                      others – the intent is to reward you for your own referral activity. Any information we provide
                      about the token (such as how to use it or general market information) is for informational
                      purposes only. You should consider your own circumstances and possibly consult a financial advisor
                      before making any decisions to hold or trade cryptocurrency.
                      <br />- <strong>Program Modifications:</strong> We reserve the right to modify, suspend, or
                      discontinue the $fuse token rewards program at any time, including by changing the activities that
                      qualify for rewards, the number of tokens awarded, or the uses of the tokens within our ecosystem.
                      While we will make reasonable efforts to provide notice of material changes, we are not obligated
                      to do so.
                      <br />- <strong>Token Value and Liquidity:</strong> The value of $fuse tokens may fluctuate and
                      there is no guarantee of liquidity or future value. Tokens are provided as rewards with no
                      promises regarding future worth or tradability. You acknowledge that blockchain-based tokens
                      involve inherent technological and market risks.
                    </p>
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Sustainability Section */}
            <AnimatedSection delay={0.2}>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setShowSustainability(!showSustainability)}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  aria-expanded={showSustainability}
                >
                  <span className="font-medium text-lg">Sustainability</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                      showSustainability ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {showSustainability && (
                  <div className="p-4 bg-white">
                    <p className="text-[#4a4a4a]">
                      <strong>Why Fuse Is A Sustainable Platform:</strong>
                      <br />
                      <br />
                      By Raul Salazar
                      <br />
                      <br />
                      Large Organizations (10,000+ Employees) Utilize An Average Of 410 SaaS Applications, Highlighting
                      The Integral Role of SaaS in Enterprise Operations. Fuse.Vip Will Be Creating An EcoSystem Where
                      Every Party Involved Will Be Relevant, Business Owners - Customers and The Fuse.Vip Team. Our Team
                      Is The Bridge For The Digital Age To Small Businesses!
                      <br />
                      <br />
                      Fuse.Vip Is Built On Timeless Sustainability Models That Ensure Long-Term Stability, Growth, And
                      User Empowerment.
                      <br />
                      <br />
                      Here's How:
                      <br />
                      <br />
                      <strong>1. Simple And Predictable Revenue Model</strong>
                      <br />
                      <br />
                      Fuse.vip offers free accounts to everyday users and free onboarding for businesses to local
                      entrepreneurs. Our Revenue Comes From Real Value Delivered — Not Ads, Data Sales, Or Speculative
                      Promises.
                      <br />
                      <br />• Subscription Fees From VIP Card Owners: Affordable One Time Purchase.
                      <br />• Optional Upgrades: Business Owners Are Incentivized To Join And Spread The VIP Cards To
                      Their Customers. Earning Them $FUSE Which Will Eventually Allow Them To Trade In Their Tokens To
                      Unlock SaaS
                      <br />• No Hidden Costs: Transparency builds user trust and predictable operational scaling. We
                      Want to Gamify The Entire EcoSystem. We Have Skills Ready To Help You.
                      <br />
                      <br />
                      <strong>2. Minimal Data Storage = Minimal Risk</strong>
                      <br />
                      <br />
                      Fuse.Vip Collects Only Essential User Information (Emails And Business Verification If
                      Applicable). We Respect User Privacy, Which Lowers Regulatory Risks And Data Breach
                      Vulnerabilities.
                      <br />• No Selling Of User Data
                      <br />• No Third-Party Tracking Or Behavioral Analytics
                      <br />• Focus On User Value, Not Surveillance Capitalism
                      <br />
                      <br />
                      <strong>3. Built On Lean, Scalable Infrastructure</strong>
                      <br />
                      <br />
                      Our Platform Is Hosted On Vercel, One Of The Most Reliable Cloud Services In The World.
                      <br />
                      Lean Codebases, Modern Frameworks, and Serverless Technology Allow Us To Scale Without Bloated
                      Costs.
                      <br />• Low Fixed Costs Even As User Numbers Grow
                      <br />• Auto-Scaling For Spikes In Referral Activity. Our Automation Skills Allow Us To Scale -
                      And Make $FUSE Token Have More Than Implied Value.
                      <br />• No Heavy Legacy Systems Holding Us Back
                      <br />
                      <br />
                      <strong>Fuse.Vip: Empowering America's Local Businesses For The Next 100 Years</strong>
                      <br />
                      <br />
                      We Are Building A Platform That Supports Entrepreneurship, Rewards Trust, Protects Privacy, And
                      Stays Financially Sustainable — Not Just For Today, But For Tomorrow.
                    </p>
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Automation Section */}
            <AnimatedSection delay={0.3}>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setShowAutomation(!showAutomation)}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  aria-expanded={showAutomation}
                >
                  <span className="font-medium text-lg">Automation For Your Business</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                      showAutomation ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {showAutomation && (
                  <div className="p-4 bg-white">
                    <p className="text-[#4a4a4a]">
                      The future of commerce is automated & decentralized. Charlie, Dylan and Raul create tools that
                      empower local entrepreneurs, enable neighbor-to-neighbor rewards, and foster deep, lasting
                      connections between people and the places they love.
                      <br />
                      <br />
                      Join us in building a future where every business owner has the tools they need to succeed, and
                      every customer has the power to support the businesses they love. Email us at support@fuse.vip for
                      help getting started. Or if you would like to get started automating your business now, dm us or
                      email us! 24/7 support is available.
                    </p>
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="bg-[#e9f3ff] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-[#4a4a4a] max-w-2xl mx-auto mb-8">
            Stay up-to-date with the latest loyalty trends, insights, and resources delivered straight to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="border border-gray-300 rounded-l-md px-4 py-3 w-full"
              />
              <button className="bg-[#316bff] text-white px-6 py-3 rounded-r-md whitespace-nowrap">Subscribe</button>
            </div>
            <p className="text-xs text-[#4a4a4a] mt-2">
              By subscribing, you agree to receive marketing communications from us. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
