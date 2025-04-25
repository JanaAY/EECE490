import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="container px-4 md:px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900">
            About Our Platform
          </h1>
          <p className="text-gray-600 md:text-xl">
            Advancing diabetic retinopathy research through technology and collaboration
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div>
            <Image
              src="/placeholder.svg?height=400&width=500&text=Research+Team"
              alt="Our research team"
              width={500}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-900">Our Mission</h2>
            <p className="text-gray-600">
              Our mission is to accelerate diabetic retinopathy research and improve early detection through advanced AI
              models, collaborative tools, and open access to cutting-edge technology.
            </p>
            <p className="text-gray-600">
              We believe that by combining the expertise of medical professionals with the power of artificial
              intelligence, we can make significant strides in preventing vision loss due to diabetic retinopathy.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Our Research Focus</CardTitle>
            <CardDescription>Key areas where we're making an impact</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-bold">Early Detection</h3>
              <p className="text-sm text-gray-600">
                Developing models that can detect the earliest signs of diabetic retinopathy, when intervention is most
                effective.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">Automated Grading</h3>
              <p className="text-sm text-gray-600">
                Creating systems that can accurately grade the severity of DR, reducing the burden on specialists and
                improving access to care.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">Vessel Mapping</h3>
              <p className="text-sm text-gray-600">
                Pioneering techniques for detailed retinal vessel mapping to better understand the progression of the
                disease.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">Data Standardization</h3>
              <p className="text-sm text-gray-600">
                Working to establish standards for retinal imaging and data collection to facilitate collaborative
                research.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-900">Our Team</h2>
          <p className="text-gray-600">
            Our interdisciplinary team brings together ophthalmologists, AI researchers, data scientists, and software
            engineers to tackle the complex challenges of diabetic retinopathy research and detection.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2">
                    <Image
                      src="/placeholder.svg?height=96&width=96&text=Dr+Smith"
                      alt="Dr. Smith"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold">Dr. Sarah Smith</h3>
                  <p className="text-sm text-gray-500">Lead Ophthalmologist</p>
                  <p className="text-xs text-gray-600 mt-2">
                    Specializing in diabetic eye disease with over 15 years of clinical experience.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2">
                    <Image
                      src="/placeholder.svg?height=96&width=96&text=Dr+Chen"
                      alt="Dr. Chen"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold">Dr. Michael Chen</h3>
                  <p className="text-sm text-gray-500">AI Research Lead</p>
                  <p className="text-xs text-gray-600 mt-2">
                    PhD in Computer Vision with focus on medical image analysis and deep learning.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2">
                    <Image
                      src="/placeholder.svg?height=96&width=96&text=Dr+Patel"
                      alt="Dr. Patel"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold">Dr. Aisha Patel</h3>
                  <p className="text-sm text-gray-500">Data Science Director</p>
                  <p className="text-xs text-gray-600 mt-2">
                    Expert in biostatistics and medical data analysis with publications in top journals.
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
