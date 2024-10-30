import { useTheme } from '@/hooks/useTheme';
import type { themeType } from '@/types/general';
import React, { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface InformativeModalProps {
  visible: boolean;
  onClose: () => void;
  head: string;
  description: string;
}

const InformativeModal: FC<InformativeModalProps> = ({
  visible,
  onClose,
  head,
  description,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose} // Close modal on back button press
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{head}</Text>
          <Text style={styles.modalMessage}>{description}</Text>
          <View style={styles.singleButtonContainer}>
            <TouchableOpacity style={styles.okButton} onPress={onClose}>
              <Text style={styles.okText}>{t('ok')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

function getStyles(theme: themeType) {
  return StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      width: 300,
      padding: 20,
      backgroundColor: theme.colors.backgroundColor,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.colors.textColor,
    },
    modalMessage: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
      color: theme.colors.textColor,
    },
    singleButtonContainer: {
      justifyContent: 'center',
      width: '100%',
    },
    okButton: {
      backgroundColor: theme.colors.textColor,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    okText: {
      color: theme.colors.backgroundColor,
      fontWeight: 'bold',
    },
  });
}

export default InformativeModal;

