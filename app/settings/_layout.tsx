import { Stack } from 'expo-router';
import React from 'react';

export default function (): React.JSX.Element {
  return (
    <Stack>
      <Stack.Screen
        name="categoriesList"
        options={{
          headerShown: false,
          statusBarBackgroundColor: '#bae6fd'
        }}
      />
    </Stack>
  );
}