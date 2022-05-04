export type Range = {
  from: number
  to: number
}

export type Rendered = {
  element: HTMLElement
}

export type ItemRangeOptions = {
  range: Range
  itemCount: number
}

export type ItemRange = {
  rendered: Rendered
  range: Range
  updateRange: (newRange: Range) => void
  updateItemCount: (newItemCount: number) => void
}

export type PageChangeButtonsOptions = {
  events?: {
    onGoToFirstClick?: () => void
    onGoToPreviousClick?: () => void
    onGoToNextClick?: () => void
    onGoToLastClick?: () => void
  }
}

export type PageChangeButtons = {
  rendered: Rendered
  updateGoToFirstEnabled: (isEnabled: boolean) => void
  updateGoToPreviousEnabled: (isEnabled: boolean) => void
  updateGoToNextEnabled: (isEnabled: boolean) => void
  updateGoToLastEnabled: (isEnabled: boolean) => void
}

export type PageNavOptions = {
  initialPage: number
  initialNumPages: number
  events?: {
    onPageChange: (newPage: number) => void
  }
}

export type PageNav = {
  rendered: Rendered
  page: number
  numPages: number
  updatePage: (newPage: number) => void
  updateNumPages: (newNumPages: number) => void
}

export type PaginatorOptions = {
  page: number
  itemCount: number
  pageSize: number
  pageSizeOptions: number[]
  events?: {
    onPageSizeChange?: (newPageSize: number) => void
    onPageChange?: (newPage: number) => void
  }
}

export type Paginator = {
  rendered: Rendered
  page: number
  numPages: number
  pageSize: number
  itemCount: number
  setPage: (newPage: number) => void
  setPageSize: (newPageSize: number) => void
  setItemCount: (newItemCount: number) => void
}
