import { useState, useCallback } from 'react';

type ConfirmModalOptions = {
  title: string;
  message: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
};

export function useConfirmModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmModalOptions | null>(null);

  const openModal = useCallback(
    (opts: ConfirmModalOptions) => {
      setOptions(opts);
      setIsOpen(true);
    },
    [setOptions, setIsOpen],
  );

  const closeModal = useCallback(() => {
    if (options?.onCancel) options.onCancel();
    setIsOpen(false);
    setOptions(null);
  }, [options]);

  const confirm = useCallback(async () => {
    if (!options) return;
    await options.onConfirm();
    setIsOpen(false);
    setOptions(null);
  }, [options]);

  return {
    isOpen,
    options,
    openModal,
    closeModal,
    confirm,
  };
}
