export default (context, inject) => {
  inject(
    'getImageUrl',
    (relativePath) => `${process.env.STORAGE_BASE_URL}/${relativePath}`
  )
}
