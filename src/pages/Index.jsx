import { useState } from "react";
import { Container, VStack, Input, Button, List, ListItem, ListIcon, IconButton, Checkbox } from "@chakra-ui/react";
import { FaTrash, FaEdit, FaCheckCircle } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
      setInput("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)));
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} w="100%">
        <Input placeholder="Add a new task..." value={input} onChange={handleInputChange} onKeyPress={handleKeyPress} />
        <Button colorScheme="blue" onClick={handleAddTask} isDisabled={!input.trim()}>
          Add Task
        </Button>
        <List spacing={3} w="100%">
          {tasks.map((task) => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
              <Checkbox isChecked={task.isCompleted} onChange={() => handleToggleComplete(task.id)} colorScheme="green">
                {task.text}
              </Checkbox>
              <IconButton aria-label="Delete task" icon={<FaTrash />} colorScheme="red" onClick={() => handleDeleteTask(task.id)} />
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
