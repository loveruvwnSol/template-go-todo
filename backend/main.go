package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type todo struct {
	ID    string `json:"id"`
	Title string `json:"title"`
}

var todos = []todo{}

func main() {
	router := gin.Default()
	router.POST("/todo/patch/:id", updateTodoTitleByID)
	router.POST("/todo/:id", deleteTodoByID)
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

func updateTodoTitleByID(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

	id := c.Param("id")
	var newTodoTitle todo
	if err := c.BindJSON(&newTodoTitle); err != nil {
		return
	}

	for i, a := range todos {
		if a.ID == id {
			todos[i].Title = newTodoTitle.Title
		}
	}
	c.IndentedJSON(http.StatusOK, gin.H{"message": "updated"})
}

func deleteTodoByID(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

	id := c.Param("id")
	results := []todo{}
	for _, a := range todos {
		if a.ID != id {
			results = append(results, a)
		}
	}
	todos = results
	c.IndentedJSON(http.StatusOK, gin.H{"message": "deleted"})
}
