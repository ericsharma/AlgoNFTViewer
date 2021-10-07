export const truncate = (address, amount = 15) => {
  return (
    address.slice(0, amount) + "..."
    // address.slice(address.length - amount, address.length)
  )
}

export const userTruncator = (user) => {
  return user.slice(0, 5) + "..." + user.slice(user.length - 5, user.length)
}
