import { Search, ShoppingCart, Plus, Minus, Trash2, ArrowRight, Package } from "lucide-react";
import { useState, useMemo } from "react";
import type { CantineLinePayload, CartItem, Product } from "../utlis/type";
// import type { Product } from "../../../utlis/type";

interface CantinePosProps {
  creditCantineId: number;
  products: Product[];
  loadingProducts: boolean;
  onSubmitLignes: (lignes: CantineLinePayload[]) => Promise<void>;
  isSubmitting?: boolean;
}

const CantinePos = ({
  creditCantineId,
  products,
  loadingProducts,
  onSubmitLignes,
  isSubmitting = false,
}: CantinePosProps) => {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  // Filtrage des produits par nom
  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.nom?.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  // Ajouter ou incrémenter un produit dans le panier
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.produit.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.produit.id === product.id
            ? { ...item, quantite: item.quantite + 1 }
            : item
        );
      }
      return [...prevCart, { produit: product, quantite: 1 }];
    });
  };

  // Modifier la quantité
  const updateQuantity = (productId: number, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.produit.id === productId) {
            const newQty = item.quantite + delta;
            return newQty > 0 ? { ...item, quantite: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Supprimer un produit du panier
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.produit.id !== productId));
  };

  // Calculs financiers
  const totalArticles = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantite, 0),
    [cart]
  );

  const montantTotal = useMemo(
    () =>
      cart.reduce(
        (acc, item) =>
          acc + item.quantite * (item.produit.prix_unitaire || 0),
        0
      ),
    [cart]
  );

  // Validation et envoi du payload au format attendu par le backend
  const handleValidate = async () => {
    if (!cart.length) return;

    const payload: CantineLinePayload[] = cart.map((item) => ({
      credit_cantine: creditCantineId,
      produit: item.produit.id,
      quantite: item.quantite,
    }));

    await onSubmitLignes(payload);
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 my-3">
      {/* =====================================================
          COLONNE GAUCHE : CATALOGUE PRODUITS (8 COL)
      ===================================================== */}
      <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-7 xl:col-span-8">
        {/* Barre de recherche */}
        <div className="border-b border-gray-100 p-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-xs outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
              placeholder="Rechercher un produit à ajouter..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Grille des produits */}
        <div className="flex-1 overflow-y-auto p-4 max-h-137.5">
          {loadingProducts ? (
            <div className="flex h-40 items-center justify-center text-xs text-gray-400">
              Chargement des produits...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center text-center">
              <Package size={32} className="text-gray-300" />
              <p className="mt-2 text-xs font-medium text-gray-500">
                Aucun produit disponible
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <button
                  type="button"
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="group flex flex-col justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-3 text-left transition hover:border-green-300 hover:bg-green-50/30 hover:shadow-xs cursor-pointer"
                >
                  <div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xs font-bold uppercase text-green-700 shadow-2xs group-hover:bg-green-600 group-hover:text-white transition">
                      {product.nom?.charAt(0)?.toUpperCase() ?? "P"}
                    </div>
                    <p className="mt-2 line-clamp-1 text-xs font-semibold text-gray-800">
                      {product.nom}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Stock: {product.stock ?? "N/A"}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2">
                    <span className="text-xs font-bold text-green-700">
                      {product.prix_unitaire} {product.devise?.toUpperCase()}
                    </span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-400 group-hover:bg-green-600 group-hover:text-white transition">
                      <Plus size={12} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          COLONNE DROITE : LE PANIER POS (4 COL)
      ===================================================== */}
      <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-5 xl:col-span-4">
        {/* Header du panier */}
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-700">
              <ShoppingCart size={16} />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-800">
                Panier Crédit #{creditCantineId}
              </h3>
              <p className="text-[10px] text-gray-400">
                {totalArticles} article(s) sélectionné(s)
              </p>
            </div>
          </div>

          {cart.length > 0 && (
            <button
              type="button"
              onClick={() => setCart([])}
              className="text-[11px] text-red-500 hover:underline cursor-pointer"
            >
              Vider
            </button>
          )}
        </div>

        {/* Liste des articles du panier */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-95">
          {cart.length === 0 ? (
            <div className="flex h-48 flex-col items-center justify-center text-center">
              <ShoppingCart size={32} className="text-gray-200" />
              <p className="mt-2 text-xs text-gray-400">
                Le panier est vide. Cliquez sur un produit pour l'ajouter.
              </p>
            </div>
          ) : (
            cart.map((item) => {
              const subTotal =
                item.quantite * (item.produit.prix_unitaire || 0);

              return (
                <div
                  key={item.produit.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 p-2.5"
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="truncate text-xs font-semibold text-gray-800">
                      {item.produit.nom}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {item.produit.prix_unitaire} {item.produit.devise} x{" "}
                      {item.quantite} ={" "}
                      <span className="font-semibold text-gray-700">
                        {subTotal.toFixed(2)}
                      </span>
                    </p>
                  </div>

                  {/* Contrôles de quantité */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center rounded-md border border-gray-200 bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.produit.id, -1)}
                        className="p-1 text-gray-500 hover:text-green-700 cursor-pointer"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2 text-xs font-semibold text-gray-800">
                        {item.quantite}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.produit.id, 1)}
                        className="p-1 text-gray-500 hover:text-green-700 cursor-pointer"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.produit.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition cursor-pointer"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Financier + Validation */}
        <div className="border-t border-gray-100 bg-gray-50/50 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Nombre d'articles :</span>
            <span className="font-medium text-gray-800">{totalArticles}</span>
          </div>

          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="text-gray-700">Total panier :</span>
            <span className="text-base font-bold text-green-700">
              {montantTotal.toFixed(2)}{" "}
              {products[0]?.devise?.toUpperCase() || "CDF"}
            </span>
          </div>

          <button
            type="button"
            disabled={cart.length === 0 || isSubmitting}
            onClick={handleValidate}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 py-2.5 text-xs font-semibold text-white transition hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isSubmitting ? "Enregistrement..." : "Valider les lignes"}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CantinePos;