"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

 
  useEffect(() => {
    const token = localStorage.getItem("Booktoken");

    if (token) {
      router.push("/dashboard");
    }
  }, [router]);


  const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const handleChange = (e:any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

  
    const endpoint = isLogin
      ? `${API_URL}/auth/login`
      : `${API_URL}/auth/register`;

    // const endpoint = isLogin
    //   ? "http://localhost:5000/auth/login"
    //   : "http://localhost:5000/auth/register";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data, "dataaaaaa");

      if (res.ok) {
        if (data.response?.token) {
            console.log(data.response, "Data response")
          localStorage.setItem("Booktoken", JSON.stringify(data.response));
        }
        toast.success(data.message || (isLogin ? "Logged in successfully!" : "Account created successfully!"));
        
        setForm({
          username: "",
          email: "",
          password: "",
        });

        router.push("/");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect to the server");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Signup"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Name"
              value={form.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <button
            className="text-blue-500 ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>

      </div>
    </div>
  );
}