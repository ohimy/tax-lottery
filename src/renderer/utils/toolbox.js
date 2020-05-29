export const paginate = (pageNo, pageSize, array) => {
  const offset = (pageNo - 1) * pageSize
  return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize)
}

export const randArray = (m, len) => {
  m.sort(function () {
    return Math.random() - 0.5
  })
  return m.slice(0, len)
}
