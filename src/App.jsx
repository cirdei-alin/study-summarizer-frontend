import { useEffect, useState } from 'react'
import { getDocuments } from './api'
import DocumentForm from './components/DocumentForm'
import DocumentItem from './components/DocumentItem'
import './App.css'

function App() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    getDocuments()
      .then((data) => {
        setDocuments(data)
        setError(null)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [reloadKey])

  function reload() {
    setReloadKey((key) => key + 1)
  }

  return (
    <main className="container">
      <h1>The Study Summarizer</h1>
      <h2>Documentele mele</h2>

      <DocumentForm onCreated={() => setReloadKey((key) => key + 1)} />

      {loading && <p>Se încarcă...</p>}

      {error && (
        <p className="error">Nu am putut încărca documentele: {error}</p>
      )}

      {!loading && !error && documents.length === 0 && (
        <p>Nu ai niciun document încă.</p>
      )}

      <ul className="document-list">
        {documents.map((doc) => (
          <DocumentItem key={doc.id} doc={doc} onChanged={reload} />
        ))}
      </ul>
    </main>
  )
}

export default App