import { useEffect, useState } from "react";
import { Products } from "../store/product";
import BookGrid from "./MainBody/BookGrid";
import HeroSection from "./MainBody/HeroSection";

export default function MainBody() {
  const [product_list, setProductList] = useState([]);

  const handleProductSearch = (search) => {
    // Assuming the 'name' property of each product is used for searching
    const filteredProducts = product_list.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    setProductList(filteredProducts);
  };

  const sortByNameAsc = () => {
    const sortedProducts = [...product_list].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setProductList(sortedProducts);
  };

  const sortByNameDesc = () => {
    const sortedProducts = [...product_list].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    setProductList(sortedProducts);
  };

  const sortByYearAsc = () => {
    const sortedProducts = [...product_list].sort(
      (a, b) => a.publication_year - b.publication_year
    );
    setProductList(sortedProducts);
  };

  const sortByYearDesc = () => {
    const sortedProducts = [...product_list].sort(
      (a, b) => b.publication_year - a.publication_year
    );
    setProductList(sortedProducts);
  };

  const handleProductSort = (name) => {
    if (name == "name_asc") {
      sortByNameAsc();
    } else if (name == "name_desc") {
      sortByNameDesc();
    } else if (name == "year_asc") {
      sortByYearAsc();
    } else if (name == "year_desc") {
      sortByYearDesc();
    } else {
      setProductList(Products);
    }
  };

  const toggleFavorite = (productId) => {
    // Find the product by ID in the product list
    const updatedProducts = product_list.map((product) => {
      if (product.id === productId) {
        // Toggle the 'favourite' property
        return { ...product, favourite: !product.favourite };
      }
      return product;
    });

    // Update the product list with the modified product
    setProductList(updatedProducts);
  };

  useEffect(() => {
    if (product_list?.length === 0) {
      setProductList(Products);
    }
  }, [product_list]);

  return (
    <main className="my-10 lg:my-14">
      <HeroSection
        handleSearch={handleProductSearch}
        handleSort={handleProductSort}
      />
      <BookGrid product_list={product_list} toggleFavorite={toggleFavorite} />
    </main>
  );
}
