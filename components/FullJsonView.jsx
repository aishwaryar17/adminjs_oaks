import React from 'react';

const FullJsonView = ({ record, property }) => {
  let value = record?.params?.[property.name];

  if (value === undefined || value === null) {
    return <div style={{ color: '#888' }}>No data</div>;
  }

  let formatted = '';
  try {
    if (typeof value === 'string') {
      const s = value.trim();
      if (s.startsWith('{') || s.startsWith('[')) {
        value = JSON.parse(s);
      }
    }
    formatted = typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
  } catch (e) {
    formatted = String(value);
  }

  return (
    <pre
      style={{
        background: '#f8f8f8',
        padding: '10px',
        borderRadius: '8px',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        maxHeight: '400px',
        overflowY: 'auto',
      }}
    >
      {formatted}
    </pre>
  );
};

export default FullJsonView;
