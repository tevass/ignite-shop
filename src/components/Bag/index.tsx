import { X } from "phosphor-react";
import { useBag } from "../../hooks/useBag";
import { BagItem } from "./BagItem";

import { BagContainer, BagContent, BagContentFooter, CloseButton } from "./styles";

export function Bag() {
  const {
    showBag,
    closeBag, 
    items,
    quantityOfItems,
    totalPriceOfItems,
    handleCreateCheckoutSession,
    isCreatingCheckoutSession
  } = useBag()

  return (
    <BagContainer visible={showBag}>
      <BagContent>
        <CloseButton onClick={closeBag}>
          <X size={24} weight="bold" />
        </CloseButton>

        <div>
          <h4>Sacola de compras</h4>

          <div>
            { items.map(item => {
              return (
                <BagItem key={item.id} item={item} />
              )
            }) }
          </div>
        </div>

        <BagContentFooter>
          <div className="amount">
            <p>Quantidade</p>
            <span>
              {quantityOfItems} {quantityOfItems !== 1 ? "itens" : "item"}
            </span>
          </div>

          <div className="value">
            <p>Valor total</p>
            <span>{totalPriceOfItems}</span>
          </div>
          
          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleCreateCheckoutSession}
          >
            Finalizar compra
          </button>
        </BagContentFooter>

      </BagContent>
    </BagContainer>
  )
}