import { useTheme } from '@/hooks/useTheme';
import type {
  idType,
  onNextContent,
  onPreviousContent,
  quizContent,
  themeType,
} from '@/types/general';
import React, {
  type Dispatch,
  type FC,
  type SetStateAction,
  useState,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import InformativeModal from '../informativeModal';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '../confirmModal';

interface quizProps {
  quizData: quizContent;
  onNextContent: onNextContent;
  onPreviousContent: onPreviousContent;
  setQuizStarted: Dispatch<SetStateAction<boolean>>;
}

const QuizPage: FC<quizProps> = ({
  quizData,
  onNextContent,
  onPreviousContent,
  setQuizStarted,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizStarted, setQuizStartedState] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();

  const handleStartQuiz = () => {
    setQuizStartedState(true);
    setQuizStarted(true);
  };

  const handleAnswerSelect = (choiceId: idType) => {
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const isMultipleChoice = currentQuestion.type === 'multiple';

    if (!isMultipleChoice) {
      // For single choice questions, store the answer directly by choice ID
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestionIndex]: choiceId,
      });
    } else {
      // For multiple choice questions, toggle the selection of the answer ID
      const currentSelections = selectedAnswers[currentQuestionIndex] || [];
      const isSelected = currentSelections.includes(choiceId);
      const newSelections = isSelected
        ? currentSelections.filter((id: idType) => id !== choiceId)
        : [...currentSelections, choiceId];

      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestionIndex]: newSelections,
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    // Check if all questions are answered
    for (let i = 0; i < quizData.questions.length; i++) {
      const answer = selectedAnswers[i];
      const currentQuestion = quizData.questions[i];
      if (currentQuestion.type === 'multiple') {
        if (!answer || answer.length === 0) {
          setIsInformativeVisible(true);
          return;
        }
      } else {
        if (answer === undefined) {
          setIsInformativeVisible(true);
          return;
        }
      }
    }

    // Calculate score
    let calculatedScore = 0;
    for (let i = 0; i < quizData.questions.length; i++) {
      const currentQuestion = quizData.questions[i];
      const answer = selectedAnswers[i];

      if (currentQuestion.type === 'multiple') {
        const isCorrect =
          currentQuestion.correctAnswer.every((correct) =>
            answer.includes(correct),
          ) && answer.length === currentQuestion.correctAnswer.length;

        if (isCorrect) {
          calculatedScore++;
        }
      } else {
        // For single-choice questions, check if the selected answer matches the correct answer
        if (answer === currentQuestion.correctAnswer[0]) {
          calculatedScore++;
        }
      }
    }

    // Calculate percentage
    const calculatedPercentage =
      (calculatedScore / quizData.questions.length) * 100;
    setScore(calculatedScore);
    setPercentage(calculatedPercentage);
    setIsConfirmationVisible(true);
  };

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const totalQuestions = quizData.questions.length;
  const [isInformativeVisible, setIsInformativeVisible] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  function handleCloseInformative() {
    setIsInformativeVisible(false);
  }

  function handleConfirm() {
    setIsConfirmationVisible(false);
    setQuizStarted(false);
    onNextContent();
  }

  function handleCancel() {
    setIsConfirmationVisible(false);
  }

  return (
    <>
      <InformativeModal
        visible={isInformativeVisible}
        onClose={handleCloseInformative}
        head={t('courses.quizInformativeHead')}
        description={t('courses.quizInformativeDescription')}
      />
      <ConfirmModal
        visible={isConfirmationVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        head={t('courses.quizSubmitHead')}
        text={t('courses.quizSubmitDescription')}
      />

      <View style={styles.quizContainer}>
        {!quizStarted ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={styles.quizLabel}>{quizData.name}</Text>
            <TouchableOpacity
              onPress={handleStartQuiz}
              style={styles.startButton}>
              <Text style={styles.startButtonText}>
                {t('courses.quizStart')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <Text style={styles.progressText}>
              {t('courses.question')} {currentQuestionIndex + 1}{' '}
              {t('courses.of')} {totalQuestions}
            </Text>

            <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${
                      ((currentQuestionIndex + 1) / totalQuestions) * 100
                    }%`,
                  },
                ]}
              />
            </View>
            <ScrollView style={{ flex: 1 }}>
              <Text style={styles.questionText}>{currentQuestion.label}</Text>

              {currentQuestion.choices.map((choice) => {
                const isSelected =
                  Array.isArray(selectedAnswers[currentQuestionIndex]) &&
                  selectedAnswers[currentQuestionIndex].includes(choice.id);
                const isSelectedSingle =
                  selectedAnswers[currentQuestionIndex] === choice.id;

                return (
                  <TouchableOpacity
                    key={choice.id}
                    onPress={() => handleAnswerSelect(choice.id)}
                    style={[
                      styles.optionButton,
                      isSelected || isSelectedSingle
                        ? styles.selectedOption
                        : styles.defaultOption,
                    ]}>
                    <Text
                      style={[
                        styles.optionText,
                        isSelected || isSelectedSingle
                          ? styles.selectedOptionText
                          : styles.defaultOptionText,
                      ]}>
                      {choice.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View>
              <View style={styles.navigationButtons}>
                <TouchableOpacity
                  onPress={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  style={styles.navigationButton}>
                  <Text style={styles.navigationText}>
                    {t('courses.previousQuestion')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNextQuestion}
                  disabled={currentQuestionIndex === totalQuestions - 1}
                  style={styles.navigationButton}>
                  <Text style={styles.navigationText}>
                    {t('courses.nextQuestion')}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={handleSubmitQuiz}
                style={styles.submitButton}>
                <Text style={styles.submitButtonText}>
                  {t('courses.submitQuiz')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const getStyles = (theme: themeType) => {
  return StyleSheet.create({
    quizContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.backgroundColor,
    },
    quizLabel: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: theme.colors.textColor,
    },
    startButton: {
      backgroundColor: theme.colors.textColor,
      padding: 15,
      alignItems: 'center',
      borderRadius: 5,
    },
    startButtonText: {
      color: theme.colors.backgroundColor,
      fontSize: 18,
    },
    progressContainer: {
      height: 20,
      backgroundColor: theme.colors.backgroundColor,
      borderRadius: 9999,
      marginBottom: 10,
      overflow: 'hidden',
      borderColor: theme.colors.textColor,
      borderWidth: 1,
    },
    progressBar: {
      height: '100%',
      backgroundColor: theme.colors.textColor,
      borderRadius: 9999,
    },
    progressText: {
      marginTop: 48,
      fontSize: 14,
      marginBottom: 10,
      textAlign: 'center',
      color: theme.colors.textColor,
    },
    questionText: {
      fontSize: 16,
      marginTop: 24,
      marginBottom: 12,
      color: theme.colors.textColor,
    },
    optionButton: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 12,
    },
    selectedOption: {
      backgroundColor: theme.colors.textColor,
      borderColor: theme.colors.textColor,
    },
    defaultOption: {
      backgroundColor: theme.colors.backgroundColor,
    },
    optionText: {
      fontSize: 16,
    },
    selectedOptionText: {
      color: theme.colors.backgroundColor,
    },
    defaultOptionText: {
      color: theme.colors.textColor,
    },
    navigationButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      gap: 12,
    },
    navigationButton: {
      padding: 10,
      backgroundColor: theme.colors.backgroundColor,
      borderRadius: 5,
      flex: 1,
      alignItems: 'center',
      // marginHorizontal: 5,
      borderColor: theme.colors.textColor,
      borderWidth: 1,
    },
    navigationText: {
      color: theme.colors.textColor,
    },
    submitButton: {
      backgroundColor: theme.colors.textColor,
      padding: 12,
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 12,
    },
    submitButtonText: {
      color: theme.colors.backgroundColor,
      fontSize: 18,
    },
  });
};

export default QuizPage;

