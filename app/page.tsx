"use client"

import { CtaSection } from "@/components/cta-section"
import { AnimatedSection } from "@/components/animated-section"
import { BusinessSpotlight } from "@/components/business/business-spotlight"
import { LottieAnimation } from "@/components/lottie-animation"
import { AnimatedCubes } from "@/components/animated-cubes"
import { motion } from "framer-motion"
import { useState } from "react"
import { X, Play } from "lucide-react"
import { Link } from "@/components/ui/link" // Import our custom Link component
import Image from "next/image"

export default function Home() {
  const [showVideo, setShowVideo] = useState(false)
  const [showTokenVideo, setShowTokenVideo] = useState(false)

  // YouTube video IDs
  const youtubeVideoId = "uBDquOBgd0c"
  const tokenVideoId = "qjc966ZwKkk"

  return (
    <>
      {/* Hero section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Lottie Animation */}
            <AnimatedSection>
              <LottieAnimation src="https://lottie.host/2de3886b-81e9-40c9-a364-dce493cfc31a/APDopJg77F.lottie" />
            </AnimatedSection>

            <AnimatedSection>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Loyalty Reimagined.
                <br />
                Commerce Reconnected!
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-xl text-[#4a4a4a] mb-8 max-w-2xl">
                Fuse.Vip helps businesses transform customer loyalty with innovative digital solutions that drive
                engagement and growth.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <motion.button
                className="bg-[#FF3A2F] text-white px-8 py-4 rounded-md text-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowVideo(true)}
              >
                Check out our video
              </motion.button>
            </AnimatedSection>
          </div>
        </div>

        {/* Video Modal */}
        {showVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
                  title="Fuse.Vip Introduction"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* Token Video Modal */}
        {showTokenVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
              <button
                onClick={() => setShowTokenVideo(false)}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  src={`https://www.youtube.com/embed/${tokenVideoId}?autoplay=1`}
                  title="Fuse Token Information"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Business Spotlight */}
      <BusinessSpotlight />

      {/* Fuse Advantage Section with Lottie Animation */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <LottieAnimation
                src="https://lottie.host/03f158b6-3f6b-4ee1-9d52-7bd6d0bcacb3/i1DzAuFSkM.lottie"
                width="300px"
                height="300px"
                className="mx-auto"
              />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FFD700]">The Fuse Advantage</h2>
              <p className="text-xl text-[#4a4a4a] max-w-2xl mx-auto">
                Experience the power of our innovative loyalty platform that connects businesses with customers in
                meaningful ways.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Animated Cubes Section */}
      <AnimatedCubes />

      {/* Premium Card Section */}
      <section className="py-16 bg-[#1A1A1A] text-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            {/* New Lottie Animation */}
            <LottieAnimation src="https://lottie.host/0847c0e6-9d70-4c7e-a1e6-f5b123d72bc3/7X09lC5tFb.lottie" />
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FFD700]">Local Loyalty, Upgraded.</h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Almost 300 VIP members ready to shop at your business. Join free while you still can and get eyes on
                your business!
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="md:w-1/2 lg:w-2/5">
                <Image
                  src="/premium-card.png"
                  alt="Premium Fuse Card"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2 lg:w-3/5 space-y-6">
                <p className="text-lg">
                  Only $FUSE rewards you for doing what you are already doing. Check out the site and learn more why you
                  should Fuse.
                </p>
                <Link href="/register">
                  <motion.button
                    className="bg-[#3A56FF] text-white px-6 py-3 rounded-md text-lg font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join the Fuse.Vip Network
                  </motion.button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Network Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FFD700]">
                An Industrial Revolution is Starting
              </h2>
              <p className="text-xl text-[#4a4a4a] max-w-2xl mx-auto">
                Our Membership Card keeps you current with the changing times. Participation in Web3 is not required.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="md:w-1/2 lg:w-2/5">
                {/* Replaced the image with Lottie animation */}
                <LottieAnimation
                  src="https://lottie.host/57438694-eb58-4d37-b1b0-741ba3218d0c/9bTfQZllgj.lottie"
                  width="100%"
                  height="300px"
                />
              </div>
              <div className="md:w-1/2 lg:w-3/5 space-y-6">
                <p className="text-lg text-[#4a4a4a]">
                  Join a growing network of businesses and customers who are redefining loyalty in the digital age. Our
                  platform connects local businesses with eager customers looking for authentic experiences and real
                  value.
                </p>
                <Link href="/partners">
                  <motion.button
                    className="bg-[#3A56FF] text-white px-6 py-3 rounded-md text-lg font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore the Fuse.Vip Network
                  </motion.button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Token Section */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            {/* Added new Lottie animation above the $FUSE Token headline */}
            <LottieAnimation
              src="https://lottie.host/88875e32-c4f3-4026-9079-647df6e1bc6c/uYujvzM4Ld.lottie"
              width="100%"
              height="200px"
              className="mb-6"
            />
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">$FUSE Token</h2>
              <p className="text-xl text-[#4a4a4a] max-w-2xl mx-auto">
                Fuse.Vip gives you a bridge to more! Interact with your customers like never before.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="md:w-1/2 lg:w-2/5 relative group cursor-pointer" onClick={() => setShowTokenVideo(true)}>
                <div className="relative">
                  <Image
                    src={`https://img.youtube.com/vi/${tokenVideoId}/maxresdefault.jpg`}
                    alt="Fuse Token Video"
                    width={640}
                    height={360}
                    className="rounded-lg shadow-lg transition-all duration-300 group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-80 rounded-full p-4 shadow-lg transition-all duration-300 group-hover:scale-110">
                      <Play className="h-8 w-8 text-[#FF3A2F] fill-current" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 lg:w-3/5 space-y-6">
                <p className="text-lg text-[#4a4a4a]">
                  Fuse.Vip is a world where you and your customers earn back rewards. Built with the future of Global
                  Commerce in mind. The Fuse.Vip Network will help you keep more of your payments and customers. Start
                  Earning $FUSE!
                </p>
                <motion.button
                  className="bg-[#3A56FF] text-white px-6 py-3 rounded-md text-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTokenVideo(true)}
                >
                  Watch Video
                </motion.button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
