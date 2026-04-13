import { useState } from 'react';
import { COLORS } from '../game/constants';
import BackButton from '../components/BackButton';

const SHOP_ITEMS = [
  {
    id: 'energy10',
    itemTypeId: 2,
    icon: '⚡',
    name: '10 Energy',
    desc: 'Refill 10 plays instantly',
    price: '7¢',
    color: COLORS.amber,
    amount: 10,
  },
  {
    id: 'energy25',
    itemTypeId: 3,
    icon: '⚡',
    name: '25 Energy',
    desc: 'Best value for regular players',
    price: '15¢',
    color: COLORS.orange,
    amount: 25,
    badge: 'Popular',
  },
  {
    id: 'energy50',
    itemTypeId: 4,
    icon: '⚡',
    name: '50 Energy',
    desc: 'Stock up and play all day',
    price: '25¢',
    color: COLORS.blueGreen,
    amount: 50,
    badge: 'Best Value',
  },
  {
    id: 'mysterybox',
    itemTypeId: 5,
    icon: '🎁',
    name: 'Mystery Box',
    desc: 'Random energy + exclusive rewards',
    price: '20¢',
    color: COLORS.brightMarine,
    amount: null,
  },
];

export default function ShopScreen({ onGoHome, onAddEnergy, buyItem, balanceError, resetBalanceError }) {
  const [buyingId, setBuyingId] = useState(null);

  async function handleBuy(item) {
    if (buyingId) return;
    resetBalanceError();
    setBuyingId(item.id);
    const success = await buyItem(item.itemTypeId);
    setBuyingId(null);
    if (success) {
      onAddEnergy();
    }
  }

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
      {/* Header */}
      <div
        style={{
          background: 'white',
          boxShadow: '0 2px 8px rgba(2,48,71,0.08)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <BackButton onGoHome={onGoHome} />
        <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.deepSpace }}>Shop</span>
      </div>

      {/* Balance error */}
      {balanceError && (
        <div
          style={{
            margin: '16px 16px 4px',
            background: '#fee2e2',
            border: '1.5px solid #fca5a5',
            borderRadius: 12,
            padding: '10px 14px',
            fontSize: 12,
            color: '#991b1b',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {balanceError}
        </div>
      )}

      {/* Items */}
      <div style={{ padding: '12px 16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {SHOP_ITEMS.map(item => (
          <ShopItemCard
            key={item.id}
            item={item}
            buying={buyingId === item.id}
            disabled={!!buyingId}
            onBuy={() => handleBuy(item)}
          />
        ))}
      </div>
    </div>
  );
}

function ShopItemCard({ item, buying, disabled, onBuy }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 18,
        padding: '16px 18px',
        boxShadow: '0 4px 16px rgba(2,48,71,0.07)',
        border: `2px solid ${item.color}22`,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Color accent strip */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 5,
          background: item.color,
          borderRadius: '18px 0 0 18px',
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: `${item.color}22`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 26,
          flexShrink: 0,
          marginLeft: 8,
        }}
      >
        {item.icon}
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <span style={{ fontSize: 15, fontWeight: 800, color: COLORS.deepSpace }}>{item.name}</span>
          {item.badge && (
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                background: item.color,
                color: 'white',
                borderRadius: 5,
                padding: '1px 6px',
                letterSpacing: 0.3,
              }}
            >
              {item.badge}
            </span>
          )}
        </div>
        <div style={{ fontSize: 12, color: COLORS.deepSpace, opacity: 0.55 }}>{item.desc}</div>
      </div>

      {/* Price + button */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
        <div style={{ fontSize: 18, fontWeight: 900, color: item.color }}>{item.price}</div>
        <button
          onClick={onBuy}
          disabled={disabled}
          style={{
            background: `linear-gradient(135deg, ${item.color}, ${item.color}bb)`,
            color: 'white',
            border: 'none',
            borderRadius: 10,
            padding: '6px 14px',
            fontSize: 11,
            fontWeight: 700,
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.65 : 1,
            letterSpacing: 0.3,
          }}
        >
          {buying ? 'Buying...' : 'Buy'}
        </button>
      </div>
    </div>
  );
}
