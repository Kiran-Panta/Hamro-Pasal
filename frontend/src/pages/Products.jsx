import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ProductData } from "@/context/ProductContext";
import { UserData } from "@/context/UserContext";
import { Filter, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Products = () => {
  const [show, setShow] = useState(false);

  const location = useLocation();

  const {
    search,
    setSearch,
    categories,
    category,
    setCategory,
    totalPages,
    price,
    setPrice,
    page,
    setPage,
    products,
    loading,

    // Recommendations
    recommendations,
    recommendationLoading,
    fetchRecommendations,
  } = ProductData();

  const { isAuth } = UserData();

  // ===============================
  // READ SEARCH & CATEGORY FROM URL
  // ===============================

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const q = params.get("search");
    const categoryFromUrl = params.get("category");

    // Search from URL
    if (q !== null) {
      setSearch(q);
    }

    // Category from URL
    if (categoryFromUrl !== null) {
      setCategory(categoryFromUrl);
    }

    // Reset pagination when coming from URL
    if (q !== null || categoryFromUrl !== null) {
      setPage(1);
    }
  }, [location.search]);

  // ===============================
  // FETCH RECOMMENDATIONS
  // ===============================

  useEffect(() => {
    if (isAuth) {
      fetchRecommendations();
    }
  }, [isAuth]);

  // ===============================
  // CLEAR FILTER
  // ===============================

  const clearFilter = () => {
    setPrice("");
    setCategory("");
    setSearch("");
    setPage(1);
  };

  // ===============================
  // PAGINATION
  // ===============================

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="flex flex-col md:flex-row h-full">

      {/* ===============================
          FILTER SIDEBAR
      =============================== */}

      <div
        className={`fixed inset-y-0 left-0 z-50 md:z-40 w-60 bg-white text-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          show
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="p-4 relative">

          {/* CLOSE BUTTON */}

          <button
            onClick={() => setShow(false)}
            className="
              absolute top-4 right-4
              bg-gray-200 dark:bg-gray-700
              text-gray-800 dark:text-white
              rounded-full p-2 md:hidden
            "
          >
            <X />
          </button>

          {/* FILTER TITLE */}

          <h2 className="text-lg font-bold mb-2">
            Filters
          </h2>

          {/* ===============================
              SEARCH
          =============================== */}

          <div className="mb-4">

            <label className="block text-sm font-medium mb-2">
              Search Title
            </label>

            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search Title"
            />

          </div>

          {/* ===============================
              CATEGORY
          =============================== */}

          <div className="mb-4">

            <label className="block text-sm font-medium mb-2">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="
                w-full p-2 border rounded-md
                dark:bg-gray-900
                dark:text-white
              "
            >
              <option value="">
                All
              </option>

              {categories.map((e) => (
                <option
                  key={e}
                  value={e}
                >
                  {e}
                </option>
              ))}
            </select>

          </div>

          {/* ===============================
              PRICE
          =============================== */}

          <div className="mb-4">

            <label className="block text-sm font-medium mb-2">
              Price
            </label>

            <select
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setPage(1);
              }}
              className="
                w-full p-2 border rounded-md
                dark:bg-gray-900
                dark:text-white
              "
            >
              <option value="">
                Select
              </option>

              <option value="lowToHigh">
                Low to High
              </option>

              <option value="highToLow">
                High to Low
              </option>
            </select>

          </div>

          {/* ===============================
              CLEAR FILTER
          =============================== */}

          <Button
            className="mt-2 w-full"
            onClick={clearFilter}
          >
            Clear Filter
          </Button>

        </div>
      </div>

      {/* ===============================
          MAIN CONTENT
      =============================== */}

      <div className="flex-1 p-4">

        {/* ===============================
            MOBILE FILTER BUTTON
        =============================== */}

        <button
          onClick={() => setShow(true)}
          className="
            md:hidden
            bg-blue-500
            text-white
            px-4
            py-2
            rounded-md
            mb-4
          "
        >
          <Filter />
        </button>

        {/* ===============================
            ACTIVE CATEGORY MESSAGE
        =============================== */}

        {category && (
          <div className="mb-6 flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing products from
              </p>

              <h1 className="text-2xl font-bold">
                {category}
              </h1>

            </div>

            <Button
              variant="outline"
              onClick={clearFilter}
            >
              Clear Filter
            </Button>

          </div>
        )}

        {/* ===============================
            PRODUCTS
        =============================== */}

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {products?.length > 0 ? (
              products.map((e) => (
                <ProductCard
                  key={e._id}
                  product={e}
                  latest={"no"}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20">

                <p className="text-gray-500 dark:text-gray-400">
                  No Products Found
                </p>

              </div>
            )}

          </div>
        )}

        {/* ===============================
            PERSONALIZED RECOMMENDATIONS
        =============================== */}

        {isAuth &&
          !recommendationLoading &&
          recommendations.length > 0 && (
            <div className="mt-10">

              <h2 className="text-xl font-bold mb-4">
                ⭐ Recommended for You
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">

                {recommendations.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    latest={"no"}
                  />
                ))}

              </div>

            </div>
          )}

        {/* ===============================
            PAGINATION
        =============================== */}

        <div className="mt-4">

          <Pagination>

            <PaginationContent>

              {/* PREVIOUS */}

              {page !== 1 && (
                <PaginationItem onClick={prevPage}>
                  <PaginationPrevious className="cursor-pointer" />
                </PaginationItem>
              )}

              {/* NEXT */}

              {page !== totalPages && (
                <PaginationItem onClick={nextPage}>
                  <PaginationNext className="cursor-pointer" />
                </PaginationItem>
              )}

            </PaginationContent>

          </Pagination>

        </div>

      </div>
    </div>
  );
};

export default Products;