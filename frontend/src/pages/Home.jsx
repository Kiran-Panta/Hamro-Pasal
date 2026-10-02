import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { ProductData } from "@/context/ProductContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Smartphone,
  Watch,
  Camera,
  Refrigerator,
  Truck,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { loading, newProd } = ProductData();

  // Shop by category
  const categories = [
    {
      name: "Smartphones",
      icon: Smartphone,
      value: "Smart Phone",
    },
    {
      name: "Watches",
      icon: Watch,
      value: "Watch",
    },
    {
      name: "Cameras",
      icon: Camera,
      value: "Camera",
    },
    {
      name: "Electronics",
      icon: Refrigerator,
      value: "Electronics",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0c0f] text-gray-900 dark:text-white pb-20 antialiased selection:bg-black selection:text-white">

      {/* HERO */}
      <Hero navigate={navigate} />

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* SHOP BY CATEGORY */}
        <section className="mt-16 sm:mt-24">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase">
              Explore
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
              Shop by Category
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Find what you need from our collection.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.name}
                  onClick={() =>
                    navigate(
                      `/products?category=${encodeURIComponent(
                        category.value
                      )}`
                    )
                  }
                  className="
                    group
                    flex flex-col items-center justify-center
                    min-h-[150px]
                    p-6
                    rounded-2xl
                    border border-gray-200
                    dark:border-gray-800
                    bg-gray-50
                    dark:bg-[#171b2e]
                    hover:border-[#2874f0]
                    hover:shadow-lg
                    hover:-translate-y-1
                    transition-all duration-300
                  "
                >
                  <div
                    className="
                      w-14 h-14
                      flex items-center justify-center
                      rounded-full
                      bg-blue-50
                      dark:bg-blue-950/40
                      text-[#2874f0]
                      group-hover:bg-[#2874f0]
                      group-hover:text-white
                      transition-all duration-300
                    "
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="mt-4 font-semibold text-sm sm:text-base">
                    {category.name}
                  </h3>

                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 group-hover:text-[#2874f0]">
                    Explore →
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* LATEST PRODUCTS */}
        <section className="mt-16 sm:mt-24">
          <div
            className="
              flex flex-col
              md:flex-row
              md:items-end
              justify-between
              mb-10
              pb-5
              border-b
              border-gray-100
              dark:border-gray-800
            "
          >
            <div>
              <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase">
                Fresh Arrivals
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
                Latest Products
              </h2>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0 max-w-md">
              Explore our newest products and find something you'll love.
            </p>
          </div>

          {/* PRODUCTS */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse space-y-3"
                >
                  <div className="aspect-square w-full rounded-xl bg-gray-200 dark:bg-gray-800" />

                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />

                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : newProd && newProd.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newProd.map((e) => (
                <div
                  key={e._id}
                  className="
                    rounded-xl
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                  "
                >
                  <ProductCard
                    product={e}
                    latest="yes"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="
                text-center
                py-20
                border
                border-dashed
                border-gray-200
                dark:border-gray-800
                rounded-2xl
                max-w-md
                mx-auto
              "
            >
              <h3 className="text-sm font-semibold">
                No products yet
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Check back later for updates
              </p>
            </div>
          )}
        </section>

        {/* WHY SHOP WITH HAMRO PASAL */}
        <section className="mt-20 sm:mt-28">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase">
              Why Choose Us
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
              Why Shop With Hamro Pasal?
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              We make your online shopping experience simple and convenient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* FAST DELIVERY */}
            <div
              className="
                group
                text-center
                p-8
                rounded-2xl
                border
                border-gray-200
                dark:border-gray-800
                bg-gray-50
                dark:bg-[#171b2e]
                hover:shadow-lg
                hover:-translate-y-1
                transition-all duration-300
              "
            >
              <div
                className="
                  mx-auto
                  w-14 h-14
                  flex items-center justify-center
                  rounded-full
                  bg-blue-50
                  dark:bg-blue-950/40
                  text-[#2874f0]
                  group-hover:bg-[#2874f0]
                  group-hover:text-white
                  transition-all duration-300
                "
              >
                <Truck className="w-7 h-7" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Convenient Delivery
              </h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-6">
                Get your products delivered conveniently to your
                preferred address.
              </p>
            </div>

            {/* SECURE SHOPPING */}
            <div
              className="
                group
                text-center
                p-8
                rounded-2xl
                border
                border-gray-200
                dark:border-gray-800
                bg-gray-50
                dark:bg-[#171b2e]
                hover:shadow-lg
                hover:-translate-y-1
                transition-all duration-300
              "
            >
              <div
                className="
                  mx-auto
                  w-14 h-14
                  flex items-center justify-center
                  rounded-full
                  bg-blue-50
                  dark:bg-blue-950/40
                  text-[#2874f0]
                  group-hover:bg-[#2874f0]
                  group-hover:text-white
                  transition-all duration-300
                "
              >
                <ShieldCheck className="w-7 h-7" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Secure Shopping
              </h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-6">
                Shop confidently with secure authentication and
                protected order information.
              </p>
            </div>

            {/* EASY PAYMENT */}
            <div
              className="
                group
                text-center
                p-8
                rounded-2xl
                border
                border-gray-200
                dark:border-gray-800
                bg-gray-50
                dark:bg-[#171b2e]
                hover:shadow-lg
                hover:-translate-y-1
                transition-all duration-300
              "
            >
              <div
                className="
                  mx-auto
                  w-14 h-14
                  flex items-center justify-center
                  rounded-full
                  bg-blue-50
                  dark:bg-blue-950/40
                  text-[#2874f0]
                  group-hover:bg-[#2874f0]
                  group-hover:text-white
                  transition-all duration-300
                "
              >
                <CreditCard className="w-7 h-7" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Flexible Payment
              </h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-6">
                Choose between secure online payment through eSewa
                or Cash on Delivery.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;