export const truncate = (address, amount = 15) => {
  return (
    address.toString().slice(0, amount) + "..."
    // address.slice(address.length - amount, address.length)
  )
}

export const userTruncator = (user) => {
  return (
    user.toString().slice(0, 5) +
    "..." +
    user.toString().slice(user.length - 5, user.length)
  )
}

export function copyToClipboard(content) {
  navigator.clipboard.writeText(content).then(
    function () {
      console.log("Async: Copying to clipboard was successful!", content)
    },
    function (err) {
      console.error("Async: Could not copy text: ", err)
    }
  )
}
