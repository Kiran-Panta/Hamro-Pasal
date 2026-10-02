import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [newProd, setNewProd] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);

  const [refresh, setRefresh] = useState(false);

  // ===============================
  // FETCH ALL PRODUCTS
  // ===============================

  async function fetchProducts() {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `${server}/api/product/all?search=${search}&category=${category}&sortByPrice=${price}&page=${page}`
      );

      setProducts(data.products);
      setNewProd(data.newProduct);
      setCategories(data.categories);
      setTotalPages(data.totalPages);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // ===============================
  // PRODUCT DETAILS
  // ===============================

  const [product, setProduct] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);

  async function fetchProduct(id) {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `${server}/api/product/${id}`
      );

      setProduct(data.product);
      setRelatedProduct(data.relatedProduct);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // ===============================
  // PERSONALIZED RECOMMENDATIONS
  // ===============================

  const [recommendations, setRecommendations] = useState([]);
  const [recommendationLoading, setRecommendationLoading] =
    useState(false);

  async function fetchRecommendations() {
    const token = Cookies.get("token");

    // User is not logged in
    if (!token) {
      setRecommendations([]);
      return;
    }

    setRecommendationLoading(true);

    try {
      const { data } = await axios.get(
        `${server}/api/product/recommendations`,
        {
          headers: {
            token: token,
          },
        }
      );

      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.log(
        "Recommendation Error:",
        error.response?.data?.message || error.message
      );

      setRecommendations([]);
    } finally {
      setRecommendationLoading(false);
    }
  }

  // ===============================
  // FETCH PRODUCTS WHEN FILTERS CHANGE
  // ===============================

  useEffect(() => {
    fetchProducts();
  }, [search, category, page, price, refresh]);

  return (
    <ProductContext.Provider
      value={{
        // Products
        loading,
        products,
        newProd,

        // Filters
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

        // Product details
        fetchProduct,
        fetchProducts,
        product,
        relatedProduct,

        // Refresh
        refresh,
        setRefresh,

        // Recommendations
        recommendations,
        recommendationLoading,
        fetchRecommendations,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const ProductData = () => useContext(ProductContext);