import { useTasks } from "../contexts/TaskContext";
import { useEffect } from "react";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks, fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="space-y-4">
      <div className="mt-4">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskItem key={task._id} task={task} />)
        ) : (
          <div className="text-center p-8">
            <p className="text-muted-foreground">No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
