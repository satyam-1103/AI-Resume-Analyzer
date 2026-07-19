import { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { CloudUpload, File, X } from 'lucide-react'
import Button from '../common/Button'

const ACCEPTED = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
}

/**
 * ResumeUploader — drag-and-drop zone for PDF/DOCX, with a fallback file picker.
 *
 * Props:
 *   onFile(file) — called when a valid file is selected
 *   file         — currently selected File object (controlled)
 *   disabled     — disable all interactions
 */
export default function ResumeUploader({ onFile, file, disabled = false }) {
  const [error, setError] = useState('')

  const onDrop = useCallback(
    (accepted, rejected) => {
      if (rejected.length) {
        setError('Only PDF and DOCX files are accepted.')
        return
      }
      if (accepted.length) {
        setError('')
        onFile(accepted[0])
      }
    },
    [onFile]
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: ACCEPTED,
    maxFiles: 1,
    disabled,
  })

  function clearFile(e) {
    e.stopPropagation()
    setError('')
    onFile(null)
  }

  const borderColor = isDragReject || error
    ? 'border-red-400 bg-red-50 dark:bg-red-950/30'
    : isDragActive
    ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30'
    : file
    ? 'border-green-400 bg-green-50 dark:bg-green-950/30'
    : 'border-[color:var(--border-strong)] bg-[color:var(--bg-subtle)] hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/20'

  return (
    <div>
      <div
        {...getRootProps()}
        className={`
          relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed
          p-10 text-center cursor-pointer transition-all duration-200
          ${borderColor}
          ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
        `}
      >
        <input {...getInputProps()} id="resume-file-input" />

        {file ? (
          // File selected state
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400">
              <File size={28} />
            </div>
            <div>
              <p className="font-semibold text-[color:var(--text-primary)]">{file.name}</p>
              <p className="text-sm text-[color:var(--text-muted)]">
                {(file.size / 1024).toFixed(0)} KB
              </p>
            </div>
            <button
              onClick={clearFile}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-[color:var(--text-muted)] hover:bg-[color:var(--bg-subtle)] hover:text-red-500 transition-colors"
            >
              <X size={13} /> Remove file
            </button>
          </div>
        ) : (
          // Empty state
          <>
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-xl transition-colors ${
                isDragActive
                  ? 'bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-300'
                  : 'bg-[color:var(--bg-muted)] text-[color:var(--text-muted)]'
              }`}
            >
              <CloudUpload size={28} />
            </div>

            <p className="mt-4 font-semibold text-[color:var(--text-primary)]">
              {isDragActive ? 'Drop it here!' : 'Drag & drop your resume'}
            </p>
            <p className="mt-1 text-sm text-[color:var(--text-muted)]">
              PDF or DOCX · Max 10 MB
            </p>

            <Button size="sm" variant="secondary" className="mt-5" onClick={(e) => e.stopPropagation()}>
              Or browse files
            </Button>
          </>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  )
}
