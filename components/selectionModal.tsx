import React, { type FC } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme'; // Adjust the import according to your theme context location
import { useTranslation } from 'react-i18next';
import type { themeType } from '@/types/general';

interface selectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  choices: {
    label: string;
    onSelect: () => void;
  }[];
}

const SelectionModal: FC<selectionModalProps> = ({
  isVisible,
  onClose,
  title,
  choices,
}) => {
  const { theme } = useTheme(); // Use the theme context
  const { t } = useTranslation();
  const styles = getStyles(theme);

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          {choices.map((choice, index) => (
            <TouchableOpacity
              key={choice.label}
              style={styles.choice}
              onPress={() => {
                choice.onSelect();
                onClose();
              }}>
              <Text style={styles.choiceText}>{choice.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>{t('modals.close')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

function getStyles(theme: themeType) {
  return StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
      width: 300,
      backgroundColor: theme.colors.backgroundColor, // Use theme background color
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalTitle: {
      textAlign: 'center',
      fontSize: 20,
      marginBottom: 20,
      color: theme.colors.textColor, // Use theme text color
    },
    choice: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.textColor, // Use theme text color for the border
      width: '100%', // Full width for choices
    },
    choiceText: {
      color: theme.colors.textColor, // Use theme text color
    },
    closeButton: {
      marginTop: 15,
      padding: 10,
      backgroundColor: theme.colors.error, // Use theme error color
      borderRadius: 5,
    },
    closeButtonText: {
      color: '#FFFFFF', // White text for the close button
    },
  });
}

export default SelectionModal;

