let toastTimeout

export function showToast(message, variant = 'info') {
  let container = document.querySelector('#toastContainer')
  if (!container) {
    container = document.createElement('div')
    container.id = 'toastContainer'
    document.body.appendChild(container)
  }

  const toast = document.createElement('div')
  toast.className = `toast toast--${variant}`
  toast.textContent = message
  container.appendChild(toast)

  requestAnimationFrame(() => {
    toast.classList.add('toast--visible')
  })

  clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    toast.classList.remove('toast--visible')
    setTimeout(() => {
      toast.remove()
    }, 200)
  }, 2000)
}
