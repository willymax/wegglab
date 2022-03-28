export default ({ app, route, $axios, $toast, redirect, store }, inject) => {
  inject('getImageUrl', (relativePath) => {
    return `${process.env.baseStorageUrl}/${relativePath}`
  })
  inject('getInternetDateTimeFormat', () => {
    return ''
  })
  inject('sleep', (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  })
  inject('downloadItem', (fileUrl) => {
    $axios(`${process.env.baseStorageUrl}/${fileUrl}`, {
      responseType: 'blob',
    })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: response.headers['content-type'],
        })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = fileUrl
        link.click()
        URL.revokeObjectURL(link.href)
      })
      .catch((error) => {
        $toast.error(error.message)
      })
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
