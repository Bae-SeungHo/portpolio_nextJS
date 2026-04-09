import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Seung Ho",
  lastName: "Bae",
  name: `Seung Ho Bae`,
  role: "AI & Cloud Engineer",
  avatar: "/images/avatar.jpg",
  email: "doge@kbfg.com",
  location: "Asia/Seoul", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Korean"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/once-ui-system",
    essential: false,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/seung-ho-bae-7392b7282/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/cl0ge/",
    essential: true,
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@once_ui",
    essential: false,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Challenge-Oriented Developer, 배승호 입니다.</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">AI & Cloud Backend Engineer</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          KB Kookmin Bank
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
    4년차 대리급 경력을 가지고 있습니다. <Text as="span" size="xl" weight="strong">KB Kookmin Bank</Text>, where I craft intuitive <br /> user experiences. After hours, I build my own projects.
</>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        {/* ── 한국어 ── */}
        <strong>도전을 두려워하지 않는 AI Platform Engineer입니다.</strong>
        <br /><br />
        대학 시절 공모전 30회 이상 도전해 10회 이상 수상하고,
        ETRI·Qisens AI 인턴을 마치고, MCL 연구실에서 논문 5편을 발표했습니다.
        졸업 후에는 KB국민은행에서 수백만 고객이 이용하는 AI 서비스를
        Python · Kubernetes · AWS로 설계·개발·운영하고 있습니다.
        <br /><br />
        <em>"정확한 것보다 유의미한 것을 배포한다"</em>
        <br /><br />

        {/* ── 구분선 ── */}
        <span style={{ display: "block", borderTop: "0.5px solid var(--neutral-alpha-weak)", margin: "1rem 0", opacity: 0.4 }} />

        {/* ── English ── */}
        <span style={{ fontSize: "0.92em", color: "var(--neutral-on-background-weak)" }}>
          <strong>AI Platform Engineer who never stops challenging.</strong>
          <br /><br />
          During university, I entered 30+ competitions and won 10+, completed
          internships at ETRI and Qisens AI, and published 5 research papers.
          Now at KB Kookmin Bank, I design and operate AI services used by
          millions — with Python, Kubernetes, and AWS.
          <br /><br />
          <em>"Ship what is meaningful, not just what is accurate."</em>
        </span>
        {/* AI Platform Engineer with 3+ years at KB Kookmin Bank, building
        production AI services used by millions. I work across the full
        stack — from training ML models and designing Python backends to
        deploying containerized services on Kubernetes and AWS.
        <br /><br />
        Before industry, I won 11 AI & software competitions.
        I believe the best engineers don't just
        write code — they ship systems that earn trust. */}
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "KB국민은행 (KB Kookmin Bank)",
        timeframe: "2022.12 — Present",
        role: "AI Platform Engineer (대리, 고객컨택혁신부)",
        achievements: [
          <>
            <strong>[2025.06~현재]</strong> 직원 업무 효율화 플랫폼 개발 —
            다수 챗봇 통합 운영의 비효율을 해결하는 AI 학습관리 플랫폼.
            온톨로지 구조 설계 · REST API · 데이터 시각화.<br />
            <span style={{ fontSize: "0.88em", color: "var(--neutral-on-background-weak)" }}>
              Internal AI Productivity Platform: integrating multiple bot engines, ontology design, REST API, data visualization.
            </span>
          </>,
          <>
            <strong>[2024.09~현재]</strong> 고객컨택혁신부 — 대고객 챗봇·콜봇 통합 운영 및 고도화.
            2025년 RDA 에이전트 개발 경진대회 <strong>우수상</strong> 수상.<br />
            <span style={{ fontSize: "0.88em", color: "var(--neutral-on-background-weak)" }}>
              Chatbot & callbot unified operations. Won Excellence Award at RDA Agent Competition 2025.
            </span>
          </>,
          <>
            <strong>[2022.12~2024.09]</strong> 금융AI센터 — 실사 아바타 기반 AI 금융비서 서비스 개발·운영.
            Lambda scheduling + HPA로 클라우드 비용 최적화. DevOps · CI/CD 구축.{" "}
            <a href="https://www.etnews.com/20240306000220" target="_blank" rel="noopener noreferrer"
               style={{ color: "var(--brand-on-background-medium)" }}>
              언론 보도 →
            </a><br />
            <span style={{ fontSize: "0.88em", color: "var(--neutral-on-background-weak)" }}>
              AI Financial Assistant: avatar-based chatbot, cloud cost optimization via Lambda & HPA, CI/CD pipelines.
            </span>
          </>,

          // <>
          //   Built and operated an <strong>AI Learning Management Platform</strong> handling
          //   chatbot & callbot training data for millions of customer interactions —
          //   Python/Flask backend, MySQL, Kubernetes on AWS.
          // </>,
          // <>
          //   Led PoC of <strong>Unreal Engine-based Virtual AI Counselor</strong> —
          //   integrated pixel streaming, Audio2Face facial synthesis pipeline,
          //   and mobile web app.
          // </>,
          // <>
          //   Managed <strong>Mobile AI Financial Assistant</strong> service (press-covered) —
          //   Kubernetes pod management, resource patching, cache optimization,
          //   video synthesis module operation.
          // </>,
          // <>
          //   Responsible for <strong>bot engine QA data embedding & visualization</strong>,
          //   automating what was previously manual work for ops teams.
          // </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Qisens AI",
        timeframe: "2022.03 — 2022.06",
        role: "AI Engineer Intern (ICT 학부인턴십)",
        achievements: [
          <>
            항공 영상 객체 Segmentation 모델 개발 및 최적화.<br />
            그림자 제거 GAN 모델 적용으로 영상 전처리 성능 개선.<br />
            <span style={{ fontSize: "0.88em", color: "var(--neutral-on-background-weak)" }}>
              Aerial image segmentation model. Shadow removal GAN for improved preprocessing.
            </span>
          </>,

          // <>
          //   Developed <strong>Semantic & Instance Segmentation models</strong> for aerial imagery
          //   — ship detection with bounding-box-to-coordinate projection using QGIS/GDAL.
          // </>,
          // <>
          //   Built full pipeline: data collection → labeling → model training → optimization
          //   for satellite/aerial image analysis.
          // </>,
        ],
        images: [],
      },
      {
        company: "ETRI (한국전자통신연구원)",
        timeframe: "2022.07 — 2022.08",
        role: "Research Intern — Medical IT Convergence Lab",
        achievements: [
          <>
            PPG·ECG 생체신호 기반 혈압 추정 딥러닝 모델 개발.<br />
            Multi Camera Calibration · Multi Person Skeleton Detection 연구.<br />
            <span style={{ fontSize: "0.88em", color: "var(--neutral-on-background-weak)" }}>
              Blood pressure estimation model using PPG/ECG bio-signals. Multi-person skeleton detection research.
            </span>
          </>,
          // <>
          //   Developed a <strong>deep learning-based blood pressure estimation model</strong>
          //   using PPG signal shape and time-domain attributes.
          //   Published as a paper in Korean Communications Society journal.
          // </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "영남대학교 (Yeungnam University)",
        description: (
          <>
            학사 졸업 2017.03 – 2023.02 · 전공 GPA <strong>4.46 / 4.5</strong> · 전체 GPA 4.2 / 4.5<br />
            전액장학금 수혜 (Full-ride scholarship)<br />
            MCL 학부연구원 · 한국통신학회·대한임베디드공학회 논문 5편 발표<br />
            <span style={{ fontSize: "0.9em", color: "var(--neutral-on-background-weak)" }}>
              B.S. in Information &amp; Communication Engineering. Top-ranked GPA with full scholarship.
              Undergraduate researcher at MCL. 5 academic papers.
            </span>
            
            B.S. in Information & Communication Engineering, 2017–2022.
            <br />
            GPA: 4.46 / 4.5 (Major) · 4.2 / 4.5 (Overall) — Graduated top of major.
            <br />
            Undergraduate Researcher, Mobile Communication Lab (MCL) 2020–2022.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "AI & Machine Learning",
        description: (
          <>
            LLM fine-tuning, Computer Vision (YOLO, Segmentation, Detection),
            Deep Learning with PyTorch & TensorFlow, NLP pipelines,
            RAG systems, AI agent development.
          </>
        ),
        images: [],
      },
      {
        title: "Backend & Full Stack",
        description: (
          <>
            Python (Flask, FastAPI), JavaScript / Node.js, React,
            REST API design, MySQL · MongoDB, Shell scripting.
          </>
        ),
        images: [],
      },
      {
        title: "Cloud & Infrastructure",
        description: (
          <>
            Kubernetes (pod management, resource patching, service ops),
            AWS (EC2, S3, EKS), Docker, CI/CD pipelines, DevOps practices.
          </>
        ),
        images: [],
      },
    ],
  },
  awards: {
    display: true,
    title: "Awards", //TODO description 으로 변경
    items: [
      { title: "KB국민은행 AI Challenge", award: "우수상", year: "2021", org: "KB Kookmin Bank" },
      { title: "SK AI Challenge for Our Society", award: "우수상", year: "2021", org: "SK Telecom" },
      { title: "AI Agent 개발 경진대회", award: "장려상", year: "2024", org: "-" },
      { title: "임베디드 SW 경진대회", award: "대표이사상", year: "2021", org: "교육부" },
      { title: "경상북도 공공데이터 AI 공모전", award: "우수상", year: "2021", org: "경상북도" },
      { title: "해양경찰 데이터 활용 공모전", award: "우수상", year: "2021", org: "해양경찰청" },
      { title: "영남대학교 IoT 경진대회", award: "최우수상", year: "2021", org: "영남대학교" },
      { title: "경찰청 인권영화제 공모전", award: "우수상", year: "2021", org: "경찰청" },
      { title: "청소년 안전문화 콘텐츠 공모전", award: "우수상", year: "2021", org: "-" },
      { title: "AI Speaker 데이터분석 경진대회", award: "Creativity상", year: "2021", org: "-" },
      { title: "인공지능 학습용 데이터 활용 공모전", award: "입상", year: "2021", org: "NIA" },
    ],
  },

  publications: {
    display: true,
    title: "Study",
    items: [
      {
        title: "PPG 기반 딥러닝 혈압 추정 연구",
        venue: "한국통신학회 (KCA)",
        year: "2022",
        description: "PPG 신호의 형태·Time-Domain 특징을 활용한 혈압 추정 딥러닝 모델",
      },
      {
        title: "비접촉 광학식 주행거리계를 이용한 배관 손상 위치 추정",
        venue: "한국통신학회 (KCA)",
        year: "2022",
        description: "광학 센서 기반 배관 내부 손상 탐지 알고리즘",
      },
      {
        title: "딥러닝 기반 양치질 습관 분석 시스템 (우수논문상)",
        venue: "대한임베디드공학회 추계학술대회",
        year: "2021",
        description: "비전 센서로 양치 방향·미흡 부위를 실시간 분석하는 시스템",
      },
      {
        title: "ADHD Prediction using VibraImage Technology",
        venue: "대한임베디드공학회",
        year: "2022",
        description: "영상 기반 안면 움직임으로 ADHD 의심군을 분류하는 딥러닝 모델",
      },
      {
        title: "세그멘테이션 기반 항공사진 분석 모델 최적화",
        venue: "대한임베디드공학회",
        year: "2022",
        description: "항공 영상에서 도로·주차장 분할 세그멘테이션 모델 최적화 연구",
      },
    ],
  },
};
const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
