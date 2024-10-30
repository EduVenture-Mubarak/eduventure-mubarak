// DropdownMenu.js
import React, { type FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import an icon from expo vector icons
import { useRouter } from 'expo-router';
import type { contentTypeProps, idType } from '@/types/general';

interface navigatorProps {
  courseContent: contentTypeProps[];
  courseId: idType;
  data: contentTypeProps;
}

const DropdownMenu: FC<navigatorProps> = ({
  courseContent,
  courseId,
  data,
}) => {
  const router = useRouter();

  const handleOpenContentDetail = () => {
    // Navigate to the ContentDetail screen, passing all course content as a parameter
    router.push({
      pathname: '/content-details',
      params: {
        content: JSON.stringify(courseContent),
        courseId: courseId,
        data: JSON.stringify(data),
      }, // Convert content to a JSON string
    });
  };

  return (
    <TouchableOpacity onPress={handleOpenContentDetail} style={{ padding: 8 }}>
      <Ionicons name="menu" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default DropdownMenu;

