export function setColour(value) {
  if (value === "sem dados") return ""
  const colour = Number(value) > 0 ? "green" : "red"
  return colour
}
