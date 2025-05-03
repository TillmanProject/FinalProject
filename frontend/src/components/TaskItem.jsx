import { useState } from "react";
import { useTasks } from "../contexts/TaskContext";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Edit, Trash2, MoreVertical } from "lucide-react";

const getCategoryColor = (category) => {
  switch (category) {
    case "Work":
      return "bg-taskblue-100 text-taskblue-700 hover:bg-taskblue-200";
    case "Personal":
      return "bg-taskpurple-100 text-taskpurple-700 hover:bg-taskpurple-200";
    case "Health":
      return "bg-green-100 text-green-700 hover:bg-green-200";
    case "Finance":
      return "bg-amber-100 text-amber-700 hover:bg-amber-200";
    default:
      return "bg-gray-100 text-gray-700 hover:bg-gray-200";
  }
};

const TaskItem = ({ task }) => {
  console.log("TaskItem", task);
  const { toggleTaskCompletion, updateTask, deleteTask } = useTasks();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || ""
  );

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateTask(task._id, {
      title: editTitle,
      description: editDescription,
    });
    setIsEditDialogOpen(false);
  };

  return (
    <Card
      className={`mb-3 overflow-hidden transition-all duration-200 ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => toggleTaskCompletion(task._id)}
            id={`task-${task._id}`}
            className="mt-1"
          />

          <div className="flex-grow">
            <label
              htmlFor={`task-${task._id}`}
              className={`block text-base font-medium cursor-pointer ${
                task.completed ? "line-through text-muted-foreground" : ""
              }`}
            >
              {task.title}
            </label>

            {task.description && (
              <p
                className={`mt-1 text-sm text-muted-foreground ${
                  task.completed ? "line-through" : ""
                }`}
              >
                {task.description}
              </p>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Dialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
              >
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription>
                      Make changes to your task here.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleEditSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">
                          Title
                        </label>
                        <Input
                          id="title"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="description"
                          className="text-sm font-medium"
                        >
                          Description
                        </label>
                        <Textarea
                          id="description"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onSelect={() => deleteTask(task._id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-2 border-t flex items-center justify-between bg-muted/40 text-xs text-muted-foreground">
        <Badge
          variant="outline"
          className={`text-xs font-normal ${getCategoryColor(task.category)}`}
        >
          {task.category}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default TaskItem;
