import { useBack } from '@/hooks/navigation/useBack';
import {
  useBottomSheet,
} from '@/states/bottomSheet.state';

function useCloseAction() {
  const {
    setActiveView: setActiveBshView,
    setIsOpen,
  } = useBottomSheet();

  useBack(() => {
    setIsOpen(false);
    setActiveBshView('');
  })
}

export { useCloseAction };