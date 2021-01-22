import React, { useEffect, useState } from 'react'
import { highlight } from '../highlighter'

export default function CodeHighligher({
  getLanguageFunction,
  children,
  language
}) {
  const [newCode, setNewCode] = useState(children)
  useEffect(() => {
    getLanguageFunction(language, (fn) => {
      setNewCode(highlight(children, fn))
    })
  }, [children, language])
  return (
    <div style={{ position: 'relative' }}>
      <pre dangerouslySetInnerHTML={{ __html: newCode }} />
    </div>
  )
}
