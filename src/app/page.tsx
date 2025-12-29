export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary-50 p-6">
      <main className="flex w-full max-w-4xl flex-col items-center gap-12 text-center">
        {/* Header Section */}
        <div className="space-y-6">
          <h1 className="text-display-md text-primary-950 font-bold">기억책방</h1>
          <p className="text-h3 text-secondary-600 font-medium whitespace-pre-line">
            당신의 소중한 이야기를<br />
            아름다운 책으로 남겨드립니다.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-xl text-xl font-bold transition-colors shadow-lg touch-target-lg">
            자서전 시작하기
          </button>
          <button className="bg-white hover:bg-secondary-50 text-secondary-900 border-2 border-secondary-200 px-8 py-4 rounded-xl text-xl font-bold transition-colors touch-target-lg">
            둘러보기
          </button>
        </div>

        {/* Color Palette Test */}
        <div className="grid grid-cols-5 gap-4 w-full mt-12 p-8 bg-white rounded-2xl shadow-sm">
          <div className="col-span-5 text-left text-secondary-500 mb-2 font-semibold">Color System Test</div>

          <div className="bg-primary-100 h-16 rounded-lg flex items-center justify-center text-primary-900">100</div>
          <div className="bg-primary-300 h-16 rounded-lg flex items-center justify-center text-primary-900">300</div>
          <div className="bg-primary-500 h-16 rounded-lg flex items-center justify-center text-white">500</div>
          <div className="bg-primary-700 h-16 rounded-lg flex items-center justify-center text-white">700</div>
          <div className="bg-primary-900 h-16 rounded-lg flex items-center justify-center text-white">900</div>

          <div className="bg-secondary-100 h-16 rounded-lg flex items-center justify-center text-secondary-900">100</div>
          <div className="bg-secondary-300 h-16 rounded-lg flex items-center justify-center text-secondary-900">300</div>
          <div className="bg-secondary-500 h-16 rounded-lg flex items-center justify-center text-white">500</div>
          <div className="bg-secondary-700 h-16 rounded-lg flex items-center justify-center text-white">700</div>
          <div className="bg-secondary-900 h-16 rounded-lg flex items-center justify-center text-white">900</div>
        </div>
      </main>
    </div>
  );
}
