package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type todo struct {
	ID    float64 `json:"id"`
	Title string  `json:"title"`
}

var todos = []todo{
	{ID: 1, Title: "first todo"},
}

func main() {
	router := gin.Default()
	router.GET("/todo", getTodo)
	router.POST("/todo", postTodo)

	router.Run("localhost:8080")
	fmt.Println("Starting server at port 8080")
}

func getTodo(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

	c.IndentedJSON(http.StatusOK, todos)
}

func postTodo(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

	var newTodoItem todo

	if err := c.BindJSON(&newTodoItem); err != nil {
		return
	}

	todos = append(todos, newTodoItem)
	c.IndentedJSON(http.StatusCreated, newTodoItem)
}
