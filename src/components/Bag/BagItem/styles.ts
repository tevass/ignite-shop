import { styled } from "../../../styles";

export const BagItemContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",

  "& + &": {
    marginTop: "1.5rem"
  }
})

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 100,
  height: 93,

  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  padding: "0.25rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover"
  }
})

export const BagItemContent = styled("div", {
  marginLeft: "1.25rem",
  
  p: {
    fontSize: "$md",
    marginBottom: "0.125rem"
  },
  
  strong: {
    fontSize: "$md",
    color: "$white",
    display: "block",
    marginBottom: "0.5rem"
  },
  
  "p, strong, button": {
    lineHeight: 1.6
  },
  
  button: {
    cursor: "pointer",
    background: "transparent",
    border: "none",
    fontSize: "1rem",
    color: "$green500",
    fontWeight: "bold"
  }

})