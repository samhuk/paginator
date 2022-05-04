import { ItemRange, ItemRangeOptions } from './types'

export const createItemRange = (options: ItemRangeOptions): ItemRange => {
  let itemRange: ItemRange
  const element = document.createElement('div')
  element.classList.add('com-paginator__item-range')

  const from = document.createElement('div')
  from.textContent = options.range.from.toString()
  from.classList.add('from')

  const divider = document.createElement('div')
  divider.classList.add('divider')
  divider.textContent = '-'

  const to = document.createElement('div')
  to.textContent = options.range.to.toString()
  to.classList.add('to')

  const divider2 = document.createElement('div')
  divider2.classList.add('divider-2')
  divider2.textContent = 'of'

  const itemCount = document.createElement('div')
  itemCount.textContent = options.itemCount.toString()
  itemCount.classList.add('item-count')

  element.appendChild(from)
  element.appendChild(divider)
  element.appendChild(to)
  element.appendChild(divider2)
  element.appendChild(itemCount)

  return itemRange = {
    rendered: { element },
    range: options.range,
    updateRange: newRange => {
      itemRange.range = newRange
      from.textContent = newRange.from.toString()
      to.textContent = newRange.to.toString()
    },
    updateItemCount: newItemCount => {
      itemCount.textContent = newItemCount.toString()
    },
  }
}
