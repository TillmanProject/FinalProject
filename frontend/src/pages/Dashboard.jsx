import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-10 border-b">
        <div className="container max-w-4xl mx-auto p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-taskblue-500 to-taskpurple-500 bg-clip-text text-transparent">
            Task Manager
          </h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 rounded-full p-0"
              >
                <User size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                {user?.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main content */}
      <main className="container max-w-4xl mx-auto pt-24 pb-16 px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            {greeting}, {user?.name.split(" ")[0]}
          </h2>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your tasks
          </p>
        </div>

        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
};

export default Dashboard;
