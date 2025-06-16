'use client';
import { useEffect, useRef, useState } from 'react';

import { useAuth } from '@/shared/context/auth.context';
import { useTasks } from '@/shared/context/task.context';

import { useConfirmModal } from '@/features/dashboard/hooks';

import { LoadingList, Modal } from '@/shared/ui';
import { useTasksLists } from '@/shared/context/taskList.context';
import SearchBar from '@/features/dashboard/components/SearchBar/SearchBar';
import TaskDetailsSidebar from '@/features/dashboard/components/TaskDetailsSidebar';

import { CreateTaskList } from '@/features/dashboard/components/TaskList/';
import { TaskListItemList } from '@/features/dashboard/components/TaskList/TaskListItemList';

import { CreateTask } from '@/features/dashboard/components/Task';
import { TaskItemList } from '@/features/dashboard/components/Task/TaskItemList';

import { useClickOutside } from '@/shared/hooks';
import { localStorageService } from '@/shared/services/local-storage.service';

export default function HomePage() {
  const userMenu = useRef<HTMLDivElement>(null);
  const taskCreateFormRef = useRef<HTMLDivElement>(null);
  const taskDetailsSidebarRef = useRef<HTMLDivElement>(null);

  const { signout } = useAuth();
  const { isOpen, options, openModal, closeModal, confirm } = useConfirmModal();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    tasksLists,
    isLoadingList,
    isCreatingList,
    deleteTasksList,
    activeTaskListId,
    selectTaskList,
    setIsCreatingList,
  } = useTasksLists();

  const {
    tasks,
    isLoadingTasks,
    isCreatingTask,
    deleteTask,
    activeTaskId,
    selectTask,
    setIsCreatingTask,
    showSideBarTask,
    setShowSideBarTask,
  } = useTasks();

  const toggleModalDeleteList = (id: string) => {
    openModal({
      title: `Supprimer la liste ${tasksLists.find((element) => element.id === id)?.name ?? ''} ?`,
      message:
        'Êtes-vous sûre de vouloir supprimer cette liste? Toutes les tâches associées seront également supprimées!',
      onConfirm: async () => {
        console.log(id);
        await deleteTasksList(id);
        selectTaskList(null);
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  const toggleModalDeleteTask = (id: string) => {
    openModal({
      title: `Supprimer la tâche ${tasks.find((element) => element.id === id)?.title ?? ''} ?`,
      message: 'Êtes-vous sûr de vouloir supprimer cette tâche ?',
      onConfirm: async () => {
        console.log(id);
        await deleteTask(id);
        selectTask(null);
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  const handleSideBarDetails = (taskId: string) => {
    setShowSideBarTask(true);
    selectTask(taskId);
  };

  useClickOutside(taskCreateFormRef, () => {
    setIsCreatingTask(null);
  });

  useClickOutside(taskDetailsSidebarRef, () => {
    setShowSideBarTask(null);
  });

  useClickOutside(userMenu, () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  });

  useEffect(() => {
    console.log(activeTaskId);
    console.log(activeTaskListId);
    console.log(tasks);
  }, [activeTaskListId]);

  // If a list is selected, show all tasks in that list (ignore searchTerm)
  const filteredTasks = activeTaskListId
    ? tasks.filter((task) => task.taskListId === activeTaskListId)
    : // Else if no list selected, but there is a search term, filter all tasks by searchTerm
      searchTerm
      ? tasks.filter((task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : // Else no list selected & no search term => empty task list or show all?
        [];

  // For filtered lists:
  // If a list is selected, show all lists (no filtering)
  const filteredTaskLists = activeTaskListId
    ? tasksLists
    : searchTerm
      ? tasksLists.filter((list) =>
          tasks.some(
            (task) =>
              task.taskListId === list.id &&
              task.title.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        )
      : tasksLists; // show all lists when no active list and no search term

  useEffect(() => {
    console.log('activeTaskListId changed:', activeTaskListId);
    console.log(
      'filteredTasks for activeTaskListId:',
      tasks.filter((task) => task.taskListId === activeTaskListId),
    );
  }, [activeTaskListId, tasks]);

  return (
    <div className="flex h-screen">
      <aside className="w-72 bg-gray-50 border-r border-gray-300 flex flex-col p-4">
        <div className="mb-4">
          {isCreatingList ? (
            <CreateTaskList onClose={() => setIsCreatingList(false)} />
          ) : (
            <button
              className="w-full bg-indigo-600 text-white py-1.5 rounded hover:bg-indigo-700 transition"
              onClick={() => setIsCreatingList(true)}
            >
              Ajouter une nouvelle liste
            </button>
          )}
        </div>
        <div className="flex-grow overflow-y-auto">
          {isLoadingList ? (
            <LoadingList />
          ) : filteredTaskLists.length ? (
            filteredTaskLists
              .slice()
              .sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime(),
              )
              .map((list) => (
                <TaskListItemList
                  key={list.id}
                  isActive={activeTaskListId === list.id}
                  taskList={list}
                  onSelect={() => selectTaskList(list.id)}
                  onDelete={() => toggleModalDeleteList(list.id)}
                />
              ))
          ) : (
            <LoadingList />
          )}
        </div>
      </aside>

      <main className="flex-grow p-6 overflow-y-auto flex flex-col space-y-8">
        <SearchBar
          ref={userMenu}
          menuOpen={menuOpen}
          email={localStorageService.get('email')}
          setMenuOpen={() => setMenuOpen((open) => !open)}
          signOut={signout}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="flex-grow p-6 overflow-y-auto flex flex-col space-y-8">
          {isCreatingTask ? (
            <div ref={taskCreateFormRef}>
              <CreateTask
                taskListId={activeTaskListId}
                onClose={() => setIsCreatingTask(false)}
              />
            </div>
          ) : activeTaskListId ? (
            <button
              className={`max-w-xs bg-indigo-600 text-white py-1.5 rounded hover:bg-indigo-700 transition`}
              onClick={() => setIsCreatingTask(true)}
            >
              Ajouter une nouvelle tâche
            </button>
          ) : (
            <></>
          )}
          {isLoadingTasks ? (
            <LoadingList />
          ) : filteredTasks.length ? (
            <section className="overflow-y-auto flex flex-col space-y-8 max-w-xxl border border-gray-300 rounded p-4 shadow-sm">
              <div className="flex-grow overflow-y-auto divide-y divide-indigo-200">
                {filteredTasks.map((task) => (
                  <TaskItemList
                    key={task.id}
                    task={task}
                    isActive={activeTaskId === task.id}
                    onSelect={() => handleSideBarDetails(task.id)}
                  />
                ))}
              </div>
            </section>
          ) : searchTerm ? (
            <p>Aucune tâche trouvée pour "{searchTerm}"</p> // Add this for empty search result
          ) : activeTaskListId ? (
            <p>Vous n'avez aucune tâche dans cette liste...</p>
          ) : (
            <p>
              Veuillez sélectionner une liste pour afficher les tâches qu'elle
              contient
            </p>
          )}
        </div>
      </main>

      {showSideBarTask && (
        <TaskDetailsSidebar
          ref={taskDetailsSidebarRef}
          closeModal={() => setShowSideBarTask(null)}
          selectedTask={tasks.find((task) => task.id === activeTaskId)}
          handleDeleteTask={() => toggleModalDeleteTask(activeTaskId)}
        />
      )}

      <Modal
        isOpen={isOpen}
        title={options?.title ?? ''}
        message={options?.message ?? ''}
        onCancel={closeModal}
        onConfirm={() => {
          void confirm();
        }}
      />
    </div>
  );
}
