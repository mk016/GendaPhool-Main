import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';

interface Product {
  id: number;
  name: string;
  weight: string;
  price: number;
  discount: number;
  image: string;
  quantity: number;
}

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  
  // Sample product data
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Marigold (Yellow)', weight: '100gm', price: 40, discount: 12, image: '', quantity: 0 },
    { id: 2, name: 'Marigold (Yellow)', weight: '100gm', price: 40, discount: 12, image: '', quantity: 0 },
    { id: 3, name: 'Marigold (Yellow)', weight: '100gm', price: 40, discount: 12, image: '', quantity: 0 },
    { id: 4, name: 'Marigold (Yellow)', weight: '100gm', price: 40, discount: 12, image: '', quantity: 0 },
    { id: 5, name: 'Marigold (Yellow)', weight: '100gm', price: 40, discount: 12, image: '', quantity: 0 },
  ]);

  // Handle adding product to cart
  const handleAddToCart = (productId: number) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        const updatedProduct = { ...product, quantity: product.quantity + 1 };
        
        // Update cart items
        if (product.quantity === 0) {
          setCartItems(prev => [...prev, updatedProduct]);
        } else {
          setCartItems(prev => 
            prev.map(item => item.id === productId ? updatedProduct : item)
          );
        }
        
        return updatedProduct;
      }
      return product;
    });
    
    setProducts(updatedProducts);
  };

  // Handle removing product from cart
  const handleRemoveFromCart = (productId: number) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId && product.quantity > 0) {
        const updatedProduct = { ...product, quantity: product.quantity - 1 };
        
        // Update cart items
        if (updatedProduct.quantity === 0) {
          setCartItems(prev => prev.filter(item => item.id !== productId));
        } else {
          setCartItems(prev => 
            prev.map(item => item.id === productId ? updatedProduct : item)
          );
        }
        
        return updatedProduct;
      }
      return product;
    });
    
    setProducts(updatedProducts);
  };

  // Navigate to cart page
  const goToCart = () => {
    navigate('/cart');
  };

  // Get total items in cart
  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* Search Header */}
      <div className="bg-white p-3 shadow-sm flex items-center space-x-2">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <FaArrowLeft />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search here"
            className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Product List */}
      <div className="p-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center bg-white rounded-lg mb-3 p-3 shadow-sm">
            {/* Discount Badge */}
            <div className="relative w-1/4">
              <div className="bg-gray-200 h-24 w-full rounded-md"></div>
              <div className="absolute top-0 left-0 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-tl-md">
                {product.discount}% OFF
              </div>
            </div>
            
            {/* Product Details */}
            <div className="flex-1 px-3">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.weight}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="font-medium">Rs {product.price}</p>
                
                {product.quantity === 0 ? (
                  <button 
                    onClick={() => handleAddToCart(product.id)}
                    className="text-green-600 border border-green-600 rounded-full px-4 py-1 text-sm font-medium"
                  >
                    Add
                  </button>
                ) : (
                  <div className="flex items-center border border-green-600 rounded-full overflow-hidden">
                    <button 
                      onClick={() => handleRemoveFromCart(product.id)}
                      className="bg-white text-green-600 px-2 py-1"
                    >
                      <IoMdRemove />
                    </button>
                    <span className="px-3 text-sm font-medium">{product.quantity}</span>
                    <button 
                      onClick={() => handleAddToCart(product.id)}
                      className="bg-white text-green-600 px-2 py-1"
                    >
                      <IoMdAdd />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Indicator - Only show if items in cart */}
      {getTotalCartItems() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-yellow-500 text-white py-3 px-4">
          <div className="flex justify-between items-center max-w-md mx-auto">
            <div className="flex items-center">
              <FaShoppingCart className="mr-2" />
              <span>{getTotalCartItems()} item{getTotalCartItems() !== 1 ? 's' : ''} in cart</span>
            </div>
            <button 
              onClick={goToCart}
              className="bg-white text-yellow-500 px-4 py-1 rounded-md text-sm font-medium"
            >
              View Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
