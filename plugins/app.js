export default (context, inject) => {
  inject(
    'getImageUrl',
    (relativePath) => `${process.env.baseStorageUrl}/${relativePath}`
  )
}
