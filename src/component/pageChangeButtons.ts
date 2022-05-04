import { PageChangeButtonsOptions, PageChangeButtons } from './types'

const createButton = (textContent: string, onClick?: () => void) => {
  const element = document.createElement('button')
  element.type = 'button'
  element.classList.add('button--white')
  element.classList.add('com-paginator__page-change-button')
  element.textContent = textContent
  element.addEventListener('click', () => onClick?.())
  return element
}

export const createPageChangeButtons = (options: PageChangeButtonsOptions): PageChangeButtons => {
  let pageChangeButtons: PageChangeButtons
  const element = document.createElement('div')
  element.classList.add('com-paginator__page-change-buttons')

  const goToFirstButton = createButton('<<', options.events?.onGoToFirstClick)

  const goToPreviousButton = createButton('<', options.events?.onGoToPreviousClick)

  const goToNextButton = createButton('>', options.events?.onGoToNextClick)

  const goToLastButton = createButton('>>', options.events?.onGoToLastClick)

  element.appendChild(goToFirstButton)
  element.appendChild(goToPreviousButton)
  element.appendChild(goToNextButton)
  element.appendChild(goToLastButton)

  return pageChangeButtons = {
    rendered: { element },
    updateGoToFirstEnabled: enabled => goToFirstButton.disabled = !enabled,
    updateGoToPreviousEnabled: enabled => goToPreviousButton.disabled = !enabled,
    updateGoToNextEnabled: enabled => goToNextButton.disabled = !enabled,
    updateGoToLastEnabled: enabled => goToLastButton.disabled = !enabled,
  }
}
