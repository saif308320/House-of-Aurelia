import { useEffect, useRef, useState } from 'react'

export default function Concierge({ houseKey, productName, kind }) {
  const [open, setOpen] = useState(false)
  const [live, setLive] = useState(null)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [log, setLog] = useState([])
  const endRef = useRef(null)

  useEffect(() => {
    fetch(`/api/live?house=${houseKey}`)
      .then((r) => r.json())
      .then(setLive)
      .catch(() => setLive({ advisor: 'Floor stylist', city: houseKey === 'uk' ? 'Mayfair' : 'SoHo' }))
  }, [houseKey])

  useEffect(() => {
    if (open && log.length === 0) {
      setLog([{
        role: 'bot',
        text: kind === 'fashion'
          ? 'Hi — live on the Mayfair fashion floor. Dresses, pants, girls, boys. Ask for a size or a hold.'
          : 'Hi — live at the SoHo makeup counter. Lips, eyes, face, skin. Ask for a shade or a hold.'
      }])
    }
  }, [open, houseKey, log.length])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [log, open])

  async function send(e) {
    e.preventDefault()
    const message = input.trim()
    if (!message || busy) return
    setInput('')
    setLog((l) => [...l, { role: 'user', text: message }, { role: 'bot', text: '' }])
    setBusy(true)
    try {
      const res = await fetch('/api/concierge/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ house: houseKey, message, productName })
      })
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue
          const data = JSON.parse(line.slice(6))
          if (data.token) {
            acc += data.token
            const snap = acc
            setLog((l) => {
              const next = [...l]
              next[next.length - 1] = { role: 'bot', text: snap }
              return next
            })
          }
        }
      }
    } catch {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ house: houseKey, message, productName })
      })
      const data = await res.json()
      setLog((l) => {
        const next = [...l]
        next[next.length - 1] = { role: 'bot', text: data.reply }
        return next
      })
    }
    setBusy(false)
  }

  return (
    <div className="agent" id="live">
      {open && (
        <div className="agent-panel">
          <div className="agent-head">
            <div>
              <b>Live stylist</b>
              <div style={{ fontSize: 11, color: 'rgba(26,22,19,.5)', marginTop: 2 }}>
                {live?.advisor || 'Floor'} · {live?.city || ''}
              </div>
            </div>
            <span>Live · 0s</span>
          </div>
          <div className="agent-log">
            {log.map((m, i) => <div key={i} className={`bubble ${m.role}`}>{m.text}</div>)}
            <div ref={endRef} />
          </div>
          <form className="agent-form" onSubmit={send}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Shade, size, hold…" />
            <button type="submit">{busy ? '…' : 'Send'}</button>
          </form>
        </div>
      )}
      <button className="agent-toggle" onClick={() => setOpen((v) => !v)}>
        <span className="dot" />
        {open ? 'Close' : 'Live stylist'}
      </button>
    </div>
  )
}
