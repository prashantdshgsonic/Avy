export default function Overlay({ text, isVisible }) {
  const divStyle = {
    position: "absolute",
    bottom: "15%",
    left: "50%",
    transform: "translateX(-50%)",
    maxWith: "50%",
    textWrap: "wrap",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: "10px",
    borderRadius: "5px",
    color: "#fff",
    fontFamily: "monospace",
    textShadow: "1px 1px 2px black",
    userSelect: "none",
    textAlign: "center",
    fontSize: "24px",
    visibility: isVisible ? 'visible' : 'hidden'
  }
  
  return (
    <div style={divStyle}>
      <p>{text}</p>
    </div>
  )
}