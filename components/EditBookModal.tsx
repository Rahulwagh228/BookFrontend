"use client";
import React, { useState, useEffect } from "react";
import { updateBook, deleteBook } from "@/app/dashboard/functions";
import { toast } from "react-hot-toast";
import { Trash2 } from "lucide-react";

interface EditBookModalProps {
  isOpen: boolean;
  book: any;
  onClose: () => void;
  onSuccess: () => void;
}

const EditBookModal = ({ isOpen, book, onClose, onSuccess }: EditBookModalProps) => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    tags: "",
    status: "Want to Read",
  });
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title || "",
        author: book.author || "",
        tags: Array.isArray(book.tags) ? book.tags.join(", ") : "",
        status: book.status || "Want to Read",
      });
    }
  }, [book]);

  if (!isOpen || !book) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      toast.error("Title is required");
      return;
    }

    setLoading(true);
    const payload = {
      ...form,
      tags: form.tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "")
    };

    const result = await updateBook(book._id, payload);
    setLoading(false);

    if (result.ok) {
      toast.success("Book updated successfully!");
      onSuccess();
      onClose();
    } else {
      toast.error(result.data?.message || "Failed to update book");
    }
  };

  const handleDelete = async () => {
    
    setDeleting(true);
    const result = await deleteBook(book._id);
    setDeleting(false);

    if (result.ok) {
      toast.success("Book deleted successfully!");
      onSuccess();
      onClose();
    } else {
      toast.error(result.data?.message || "Failed to delete book");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Edit Book</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Author (Optional)</label>
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tags (Optional, comma separated)</label>
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all appearance-none"
            >
              <option value="Want to Read">Want To Read</option>
              <option value="Reading">Reading</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-100 font-bold text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || deleting}
                className="flex-1 py-3 px-4 bg-gray-600 text-white rounded-xl font-bold text-lg hover:bg-gray-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? "Updating..." : "Update Book"}
              </button>
            </div>
            
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading || deleting}
              className="w-full py-3 px-4 flex items-center justify-center gap-2 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
            >
              <Trash2 size={20} />
              {deleting ? "Deleting..." : "Delete Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
