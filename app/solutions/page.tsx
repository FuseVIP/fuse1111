"use client"

import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"
import { SolutionsBubbles } from "@/components/solutions-bubbles"
import { SolutionsHeroAnimation } from "@/components/solutions-hero-animation"
import { AnimatedBackground } from "@/components/animated-background"
import { LottieAnimation } from "@/components/lottie-animation"
import { Link } from "@/components/ui/link"
import { motion } from "framer-motion"

export default function SolutionsPage() {
  return (
    <AnimatedBackground>
      <PageHeader
        title="Solutions"
        description="Explore our comprehensive suite of digital solutions designed to transform your business."
      />

      <div className="container mx-auto px-4 py-12">
        <AnimatedSection>
          <div className="text-center mb-16">
            <SolutionsHeroAnimation />
            <h2 className="text-3xl md:text-4xl font-bold mt-8">Innovative Solutions for Modern Businesses</h2>
            <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
              Our comprehensive suite of digital solutions is designed to help businesses thrive in the digital age.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <AnimatedSection delay={0.1}>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 h-full flex flex-col">
              <div className="mb-4 flex items-center justify-center">
                <LottieAnimation
                  src="https://lottie.host/34346049-ad01-4221-94c1-36fd6b25d58e/QRaMghflYz.lottie"
                  width="300px"
                  height="300px"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Digital Transformation</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                Comprehensive digital transformation strategies to modernize your business operations and customer
                experiences.
              </p>
              <Link href="/register" className="mt-auto">
                <motion.button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start now!
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 h-full flex flex-col">
              <div className="mb-4 flex items-center justify-center">
                <LottieAnimation
                  src="https://lottie.host/ce8085e3-bcb4-4746-b466-a17e923f4d3e/ydxrHuTsN9.lottie"
                  width="300px"
                  height="300px"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Web Development</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                Custom web development solutions that deliver exceptional user experiences and drive business growth.
              </p>
              <Link href="/register" className="mt-auto">
                <motion.button
                  className="bg-purple-600 text-white px-4 py-2 rounded-md w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start now!
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 h-full flex flex-col">
              <div className="mb-4 flex items-center justify-center">
                <LottieAnimation
                  src="https://lottie.host/bff023a8-ddc5-4788-adf5-e8ef59e1e088/e749q9gbhS.lottie"
                  width="300px"
                  height="300px"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Mobile App Development</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                Native and cross-platform mobile applications that engage users and extend your digital reach.
              </p>
              <Link href="/register" className="mt-auto">
                <motion.button
                  className="bg-green-600 text-white px-4 py-2 rounded-md w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start now!
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Solutions?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine industry expertise with cutting-edge technology to deliver solutions that drive real business
              results.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <AnimatedSection delay={0.1}>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4">Tailored Approach</h3>
              <p className="text-gray-600">
                We understand that every business is unique. Our solutions are customized to address your specific
                challenges and goals, ensuring maximum impact and ROI.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4">Future-Proof Technology</h3>
              <p className="text-gray-600">
                Our solutions are built with scalability and future growth in mind, utilizing the latest technologies
                and best practices to ensure long-term success.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4">Expert Team</h3>
              <p className="text-gray-600">
                Our team of experienced professionals brings deep industry knowledge and technical expertise to every
                project, delivering exceptional results.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4">Ongoing Support</h3>
              <p className="text-gray-600">
                We provide comprehensive support and maintenance services to ensure your digital solutions continue to
                perform optimally and evolve with your business.
              </p>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <SolutionsBubbles />
        </AnimatedSection>
      </div>
    </AnimatedBackground>
  )
}
