import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { SavedProduct } from "../../types/Saved/SavedProduct";
import { CartItem } from "../CartItem/CartItem";

interface CartModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  cartItems: SavedProduct[];
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  setCartItems: React.Dispatch<React.SetStateAction<SavedProduct[]>>;
}

export const CartModal = ({
  setIsOpen,
  isOpen,
  cartItems,
  setCartCount,
  setCartItems,
}: CartModalProps) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  function close() {
    setIsOpen(false);
  }

  async function updateStock(productId: number, quantity: number) {
    try {
      await axios.patch(`${apiUrl}/product/${productId}`, {
        quantity: quantity,
      });
      setError(null);
    } catch (error) {
      console.error("Erro ao atualizar o estoque", error);
      setError("Erro ao atualizar o estoque");
    }
  }

  async function finalizePurchase() {
    setLoading(true);
    for (const item of cartItems) {
      await updateStock(item.id, item.quantity - 1);
    }
    if (error !== null) {
      setCartItems([]);
      setCartCount(0);
      close();
    }
    setLoading(false);
  }

  return (
    <>
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            close();
            setError(null);
          }}
        >
          <div className="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform scale-95"
                enterTo="opacity-100 transform scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform scale-100"
                leaveTo="opacity-0 transform scale-95"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium text-gray-900"
                  >
                    Finalizar Compra
                  </DialogTitle>
                  <div className="mt-4">
                    {error && (
                      <div className="mb-4 text-sm text-red-500">{error}</div>
                    )}
                    {loading ? (
                      <div className="text-center text-gray-500">
                        Carregando...
                      </div>
                    ) : (
                      cartItems?.map((item) => (
                        <CartItem
                          key={item.id}
                          product={item}
                          removeItem={() => {
                            setCartCount((oldCart) => oldCart - 1);
                            setCartItems((currentItems) =>
                              currentItems.filter(
                                (product) => product.id !== item.id
                              )
                            );
                          }}
                        />
                      ))
                    )}
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      className="inline-flex items-center justify-center rounded-md bg-gray-200 py-2 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-300 focus:outline-none"
                      onClick={() => {
                        close();
                        setError(null);
                      }}
                    >
                      Cancelar
                    </button>
                    {cartItems.length > 0 && (
                      <button
                        className="inline-flex items-center justify-center rounded-md bg-blue-500 py-2 px-4 text-sm font-semibold text-white hover:bg-blue-600 focus:outline-none"
                        onClick={finalizePurchase}
                        disabled={loading}
                      >
                        {loading ? "Finalizando..." : "Finalizar Compra"}
                      </button>
                    )}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
