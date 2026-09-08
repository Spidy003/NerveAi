import { Check, X } from "lucide-react";

export default function ComparisonTable() {
  const rows = [
    { feature: "Failure Detection", traditional: "Reactive (After breakdown)", nerve: "Predictive (14 days early)" },
    { feature: "Installation", traditional: "Complex hardwiring", nerve: "Plug & Play (OBD-II)" },
    { feature: "Live Data Frequency", traditional: "Every 1-5 minutes", nerve: "Sub-second streaming" },
    { feature: "AI Diagnostics", traditional: false, nerve: true },
    { feature: "Enterprise API", traditional: "Limited / Costly", nerve: "Included" },
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800 bg-card">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-900/50 border-b border-gray-800">
            <th className="p-4 font-semibold text-gray-300">Feature</th>
            <th className="p-4 font-semibold text-gray-400">Traditional Telematics</th>
            <th className="p-4 font-semibold text-primary">Nerve AI</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-800/30 transition-colors">
              <td className="p-4 text-sm text-gray-300">{row.feature}</td>
              <td className="p-4 text-sm text-gray-400">
                {typeof row.traditional === 'boolean' ? (
                  row.traditional ? <Check className="h-5 w-5 text-gray-400" /> : <X className="h-5 w-5 text-gray-600" />
                ) : (
                  row.traditional
                )}
              </td>
              <td className="p-4 text-sm font-medium text-white">
                {typeof row.nerve === 'boolean' ? (
                  row.nerve ? <Check className="h-5 w-5 text-primary" /> : <X className="h-5 w-5 text-red-500" />
                ) : (
                  row.nerve
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
