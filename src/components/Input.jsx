export default function Input({ label, ...props }) {
    return (
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', marginBottom: 4 }}>{label}</label>
        <input {...props} style={{ padding: 8, width: '100%', boxSizing: 'border-box' }} />
      </div>
    )
  }
  