import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as FileSystem from 'expo-file-system';

const VideoPlayer = () => {
  const { videoUri } = useLocalSearchParams(); // Get the video URI from the route params
  const fullPath = `${FileSystem.documentDirectory}${videoUri}`;

  return (
    <>
      <Stack.Screen
        options={{
          title: String(videoUri),
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        <Video
          source={{ uri: fullPath }} // Set the video source to the selected video URI
          style={styles.video}
          useNativeControls
          isLooping
          shouldPlay
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Set the background color for the player
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default VideoPlayer;

