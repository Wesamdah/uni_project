export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-blue-100 to-white backdrop-blur-sm">
      <div className="text-center space-y-4 animate-fade-in">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-blue-300 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border-t-4 border-blue-600 border-solid animate-spin"></div>
        </div>
        <p className="text-xl text-gray-700 font-semibold tracking-wide">
          Connecting to sensor...
        </p>
      </div>
    </div>
  );
}
