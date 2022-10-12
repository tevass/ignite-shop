import { AppProps } from "next/app"

import { BagContextProvider } from "../contexts/BagContext"

import { Bag } from "../components/Bag"
import { Header } from "../components/Header"

import { globalStyles } from "../styles/global"
import { Container } from "../styles/pages/app"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BagContextProvider>
      <Container>
        <Header />
        <Bag />
        <Component {...pageProps} />
      </Container>
    </BagContextProvider>
  )
}
