import Image from "next/future/image";
import Link from "next/link";
import { Handbag } from "phosphor-react";
import { MouseEvent } from "react";
import { useBag } from "../../hooks/useBag";

import { BagButton, ProductContainer } from "./styles";

interface Product {
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

interface ProductProps {
  product: Product
}

export function Product({ product }: ProductProps) {
  const { addOnBag } = useBag()

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addOnBag(product)
  }

  return (
    <Link
      href={`/product/${product.id}`}
      key={product.id}
      prefetch={false}
    > 
      <ProductContainer className="keen-slider__slide" style={{ minWidth: 328, maxWidth: 656 }}>
        <Image src={product.imageUrl} alt="" width={520} height={400} />

        <footer>
          <div>
            <strong>{product.name}</strong>
            <span>{product.price.currency}</span>
          </div>

          <BagButton onClick={handleClick}>
            <Handbag size={32} weight="bold" />
          </BagButton>
        </footer>
      </ProductContainer>
    </Link>
  )
}