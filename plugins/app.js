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
  inject('downloadAnswerImage', (fileUrl) => {
    $axios(`${process.env.apiBaseUrl}/files/${fileUrl}`, {
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
  inject('getFroalaConfig', (config) => {
    return {
      charCounterCount: true,
      placeholderText: config.placeholderText,
      imageUpload: true,
      imageDefaultAlign: 'left',
      imageDefaultDisplay: 'inline-block',
      // Set the image upload parameter.
      imageUploadParam: 'image_param',

      // Set the image upload URL.
      imageUploadURL: 'http://localhost:3003/v1/answers/uploadAnswerImage',

      // Additional upload params.
      imageUploadParams: { id: 'my_editor' },

      // Set request type.
      imageUploadMethod: 'POST',

      // Set max image size to 5MB.
      imageMaxSize: 5 * 1024 * 1024,

      // Allow to upload PNG and JPG.
      imageAllowedTypes: ['jpeg', 'jpg', 'png'],
      events: {
        'image.beforeUpload'(images) {
          // Before image is uploaded
          const data = new FormData()
          data.append(config.uploadKey, images[0])
          $axios
            .post(`${config.uploadUrl}`, data, {
              headers: {
                accept: 'application/json',
                // Authorization: 'your_imgur_client_id/api_key',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
              },
            })
            .then((res) => {
              console.log(`${process.env.baseStorageUrl}/${res.data.link}`)
              this.image.insert(
                `${config.imageStorageUrl}/${res.data.link}`,
                null,
                null,
                this.image.get()
              )
            })
            .catch((err) => {
              console.log(err)
            })
          return false
        },
        initialized() {
          console.log('initialized')
        },
      },
    }
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
