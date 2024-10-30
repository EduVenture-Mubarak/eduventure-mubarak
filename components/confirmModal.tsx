import { useTheme } from '@/hooks/useTheme';
import type { themeType } from '@/types/general';
import React, { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface confirmModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  head: string;
  text: string;
}

const ConfirmModal: FC<confirmModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  head,
  text,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel} // Close modal on back button press
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{head}</Text>
          <Text style={styles.modalMessage}>{text}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>{t('no')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>{t('yes')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
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
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    cancelButton: {
      backgroundColor: theme.colors.backgroundColor,
      borderWidth: 1,
      borderColor: theme.colors.textColor,
      borderStyle: 'solid',
      padding: 10,
      borderRadius: 5,
      flex: 1,
      alignItems: 'center',
      marginRight: 10,
    },
    confirmButton: {
      backgroundColor: theme.colors.textColor,
      padding: 10,
      borderRadius: 5,
      flex: 1,
      alignItems: 'center',
    },
    cancelText: {
      color: theme.colors.textColor,
      fontWeight: 'bold',
    },
    confirmText: {
      color: theme.colors.backgroundColor,
      fontWeight: 'bold',
    },
  });

  return styles;
}

export default ConfirmModal;

