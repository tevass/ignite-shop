import axios from "axios";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";

interface Item {
  id: string
  name: string
  imageUrl: string
  price: {
    currency: string
    number: number
  }
  description: string
  defaultPriceId: string
}

interface BagContextData {
  items: Item[]
  quantityOfItems: number
  totalPriceOfItems: string
  showBag: boolean
  isCreatingCheckoutSession: boolean
  addOnBag: (item: Item) => void
  removeFromBag: (item: Item) => void
  openBag: () => void
  closeBag: () => void
  handleCreateCheckoutSession: () => Promise<void>
  clearItems: () => void
}

export const BagContext = createContext({} as BagContextData)

interface BagContextProviderProps { children: ReactNode }

export function BagContextProvider({ children }: BagContextProviderProps) {
  const [items, setItems] = useState<Item[]>([])
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const [showBag, setShowBag] = useState(false)

  const addOnBag = useCallback((item: Item) =>{
    setShowBag(true)
    setItems(prev => {
      const itemAlreadyInBag = prev.find(i => i.id === item.id)
      if(!itemAlreadyInBag) {
        localStorage.setItem("ignite.shop@1.0.0-bag", JSON.stringify([...prev, item]))
        return [...prev, item]
      }

      return prev
    })
  }, [])

  const removeFromBag = useCallback((item: Item) => setItems(prev => {
    const items = prev.filter(({ id }) => item.id !== id)
    localStorage.setItem("ignite.shop@1.0.0-bag", JSON.stringify(items))
    return items
  }), [])

  const openBag = useCallback(() => setShowBag(true), [])
  const closeBag = useCallback(() => setShowBag(false), [])

  const clearItems = useCallback(() => {
    setItems([])
    localStorage.setItem("ignite.shop@1.0.0-bag", JSON.stringify([]))
  }, [])

  const handleCreateCheckoutSession = useCallback(async () => {
    const products = items.map(item => ({ price: item.defaultPriceId, quantity: 1 }))

    try {
      setIsCreatingCheckoutSession(true)
      
      const response = await axios.post('/api/checkout', {
        products
      })

      const { checkoutUrl } = response.data
      
      window.location.href = checkoutUrl
    } catch (error) {
      alert('Falha ao redirecionar ao checkout!') 
      setIsCreatingCheckoutSession(false)
    }
  }, [items])

  useEffect(() => {
    const items = localStorage.getItem("ignite.shop@1.0.0-bag")

    if(items) {
      setItems(JSON.parse(items))
    }
  }, [])

  const amountOfItems = items.reduce((value, item) =>
    value += item.price.number, 0
  )

  const totalPriceOfItems = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: "BRL"
  }).format(amountOfItems / 100)

  const quantityOfItems = items.length

  return (
    <BagContext.Provider value={{
      items,
      quantityOfItems,
      totalPriceOfItems,
      showBag,
      isCreatingCheckoutSession,
      addOnBag,
      removeFromBag,
      closeBag,
      openBag,
      handleCreateCheckoutSession,
      clearItems
    }}>
      {children}
    </BagContext.Provider>
  )
}