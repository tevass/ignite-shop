import Image from "next/future/image";
import Link from "next/link";
import { Handbag } from "phosphor-react";
import { MouseEvent } from "react";

import { BagButton, ProductContainer } from "../styles";

interface Product {
  id: string
  name: string
  imageUrl: string
  price: string
}

interface ProductProps {
  product: Product
}

export function Product({ product }: ProductProps) {

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("button")
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
            <span>{product.price}</span>
          </div>

          <BagButton onClick={handleClick}>
            <Handbag size={32} weight="bold" />
          </BagButton>
        </footer>
      </ProductContainer>
    </Link>
  )
}