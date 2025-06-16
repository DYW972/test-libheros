import { useState } from 'react';

export function useTasksListForm(onSubmit: (name: string) => void) {
  const [name, setName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name);
      setName('');
    }
  };

  return {
    name,
    handleChange,
    handleSubmit,
  };
}
