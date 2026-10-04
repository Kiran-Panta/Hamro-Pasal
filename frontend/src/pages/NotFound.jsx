import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Home,
  Search,
  ShoppingBag,
} from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f1f3f6] dark:bg-[#0d0e10] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">
        <div className="bg-white dark:bg-[#15171a] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            
            {/* Image Section */}
            <div className="flex items-center justify-center p-8 md:p-12 bg-blue-50/60 dark:bg-blue-950/20">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                  <ShoppingBag size={22} />
                </div>

                <img
                  src="/not found.png"
                  alt="Page not found"
                  className="w-full max-w-md object-contain"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-sm font-medium mb-5">
                <Search size={15} />
                Page not found
              </div>

              <h1 className="text-7xl md:text-8xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                404
              </h1>

              <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                Oops! You lost your way.
              </h2>

              <p className="mt-4 text-gray-500 dark:text-gray-400 leading-relaxed max-w-md mx-auto md:mx-0">
                The page you're looking for doesn't exist or may have been
                moved. Don't worry, there's plenty more to explore at Hamro
                Pasal.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link to="/">
                  <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                    <Home size={18} />
                    Back to Home
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="w-full sm:w-auto"
                >
                  <ArrowLeft size={18} />
                  Go Back
                </Button>
              </div>

              {/* Small branding */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-400">
                  <ShoppingBag size={16} />
                  <span>Hamro Pasal</span>
                  <span>•</span>
                  <span>Shop with ease</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-center text-sm text-gray-400 dark:text-gray-600 mt-6">
          Let&apos;s get you back to shopping.
        </p>
      </div>
    </div>
  );
};

export default NotFound;