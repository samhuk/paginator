import React from 'react'
import { PaginatorOptions, Paginator } from '../../../component/types'
import PaginatorWithReact from '../common/generic/myComponent'
import ItemBase from './itemBase'

const COMPONENT_OPTIONS: PaginatorOptions = {
  page: 1,
  itemCount: 50,
  pageSize: 10,
  pageSizeOptions: [5, 10, 20, 50, 100, 200, 500],
}

const Operations = (props: { component: Paginator }) => (
  <>
    <button
      type="button"
      className="button--white"
      onClick={() => props.component.setPage(props.component.page + 1)}
    >
      Update the text of the component
    </button>
  </>
)

export const render = () => (
  <ItemBase component={PaginatorWithReact} componentOptions={COMPONENT_OPTIONS} operationsComponent={Operations} />
)

export default render
