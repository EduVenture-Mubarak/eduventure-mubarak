export type childrenType = React.ReactNode;

export interface childrenProps {
  children: childrenType;
}

export type idType = string | number;

export type themeType = {
  colors: {
    backgroundColor: string;
    textColor: string;
    placeholderColor: string;
    error: string;
    success: string;
    secondaryLink: string;
    disabledButton: string;
    disabledButtonText: string;
    selectedTab: string;
    notSelectedTab: string;
    chatInput: string;
    chatBorderColor: string;
    tabBackgroundColor: string;
    lessons: string;
    courses1: string;
    courses2: string;
    textColorOpacity: string;
    questionBackground: string;
    questionChoiceBackground: string;
  };
};

export interface theme {
  theme: themeType;
}

export interface quizContent {
  id: idType;
  type: 'single' | 'multiple'; // Specify the type of quiz question
  label: string;
  name: string;
  degree: number;
  contentType: 'quiz';
  isCompleted: boolean;
  questions: questionType[];
}

type questionType = {
  id: idType;
  type: 'single' | 'multiple';
  label: string;
  choices: Array<{
    label: string;
    id: idType;
  }>; // Array of answer choices
  correctAnswer: idType[]; // An array of correct answer IDs
};

// Define the structure for a video content
export interface videoContent {
  id: idType;
  name: string;
  contentType: 'video';
  transcript: string; // Description of the video content
  summary: string; // Short summary of the video
  video_url: string; // URL of the video
  isCompleted: boolean;
}

// Define the structure for an article content
export interface articleContent {
  id: idType;
  name: string;
  contentType: 'article';
  isCompleted: boolean;
  text: string;
}

// Define the structure for certificate content
export interface certificateContent {
  id: idType;
  name: string;
  contentType: 'certificate';
  isCompleted: boolean;
  text: string;
}

// Define the type for different content
export type contentTypeProps =
  | videoContent
  | quizContent
  | articleContent
  | certificateContent;

// Define the structure for the course
export interface courseType {
  id: idType;
  name: string;
  grade: number;
  image: string; // URL for the course image
  registration_date: string; // Date of registration in YYYY/MM/DD format
  deadline: string; // Deadline date in YYYY/MM/DD format
  degree: string; // Course completion degree/percentage
  completed_at: string; // Date of completion in YYYY/MM/DD format
  content: contentTypeProps[]; // Array of contents associated with the course
}

export interface courseProps {
  course: courseType;
}

export interface categoryProps {
  category: {
    id: idType;
    image: string;
    name: string;
    number_of_lessons: number;
    rating: number;
    total_time: string;
  };
  index: number;
}

export interface articleProps {
  articleData: articleContent;
}

export interface onNextContent {
  onNextContent: () => void;
}

export interface onPreviousContent {
  onPreviousContent: () => void;
}

