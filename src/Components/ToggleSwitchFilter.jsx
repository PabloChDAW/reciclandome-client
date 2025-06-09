const ToggleSwitchFilter = ({ enabled, onToggle }) => (
  <div className="flex items-center space-x-3">
    <span className={`text-sm ${!enabled ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
      Todos los puntos
    </span>
    <button
      type="button"
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
        enabled ? 'bg-green-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
    <span className={`text-sm ${enabled ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
      Mis puntos
    </span>
  </div>
); 

export default ToggleSwitchFilter;