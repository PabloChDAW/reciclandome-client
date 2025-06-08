export default function CriteriaItem({ met, text }) {
  return (
    <div className={`flex items-center space-x-2 text-sm ${met ? "text-green-600" : "text-red-500"}`}>
      <span>{met ? "✅" : "❌"}</span>
      <span>{text}</span>
    </div>
  );
}