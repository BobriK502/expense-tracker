import { Stack } from 'expo-router';
import React from 'react';

export default function (): React.JSX.Element {
  return (
    <Stack>
      <Stack.Screen
        name="budget"
        options={{
          headerShown: false,
          statusBarBackgroundColor: '#bae6fd'
        }}
      />
      <Stack.Screen
        name="income"
        options={{
          headerShown: false,
          statusBarBackgroundColor: '#d9f99d'
        }}
      />
      <Stack.Screen
        name="expence"
        options={{
          headerShown: false,
          statusBarBackgroundColor: '#fecdd3',
          statusBarAnimation: "fade",
          statusBarStyle: "dark",
        }}
      />
    </Stack>
  );
}