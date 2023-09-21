"use client"

import { Spinner } from '@nextui-org/react'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import "react-quill/dist/quill.snow.css"

interface EditorProps {
  onChange: (value: string) => void
  value: string
}


export const Editor = ({ onChange, value }: EditorProps) => {
  const ReactQuill = useMemo(() => dynamic(async () => import('react-quill'), { ssr: false }), [])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <Spinner />

  return (
    <div className='bg-white'>
      <ReactQuill
        theme='snow'
        value={ value }
        onChange={ onChange }
      />
    </div>

  )
}