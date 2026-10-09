import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CartItem {
  id: string
  title: string
  price: string
  image: string
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalQuantity: () => number
  getTotalPrice: () => string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Lazy initialization: load from localStorage on first render
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart)
          if (Array.isArray(parsedCart) && parsedCart.length > 0) {
            return parsedCart
          }
        }
      } catch (e) {
        console.error('Error parsing cart from localStorage:', e)
        localStorage.removeItem('cart')
      }
    }
    return []
  })

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ))
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalQuantity = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => {
      const priceNum = parseInt(item.price.replace(/\D/g, '')) || 0
      return sum + (priceNum * item.quantity)
    }, 0).toString() + ' DH'
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalQuantity, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}