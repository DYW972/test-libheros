'use client';
import './globals.css';
import { AuthProvider } from '@/shared/context/auth.context';
import {
  TasksListsProvider,
  useTasksLists,
} from '@/shared/context/taskList.context';
import { TasksProvider } from '@/shared/context/task.context';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full bg-white">
      <body className={`h-full`}>
        <AuthProvider>
          <TasksListsProvider>
            <TasksListsConsumer>{children}</TasksListsConsumer>
          </TasksListsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

// Helper component inside RootLayout file to consume tasksListId from context
function TasksListsConsumer({ children }: { children: React.ReactNode }) {
  const { activeTaskListId } = useTasksLists();

  return (
    <TasksProvider tasksListId={activeTaskListId}>{children}</TasksProvider>
  );
}
