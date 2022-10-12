import { styled } from "../../styles";

export const HeaderContainer = styled('header', {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1100,
  margin: "0 auto",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
})

export const BagButton = styled("button", {
  maxWidth: 56,
  maxHeight: 56,

  borderRadius: 6,
  border: "none",

  padding: "0.75rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  background: "$gray800",
  cursor: "pointer",

  position: "relative",
  
  "&, svg": {
    color: "$gray400",
  },

  span: {
    position: "absolute",
    top: -7,
    right: -7,
    width: 27,
    height: 27,
    display: "block",

    fontSize: "$sm",
    fontWeight: "bold",

    background: "$green500",
    color: "$white",
    padding: "0.18rem",
    borderRadius: "50%",

    border: "3px solid $gray900"
  }
})