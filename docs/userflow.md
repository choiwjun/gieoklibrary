graph TD
    Start([사용자 방문]) --> Login{로그인 여부}
    
    Login -->|신규| Onboarding1[온보딩 Step 1:<br/>환영 메시지]
    Login -->|기존| Home[홈 화면]
    
    Onboarding1 --> Onboarding2[온보딩 Step 2:<br/>기본 정보 입력]
    Onboarding2 --> Onboarding3[온보�ding Step 3:<br/>관심 기능 선택]
    Onboarding3 --> Home
    
    Home --> Feature{기능 선택}

*%% AI 음성 자서전 흐름*

Feature -->|음성 자서전| Record1[녹음 준비<br/>오늘의 질문 제시]
    Record1 --> Record2[녹음 중<br/>실시간 파형]
    Record2 --> Record3[AI 처리 중<br/>텍스트 변환 + 정리]
    Record3 --> Record4[대화 패턴 분석<br/>치매 신호 감지]
    Record4 --> RiskCheck{위험 신호?}
    RiskCheck -->|Yes| CareAlert[케어 기관<br/>매칭 권장]
    RiskCheck -->|No| RecordList[녹음 목록]
    RecordList --> RecordDetail[녹음 상세<br/>텍스트 편집/공유]
    CareAlert --> Home
    RecordDetail --> Home

*%% 영상 편지 흐름*

Feature -->|영상 편지| Video1[전달 조건 설정<br/>수신자/시점 선택]
    Video1 --> Video2[영상 녹화<br/>최대 5분]
    Video2 --> Video3[미리보기<br/>확인]
    Video3 --> VideoSave{저장?}
    VideoSave -->|Yes| VideoList[영상 편지 목록]
    VideoSave -->|No| Video2
    VideoList --> Home

*%% 동네 친구 매칭 흐름*

Feature -->|동네 친구| FriendProfile{프로필<br/>작성 여부}
    FriendProfile -->|No| CreateProfile[프로필 작성<br/>사진/관심사]
    FriendProfile -->|Yes| FriendList[추천 친구 목록<br/>AI 매칭]
    CreateProfile --> FriendList
    FriendList --> FriendDetail[친구 상세<br/>프로필 확인]
    FriendDetail --> SendRequest[친구 신청<br/>메시지 전송]
    SendRequest --> RequestStatus{수락?}
    RequestStatus -->|Yes| Chat[1:1 채팅<br/>모임 제안]
    RequestStatus -->|No| FriendList
    Chat --> Home

*%% 50+ 경력 매칭 흐름*

Feature -->|경력 매칭| CareerProfile{경력 프로필<br/>작성 여부}
    CareerProfile -->|No| CreateCareer[경력 프로필 작성<br/>자서전 자동 추출]
    CareerProfile -->|Yes| OpportunityList[기회 목록<br/>일자리/멘토링]
    CreateCareer --> OpportunityList
    OpportunityList --> OpportunityDetail[상세 정보]
    OpportunityDetail --> Apply[지원/신청]
    Apply --> Match{매칭 성공?}
    Match -->|Yes| Activity[활동 시작]
    Match -->|No| OpportunityList
    Activity --> Home

*%% 디지털 유언장 흐름*

Feature -->|유언장| Will1[Step 1:<br/>기본 정보]
    Will1 --> Will2[Step 2:<br/>재산 분배]
    Will2 --> Will3[Step 3:<br/>장례 희망]
    Will3 --> Will4[Step 4:<br/>유품 처리]
    Will4 --> Will5[Step 5:<br/>가족 메시지]
    Will5 --> WillPreview[미리보기<br/>전체 확인]
    WillPreview --> WillSave{저장?}
    WillSave -->|Yes| LawyerCheck{변호사<br/>검토?}
    WillSave -->|No| Will1
    LawyerCheck -->|Yes| LawyerConsult[변호사 상담<br/>예약]
    LawyerCheck -->|No| Home
    LawyerConsult --> Home

*%% 케어 기관 매칭 흐름*

CareAlert --> CareList[전문 기관 목록<br/>센터/요양사/병원]
    CareList --> CareDetail[기관 상세 정보]
    CareDetail --> CareContact[상담 신청/<br/>예약]
    CareContact --> Home

*%% 구독 흐름*

Home --> Subscription{구독 필요<br/>기능 사용?}
    Subscription -->|Yes| PlanSelect[플랜 선택<br/>베이직/프리미엄]
    PlanSelect --> Payment[결제 진행]
    Payment --> PaymentResult{결제 성공?}
    PaymentResult -->|Yes| Home
    PaymentResult -->|No| PlanSelect
    
    style Start fill:#e1f5e1
    style Home fill:#fff4e1
    style CareAlert fill:#ffe1e1
    style Chat fill:#e1f0ff
    style Activity fill:#e1f0ff
    style LawyerConsult fill:#f0e1ff
    style PaymentResult fill:#e1ffe1