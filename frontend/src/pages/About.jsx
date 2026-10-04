import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0e10] transition-colors">

      {/* HERO SECTION */}
      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-20 md:py-28">

          <div className="max-w-3xl mx-auto text-center">

            <p className="text-sm font-semibold tracking-wider uppercase text-[#2874f0] dark:text-[#5b9cf6]">
              Welcome to Hamro Pasal
            </p>

            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              Shopping made
              <span className="text-[#2874f0] dark:text-[#5b9cf6]">
                {" "}simple.
              </span>
            </h1>

            <p className="mt-6 text-base md:text-lg leading-7 text-gray-500 dark:text-gray-400">
              Hamro Pasal is a modern online shopping platform designed to
              make finding, ordering, and tracking products simple and
              convenient.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">

              <Link
                to="/products"
                className="
                  inline-flex items-center justify-center
                  px-6 py-3 rounded-lg
                  bg-[#2874f0] hover:bg-[#1f5fd0]
                  text-white text-sm font-medium
                  transition
                "
              >
                Start Shopping
              </Link>

              <Link
                to="/contact"
                className="
                  inline-flex items-center justify-center
                  px-6 py-3 rounded-lg
                  border border-gray-300 dark:border-gray-700
                  bg-white dark:bg-[#17181c]
                  text-gray-700 dark:text-gray-200
                  hover:bg-gray-100 dark:hover:bg-[#1d1f24]
                  text-sm font-medium
                  transition
                "
              >
                Contact Us
              </Link>

            </div>

          </div>
        </div>
      </section>


      {/* WHO WE ARE */}
      <section>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div>

              <p className="text-sm font-semibold uppercase tracking-wider text-[#2874f0] dark:text-[#5b9cf6]">
                Who We Are
              </p>

              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                A better way to shop online
              </h2>

              <p className="mt-5 text-sm md:text-base leading-7 text-gray-500 dark:text-gray-400">
                Hamro Pasal brings products and customers together through
                a simple and convenient online shopping experience. From
                browsing products to placing an order, our platform is
                designed to keep the shopping process easy and transparent.
              </p>

              <p className="mt-4 text-sm md:text-base leading-7 text-gray-500 dark:text-gray-400">
                Customers can explore products, manage their cart and
                wishlist, make secure online payments or choose Cash on
                Delivery, and stay informed about their order status.
              </p>

            </div>


            {/* RIGHT */}
            <div className="grid grid-cols-2 gap-4">

              <div className="p-6 rounded-xl bg-white dark:bg-[#17181c] border border-gray-200 dark:border-gray-800">
                <div className="text-2xl font-bold text-[#2874f0] dark:text-[#5b9cf6]">
                  Easy
                </div>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Simple and user-friendly shopping experience.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-[#17181c] border border-gray-200 dark:border-gray-800">
                <div className="text-2xl font-bold text-[#2874f0] dark:text-[#5b9cf6]">
                  Secure
                </div>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Secure authentication and payment options.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-[#17181c] border border-gray-200 dark:border-gray-800">
                <div className="text-2xl font-bold text-[#2874f0] dark:text-[#5b9cf6]">
                  Flexible
                </div>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Online payment and Cash on Delivery options.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-[#17181c] border border-gray-200 dark:border-gray-800">
                <div className="text-2xl font-bold text-[#2874f0] dark:text-[#5b9cf6]">
                  Reliable
                </div>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Track your order from placement to delivery.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* FEATURES */}
      <section className="border-y border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-[#101114]">

        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-sm font-semibold uppercase tracking-wider text-[#2874f0] dark:text-[#5b9cf6]">
              What We Offer
            </p>

            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Everything you need for a simple shopping experience
            </h2>

            <p className="mt-4 text-sm md:text-base text-gray-500 dark:text-gray-400">
              Designed with useful features that make online shopping
              convenient from start to finish.
            </p>

          </div>


          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* FEATURE */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#17181c] border border-gray-200 dark:border-gray-800 hover:border-[#2874f0]/40 transition">

              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10 text-[#2874f0] dark:text-[#5b9cf6] font-bold">
                01
              </div>

              <h3 className="mt-5 font-semibold text-gray-900 dark:text-white">
                Easy Shopping
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Browse products, search by category, and find what you need
                quickly.
              </p>

            </div>


            {/* FEATURE */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#17181c] border border-gray-200 dark:border-gray-800 hover:border-[#2874f0]/40 transition">

              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10 text-[#2874f0] dark:text-[#5b9cf6] font-bold">
                02
              </div>

              <h3 className="mt-5 font-semibold text-gray-900 dark:text-white">
                Secure Payments
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Choose online payment through eSewa or pay conveniently
                through Cash on Delivery.
              </p>

            </div>


            {/* FEATURE */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#17181c] border border-gray-200 dark:border-gray-800 hover:border-[#2874f0]/40 transition">

              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10 text-[#2874f0] dark:text-[#5b9cf6] font-bold">
                03
              </div>

              <h3 className="mt-5 font-semibold text-gray-900 dark:text-white">
                Order Tracking
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Stay updated with your order as it moves through the delivery
                process.
              </p>

            </div>


            {/* FEATURE */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#17181c] border border-gray-200 dark:border-gray-800 hover:border-[#2874f0]/40 transition">

              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10 text-[#2874f0] dark:text-[#5b9cf6] font-bold">
                04
              </div>

              <h3 className="mt-5 font-semibold text-gray-900 dark:text-white">
                Personalized Experience
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Wishlist, recommendations, reviews, and product discovery
                help make shopping more personal.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* MISSION */}
      <section>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-[#2874f0] dark:text-[#5b9cf6]">
            Our Mission
          </p>

          <h2 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Making online shopping simple and accessible
          </h2>

          <p className="mt-5 text-sm md:text-base leading-7 text-gray-500 dark:text-gray-400">
            Our goal is to create a reliable and easy-to-use shopping
            platform where customers can discover products, place orders
            confidently, choose a convenient payment method, and stay
            informed throughout the order process.
          </p>

        </div>

      </section>


      {/* CTA */}
      <section className="pb-16 md:pb-20">

        <div className="max-w-6xl mx-auto px-4 md:px-6">

          <div className="rounded-2xl bg-[#2874f0] dark:bg-[#1d5fc7] px-6 py-12 md:px-12 text-center">

            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Ready to start shopping?
            </h2>

            <p className="mt-3 text-sm md:text-base text-blue-100 max-w-xl mx-auto">
              Explore our products and discover something that fits your
              needs.
            </p>

            <Link
              to="/products"
              className="
                inline-flex items-center justify-center
                mt-6 px-6 py-3
                rounded-lg
                bg-white
                text-[#2874f0]
                hover:bg-gray-100
                text-sm font-semibold
                transition
              "
            >
              Explore Products
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default About; 