import React from 'react'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'
import { generateBlockClass } from '@vtex/css-handles'
import style from './components/Row.css'

interface RowProps {
  fullWidth?: boolean
  inverted?: boolean
  blockClass?: string
}

const Row: React.FC<RowProps> = ({
  blockClass,
  children,
  fullWidth,
  inverted,
}) => {
  const content = (
    <div className={`${style.rowContainer} w-100 flex items-center`}>
      {children}
    </div>
  )

  const classes = generateBlockClass(style.row, blockClass)

  return (
    <div
      className={classNames(
        classes,
        'w-100',
        inverted ? 'bg-base--inverted c-on-base--inverted' : 'bg-base c-on-base'
      )}
    >
      {fullWidth ? (
        content
      ) : (
        <Container className="flex">{content}</Container>
      )}
    </div>
  )
}
;(Row as any).schema = {
  title: 'admin/editor.row.title',
  type: 'object',
  properties: {
    blockClass: {
      title: 'admin/editor.blockClass.title',
      description: 'admin/editor.blockClass.description',
      type: 'string',
      isLayout: true,
    },
    inverted: {
      title: 'admin/editor.inverted.title',
      description: 'admin/editor.inverted.description',
      type: 'boolean',
      default: true,
      isLayout: true,
    },
    fullWidth: {
      title: 'admin/editor.fullWidth.title',
      description: 'admin/editor.fullWidth.description',
      type: 'boolean',
      default: false,
      isLayout: true,
    },
  },
}

export default Row
