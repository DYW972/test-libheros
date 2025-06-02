import { useState } from 'react';
import Modal from './Modal';
import { TasksList, Body, Props } from '../../../types/TasksListSidebar';

export default function TasksListSidebar({
  userId,
  tasksLists,
  setTasksLists,
  selectedListId,
  setSelectedListId,
  confirmDeleteList,
  setConfirmDeleteList,
}: Props) {
  const [newListName, setNewListName] = useState('');
  const [creatingList, setCreatingList] = useState(false);
  const [tasksListNameAlreadyUsed, setTasksListNameAlreadyUsed] =
    useState<boolean>(false);
  const [tasksListIdToDelete, setTasksListIdToDelete] = useState<string | null>(
    null,
  );

  const body: Body = {
    title: newListName,
    user: userId,
  };

  const shadowTasksLists = [...tasksLists];

  async function handleCreateTasksList() {
    const response = await fetch('http://localhost:3000/tasks-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    const tasksList = (await response.json()) as TasksList;
    shadowTasksLists.push(tasksList);
    if (response.ok) {
      setTasksLists(shadowTasksLists);
      setNewListName('');
      setCreatingList(false);
    }
  }

  async function handleDeleteTasksList(listId) {
    const deleteResponse = await fetch(
      `http://localhost:3000/tasks-list/${listId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );

    if (deleteResponse.ok) {
      setConfirmDeleteList(null);
      const updatedTasksLists = shadowTasksLists.filter((e) => e.id !== listId);
      setTasksLists(updatedTasksLists);
    }
  }

  function HandleTasksListName(value: string) {
    setNewListName(value);
    setTasksListNameAlreadyUsed(
      tasksLists.some((element) => element.title === value),
    );
  }

  function handleShowModalConfirmDelete(listId: string) {
    setConfirmDeleteList(true);
    setTasksListIdToDelete(listId);
  }

  return (
    <aside className="w-72 bg-gray-50 border-r border-gray-300 flex flex-col p-4">
      <div className="mb-4">
        {creatingList ? (
          <>
            <input
              value={newListName}
              onChange={(e) => HandleTasksListName(e.target.value)}
              className={`w-full border rounded px-3 py-1.5 mb-2 focus:outline-none focus:ring-2 ${tasksListNameAlreadyUsed ? 'focus:ring-red-500 border-red-500' : 'focus:ring-indigo-400 border-indigo-500'}`}
              placeholder="Nom de la liste"
              maxLength={50}
              autoFocus
            />
            {tasksListNameAlreadyUsed && (
              <p className="text-red-500 text-xs italic pb-3">
                Ce nom existe déjà
              </p>
            )}
            <button
              className={`w-full bg-indigo-600 text-white py-1.5 rounded hover:bg-indigo-700 transition ${
                tasksListNameAlreadyUsed ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => {
                void handleCreateTasksList();
              }}
              disabled={tasksListNameAlreadyUsed}
            >
              Ajouter
            </button>
          </>
        ) : (
          <button
            className="w-full bg-indigo-600 text-white py-1.5 rounded hover:bg-indigo-700 transition"
            onClick={() => setCreatingList(true)}
          >
            Ajouter une nouvelle liste
          </button>
        )}
      </div>

      <div className="flex-grow overflow-y-auto">
        {tasksLists.map((list) => (
          <div
            key={list.id}
            className={`flex items-center justify-between p-2 rounded ${
              selectedListId === list.id
                ? 'bg-indigo-200'
                : 'hover:bg-indigo-100 cursor-pointer'
            }`}
          >
            <h3
              className="flex-1 text-left text-lg font-medium text-gray-900 cursor-pointer"
              onClick={() => setSelectedListId(list.id)}
            >
              {list.title}
            </h3>

            <button
              className="ml-4 p-1 rounded hover:bg-red-100 text-red-600"
              onClick={() => {
                handleShowModalConfirmDelete(list.id);
              }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {confirmDeleteList && (
        <Modal
          title={`Supprimer la liste ${tasksLists.find((element) => element.id === tasksListIdToDelete)?.title ?? ''} ?`}
          message="Toutes les tâches associées seront également supprimées!"
          onCancel={() => setConfirmDeleteList(null)}
          onConfirm={() => {
            void handleDeleteTasksList(tasksListIdToDelete);
          }}
        />
      )}
    </aside>
  );
}
