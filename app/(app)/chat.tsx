import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import ChatInput from '@/components/chat/messageInput';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import type { themeType } from '@/types/general';

export default function chat() {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [messages, setMessages] = useState<
    { text: string; from: 'user' | 'AI'; id: number | string }[]
  >([]);
  const { t } = useTranslation();
  return (
    <>
      <Stack.Screen
        options={{
          title: t('pages.chat'),
          headerShown: true, // This disables the header
        }}
      />

      <View style={styles.chatContainer}>
        <ScrollView>
          {messages.map((message) => {
            return (
              <View
                key={message.id}
                style={[
                  styles.messageContainer,
                  message.from === 'AI'
                    ? styles.messageContainerAI
                    : styles.messageContainerUser,
                ]}>
                <View
                  style={[
                    styles.message,
                    message.from === 'AI'
                      ? styles.aiMessage
                      : styles.userMessage,
                  ]}>
                  <Text
                    style={
                      message.from === 'AI' ? styles.aiText : styles.userText
                    }>
                    {message.text}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <ChatInput setMessages={setMessages} />
    </>
  );
}

function getStyles(theme: themeType) {
  const styles = StyleSheet.create({
    chatContainer: {
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
      paddingHorizontal: 32,
      paddingVertical: 32,
    },
    messageContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 16,
    },
    messageContainerAI: {
      justifyContent: 'flex-start',
    },
    messageContainerUser: {
      justifyContent: 'flex-end',
    },
    message: {
      borderRadius: 9999,
      paddingHorizontal: 16,
      paddingVertical: 12,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    aiMessage: {
      backgroundColor: theme.colors.textColor,
    },
    userMessage: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.textColor,
      borderWidth: 1,
      borderStyle: 'solid',
    },
    aiText: {
      color: theme.colors.backgroundColor,
    },
    userText: {
      color: theme.colors.textColor,
    },
  });

  return styles;
}

