import { AnimatedCubes } from "@/components/animated-cubes"
import { PageHeader } from "@/components/page-header"
import { PageTransition } from "@/components/page-transition"
import { ScrollProgressBar } from "@/components/scroll-progress-bar"

export default function FuseAdvantagePage() {
  return (
    <PageTransition>
      <ScrollProgressBar />
      <PageHeader
        title="The FUSE Advantage"
        description="Discover how FUSE.vip is revolutionizing small business technology"
      />
      <AnimatedCubes />
    </PageTransition>
  )
}
