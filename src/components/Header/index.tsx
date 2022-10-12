import Image from "next/future/image";
import { Handbag } from "phosphor-react";

import logoImg from '../../assets/logo.svg';
import { useBag } from "../../hooks/useBag";

import { BagButton, HeaderContainer } from "./styles";

export function Header() {
  const { quantityOfItems, openBag } = useBag()

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />

      <BagButton onClick={openBag}>
        { quantityOfItems > 0 && (
          <span>{quantityOfItems}</span>
        ) }
        <Handbag size={32} weight="bold" />
      </BagButton>
    </HeaderContainer>
  )
}