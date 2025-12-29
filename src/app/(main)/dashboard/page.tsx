import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-secondary-900">홈</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle>진행 중인 자서전</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-secondary-600">아직 작성된 자서전이 없습니다.</p>
                    </CardContent>
                </Card>

                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle>오늘의 질문</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg font-medium text-primary-600">
                            &ldquo;어린 시절 가장 기억에 남는 친구는 누구인가요?&rdquo;
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
