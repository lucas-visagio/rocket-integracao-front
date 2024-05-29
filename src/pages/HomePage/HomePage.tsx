import axios from "axios";
import { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { IoIosRocket } from "react-icons/io";
import { CartModal } from "../../components/CartModal/CartModal";
import { ProductItem } from "../../components/ProductItem/ProductItem";
import { type SavedProduct } from "../../types/Saved/SavedProduct";

const HomePage = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<SavedProduct[]>([]);
  const [products, setProducts] = useState<SavedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios({
      method: "get",
      url: `${apiUrl}/product`,
      responseType: "json",
    })
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Erro ao carregar produtos.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#eff3f8] p-3 pt-20 sm:p-5">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md flex justify-between items-center p-4 z-10">
        <h1 className="flex items-center gap-4 text-2xl w-1/2 font-bold">
          Loja de compras do Rocket <IoIosRocket />
        </h1>
        <div className="relative">
          <button
            className="w-10 h-10 text-4xl"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <BsCart3 />
          </button>
          {cartCount > 0 && (
            <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              {cartCount}
            </div>
          )}
        </div>
      </header>
      <div className="flex justify-center mt-20">
        {loading ? (
          <div>Carregando produtos...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products?.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                setCartCount={setCartCount}
                setCartItems={setCartItems}
              />
            ))}
          </div>
        )}
      </div>
      <CartModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setCartCount={setCartCount}
        setCartItems={setCartItems}
        cartItems={cartItems}
      />
    </div>
  );
};

export default HomePage;
