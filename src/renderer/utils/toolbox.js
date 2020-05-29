export const paginate = (pageNo, pageSize, array) => {
  const offset = (pageNo - 1) * pageSize
  return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize)
}

export const shuffle = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const itemAtIndex = arr[randomIndex]
    arr[randomIndex] = arr[i]
    arr[i] = itemAtIndex
  }
  return arr
}

export const sample = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}
