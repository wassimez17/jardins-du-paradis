import { useState, useCallback } from 'react'

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const openModal = useCallback((product: any) => {
    setSelectedProduct(product)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setSelectedProduct(null)
    document.body.style.overflow = 'auto'
  }, [])

  return { isOpen, selectedProduct, openModal, closeModal }
}
