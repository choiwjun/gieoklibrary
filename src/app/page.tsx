import { Button, Input, Textarea } from '@/components/ui'

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
          <Button size="lg" className="shadow-lg">
            자서전 시작하기
          </Button>
          <Button variant="outline" size="lg">
            둘러보기
          </Button>
        </div>

        {/* Form Components Test */}
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm space-y-8 text-left">
          <div className="text-secondary-500 font-semibold mb-4">Form Components Test</div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Input</h3>
            <Input label="이메일 (Default)" placeholder="example@email.com" helperText="자주 사용하는 이메일을 입력해주세요." />
            <Input label="이름 (Large - Senior)" size="lg" placeholder="홍길동" />
            <Input label="전화번호 (Error State)" placeholder="010-1234-5678" error="올바른 전화번호 형식이 아닙니다." hasError />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Textarea</h3>
            <Textarea label="자기소개" placeholder="당신의 이야기를 들려주세요..." helperText="최소 10자 이상 입력해주세요." />
          </div>
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
  )
}
