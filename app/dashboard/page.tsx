"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AddBookModal from '@/components/AddBookModal';
import Navbar from '@/components/Navbar';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';


import { allbook } from '@/app/dashboard/functions';
import BooksTable from '@/components/BooksTable';

const DashboardPage = () => {
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    const result = await allbook();
    if (result.ok) {
      setBooks(result.data.books || []);
      setTotalCount(result.data.totalCount || 0);
    } else {
      toast.error("Failed to load books");
    }
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("Booktoken");
    if (!token) {
      router.push("/auth");
    } else {
      fetchBooks();
    }
  }, [router]);

  const handleBookAdded = () => {
    fetchBooks();
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Track and manage your reading journey</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gray-600 text-white px-6 py-3 rounded-2xl font-bold text-lg hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
             <Plus className="w-4 h-4" />
            </div>
            Add Book
          </button>
        </div>

        {/* Counter Box */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Books</span>
            <span className="text-5xl font-extrabold text-gray-900">{totalCount}</span>
          </div>
          {/* You could add more stat boxes here later (e.g. Reading, Completed) */}
        </div>

        {/* Data Table */}
        <div className="bg-white p-2 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="h-40 flex items-center justify-center text-gray-400">Loading your books...</div>
          ) : books.length > 0 ? (
            <BooksTable rowData={books} />
          ) : (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 text-lg">No books found in your library.</p>
            </div>
          )}
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