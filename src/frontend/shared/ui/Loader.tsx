export function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="h-6 w-6 border-4 border-t-transparent border-indigo-500 animate-spin rounded-full" />
    </div>
  );
}

export function Pulse() {
  return <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />;
}

export function LoadingList({ rows = 20 }: { rows?: number }) {
  const widths = ['w-3/4', 'w-2/3', 'w-full', 'w-5/6', 'w-1/2', 'w-4/5'];

  return (
    <div className="h-full space-y-4 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div
            className={`h-4 bg-indigo-400 rounded-md ${widths[i % widths.length]}`}
          />
          <div
            className={`h-3 bg-indigo-300 rounded-md ${widths[(i + 2) % widths.length]}`}
          />
        </div>
      ))}
    </div>
  );
}
