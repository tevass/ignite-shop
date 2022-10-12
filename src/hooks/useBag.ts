import { useContext } from "react";
import { BagContext } from "../contexts/BagContext";

export function useBag() {
  return useContext(BagContext)
}