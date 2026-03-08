"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AddBookModal from '@/components/AddBookModal';
import Navbar from '@/components/Navbar';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';


const DashboardPage = () => {
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Booktoken");
    if (!token) {
      router.push("/auth");
    }
  }, [router]);

  const handleBookAdded = () => {
    toast.success("Book addedd sucessfully")
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">Dashboard</h1>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gray-600 text-white px-6 py-3 rounded-2xl font-bold text-lg hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
             <Plus/>
            </div>
            Add Book
          </button>
        </div>

      </main>

      <AddBookModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={handleBookAdded}
      />
    </div>
  );
};

export default DashboardPage;