import { createItemRange } from './itemRange'
import { createPageChangeButtons } from './pageChangeButtons'
import { createPageNav } from './pageNav'
import { PageChangeButtons, Paginator, PaginatorOptions } from './types'
import { createSelect } from '@samhuk/select'
import { LabelPosition } from '@samhuk/number-input/dist/types'
import { UnavailableValueHandling } from '@samhuk/select/dist/types'

const calculatePageCount = (itemCount: number, pageSize: number) => Math.ceil(itemCount / pageSize)

const calculateItemRange = (page: number, pageSize: number, itemCount: number) => {
  const from = 1 + (page - 1) * pageSize
  const to = Math.min(itemCount, from + pageSize)
  return { from, to }
}

const updatePageChangeButtonsEnabledStates = (page: number, numPages: number, pageChangeButtons: PageChangeButtons) => {
  pageChangeButtons.updateGoToFirstEnabled(page > 1)
  pageChangeButtons.updateGoToPreviousEnabled(page > 1)
  pageChangeButtons.updateGoToNextEnabled(page < numPages)
  pageChangeButtons.updateGoToLastEnabled(page < numPages)
}

export const createPaginator = (options: PaginatorOptions): Paginator => {
  let paginator: Paginator
  const element = document.createElement('div')
  element.classList.add('com-paginator')

  const pageSizeSelect = createSelect({
    label: 'Page size',
    labelPosition: LabelPosition.LEFT,
    initialOptionDataList: options.pageSizeOptions.map((value, i) => ({ uuid: i.toString(), value, displayName: value.toString() })),
    initialValue: options.pageSize,
    unavailableValueHandling: UnavailableValueHandling.ALLOW,
    events: {
      onValueChange: newValue => {
        paginator.setPageSize(newValue)
        options.events?.onPageSizeChange?.(newValue)
      },
    },
  })
  pageSizeSelect.rendered.element.classList.add('com-paginator__page-size-select')

  element.appendChild(pageSizeSelect.rendered.element)

  const initialNumPages = calculatePageCount(options.itemCount, options.pageSize)

  const onPageChange = (newPage: number) => {
    paginator.setPage(newPage)
    options.events?.onPageChange?.(newPage)
  }

  const pageNav = createPageNav({
    initialNumPages,
    initialPage: options.page,
    events: {
      onPageChange: onPageChange,
    },
  })
  element.appendChild(pageNav.rendered.element)


  const pageChangeButtons = createPageChangeButtons({
    events: {
      onGoToFirstClick: () => onPageChange(1),
      onGoToPreviousClick: () => onPageChange(paginator.page - 1),
      onGoToNextClick: () => onPageChange(paginator.page + 1),
      onGoToLastClick: () => onPageChange(paginator.numPages),
    },
  })
  element.appendChild(pageChangeButtons.rendered.element)

  updatePageChangeButtonsEnabledStates(options.page, initialNumPages, pageChangeButtons)

  const itemRange = createItemRange({
    range: calculateItemRange(options.page, options.pageSize, options.itemCount),
    itemCount: options.itemCount
  })
  element.appendChild(itemRange.rendered.element)

  const onPageSizeOrItemCountChange = () => {
    const newNumPages = calculatePageCount(paginator.itemCount, paginator.pageSize)
    pageNav.updateNumPages(newNumPages)
    paginator.page = pageNav.page
    paginator.numPages = newNumPages
    updatePageChangeButtonsEnabledStates(paginator.page, paginator.numPages, pageChangeButtons)
    itemRange.updateRange(calculateItemRange(paginator.page, paginator.pageSize, paginator.itemCount))
  }

  paginator = {
    rendered: { element },
    page: options.page,
    numPages: initialNumPages,
    pageSize: options.pageSize,
    itemCount: options.itemCount,
    setPage: newPage => {
      paginator.page = newPage
      pageNav.updatePage(newPage)
      updatePageChangeButtonsEnabledStates(paginator.page, paginator.numPages, pageChangeButtons)
      itemRange.updateRange(calculateItemRange(paginator.page, paginator.pageSize, paginator.itemCount))
    },
    setPageSize: newPageSize => {
      paginator.pageSize = newPageSize
      pageSizeSelect.setValue(paginator.pageSize)
      onPageSizeOrItemCountChange()
    },
    setItemCount: newItemCount => {
      paginator.itemCount = newItemCount
      onPageSizeOrItemCountChange()
      itemRange.updateItemCount(newItemCount)
    },
  }
  return paginator
}
