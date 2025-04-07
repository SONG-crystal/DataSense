"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-[#E6F0FF]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              About <span className="text-[#1456BC]">Data</span><span className="text-[#FF8C42]">Sense</span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              We&apos;re building the future of IoT data visualization and analytics,
              helping businesses and individuals make sense of their data.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At DataSense, we believe that data should be accessible and understandable to everyone. 
              Our mission is to transform complex IoT data into clear, actionable insights through 
              beautiful visualizations and powerful analytics tools.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              We&apos;re dedicated to helping our users monitor and optimize their IoT devices, 
              whether they&apos;re managing smart home systems, industrial sensors, or environmental 
              monitoring equipment.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 bg-[#E6F0FF] rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#1456BC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-1 text-gray-900">Mustafa Toygar Baykal</h3>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 bg-[#E6F0FF] rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#1456BC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-1 text-gray-900">Jon Pablo</h3>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 bg-[#E6F0FF] rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#1456BC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-1 text-gray-900">Rutarj Mrushad Shah</h3>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 bg-[#E6F0FF] rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#1456BC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-1 text-gray-900">Sujung Song</h3>
            </div>
            
            {/* Team Member 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center md:col-start-2 md:col-span-2">
              <div className="w-32 h-32 bg-[#E6F0FF] rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#1456BC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-1 text-gray-900">Henly Su</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">Our Technologies</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="grid md:grid-cols-3 gap-y-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#E6F0FF] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1456BC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">React</h3>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#E6F0FF] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1456BC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Next.js</h3>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#E6F0FF] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1456BC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Tailwind CSS</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#1456BC] to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to experience DataSense?</h2>
          <p className="text-xl mb-8 max-w-xl mx-auto">Join our growing community and start visualizing your data today.</p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/register" 
              className="px-6 py-3 bg-[#FF8C42] text-white font-medium rounded-md hover:bg-orange-500 transition shadow-md"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 