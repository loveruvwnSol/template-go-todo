import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

type Todo = {
  id: number;
  title: string;
  text: string;
};

export const Home = () => {
  const [todo, setTodo] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      const r = await fetch("http://localhost:8080/todo");
      const data = await r.json();
      setTodo(data);
    })();
  }, []);

  return (
    <Box>
      <Text fontWeight={"bold"}>{JSON.stringify(todo)}</Text>
    </Box>
  );
};
