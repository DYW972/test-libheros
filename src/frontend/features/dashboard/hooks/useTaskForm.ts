import { useState } from 'react';

export function useTaskForm(onSubmit: (title: string) => void) {
  const [title, setTitle] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title);
      setTitle('');
    }
  };

  return {
    title,
    handleChange,
    handleSubmit,
  };
}
