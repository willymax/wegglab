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
  inject('initializeEditor', (config) => {
    return {
      selector: 'textarea#local-upload',
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount',
      ],
      toolbar:
        'undo redo | formatselect | image code | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
      height: 400,
      menubar: false,
      placeholder: config.placeholderText,
      /* without images_upload_url set, Upload tab won't show up */
      images_upload_url: 'postAcceptor.php',

      /* We override default upload handler to simulate successful upload */
      images_upload_handler(blobInfo, success, failure, progress) {
        // progress((e.loaded / e.total) * 100)
        const data = new FormData()
        data.append(config.uploadKey, blobInfo.blob(), blobInfo.filename())
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
            if (res.status === 403) {
              failure('HTTP Error: ' + res.status, { remove: true })
              return
            }

            if (res.status < 200 || res.status >= 300) {
              failure('HTTP Error: ' + res.status)
              return
            }
            success(`${config.imageStorageUrl}/${res.data.link}`)
          })
          .catch((error) => {
            if (error.response) {
              failure(
                'Image upload failed due to a XHR Transport error. Code: ' +
                  error.response.status
              )
            } else {
              failure('Image upload failed')
            }
          })
      },
      content_style:
        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
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
