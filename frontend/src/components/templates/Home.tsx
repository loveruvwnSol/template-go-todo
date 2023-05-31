import { useState, useEffect } from "react";
import { Box, Input, Button } from "@chakra-ui/react";
import { TableContents } from "../organisms/TableContents";

export type Todo = {
  id: string;
  title: string;
};

export const Home = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [id, setId] = useState<string>();
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    const r = await fetch("http://localhost:8080/todo");
    const data = await r.json();
    setTodo(data);
    console.log(todo);
    if (data.length) {
        setId((Number(data[data.length - 1].id) + 1).toString());
        return;
    }
    setId((1).toString());
    
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    if (title.match(/\S/g)) {
      setTitle(title);
      event.preventDefault();
      const data = { id, title };

      const r = await fetch("http://localhost:8080/todo", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setTitle("");
      await fetchTodo();
    } else {
      alert("please input todo text");
    }
  };

  return (
    <Box mt={32}>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Input
          type="text"
          w={"2xl"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button ml={2} onClick={handleSubmit}>
          Add
        </Button>
      </Box>

      <TableContents todo={todo} fetchTodo={fetchTodo} />
    </Box>
  );
};
