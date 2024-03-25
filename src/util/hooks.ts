import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export const useDialogState = (defaultState = false) => {
  const [open, setOpen] = useState(defaultState)
  const pathname = usePathname()
  const initialPathname = useRef(pathname)

  useEffect(() => {
    if (pathname !== initialPathname.current) {
      setOpen(false)
      initialPathname.current = pathname
    }
  }, [pathname, open])

  return [open, setOpen] as const
}

export const useCloudinaryUpload = () => {
  const [loading, setLoading] = useState(false)

  const upload = async (file: File) => {
    if (!file) {
      return null
    }
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
      )

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      )

      if (!response.ok) {
        throw new Error('Upload failed')
      }
      const data = await response.json()
      const imageUrl = data.secure_url
      return imageUrl
    } catch (error) {
      console.error('Error uploading file:', error)
      throw new Error('Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return { upload, loading }
}
