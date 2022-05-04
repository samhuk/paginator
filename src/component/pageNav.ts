import { PageNav, PageNavOptions } from './types'
import { createNumberInput } from '@samhuk/number-input'
import { LabelPosition } from '@samhuk/number-input/src/component/types'

export const createPageNav = (options: PageNavOptions): PageNav => {
  let pageNav: PageNav

  const element = document.createElement('div')
  element.classList.add('com-paginator__page-nav')

  const numberInput = createNumberInput({
    initialValue: options.initialPage,
    labelPosition: LabelPosition.LEFT,
    label: 'Page',
    onlyInteger: true,
    step: 1,
    min: 1,
    max: options.initialNumPages,
    events: {
      onChange: newPage => options.events?.onPageChange?.(newPage),
    },
  })

  const divider = document.createElement('div')
  divider.textContent = '/'
  divider.classList.add('divider')

  const numPages = document.createElement('div')
  numPages.textContent = options.initialNumPages.toString()
  numPages.classList.add('num-pages')

  element.appendChild(numberInput.rendered.element)
  element.appendChild(divider)
  element.appendChild(numPages)

  return pageNav = {
    rendered: { element },
    page: options.initialPage,
    numPages: options.initialNumPages,
    updatePage: newPage => {
      pageNav.page = newPage
      numberInput.setValue(newPage)
    },
    updateNumPages: newNumPages => {
      if (newNumPages < pageNav.page)
        pageNav.updatePage(newNumPages)

      numberInput.updateMax(newNumPages)

      numPages.textContent = newNumPages.toString()
    },
  }
}
