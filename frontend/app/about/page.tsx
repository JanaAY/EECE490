"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="container px-4 md:px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900">
            About Our Platform
          </h1>
          <p className="text-gray-600 md:text-xl">
            Empowering diabetic retinopathy research with advanced AI technologies
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div>
            <Image
              src="/about.jpeg?height=500&width=500&text=Our+Project"
              alt="Our project team"
              width={500}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-900">Our Mission</h2>
            <p className="text-gray-600">
              Our mission is to leverage artificial intelligence to support early detection, analysis,
              and understanding of diabetic retinopathy through the development of innovative tools
              for the research community.
            </p>
            <p className="text-gray-600">
              By combining AI, medical knowledge, and data-driven approaches, we aim to make retinal
              healthcare more accessible and efficient for early intervention.
            </p>
          </div>
        </div>

        {/* Research Focus */}
        <Card>
          <CardHeader>
            <CardTitle>Our Research Focus</CardTitle>
            <CardDescription>Driving innovation across multiple domains</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-bold">Synthetic Data Generation</h3>
              <p className="text-sm text-gray-600">
                Using StyleGAN3 models to generate high-quality synthetic retinal images for dataset balancing
                and rare case augmentation.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">Vessel Mapping and Analysis</h3>
              <p className="text-sm text-gray-600">
                Segmenting retinal vessels to extract critical features for early detection and disease progression analysis.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">Automated DR Detection</h3>
              <p className="text-sm text-gray-600">
                Developing automated diabetic retinopathy detection systems with good accuracy to assist medical diagnosis.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">Interactive AI Tools</h3>
              <p className="text-sm text-gray-600">
                Building user-friendly platforms, including AI chatbots and academic search engines, to enhance researcher productivity.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-900">Our Team</h2>
          <p className="text-gray-600">
            We are a group of undergraduate students from the Electrical and Computer Engineering (ECE) department
            at the American University of Beirut (AUB), working together on advancing diabetic retinopathy research
            through AI-driven solutions.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2">
                    <Image
                      src="/jana.jpg?height=96&width=96&text=Student+1"
                      alt="Student 1"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold">Jana Ayoub</h3>
                  <p className="text-xs text-gray-600 mt-2">
                    Electrical and Computer Engineering Student
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2">
                    <Image
                      src="/tamara.jpg?height=96&width=96&text=Student+2"
                      alt="Student 2"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold">Tamara Fakih</h3>
                  <p className="text-xs text-gray-600 mt-2">
                    Computer and Communications Engineering Student
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2">
                    <Image
                      src="/tia.jpg?height=96&width=96&text=Student+3"
                      alt="Student 3"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold">Tia Tarabay</h3>
                  <p className="text-xs text-gray-600 mt-2">
                    Electrical and Computer Engineering Student
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </main>
  )
}
