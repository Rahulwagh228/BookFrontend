import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" bg-white">
      <Navbar />
      
  
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
            <div className="text-center lg:text-left lg:w-1/2">
              <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Track your <span className='text-gray-600'>Reading Progress</span> with ease
              </h1>
            
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/auth"
                  className="px-8 py-4 bg-gray-600 text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-gray-600 hover:border-2 hover:border-gray-100 hover:transition-all  text-center"
                >
                  Login   / Signup
                  
                </Link>
                <Link
                  href="/dashboard"
                  className="px-8 py-4 bg-white text-gray-600 border-2 border-gray-100 rounded-2xl font-bold text-lg hover:bg-gray-600 hover:text-white hover:transion-colours transition-all text-center flex items-center justify-center gap-2"
                >
                  View Dashboard
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

            
            </div>

            <div className="mt-16 lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end">              
              <div className="relative bg-white p-4 rounded-3xl shadow-2xl border border-gray-100 w-full max-w-lg transform hover:scale-[1.02] transition-transform duration-500">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] relative w-full h-full min-h-[300px]">
                  <Image 
                    src="/freepic_bookstore_image.jpg" 
                    alt="Reading Illustration" 
                    fill
                    className="object-cover"
                    
                  />

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className=" bg-gray-100 flex justify-center items-end p-6 text-md">Developed with &hearts; by Rahul bhau  all rights reserved &copy; {new Date().getFullYear()} </div>
      </footer>

      
    </main>
  );
}