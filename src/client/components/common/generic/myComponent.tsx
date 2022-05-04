import React from 'react'
import { createPaginator } from '../../../../component'
import { PaginatorOptions, Paginator } from '../../../../component/types'
import Com from './base'

/**
 * Thin wrapper around the Paginator component
 */
export const render = (props: { options: PaginatorOptions, setComponent?: (component: Paginator) => void }) => (
  <Com
    componentOptions={props.options}
    createComponent={createPaginator}
    setComponent={props.setComponent}
    name="component"
  />
)

export default render
