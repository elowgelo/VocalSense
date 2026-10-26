import React from 'react';
import { VOICE_TYPES } from '../../utils/pitch';
import { VoiceTypeName } from '../../types';
import { Check } from 'lucide-react';

interface VoiceTypeTableProps {
  detectedVoiceType: VoiceTypeName | null;
}

export const VoiceTypeTable: React.FC<VoiceTypeTableProps> = ({ detectedVoiceType }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <div className="card-title">Perbandingan Klasifikasi Tipe Suara</div>
        <div className="card-subtitle">
          Baris yang disorot menunjukkan klasifikasi tipe suara yang paling sesuai dengan jangkauan nada Anda.
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="table-metrics" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '0.6rem 0.75rem', fontSize: '0.75rem', color: 'var(--text2)', textTransform: 'uppercase' }}>
                Tipe Suara
              </th>
              <th style={{ padding: '0.6rem 0.75rem', fontSize: '0.75rem', color: 'var(--text2)', textTransform: 'uppercase' }}>
                Nada Terendah
              </th>
              <th style={{ padding: '0.6rem 0.75rem', fontSize: '0.75rem', color: 'var(--text2)', textTransform: 'uppercase' }}>
                Nada Tertinggi
              </th>
              <th style={{ padding: '0.6rem 0.75rem', fontSize: '0.75rem', color: 'var(--text2)', textTransform: 'uppercase' }}>
                Rentang Khas
              </th>
              <th style={{ padding: '0.6rem 0.75rem', fontSize: '0.75rem', color: 'var(--text2)', textTransform: 'uppercase' }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {VOICE_TYPES.map((t) => {
              const isMatch = detectedVoiceType === t.name;
              return (
                <tr
                  key={t.name}
                  style={{
                    background: isMatch ? 'var(--bg3)' : 'transparent',
                    borderLeft: isMatch ? '3px solid var(--text)' : '3px solid transparent',
                    fontWeight: isMatch ? 700 : 400,
                  }}
                >
                  <td style={{ padding: '0.65rem 0.75rem' }}>
                    <strong>{t.name}</strong>
                  </td>
                  <td style={{ padding: '0.65rem 0.75rem', fontFamily: 'var(--font-mono)' }}>
                    {t.lowName} ({Math.round(440 * Math.pow(2, (t.low - 69) / 12))} Hz)
                  </td>
                  <td style={{ padding: '0.65rem 0.75rem', fontFamily: 'var(--font-mono)' }}>
                    {t.highName} ({Math.round(440 * Math.pow(2, (t.high - 69) / 12))} Hz)
                  </td>
                  <td style={{ padding: '0.65rem 0.75rem', color: 'var(--text2)' }}>
                    {t.description}
                  </td>
                  <td style={{ padding: '0.65rem 0.75rem' }}>
                    {isMatch ? (
                      <span className="badge badge-green">
                        <Check size={11} />
                        <span>Kategori Anda</span>
                      </span>
                    ) : (
                      <span className="text-muted" style={{ fontSize: '0.75rem' }}>—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
