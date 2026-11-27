import { useState } from 'react'
import { deleteDocument, updateDocument } from '../api'

function DocumentItem({ doc, onChanged }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(doc.title)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  function startEditing() {
    setTitle(doc.title)
    setError(null)
    setEditing(true)
  }

  function cancelEditing() {
    setEditing(false)
    setError(null)
  }

  async function handleSave(event) {
    event.preventDefault()
    setBusy(true)
    setError(null)

    try {
      await updateDocument(doc.id, { title })
      setEditing(false)
      onChanged()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Ștergi documentul „${doc.title}”?`)) {
      return
    }

    setBusy(true)
    setError(null)

    try {
      await deleteDocument(doc.id)
      onChanged()
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <li className="document">
      {editing ? (
        <form className="edit-form" onSubmit={handleSave}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            maxLength={255}
            autoFocus
          />
          <button type="submit" className="primary" disabled={busy}>
            Salvează
          </button>
          <button type="button" onClick={cancelEditing} disabled={busy}>
            Anulează
          </button>
        </form>
      ) : (
        <>
          <span className="document-title">{doc.title}</span>
          <span className="badge">{doc.fileType}</span>
          <span className={`badge status-${doc.status}`}>{doc.status}</span>
          <button type="button" onClick={startEditing} disabled={busy}>
            Editează
          </button>
          <button
            type="button"
            className="danger"
            onClick={handleDelete}
            disabled={busy}
          >
            Șterge
          </button>
        </>
      )}

      {error && <p className="error">{error}</p>}
    </li>
  )
}

export default DocumentItem