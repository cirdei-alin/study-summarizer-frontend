import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://127.0.0.1:8000'

function App() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_URL}/api/documents`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Serverul a răspuns cu ${response.status}`)
        }
        return response.json()
      })
      .then((data) => setDocuments(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="container">
      <h1>The Study Summarizer</h1>
      <h2>Documentele mele</h2>

      {loading && <p>Se încarcă...</p>}

      {error && (
        <p className="error">Nu am putut încărca documentele: {error}</p>
      )}

      {!loading && !error && documents.length === 0 && (
        <p>Nu ai niciun document încă.</p>
      )}

      <ul className="document-list">
        {documents.map((doc) => (
          <li key={doc.id} className="document">
            <span className="document-title">{doc.title}</span>
            <span className="badge">{doc.fileType}</span>
            <span className={`badge status-${doc.status}`}>{doc.status}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App