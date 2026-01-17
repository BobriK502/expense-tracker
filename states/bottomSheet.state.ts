import { isNativePlatformSupported } from 'react-native-screens/lib/typescript/core'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const useBottomSheet = create(
  combine(
    {
      isOpen: false,
      activeView: '',
    },
    (set, get) => {
      return {
        setActiveView: (newView: string | ((activeView: string) => string)) => {
          set((state) => ({
            activeView:
              typeof newView === 'function'
                ? newView(state.activeView)
                : newView,
          }))
        },
        setIsOpen: (newOpenState: boolean | ((curr: boolean) => boolean)) => {
          set((state) => ({
            isOpen:
              typeof newOpenState === 'function'
                ? newOpenState(state.isOpen)
                : newOpenState,
          }))
        },
      }
    },
  ),
)

export { useBottomSheet };
