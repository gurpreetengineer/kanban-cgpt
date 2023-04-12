import React, { useState } from 'react';

const initialColumns = [
  { id: 1, title: 'To Do', tasks: ['Task 1', 'Task 2'] },
  { id: 2, title: 'In Progress', tasks: ['Task 3'] },
  { id: 3, title: 'Done', tasks: ['Task 4', 'Task 5'] },
];

function App() {
  const [columns, setColumns] = useState(initialColumns);

  function handleDragStart(event, taskIndex, columnIndex) {
    event.dataTransfer.setData('taskIndex', taskIndex);
    event.dataTransfer.setData('columnIndex', columnIndex);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event, targetColumnIndex) {
    const sourceTaskIndex = event.dataTransfer.getData('taskIndex');
    const sourceColumnIndex = event.dataTransfer.getData('columnIndex');

    const newColumns = [...columns];

    // Remove task from source column
    const sourceColumn = newColumns[sourceColumnIndex];
    const task = sourceColumn.tasks.splice(sourceTaskIndex, 1)[0];

    // Add task to target column
    const targetColumn = newColumns[targetColumnIndex];
    targetColumn.tasks.push(task);

    setColumns(newColumns);
  }

  return (
    <div className="kanban-board">
      {columns.map((column, columnIndex) => (
        <div
          key={column.id}
          className="kanban-column"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, columnIndex)}
        >
          <h2>{column.title}</h2>
          <ul>
            {column.tasks.map((task, taskIndex) => (
              <li
                key={taskIndex}
                draggable
                onDragStart={(event) => handleDragStart(event, taskIndex, columnIndex)}
              >
                {task}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
