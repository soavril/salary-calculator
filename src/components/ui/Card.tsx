interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className = '', padding = 'md' }: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  subtitle?: string;
}

export function CardTitle({ children, subtitle }: CardTitleProps) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-gray-900">{children}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  );
}

// 결과 표시용 하이라이트 카드
interface HighlightCardProps {
  label: string;
  value: string;
  subValue?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning';
}

export function HighlightCard({ label, value, subValue, variant = 'default' }: HighlightCardProps) {
  const variants = {
    default: 'bg-gray-50 border-gray-100',
    primary: 'bg-blue-50 border-blue-100',
    success: 'bg-green-50 border-green-100',
    warning: 'bg-amber-50 border-amber-100',
  };

  const textColors = {
    default: 'text-gray-900',
    primary: 'text-blue-700',
    success: 'text-green-700',
    warning: 'text-amber-700',
  };

  return (
    <div className={`rounded-xl border p-4 text-center ${variants[variant]}`}>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${textColors[variant]}`}>{value}</p>
      {subValue && <p className="text-xs text-gray-400 mt-1">{subValue}</p>}
    </div>
  );
}
