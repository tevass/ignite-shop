import Image from "next/future/image";
import { useBag } from "../../../hooks/useBag";
import { BagItemContainer, BagItemContent, ImageContainer } from "./styles";

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

interface BagItemProps {
  item: Item
}

export function BagItem({ item }: BagItemProps) {
  const { removeFromBag } = useBag()

  const handleClick = () => removeFromBag(item)

  return (
    <BagItemContainer>
      <ImageContainer>
        <Image
          src={item.imageUrl}
          alt="" width={94} height={94}
        />
      </ImageContainer>
      
      <BagItemContent>
        <p>{item.name}</p>
        <strong>{item.price.currency}</strong>

        <button onClick={handleClick}>
          Remover
        </button>
      </BagItemContent>
    </BagItemContainer>
  )
}