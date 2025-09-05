import { Stack } from "./stack/Stack";
import { Queue } from "./queue/Queue";
import { Task } from "./Task/Task";

// Cola de tareas
const tasksQueue = new Queue<Task>();
let nextId = 1;

// Pila para tareas eliminadas (historial de undo)
const deletedTasks = new Stack<Task>();

// Funciones
function addTask(title: string): void {
  const task = new Task(nextId++, title);
  tasksQueue.enqueue(task);
  console.log(`Tarea "${title}" agregada con ID ${task.id}.`);
}

function listTasks(): void {
  console.log("=== Lista de Tareas ===");
  for (const task of tasksQueue.getItems()) {
    console.log(
      `ID: ${task.id}, Título: ${task.title}, Estado: ${task.completed ? "Completada" : "Pendiente"}`
    );
  }
}

function completeTask(id: number): void {
  const items = tasksQueue.getItems();
  for (const task of items) {
    if (task.id === id) {
      task.completed = true;
      console.log(`Tarea con ID ${id} marcada como completada.`);
      return;
    }
  }
  console.log(`Tarea con ID ${id} no encontrada.`);
}

function deleteTask(id: number): void {
  const items = tasksQueue.getItems();
  const updated = items.filter((task) => {
    if (task.id === id) {
      deletedTasks.push(task);
      console.log(`Tarea con ID ${id} eliminada.`);
      return false;
    }
    return true;
  });

  tasksQueue.clear();
  updated.forEach((task) => tasksQueue.enqueue(task));
}

function undoDelete(): void {
  if (!deletedTasks.isEmpty()) {
    const restored = deletedTasks.pop();
    if (restored) {
      tasksQueue.enqueue(restored);
      console.log(`Tarea "${restored.title}" restaurada desde historial.`);
    }
  } else {
    console.log("No hay tareas eliminadas para restaurar.");
  }
}

addTask("Hacer la tarea de matemáticas");
addTask("Estudiar TypeScript");
addTask("Ir al supermercado");

listTasks();

completeTask(2);
deleteTask(3);

listTasks();

undoDelete();
listTasks();
