import { GetServerSideProps } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import Stripe from "stripe";
import { useBag } from "../hooks/useBag";

import { stripe } from "../lib/stripe";

import { ImageContainer, Images, SuccessContainer } from "../styles/pages/success";

interface Product {
  name: string
  imageUrl: string
}

interface SuccessProps {
  customerName: string
  products: Product[]
}

export default function Success({ customerName, products }: SuccessProps) {
  const { clearItems } = useBag()

  useEffect(() => {
    clearItems()
  }, [clearItems])

  const quantityOfProducts = products.length

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <Images>
            { products.map((product) => {
              return (
                <ImageContainer key={product.name}>
                  <Image
                    src={product.imageUrl}
                    width={130}
                    height={125}
                    alt={product.name}
                  />
                </ImageContainer>
              )
            }) }
          </Images>

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>,
          sua compra de {quantityOfProducts} {quantityOfProducts !== 1 ? "camisetas" : "camiseta"} {" "}
          já está a caminho da sua casa. 
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if(!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"]
  })

  const customerName = session.customer_details.name
  const products = session.line_items.data.map(({ price }) => {
    const product = price.product as Stripe.Product
    return {
      name: product.name,
      imageUrl: product.images[0]
    }
  })

  return {
    props: {
      customerName,
      products
    }
  }
}