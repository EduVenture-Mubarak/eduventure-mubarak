import React, { type FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import type {
  certificateContent,
  contentTypeProps,
  courseType,
  idType,
  onNextContent,
  onPreviousContent,
  themeType,
} from '@/types/general';

interface certificateProps {
  courseId: idType;
  courseContent: contentTypeProps[];
  certificateData: certificateContent;
  onNextContent: onNextContent;
  onPreviousContent: onPreviousContent;
}

const CertificatePage: FC<certificateProps> = ({
  courseId,
  courseContent,
  certificateData,
  onNextContent,
  onPreviousContent,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(theme);

  // Check if all course contents are completed except the certificate
  const isCourseCompleted = courseContent.every(
    (content: contentTypeProps) =>
      content.contentType === 'certificate' || content.isCompleted,
  );
  const [certificateRequested, setCertificateRequested] = useState(false);

  const handleRequestCertificate = () => {
    if (isCourseCompleted) {
      Alert.alert(
        t('courses.certificateRequestTitle'),
        t('courses.certificateRequestMessage'),
      );
      setCertificateRequested(true);
      // Mark the certificate as completed after requesting
      certificateData.isCompleted = true;
    } else {
      Alert.alert(
        t('courses.incompleteCourseTitle'),
        t('courses.incompleteCourseMessage'),
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('courses.certificate')}</Text>
      {certificateData.isCompleted ? (
        <Text style={styles.description}>
          {t('courses.alreadyCompletedCertificateMessage')}
        </Text>
      ) : (
        <>
          <Text style={styles.description}>
            {isCourseCompleted
              ? t('courses.completeCertificateMessage')
              : t('courses.incompleteCertificateMessage')}
          </Text>
          <TouchableOpacity
            onPress={handleRequestCertificate}
            style={[
              styles.certificateButton,
              {
                backgroundColor: isCourseCompleted
                  ? theme.colors.textColor
                  : '#ccc',
              },
            ]}
            disabled={!isCourseCompleted || certificateRequested}>
            <Text style={styles.certificateButtonText}>
              {t('courses.requestCertificate')}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

function getStyles(theme: themeType) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.colors.backgroundColor,
    },
    title: {
      fontSize: 24,
      color: theme.colors.textColor,
      marginBottom: 10,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 16,
      color: theme.colors.textColor,
      textAlign: 'center',
      marginBottom: 20,
    },
    certificateButton: {
      padding: 15,
      borderRadius: 8,
    },
    certificateButtonText: {
      color: theme.colors.backgroundColor,
      fontSize: 18,
      textAlign: 'center',
    },
    navigationButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
    },
    navigation: {
      padding: 8,
      borderRadius: 8,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: theme.colors.textColor,
    },
    navigationText: {
      color: theme.colors.textColor,
    },
  });
}

export default CertificatePage;

