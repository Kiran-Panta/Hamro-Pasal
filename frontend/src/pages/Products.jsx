// import Loading from "@/components/Loading";
// import ProductCard from "@/components/ProductCard";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { ProductData } from "@/context/ProductContext";
// import { UserData } from "@/context/UserContext";
// import { Filter, X } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// const Products = () => {
//   const [show, setShow] = useState(false);

//   const location = useLocation();

//   const {
//     search,
//     setSearch,
//     categories,
//     category,
//     setCategory,
//     totalPages,
//     price,
//     setPrice,
//     page,
//     setPage,
//     products,
//     loading,

//     // Recommendations
//     recommendations,
//     recommendationLoading,
//     fetchRecommendations,
//   } = ProductData();

//   const { isAuth } = UserData();

//   // ===============================
//   // READ SEARCH & CATEGORY FROM URL
//   // ===============================

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);

//     const q = params.get("search");
//     const categoryFromUrl = params.get("category");

//     // Search from URL
//     if (q !== null) {
//       setSearch(q);
//     }

//     // Category from URL
//     if (categoryFromUrl !== null) {
//       setCategory(categoryFromUrl);
//     }

//     // Reset pagination when coming from URL
//     if (q !== null || categoryFromUrl !== null) {
//       setPage(1);
//     }
//   }, [location.search]);

//   // ===============================
//   // FETCH RECOMMENDATIONS
//   // ===============================

//   useEffect(() => {
//     if (isAuth) {
//       fetchRecommendations();
//     }
//   }, [isAuth]);

//   // ===============================
//   // CLEAR FILTER
//   // ===============================

//   const clearFilter = () => {
//     setPrice("");
//     setCategory("");
//     setSearch("");
//     setPage(1);
//   };

//   // ===============================
//   // PAGINATION
//   // ===============================

//   const nextPage = () => {
//     setPage(page + 1);
//   };

//   const prevPage = () => {
//     setPage(page - 1);
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-full">

//       {/* ===============================
//           FILTER SIDEBAR
//       =============================== */}

//       <div
//         className={`fixed inset-y-0 left-0 z-50 md:z-40 w-60 bg-white text-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
//           show
//             ? "translate-x-0"
//             : "-translate-x-full"
//         }`}
//       >
//         <div className="p-4 relative">

//           {/* CLOSE BUTTON */}

//           <button
//             onClick={() => setShow(false)}
//             className="
//               absolute top-4 right-4
//               bg-gray-200 dark:bg-gray-700
//               text-gray-800 dark:text-white
//               rounded-full p-2 md:hidden
//             "
//           >
//             <X />
//           </button>

//           {/* FILTER TITLE */}

//           <h2 className="text-lg font-bold mb-2">
//             Filters
//           </h2>

//           {/* ===============================
//               SEARCH
//           =============================== */}

//           <div className="mb-4">

//             <label className="block text-sm font-medium mb-2">
//               Search Title
//             </label>

//             <Input
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setPage(1);
//               }}
//               placeholder="Search Title"
//             />

//           </div>

//           {/* ===============================
//               CATEGORY
//           =============================== */}

//           <div className="mb-4">

//             <label className="block text-sm font-medium mb-2">
//               Category
//             </label>

//             <select
//               value={category}
//               onChange={(e) => {
//                 setCategory(e.target.value);
//                 setPage(1);
//               }}
//               className="
//                 w-full p-2 border rounded-md
//                 dark:bg-gray-900
//                 dark:text-white
//               "
//             >
//               <option value="">
//                 All
//               </option>

//               {categories.map((e) => (
//                 <option
//                   key={e}
//                   value={e}
//                 >
//                   {e}
//                 </option>
//               ))}
//             </select>

//           </div>

//           {/* ===============================
//               PRICE
//           =============================== */}

//           <div className="mb-4">

//             <label className="block text-sm font-medium mb-2">
//               Price
//             </label>

//             <select
//               value={price}
//               onChange={(e) => {
//                 setPrice(e.target.value);
//                 setPage(1);
//               }}
//               className="
//                 w-full p-2 border rounded-md
//                 dark:bg-gray-900
//                 dark:text-white
//               "
//             >
//               <option value="">
//                 Select
//               </option>

//               <option value="lowToHigh">
//                 Low to High
//               </option>

//               <option value="highToLow">
//                 High to Low
//               </option>
//             </select>

//           </div>

//           {/* ===============================
//               CLEAR FILTER
//           =============================== */}

//           <Button
//             className="mt-2 w-full"
//             onClick={clearFilter}
//           >
//             Clear Filter
//           </Button>

//         </div>
//       </div>

//       {/* ===============================
//           MAIN CONTENT
//       =============================== */}

//       <div className="flex-1 p-4">

//         {/* ===============================
//             MOBILE FILTER BUTTON
//         =============================== */}

//         <button
//           onClick={() => setShow(true)}
//           className="
//             md:hidden
//             bg-blue-500
//             text-white
//             px-4
//             py-2
//             rounded-md
//             mb-4
//           "
//         >
//           <Filter />
//         </button>

//         {/* ===============================
//             ACTIVE CATEGORY MESSAGE
//         =============================== */}

//         {category && (
//           <div className="mb-6 flex items-center justify-between">

//             <div>

//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 Showing products from
//               </p>

//               <h1 className="text-2xl font-bold">
//                 {category}
//               </h1>

//             </div>

//             <Button
//               variant="outline"
//               onClick={clearFilter}
//             >
//               Clear Filter
//             </Button>

//           </div>
//         )}

//         {/* ===============================
//             PRODUCTS
//         =============================== */}

//         {loading ? (
//           <Loading />
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

//             {products?.length > 0 ? (
//               products.map((e) => (
//                 <ProductCard
//                   key={e._id}
//                   product={e}
//                   latest={"no"}
//                 />
//               ))
//             ) : (
//               <div className="col-span-full text-center py-20">

//                 <p className="text-gray-500 dark:text-gray-400">
//                   No Products Found
//                 </p>

//               </div>
//             )}

//           </div>
//         )}

//         {/* ===============================
//             PERSONALIZED RECOMMENDATIONS
//         =============================== */}

//         {isAuth &&
//           !recommendationLoading &&
//           recommendations.length > 0 && (
//             <div className="mt-10">

//               <h2 className="text-xl font-bold mb-4">
//                 ⭐ Recommended for You
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">

//                 {recommendations.map((product) => (
//                   <ProductCard
//                     key={product._id}
//                     product={product}
//                     latest={"no"}
//                   />
//                 ))}

//               </div>

//             </div>
//           )}

//         {/* ===============================
//             PAGINATION
//         =============================== */}

//         <div className="mt-4">

//           <Pagination>

//             <PaginationContent>

//               {/* PREVIOUS */}

//               {page !== 1 && (
//                 <PaginationItem onClick={prevPage}>
//                   <PaginationPrevious className="cursor-pointer" />
//                 </PaginationItem>
//               )}

//               {/* NEXT */}

//               {page !== totalPages && (
//                 <PaginationItem onClick={nextPage}>
//                   <PaginationNext className="cursor-pointer" />
//                 </PaginationItem>
//               )}

//             </PaginationContent>

//           </Pagination>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default Products;

// import Loading from "@/components/Loading";
// import ProductCard from "@/components/ProductCard";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { ProductData } from "@/context/ProductContext";
// import { UserData } from "@/context/UserContext";
// import {
//   ArrowDownUp,
//   Filter,
//   Search,
//   SlidersHorizontal,
//   Sparkles,
//   X,
//   PackageOpen,
// } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// const Products = () => {
//   const [show, setShow] = useState(false);

//   const location = useLocation();

//   const {
//     search,
//     setSearch,
//     categories,
//     category,
//     setCategory,
//     totalPages,
//     price,
//     setPrice,
//     page,
//     setPage,
//     products,
//     loading,

//     // Recommendations
//     recommendations,
//     recommendationLoading,
//     fetchRecommendations,
//   } = ProductData();

//   const { isAuth } = UserData();

//   // ===============================
//   // READ SEARCH & CATEGORY FROM URL
//   // ===============================

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);

//     const q = params.get("search");
//     const categoryFromUrl = params.get("category");

//     if (q !== null) {
//       setSearch(q);
//     }

//     if (categoryFromUrl !== null) {
//       setCategory(categoryFromUrl);
//     }

//     if (q !== null || categoryFromUrl !== null) {
//       setPage(1);
//     }
//   }, [location.search]);

//   // ===============================
//   // FETCH RECOMMENDATIONS
//   // ===============================

//   useEffect(() => {
//     if (isAuth) {
//       fetchRecommendations();
//     }
//   }, [isAuth]);

//   // ===============================
//   // CLEAR FILTER
//   // ===============================

//   const clearFilter = () => {
//     setPrice("");
//     setCategory("");
//     setSearch("");
//     setPage(1);
//   };

//   // ===============================
//   // PAGINATION
//   // ===============================

//   const nextPage = () => {
//     setPage(page + 1);
//   };

//   const prevPage = () => {
//     setPage(page - 1);
//   };

//   return (
//     <div className="min-h-screen bg-[#f1f3f6] dark:bg-[#0d0e10]">
//       <div className="max-w-[1600px] mx-auto px-4 py-6 md:py-8">
//         {/* ===============================
//             MOBILE FILTER BUTTON
//         =============================== */}

//         <div className="md:hidden mb-4">
//           <Button
//             onClick={() => setShow(true)}
//             variant="outline"
//             className="w-full h-11 rounded-xl bg-background"
//           >
//             <SlidersHorizontal className="w-4 h-4 mr-2" />
//             Filters & Sort
//           </Button>
//         </div>

//         <div className="flex gap-6 items-start">
//           {/* ===============================
//               FILTER SIDEBAR
//           =============================== */}

//           <aside
//             className={`
//               fixed inset-y-0 left-0 z-50
//               w-[290px]
//               bg-background
//               border-r border-border
//               shadow-2xl
//               transform transition-transform duration-300
//               md:relative md:z-auto md:w-[260px]
//               md:translate-x-0
//               md:shadow-sm
//               md:rounded-2xl
//               md:border
//               md:sticky md:top-6
//               md:max-h-[calc(100vh-48px)]
//               md:overflow-y-auto
//               ${
//                 show
//                   ? "translate-x-0"
//                   : "-translate-x-full"
//               }
//             `}
//           >
//             <div className="p-5">
//               {/* Filter Header */}
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-2">
//                   <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
//                     <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                   </div>

//                   <div>
//                     <h2 className="font-bold text-lg">
//                       Filters
//                     </h2>
//                     <p className="text-xs text-muted-foreground">
//                       Find what you need
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => setShow(false)}
//                   className="md:hidden w-9 h-9 rounded-full bg-muted flex items-center justify-center"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* Search */}
//               <div className="mb-6">
//                 <label className="text-sm font-semibold mb-2 block">
//                   Search Products
//                 </label>

//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

//                   <Input
//                     value={search}
//                     onChange={(e) => {
//                       setSearch(e.target.value);
//                       setPage(1);
//                     }}
//                     placeholder="Search products..."
//                     className="pl-9 h-11 rounded-xl"
//                   />
//                 </div>
//               </div>

//               {/* Category */}
//               <div className="mb-6">
//                 <label className="text-sm font-semibold mb-2 block">
//                   Category
//                 </label>

//                 <select
//                   value={category}
//                   onChange={(e) => {
//                     setCategory(e.target.value);
//                     setPage(1);
//                   }}
//                   className="
//                     w-full h-11 px-3
//                     border border-input
//                     rounded-xl
//                     bg-background
//                     text-foreground
//                     outline-none
//                     focus:ring-2
//                     focus:ring-blue-500/30
//                   "
//                 >
//                   <option value="">All Categories</option>

//                   {categories.map((e) => (
//                     <option key={e} value={e}>
//                       {e}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Price */}
//               <div className="mb-6">
//                 <label className="text-sm font-semibold mb-2 block">
//                   Sort by Price
//                 </label>

//                 <div className="relative">
//                   <ArrowDownUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />

//                   <select
//                     value={price}
//                     onChange={(e) => {
//                       setPrice(e.target.value);
//                       setPage(1);
//                     }}
//                     className="
//                       w-full h-11 pl-9 pr-3
//                       border border-input
//                       rounded-xl
//                       bg-background
//                       text-foreground
//                       outline-none
//                       focus:ring-2
//                       focus:ring-blue-500/30
//                     "
//                   >
//                     <option value="">Default</option>
//                     <option value="lowToHigh">
//                       Price: Low to High
//                     </option>
//                     <option value="highToLow">
//                       Price: High to Low
//                     </option>
//                   </select>
//                 </div>
//               </div>

//               {/* Divider */}
//               <div className="border-t border-border my-5" />

//               {/* Clear */}
//               <Button
//                 variant="outline"
//                 className="w-full h-11 rounded-xl"
//                 onClick={clearFilter}
//               >
//                 <X className="w-4 h-4 mr-2" />
//                 Clear All Filters
//               </Button>
//             </div>
//           </aside>

//           {/* Mobile Overlay */}
//           {show && (
//             <div
//               onClick={() => setShow(false)}
//               className="fixed inset-0 bg-black/50 z-40 md:hidden"
//             />
//           )}

//           {/* ===============================
//               MAIN CONTENT
//           =============================== */}

//           <main className="flex-1 min-w-0">
//             {/* Page Header */}
//             <div className="bg-background rounded-2xl border border-border/50 shadow-sm p-5 md:p-6 mb-6">
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//                 <div>
//                   <div className="flex items-center gap-2 mb-1">
//                     <PackageOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />

//                     <span className="text-sm text-muted-foreground">
//                       Hamro Pasal
//                     </span>
//                   </div>

//                   <h1 className="text-2xl md:text-3xl font-bold">
//                     {category
//                       ? category
//                       : search
//                       ? `Search results for "${search}"`
//                       : "All Products"}
//                   </h1>

//                   <p className="text-sm text-muted-foreground mt-1">
//                     Discover products you'll love
//                   </p>
//                 </div>

//                 {/* Active Filter */}
//                 {(category || search || price) && (
//                   <Button
//                     variant="outline"
//                     onClick={clearFilter}
//                     className="w-fit rounded-xl"
//                   >
//                     <X className="w-4 h-4 mr-2" />
//                     Clear Filters
//                   </Button>
//                 )}
//               </div>

//               {/* Active Filter Pills */}
//               {(category || search || price) && (
//                 <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-border/50">
//                   {search && (
//                     <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium">
//                       Search: {search}
//                     </span>
//                   )}

//                   {category && (
//                     <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium">
//                       Category: {category}
//                     </span>
//                   )}

//                   {price && (
//                     <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium">
//                       {price === "lowToHigh"
//                         ? "Price: Low to High"
//                         : "Price: High to Low"}
//                     </span>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* ===============================
//                 PRODUCTS
//             =============================== */}

//             {loading ? (
//               <div className="min-h-[400px] flex items-center justify-center bg-background rounded-2xl border border-border/50">
//                 <Loading />
//               </div>
//             ) : (
//               <>
//                 {products?.length > 0 ? (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//                     {products.map((e) => (
//                       <ProductCard
//                         key={e._id}
//                         product={e}
//                         latest={"no"}
//                       />
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="min-h-[400px] bg-background rounded-2xl border border-border/50 flex flex-col items-center justify-center text-center px-5">
//                     <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5">
//                       <Search className="w-9 h-9 text-muted-foreground" />
//                     </div>

//                     <h2 className="text-xl font-bold">
//                       No Products Found
//                     </h2>

//                     <p className="text-sm text-muted-foreground mt-2 max-w-md">
//                       We couldn't find any products matching your
//                       current filters.
//                     </p>

//                     <Button
//                       variant="outline"
//                       className="mt-5 rounded-xl"
//                       onClick={clearFilter}
//                     >
//                       Clear Filters
//                     </Button>
//                   </div>
//                 )}
//               </>
//             )}

//             {/* ===============================
//                 PERSONALIZED RECOMMENDATIONS
//             =============================== */}

//             {isAuth &&
//               !recommendationLoading &&
//               recommendations.length > 0 && (
//                 <section className="mt-12 bg-background rounded-2xl border border-border/50 shadow-sm overflow-hidden">
//                   <div className="p-5 md:p-6 border-b border-border/50">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
//                         <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                       </div>

//                       <div>
//                         <h2 className="text-xl md:text-2xl font-bold">
//                           Recommended For You
//                         </h2>

//                         <p className="text-sm text-muted-foreground mt-1">
//                           Products selected based on your activity
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="p-5 md:p-6">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
//                       {recommendations.map((product) => (
//                         <ProductCard
//                           key={product._id}
//                           product={product}
//                           latest={"no"}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </section>
//               )}

//             {/* ===============================
//                 PAGINATION
//             =============================== */}

//             {totalPages > 1 && (
//               <div className="mt-8 py-5 bg-background rounded-2xl border border-border/50">
//                 <Pagination>
//                   <PaginationContent>
//                     {page !== 1 && (
//                       <PaginationItem onClick={prevPage}>
//                         <PaginationPrevious className="cursor-pointer rounded-xl" />
//                       </PaginationItem>
//                     )}

//                     <div className="px-4 py-2 text-sm font-medium">
//                       Page {page} of {totalPages}
//                     </div>

//                     {page !== totalPages && (
//                       <PaginationItem onClick={nextPage}>
//                         <PaginationNext className="cursor-pointer rounded-xl" />
//                       </PaginationItem>
//                     )}
//                   </PaginationContent>
//                 </Pagination>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;


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
import {
  ArrowDownUp,
  Filter,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
  PackageOpen,
} from "lucide-react";
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
    <div className="min-h-screen bg-[#f1f3f6] dark:bg-[#0d0e10]">
      <div className="max-w-[1600px] mx-auto px-4 py-6 md:py-8">

        {/* ===============================
            MOBILE FILTER BUTTON
        =============================== */}

        <div className="md:hidden mb-4">
          <Button
            onClick={() => setShow(true)}
            variant="outline"
            className="w-full h-11 rounded-xl bg-background"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters & Sort
          </Button>
        </div>

        <div className="flex gap-6 items-start">

          {/* ===============================
              FILTER SIDEBAR
          =============================== */}

          <aside
            className={`
              fixed inset-y-0 left-0 z-50
              w-[290px]
              bg-background
              border-r border-border
              shadow-2xl
              transform transition-transform duration-300
              md:relative md:z-auto md:w-[260px]
              md:translate-x-0
              md:shadow-sm
              md:rounded-2xl
              md:border
              md:sticky md:top-6
              md:max-h-[calc(100vh-48px)]
              md:overflow-y-auto
              ${
                show
                  ? "translate-x-0"
                  : "-translate-x-full"
              }
            `}
          >
            <div className="p-5">

              {/* FILTER HEADER */}

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">

                  <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>

                  <div>
                    <h2 className="font-bold text-lg">
                      Filters
                    </h2>

                    <p className="text-xs text-muted-foreground">
                      Find what you need
                    </p>
                  </div>

                </div>

                <button
                  onClick={() => setShow(false)}
                  className="md:hidden w-9 h-9 rounded-full bg-muted flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* SEARCH */}

              <div className="mb-6">
                <label className="text-sm font-semibold mb-2 block">
                  Search Products
                </label>

                <div className="relative">

                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                  <Input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search products..."
                    className="pl-9 h-11 rounded-xl"
                  />

                </div>
              </div>

              {/* CATEGORY */}

              <div className="mb-6">
                <label className="text-sm font-semibold mb-2 block">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                  className="
                    w-full h-11 px-3
                    border border-input
                    rounded-xl
                    bg-background
                    text-foreground
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500/30
                  "
                >
                  <option className="text-black" value="">
                    All Categories
                  </option>

                  {categories.map((e) => (
                    <option className="text-black" key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>

              {/* PRICE */}

              <div className="mb-6">
                <label className="text-sm font-semibold mb-2 block">
                  Sort by Price
                </label>

                <div className="relative">

                  <ArrowDownUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />

                  <select
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      setPage(1);
                    }}
                    className="
                      w-full h-11 pl-9 pr-3
                      border border-input
                      rounded-xl
                      bg-background
                      text-foreground
                      outline-none
                      focus:ring-2
                      focus:ring-blue-500/30
                    "
                  >
                    <option className="text-black" value="">
                      Default
                    </option>

                    <option  className="text-black" value="lowToHigh">
                      Price: Low to High
                    </option>

                    <option className="text-black" value="highToLow">
                      Price: High to Low
                    </option>
                  </select>

                </div>
              </div>

              {/* DIVIDER */}

              <div className="border-t border-border my-5" />

              {/* CLEAR */}

              <Button
                variant="outline"
                className="w-full h-11 rounded-xl"
                onClick={clearFilter}
              >
                <X className="w-4 h-4 mr-2" />
                Clear All Filters
              </Button>

            </div>
          </aside>

          {/* MOBILE OVERLAY */}

          {show && (
            <div
              onClick={() => setShow(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
          )}

          {/* ===============================
              MAIN CONTENT
          =============================== */}

          <main className="flex-1 min-w-0">

            {/* PAGE HEADER */}

            <div className="bg-background rounded-2xl border border-border/50 shadow-sm p-5 md:p-6 mb-6">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>

                  <div className="flex items-center gap-2 mb-1">

                    <PackageOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />

                    <span className="text-sm text-muted-foreground">
                      Hamro Pasal
                    </span>

                  </div>

                  <h1 className="text-2xl md:text-3xl font-bold">
                    {category
                      ? category
                      : search
                      ? `Search results for "${search}"`
                      : "All Products"}
                  </h1>

                  <p className="text-sm text-muted-foreground mt-1">
                    Discover products you'll love
                  </p>

                </div>

                {/* ACTIVE FILTER */}

                {(category || search || price) && (
                  <Button
                    variant="outline"
                    onClick={clearFilter}
                    className="w-fit rounded-xl"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear Filters
                  </Button>
                )}

              </div>

              {/* ACTIVE FILTER PILLS */}

              {(category || search || price) && (
                <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-border/50">

                  {search && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium">
                      Search: {search}
                    </span>
                  )}

                  {category && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium">
                      Category: {category}
                    </span>
                  )}

                  {price && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium">
                      {price === "lowToHigh"
                        ? "Price: Low to High"
                        : "Price: High to Low"}
                    </span>
                  )}

                </div>
              )}

            </div>

            {/* ===============================
                PRODUCTS
            =============================== */}

            {loading ? (
              <div className="min-h-[400px] flex items-center justify-center bg-background rounded-2xl border border-border/50">
                <Loading />
              </div>
            ) : (
              <>
                {products?.length > 0 ? (

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

                    {products.map((e) => (
                      <ProductCard
                        key={e._id}
                        product={e}
                        latest={"no"}
                      />
                    ))}

                  </div>

                ) : (

                  <div className="min-h-[400px] bg-background rounded-2xl border border-border/50 flex flex-col items-center justify-center text-center px-5">

                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5">
                      <Search className="w-9 h-9 text-muted-foreground" />
                    </div>

                    <h2 className="text-xl font-bold">
                      No Products Found
                    </h2>

                    <p className="text-sm text-muted-foreground mt-2 max-w-md">
                      We couldn't find any products matching your
                      current filters.
                    </p>

                    <Button
                      variant="outline"
                      className="mt-5 rounded-xl"
                      onClick={clearFilter}
                    >
                      Clear Filters
                    </Button>

                  </div>

                )}
              </>
            )}

            {/* ===============================
                PERSONALIZED RECOMMENDATIONS
            =============================== */}

            {isAuth &&
              !recommendationLoading &&
              recommendations.length > 0 && (

                <section className="mt-12 bg-background rounded-2xl border border-border/50 shadow-sm overflow-hidden">

                  <div className="p-5 md:p-6 border-b border-border/50">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">

                        <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />

                      </div>

                      <div>

                        <h2 className="text-xl md:text-2xl font-bold">
                          Recommended For You
                        </h2>

                        <p className="text-sm text-muted-foreground mt-1">
                          Products selected based on your activity
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="p-5 md:p-6">

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">

                      {recommendations.map((product) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                          latest={"no"}
                        />
                      ))}

                    </div>

                  </div>

                </section>

              )}

            {/* ===============================
                PAGINATION
            =============================== */}

            {totalPages > 1 && (

              <div className="mt-8 py-5 bg-background rounded-2xl border border-border/50">

                <Pagination>

                  <PaginationContent>

                    {page !== 1 && (
                      <PaginationItem onClick={prevPage}>
                        <PaginationPrevious className="cursor-pointer rounded-xl" />
                      </PaginationItem>
                    )}

                    <div className="px-4 py-2 text-sm font-medium">
                      Page {page} of {totalPages}
                    </div>

                    {page !== totalPages && (
                      <PaginationItem onClick={nextPage}>
                        <PaginationNext className="cursor-pointer rounded-xl" />
                      </PaginationItem>
                    )}

                  </PaginationContent>

                </Pagination>

              </div>

            )}

          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;