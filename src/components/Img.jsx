const FALLBACK = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80'

export default function Img({ src, alt = '', className }) {
  return (
    <img
      className={className}
      src={src || FALLBACK}
      alt={alt}
      loading="lazy"
      onError={(e) => {
        if (e.currentTarget.dataset.err) return
        e.currentTarget.dataset.err = '1'
        e.currentTarget.src = FALLBACK
      }}
    />
  )
}
