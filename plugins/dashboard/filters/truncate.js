export default function (text, length, clamp) {
  clamp = clamp || '...'
  // const node = document.createElement('div')
  // node.innerHTML = text
  // const content = node.textContent
  return text.length > length ? text.slice(0, length) + clamp : text
}
