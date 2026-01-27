import { Stack } from 'expo-router';
import React from 'react';

export default function (): React.JSX.Element {
  return (
    <Stack>
      <Stack.Screen
        name="transaction"
        options={{
          headerShown: false,
          statusBarBackgroundColor: 'white',
          statusBarAnimation: "fade",
          statusBarStyle: "dark",
        }}
      />
    </Stack>
  );
}