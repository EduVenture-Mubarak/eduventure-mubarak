const data = [
  {
    id: 1,
    name: 'Grade 1 subjects',
    number_of_lessons: 10,
    rating: 4.8,
    total_time: '18h 45min',
    grade: 1,
    image: 'https://picsum.photos/200',
    courses: [
      {
        id: 1,
        name: 'Mathematics',
        grade: 1,
        image: 'https://picsum.photos/200',
        registration_date: '2024/10/5',
        deadline: '2024/10/30',
        degree: '92%',
        completed_at: '2024/10/29',
        content: [
          {
            id: 1,
            name: 'Basic Arithmetic',
            contentType: 'video',
            isCompleted: true,
            transcript: 'Basic arithmetic operations...',
            summary: 'Math basics overview.',
            video_url:
              'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          },
          {
            id: 2,
            name: 'Understanding Even Numbers',
            contentType: 'quiz',
            degree: 0,
            isCompleted: true,
            questions: [
              {
                id: 1,
                type: 'single',
                label: '5 + 5 = ...',
                choices: [
                  { label: '5', id: 1 },
                  { label: '10', id: 2 },
                  { label: '15', id: 3 },
                  { label: '20', id: 4 },
                ],
                correctAnswer: [2],
              },
              {
                id: 2,
                type: 'multiple',
                label: 'Which of the following are even numbers?',
                choices: [
                  { label: '2', id: 1 },
                  { label: '3', id: 2 },
                  { label: '5', id: 3 },
                  { label: '4', id: 4 },
                ],
                correctAnswer: [1, 4],
              },
            ],
          },
          {
            id: 3,
            name: 'Introduction to Number Patterns',
            contentType: 'article',
            isCompleted: false,
            text: 'This article covers the basics of number patterns...',
          },
          {
            id: 4,
            name: 'Get your certificate',
            contentType: 'certificate',
            isCompleted: false,
            text: 'Obtain the button bellow to get your certificate',
          },
        ],
      },
      {
        id: 2,
        name: 'Mathematics',
        grade: 1,
        image: 'https://picsum.photos/200',
        registration_date: '2024/10/5',
        deadline: '2024/10/30',
        degree: '89%',
        completed_at: '2024/10/29',
        content: [
          {
            id: 1,
            name: 'Video2',
            transcript:
              'Basic arithmetic operations and number patterns. The students will understand how numbers interact in the real world.',
            summary: 'Math basics overview.',
            video_url:
              'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            quiz: {
              questions: [
                {
                  id: 1,
                  type: 'single',
                  label: '5 + 5 = ...',
                  choices: ['5', '10', '15', '20'],
                  correctAnswer: '10',
                },
                {
                  id: 2,
                  type: 'multiple',
                  label: 'Which of the following are even numbers?',
                  choices: ['2', '3', '5', '4'],
                  correctAnswer: ['2', '4'],
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Grade 2 subjects',
    number_of_lessons: 12,
    rating: 4.7,
    total_time: '22h 10min',
    grade: 2,
    image: 'https://picsum.photos/300',
    courses: [
      {
        id: 2,
        name: 'Science',
        grade: 2,
        image: 'https://picsum.photos/200',
        registration_date: '2024/10/3',
        deadline: '2024/10/28',
        degree: '85%',
        completed_at: '2024/10/27',
        content: [
          {
            id: 1,
            name: 'Video1',
            transcript:
              'Introduction to life science, plants, and animals. Learn about the different living things in the environment.',
            summary: 'Life science overview.',
            video_url:
              'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            quiz: {
              questions: [
                {
                  id: 1,
                  type: 'single',
                  label: 'Which of these is a plant?',
                  choices: ['Dog', 'Tree', 'Bird', 'Fish'],
                  correctAnswer: 'Tree',
                },
                {
                  id: 2,
                  type: 'multiple',
                  label: 'Which of these are mammals?',
                  choices: ['Lion', 'Shark', 'Cow', 'Frog'],
                  correctAnswer: ['Lion', 'Cow'],
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Grade 3 subjects',
    number_of_lessons: 15,
    rating: 4.9,
    total_time: '25h 5min',
    grade: 3,
    image: 'https://picsum.photos/200',
    courses: [
      {
        id: 3,
        name: 'English',
        grade: 3,
        image: 'https://picsum.photos/200',
        registration_date: '2024/10/2',
        deadline: '2024/10/25',
        degree: '94%',
        completed_at: '2024/10/24',
        content: [
          {
            id: 1,
            name: 'Video1',
            transcript:
              'Learn the fundamentals of English grammar and sentence structure. Expand vocabulary and improve communication.',
            summary: 'English grammar basics.',
            video_url:
              'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            quiz: {
              questions: [
                {
                  id: 1,
                  type: 'single',
                  label: 'Which of the following is a noun?',
                  choices: ['Run', 'Happy', 'Dog', 'Quickly'],
                  correctAnswer: 'Dog',
                },
                {
                  id: 2,
                  type: 'multiple',
                  label: 'Select the verbs:',
                  choices: ['Eat', 'Beautiful', 'Jump', 'Chair'],
                  correctAnswer: ['Eat', 'Jump'],
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'Grade 4 subjects',
    number_of_lessons: 8,
    rating: 4.6,
    total_time: '17h 20min',
    grade: 4,
    image: 'https://picsum.photos/200',
    courses: [
      {
        id: 4,
        name: 'History',
        grade: 4,
        image: 'https://picsum.photos/200',
        registration_date: '2024/10/4',
        deadline: '2024/10/26',
        degree: '87%',
        completed_at: '2024/10/25',
        content: [
          {
            id: 1,
            name: 'Video1',
            transcript:
              'Study the early civilizations and their contributions to modern society.',
            summary: 'Ancient civilizations overview.',
            video_url:
              'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            quiz: {
              questions: [
                {
                  id: 1,
                  type: 'single',
                  label: 'Who built the pyramids?',
                  choices: ['Greeks', 'Romans', 'Egyptians', 'Aztecs'],
                  correctAnswer: 'Egyptians',
                },
                {
                  id: 2,
                  type: 'multiple',
                  label: 'Which of these are ancient civilizations?',
                  choices: ['Maya', 'Inca', 'Vikings', 'Romans'],
                  correctAnswer: ['Maya', 'Inca', 'Romans'],
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'Grade 5 subjects',
    number_of_lessons: 14,
    rating: 4.7,
    total_time: '23h 30min',
    grade: 5,
    image: 'https://picsum.photos/200',
    courses: [
      {
        id: 5,
        name: 'Geography',
        grade: 5,
        image: 'https://picsum.photos/200',
        registration_date: '2024/10/1',
        deadline: '2024/10/29',
        degree: '90%',
        completed_at: '2024/10/28',
        content: [
          {
            id: 1,
            name: 'Video1',
            transcript:
              'Learn about the Earth, continents, countries, and how geography shapes human history.',
            summary: 'Geography fundamentals.',
            video_url:
              'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            quiz: {
              questions: [
                {
                  id: 1,
                  type: 'single',
                  label: 'What is the largest continent?',
                  choices: ['Asia', 'Africa', 'Europe', 'Australia'],
                  correctAnswer: 'Asia',
                },
                {
                  id: 2,
                  type: 'multiple',
                  label: 'Which of these are oceans?',
                  choices: ['Atlantic', 'Indian', 'Amazon', 'Pacific'],
                  correctAnswer: ['Atlantic', 'Indian', 'Pacific'],
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: 'Grade 6 subjects',
    number_of_lessons: 16,
    rating: 4.8,
    total_time: '26h 15min',
    grade: 6,
    image: 'https://picsum.photos/200',
    courses: [
      {
        id: 6,
        name: 'Physics',
        grade: 6,
        image: 'https://picsum.photos/200',
        registration_date: '2024/10/6',
        deadline: '2024/10/27',
        degree: '88%',
        completed_at: '2024/10/26',
        content: [
          {
            id: 1,
            name: 'Video1',
            transcript:
              'Introduction to motion, forces, and energy. Learn the fundamental laws of physics.',
            summary: 'Basic physics overview.',
            video_url:
              'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            quiz: {
              questions: [
                {
                  id: 1,
                  type: 'single',
                  label: 'What is the force that pulls objects towards Earth?',
                  choices: ['Friction', 'Magnetism', 'Gravity', 'Inertia'],
                  correctAnswer: 'Gravity',
                },
                {
                  id: 2,
                  type: 'multiple',
                  label: 'Which of these are types of energy?',
                  choices: ['Kinetic', 'Thermal', 'Potential', 'Noise'],
                  correctAnswer: ['Kinetic', 'Thermal', 'Potential'],
                },
              ],
            },
          },
        ],
      },
    ],
  },
];

export default data;

