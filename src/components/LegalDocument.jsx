import { COLORS } from '../game/constants';
import BackButton from './BackButton';

export default function LegalDocument({ title, lastUpdated, intro, sections, onGoHome }) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(160deg, #e8f4fd 0%, #f5f9ff 100%)',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          background: 'white',
          boxShadow: '0 2px 8px rgba(2,48,71,0.08)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <BackButton onGoHome={onGoHome} />
        <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.deepSpace }}>{title}</span>
      </div>

      <div style={{ padding: '20px 18px 32px' }}>
        <div
          style={{
            background: 'white',
            borderRadius: 18,
            padding: '22px 22px 26px',
            boxShadow: '0 4px 16px rgba(2,48,71,0.07)',
            border: `2px solid ${COLORS.blueGreen}22`,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: COLORS.blueGreen,
              letterSpacing: 1,
              marginBottom: 6,
              textTransform: 'uppercase',
            }}
          >
            BlockFall
          </div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: COLORS.deepSpace,
              margin: '0 0 6px',
              letterSpacing: 0.3,
            }}
          >
            {title}
          </h1>
          <div
            style={{
              fontSize: 12,
              color: COLORS.deepSpace,
              opacity: 0.5,
              fontWeight: 600,
              marginBottom: 18,
            }}
          >
            {lastUpdated}
          </div>

          {intro.map((p, i) => (
            <p
              key={`intro-${i}`}
              style={{
                fontSize: 13.5,
                color: COLORS.deepSpace,
                lineHeight: 1.65,
                margin: '0 0 12px',
                opacity: 0.82,
              }}
            >
              {p}
            </p>
          ))}

          {sections.map((section, si) => (
            <section key={`s-${si}`} style={{ marginTop: 22 }}>
              <h2
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: COLORS.deepSpace,
                  margin: '0 0 10px',
                  letterSpacing: 0.4,
                  paddingBottom: 6,
                  borderBottom: `2px solid ${COLORS.amber}55`,
                }}
              >
                {section.heading}
              </h2>
              {section.blocks.map((block, bi) => {
                if (block.type === 'sub') {
                  return (
                    <h3
                      key={`b-${bi}`}
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: COLORS.brightMarine,
                        margin: '14px 0 6px',
                      }}
                    >
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === 'list') {
                  return (
                    <ul
                      key={`b-${bi}`}
                      style={{
                        margin: '0 0 12px',
                        paddingLeft: 20,
                        color: COLORS.deepSpace,
                        opacity: 0.82,
                      }}
                    >
                      {block.items.map((it, ii) => (
                        <li
                          key={`li-${ii}`}
                          style={{ fontSize: 13, lineHeight: 1.6, margin: '0 0 4px' }}
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p
                    key={`b-${bi}`}
                    style={{
                      fontSize: 13,
                      color: COLORS.deepSpace,
                      lineHeight: 1.65,
                      margin: '0 0 10px',
                      opacity: 0.82,
                    }}
                  >
                    {block.text}
                  </p>
                );
              })}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
