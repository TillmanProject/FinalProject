import { useState } from "react";
import { useTasks } from "../contexts/TaskContext";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Plus } from "lucide-react";

const categories = ["Work", "Personal", "Health", "Finance", "Other"];

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Work");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { addTask } = useTasks();
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim(),
      category,
      completed: false,
      userId: user.id,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setCategory("Work");
    setIsFormOpen(false);
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border p-4 mb-6 transition-all duration-300">
      {!isFormOpen ? (
        <Button
          onClick={() => setIsFormOpen(true)}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-dashed border-2 h-14 hover:border-primary hover:text-primary transition-colors"
        >
          <Plus size={20} />
          <span>Add New Task</span>
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-base font-medium"
              autoFocus
              required
            />
          </div>

          <div>
            <Textarea
              placeholder="Add description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          <div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsFormOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Task</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TaskForm;
