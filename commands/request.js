export default {
  commands: {
    get: {
      args: ['url'],
      help: 'Make a GET request',
      async run({args: {url}, message, formData, formCommandId}) {
        if (formData) {
          return {
            type: 'form-status',
            treeUpdate: formData,
            formCommandId,
          }
        } else {
          const timeout = 5000
          try {
            const controller = new AbortController()
            setTimeout(() => controller.abort(), timeout)
            const response = await fetch(url, {
              signal: controller.signal,
            })
            const data = await response.json()
            return {
              type: 'tree',
              name: 'request',
              value: {
                method: 'get',
                url,
                response: {
                  headers: response.headers,
                  body: data
                }
              },
              message: message,
            }
          } catch (err) {
            return {
              type: 'error',
              text: (
                err.name === 'AbortError' ?
                'The request timed out.' :
                err.toString()
              )
            }
          }
        }
      },
    }
  }
}