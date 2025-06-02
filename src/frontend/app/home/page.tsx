'use client';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';

import { TTask } from '../../types/Task';
import { TUser } from '../../types/User';
import { TTasksList } from '../../types/TasksList';

import NavBar from './components/NavBar';
import TaskCreate from './components/TaskCreate';
import TasksListSidebar from './components/TasksListSidebar';
import TaskDetailsSidebar from './components/TaskDetailsSidebar';

export default function HomePage() {
  const router = useRouter();
  const taskDetailsSidebarRef = useRef<HTMLDivElement>(null);
  const taskCreateFormListRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<TUser | null>(null);
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<TTask[]>([]);
  const [tasksLists, setTasksLists] = useState<TTasksList[]>([]);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [confirmDeleteList, setConfirmDeleteList] = useState<boolean | null>(
    null,
  );
  const [confirmDeleteTask, setConfirmDeleteTask] = useState<boolean | null>(
    null,
  );

  async function fetchTasksList() {
    const res = await fetch('http://localhost:3000/tasks-list', {
      credentials: 'include',
    });

    const data = (await res.json()) as TTasksList[];
    const shadowTasksLists = [...data];
    setTasksLists(shadowTasksLists);
  }

  async function fetchTasks() {
    const res = await fetch('http://localhost:3000/tasks', {
      credentials: 'include',
    });

    const data = (await res.json()) as TTask[];
    setTasks(data);
    if (selectedListId) {
      setFilteredTasks(
        data.filter((task) => task.taskList.id === selectedListId),
      );
    }
  }

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch('http://localhost:3000/auth/me', {
        credentials: 'include',
      });

      if (!res.ok) {
        router.replace('/');
        clearInterval(intervalId);
        return;
      }

      const data = (await res.json()) as TUser;
      setUser(data);
      setLoading(false);
    }

    checkAuth().catch(() => {
      router.replace('/');
      clearInterval(intervalId);
    });

    const intervalId = setInterval(() => {
      checkAuth().catch(console.error);
    }, 30000);

    return () => clearInterval(intervalId);
  }, [router]);

  useEffect(() => {
    function handleClickOutsideTaskDetailsSidebar(event: MouseEvent) {
      const target = event.target as Node;

      if (
        taskDetailsSidebarRef.current &&
        taskCreateFormListRef.current &&
        !taskDetailsSidebarRef.current.contains(target) &&
        !taskCreateFormListRef.current.contains(target)
      ) {
        setSelectedTaskId(null);
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutsideTaskDetailsSidebar,
    );
    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutsideTaskDetailsSidebar,
      );
  }, []);

  useEffect(() => {
    fetchTasksList().catch((error) => {
      console.error(error);
    });

    fetchTasks().catch((error) => {
      console.error(error);
    });
  }, []);

  function handleSelectedListId(listId: string) {
    setSelectedListId(listId);
    setFilteredTasks(tasks.filter((task) => task.taskList.id === listId));
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex h-screen">
      <TasksListSidebar
        userId={user.id}
        tasksLists={tasksLists}
        setTasksLists={setTasksLists}
        selectedListId={selectedListId}
        handleSelectedListId={handleSelectedListId}
        confirmDeleteList={confirmDeleteList}
        setConfirmDeleteList={setConfirmDeleteList}
      />

      <main className="flex-grow p-6 overflow-y-auto flex flex-col space-y-8">
        <NavBar />
        {selectedListId ? (
          <TaskCreate
            ref={taskCreateFormListRef}
            selectedListId={selectedListId}
            tasks={filteredTasks}
            setTasks={setTasks}
            selectedTaskId={selectedTaskId}
            setSelectedTaskId={setSelectedTaskId}
            fetchTasks={fetchTasks}
          />
        ) : (
          <p>
            Veuillez sélectionner une liste de tâches pour afficher son
            contenu...
          </p>
        )}
      </main>

      {selectedTaskId && (
        <TaskDetailsSidebar
          ref={taskDetailsSidebarRef}
          selectedTask={filteredTasks.find((e) => e.id === selectedTaskId)}
          confirmDeleteTask={confirmDeleteTask}
          setConfirmDeleteTask={setConfirmDeleteTask}
          tasks={filteredTasks}
          setTasks={setTasks}
          setSelectedTaskId={setSelectedTaskId}
          fetchTasks={fetchTasks}
        />
      )}
    </div>
  );
}
