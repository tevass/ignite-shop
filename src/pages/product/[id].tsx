import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/future/image"
import Head from "next/head"
import Stripe from "stripe"

import { stripe } from "../../lib/stripe"

import { useBag } from "../../hooks/useBag"

import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

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

export default function Product({ product }: ProductProps) {
  const { addOnBag } = useBag()

  const handleClick = () => addOnBag(product)

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price.currency}</span>

          <p>{product.description}</p>

          <button onClick={handleClick}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "prod_MTZ8DubzH5IvQq" } }
    ],
    fallback: "blocking",
  }
} 

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id 

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"]
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: {
          currency: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: "BRL"
          }).format(price.unit_amount / 100),
          number: price.unit_amount
        },
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}