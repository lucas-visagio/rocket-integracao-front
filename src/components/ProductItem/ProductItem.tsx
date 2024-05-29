import ProductImg from "../../assets/product.svg";
import { SavedProduct } from "../../types/Saved/SavedProduct";

interface ProductItemProps {
  product: SavedProduct;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  setCartItems: React.Dispatch<React.SetStateAction<SavedProduct[]>>;
}

export const ProductItem = ({
  product,
  setCartCount,
  setCartItems,
}: ProductItemProps) => {
  return (
    <div
      className="flex flex-col border-2 border-gray-200 rounded-lg shadow-md p-4"
      key={product.id}
    >
      <img
        src={ProductImg}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4 flex flex-col items-center">
        <label className="text-lg font-semibold mb-2 text-center">
          {product.name}
        </label>
        <label className="text-gray-600 mb-4 text-center">
          {product.description}
        </label>
        <label className="text-xl font-bold text-green-600">{`R$ ${product.price.toFixed(
          2
        )}`}</label>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => {
            setCartCount((prevCount) => prevCount + 1);
            setCartItems((oldCart) => [...oldCart, product]);
          }}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
};
