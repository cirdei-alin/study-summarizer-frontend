import { useState } from 'react'
import { createDocument } from '../api'

function DocumentForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [fileType, setFileType] = useState('pdf')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setError(null)

    try {
      await createDocument(title, fileType)
      setTitle('')
      onCreated()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="document-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titlul documentului"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
        maxLength={255}
      />
      <select
        value={fileType}
        onChange={(event) => setFileType(event.target.value)}
      >
        <option value="pdf">PDF</option>
        <option value="docx">DOCX</option>
        <option value="txt">TXT</option>
      </select>
      <button type="submit" disabled={saving}>
        {saving ? 'Se adaugă...' : 'Adaugă'}
      </button>
      {error && (
        <p className="error">Nu am putut adăuga documentul: {error}</p>
      )}
    </form>
  )
}

export default DocumentForm