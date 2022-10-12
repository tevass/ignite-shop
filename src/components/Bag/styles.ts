import { styled } from "../../styles";

export const BagContainer = styled("section", {
  maxWidth: 480,
  width: "100%",
  height: "100%",
  background: "$gray800",
  padding: "4.5rem 3rem 3rem",

  boxShadow: "-4px 0px 30px rgba(0, 0, 0, 0.8)",

  position: "absolute",
  right: 0,
  top: 0,
  zIndex: 1,

  transform: "translateX(100%)",
  visibility: "hidden",
  transition: "all 0.4s",

  variants: {
    visible: {
      true: {
        transform: "translateX(0)",
        visibility: "visible",
      }
    }
  }
})

export const BagContent = styled("div", {
  position: "relative",
  height: "100%",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",

  h4: {
    fontWeight: "bold",
    fontSize: "$lg",
    lineHeight: 1.6,
    marginBottom: "2rem"
  },
})

export const BagContentFooter = styled("footer", {
  width: "100%",

  div: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",

    "& + &": {
      marginTop: "0.5rem"
    },
  },

  "div.amount": {
    lineHeight: 1.6,
  },
  
  "div.amount p": {
    color: "$gray100",
    fontSize: "1rem",
  },
  
  "div.amount span": {
    color: "$gray300",
    fontSize: "$lg"
  },
  
  "div.value": {
    color: "$gray100",
    lineHeight: 1.6,
    fontWeight: "bold"
  },
  
  "div.value p": {
    fontSize: "$lg"
  },

  "div.value span": {
    fontSize: "$xl"
  },

  button: {
    width: "100%",
    marginTop: "3.5rem",
    backgroundColor: "$green500",
    border: 0,
    color: "white",
    borderRadius: 8,
    padding: "1.25rem",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "$md",

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed"
    },
    
    "&:not(:disabled):hover": {
      backgroundColor: "$green300",
    }
  }
})

export const CloseButton = styled("button", {
  background: "transparent",
  border: "none",
  cursor: "pointer",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  color: "$gray400",

  position: "absolute",
  right: 0,
  top: -48
})