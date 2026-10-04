// // import React, { useEffect } from "react";
// // import ProductCard from "@/components/ProductCard";
// // import { WishlistData } from "@/context/WishlistContext";
// // import { useNavigate } from "react-router-dom";
// // import { Button } from "@/components/ui/button";

// // const Wishlist = () => {
// //   const { wishlist, fetchWishlist } = WishlistData();

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchWishlist();
// //   }, []);

// //   return (
// //     <div className="min-h-[500px] p-6">
// //       <h1 className="text-2xl font-bold mb-6">My Wishlist ❤️</h1>

// //       {!wishlist || wishlist.length === 0 ? (
// //         <div className="flex h-[250px] justify-center items-center py-10 text-gray-500">
// //           <div className="p-3 flex flex-col items-center">
// //             <p className="text-[30px] font-semibold text-red-700 capitalize underline">
// //               Your wishlist is Empty!
// //             </p>
// //             <Button className="mt-2 w-20" onClick={() => navigate("/products")}>
// //               Shop Now
// //             </Button>
// //           </div>
// //         </div>
// //       ) : (
// //         // <p className="text-gray-500">No items in wishlist</p>
// //         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //           {wishlist.map((product, index) => (
// //             <ProductCard key={product?._id || index} product={product} />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Wishlist;



// import React, { useEffect } from "react";
// import ProductCard from "@/components/ProductCard";
// import { WishlistData } from "@/context/WishlistContext";
// import { ProductData } from "@/context/ProductContext";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";

// const Wishlist = () => {
//   const { wishlist, fetchWishlist } = WishlistData();
//   const { products } = ProductData();

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   // ==========================
//   // Recommendation Algorithm
//   // ==========================

//   const wishlistCategories = [
//     ...new Set(
//       (wishlist || [])
//         .filter((item) => item?.category)
//         .map((item) => item.category)
//     ),
//   ];

//   const recommendedProducts = (products || [])
//     .filter(
//       (product) =>
//         wishlistCategories.includes(product.category) &&
//         !(wishlist || []).some((item) => item?._id === product._id)
//     )
//     .slice(0, 4);

//   return (
//     <div className="min-h-[500px] p-6">
//       <h1 className="text-2xl font-bold mb-6">My Wishlist ❤️</h1>

//       {!wishlist || wishlist.length === 0 ? (
//         <div className="flex h-[250px] justify-center items-center py-10 text-gray-500">
//           <div className="p-3 flex flex-col items-center">
//             <p className="text-[30px] font-semibold text-red-700 capitalize underline">
//               Your wishlist is Empty!
//             </p>

//             <Button
//               className="mt-2"
//               onClick={() => navigate("/products")}
//             >
//               Shop Now
//             </Button>
//           </div>
//         </div>
//       ) : (
//         <>
//           {/* Wishlist Products */}
//           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {wishlist.map((product, index) => (
//               <ProductCard
//                 key={product?._id || index}
//                 product={product}
//               />
//             ))}
//           </div>

//           {/* Recommended Products */}
//           {recommendedProducts.length > 0 && (
//             <div className="mt-12">
//               <h2 className="text-2xl font-bold mb-6">
//                 Recommended For You
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {recommendedProducts.map((product) => (
//                   <ProductCard
//                     key={product._id}
//                     product={product}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Wishlist;



import React, { useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { WishlistData } from "@/context/WishlistContext";
import { ProductData } from "@/context/ProductContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Heart,
  ShoppingBag,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const Wishlist = () => {
  const { wishlist, fetchWishlist } = WishlistData();
  const { products } = ProductData();

  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ==========================
  // Recommendation Algorithm
  // ==========================

  const wishlistCategories = [
    ...new Set(
      (wishlist || [])
        .filter((item) => item?.category)
        .map((item) => item.category)
    ),
  ];

  const recommendedProducts = (products || [])
    .filter(
      (product) =>
        wishlistCategories.includes(product.category) &&
        !(wishlist || []).some((item) => item?._id === product._id)
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f1f3f6] dark:bg-[#0d0e10]">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                My Wishlist
              </h1>

              <p className="text-sm text-muted-foreground mt-1">
                Products you've saved for later
              </p>
            </div>
          </div>

          {wishlist && wishlist.length > 0 && (
            <div className="text-sm text-muted-foreground">
              {wishlist.length}{" "}
              {wishlist.length === 1 ? "item" : "items"} saved
            </div>
          )}
        </div>

        {/* Empty Wishlist */}
        {!wishlist || wishlist.length === 0 ? (
          <div className="min-h-[55vh] flex items-center justify-center">
            <div className="w-full max-w-md text-center bg-background rounded-3xl border border-border/50 shadow-sm p-8 md:p-10">
              <div className="mx-auto w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-5">
                <Heart className="w-10 h-10 text-red-500" />
              </div>

              <h2 className="text-2xl font-bold">
                Your Wishlist is Empty
              </h2>

              <p className="text-muted-foreground mt-2 leading-relaxed">
                Save products you love and come back to them whenever
                you're ready to shop.
              </p>

              <Button
                className="mt-6 rounded-xl px-6"
                onClick={() => navigate("/products")}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Start Shopping
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Wishlist Products */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">
                    Saved Products
                  </h2>

                  <p className="text-sm text-muted-foreground mt-1">
                    Your favorite products in one place
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
                {wishlist.map((product, index) => (
                  <ProductCard
                    key={product?._id || index}
                    product={product}
                  />
                ))}
              </div>
            </section>

            {/* Recommended Products */}
            {recommendedProducts.length > 0 && (
              <section className="mt-14">
                <div className="rounded-3xl bg-background border border-border/50 shadow-sm overflow-hidden">
                  <div className="p-5 md:p-6 border-b border-border/50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>

                        <div>
                          <h2 className="text-xl md:text-2xl font-bold">
                            Recommended For You
                          </h2>

                          <p className="text-sm text-muted-foreground mt-1">
                            More products based on your wishlist
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        className="w-fit rounded-xl"
                        onClick={() => navigate("/products")}
                      >
                        View All
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
                      {recommendedProducts.map((product) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;