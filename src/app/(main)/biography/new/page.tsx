import { CreateProjectForm } from '@/components/features/biography/CreateProjectForm'

export default function NewBiographyPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-3xl font-bold text-secondary-900">새 자서전 만들기</h1>
      <p className="mb-8 text-lg text-secondary-600">나의 소중한 이야기를 기록해보세요</p>

      <CreateProjectForm />
    </div>
  )
}
