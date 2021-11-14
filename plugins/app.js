export default (context, inject) => {
  inject(
    'getImageUrl',
    (relativePath) => `${process.env.baseStorageUrl}${relativePath}`
  )
  inject('getInternetDateTimeFormat', () => {
    return ''
  })
  inject('processTime', (datetimestamp) => {
    const theDate = new Date(datetimestamp)
    const month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    let year = ''
    if (new Date().getFullYear() !== theDate.getFullYear()) {
      year = theDate.getFullYear()
    }
    return `${theDate.getDate()} ${month[theDate.getMonth()]} ${year}`
  })
}
