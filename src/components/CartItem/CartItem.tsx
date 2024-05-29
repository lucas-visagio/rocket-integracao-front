import ProductImg from "../../assets/product.svg";
import { SavedProduct } from "../../types/Saved/SavedProduct";

interface CartItemProps {
  product: SavedProduct;
  removeItem: () => void;
}

export const CartItem = ({ product, removeItem }: CartItemProps) => {
  return (
    <div className="flex items-center border-b py-4">
      <img
        src={ProductImg}
        alt={product.name}
        className="w-16 h-16 object-cover rounded mr-4"
      />
      <div className="flex-1">
        <div className="text-lg font-semibold">{product.name}</div>
        <div className="text-gray-600">{product.description}</div>
        <div className="text-green-600 font-bold">{`R$ ${product.price.toFixed(
          2
        )}`}</div>
      </div>
      <div className="flex flex-col items-end">
        <button
          className="text-red-500 hover:underline text-sm"
          onClick={removeItem}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};
