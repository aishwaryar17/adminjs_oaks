import React from 'react'
import { Box, Text } from '@adminjs/design-system'

const TruncateJson = (props) => {
  const { record, property } = props
  const value = record?.params?.[property.name]

  if (!value) return <Text color="grey100">-</Text>

  let displayText = ''

  try {
    const parsed = typeof value === 'string' ? JSON.parse(value) : value
    displayText = JSON.stringify(parsed)
  } catch {
    displayText = value?.toString?.() || ''
  }

  // Truncate long text
  const truncated = displayText.length > 50 ? displayText.substring(0, 50) + '...' : displayText

  return (
    <Box
      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '400px',
      }}
    >
      <Text>{truncated}</Text>
    </Box>
  )
}

export default TruncateJson
