import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, createWhatsAppLink, formatINR } from '../data/products';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'riwaaz_cart_items_v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addItem = (productId, size, quantity = 1) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const cartItemId = `${productId}-${size}`;

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: cartItemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            size: size,
            quantity: quantity,
            image: product.thumbnail,
            slug: product.slug,
          }
        ];
      }
    });

    setIsDrawerOpen(true);
  };

  const removeItem = (cartItemId) => {
    setItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(cartItemId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const generateWhatsAppOrderLink = (customerDetails = null) => {
    if (items.length === 0) {
      return createWhatsAppLink("Hi Riwaaz! I would like to enquire about your handcrafted juttis.");
    }

    let message = `Hi Riwaaz! I would like to place an order for the following handcrafted juttis:\n\n`;

    if (customerDetails) {
      message += `📋 *CUSTOMER & DELIVERY DETAILS*\n`;
      message += `• *Name:* ${customerDetails.fullName.trim()}\n`;
      message += `• *Mobile:* ${customerDetails.mobile.trim()}\n`;
      if (customerDetails.email && customerDetails.email.trim()) {
        message += `• *Email:* ${customerDetails.email.trim()}\n`;
      }
      message += `• *Address:* ${customerDetails.address.trim()}\n`;
      message += `• *City:* ${customerDetails.city.trim()}\n`;
      message += `• *State:* ${customerDetails.state.trim()}\n`;
      message += `• *PIN Code:* ${customerDetails.pincode.trim()}\n\n`;
    }

    message += `🛍️ *ORDER SUMMARY*\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n   • Size: UK/IND ${item.size}\n   • Qty: ${item.quantity}\n   • Price: ${formatINR(item.price * item.quantity)}\n\n`;
    });

    message += `💰 *TOTAL AMOUNT:* ${formatINR(subtotal)}\n\n`;
    message += `Please confirm my order and share the payment process. Thank you!`;

    return createWhatsAppLink(message);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isDrawerOpen,
        setIsDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        generateWhatsAppOrderLink,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
