import React, {
  type Dispatch,
  type FC,
  type SetStateAction,
  useState,
} from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import SendSVG from '../svgs/send';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import type { themeType } from '@/types/general';

// Define the message type
interface Message {
  text: string;
  from: 'user' | 'AI';
  id: number | string;
}

interface ChatInputProps {
  setMessages: Dispatch<SetStateAction<Message[]>>; // Use correct type for state setter
}

const ChatInput: FC<ChatInputProps> = ({ setMessages }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');

  const [counter, setCounter] = useState(0);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  // Function to handle sending a message
  const handleSend = () => {
    if (message.trim()) {
      // Log the message being sent

      // Update the messages state with the user's message
      setMessages((old) => [
        ...old,
        { text: message, from: 'user', id: counter },
      ]);

      // Clear the input after sending
      setMessage('');

      // Increment the counter
      setCounter((old) => old + 1);

      // Generate a response from AI
      generateRandomMessage();
    }
  };

  // Function to generate a random AI message
  function generateRandomMessage() {
    const messages = [
      'Hello there!',
      "How's it going?",
      'What are you up to?',
      'Just checking in!',
      'Have a great day!',
      'Nice to see you!',
      "What's new?",
      "Hope you're doing well!",
      'Let me know if you need anything!',
      'Just wanted to say hi!',
    ];

    // Generate a random index for the messages array
    const randomIndex = Math.floor(Math.random() * messages.length);

    // Update the messages state with the AI's message
    setMessages((old) => [
      ...old,
      { text: messages[randomIndex], from: 'AI', id: counter + 1 }, // Use counter + 1 for AI response
    ]);

    // Increment the counter for the next message
    setCounter((old) => old + 1);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder={t('chat')}
        placeholderTextColor={theme.colors.lessons} // Optional: placeholder color
      />
      <TouchableOpacity
        style={[styles.sendButton]} // Set opacity based on input
        onPress={handleSend}
        disabled={!message} // Disable button if input is empty
      >
        <SendSVG />
      </TouchableOpacity>
    </View>
  );
};

// Styles
function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: theme.colors.backgroundColor, // Background color for the input area
    },
    input: {
      flex: 1,
      height: 40,
      borderColor: theme.colors.chatBorderColor,
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 15,
      backgroundColor: theme.colors.backgroundColor, // Background color for input
      marginRight: 10,
      color: theme.colors.textColor,
    },
    sendButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.textColor, // Send button color
    },
  });

  return styles;
}

export default ChatInput;

