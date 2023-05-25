package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type todo struct {
	ID    float64 `json:"id"`
	Title string  `json:"title"`
	Text  string  `json:"text"`
}

var todos = []todo{
	{ID: 1, Title: "first todo", Text: "first todo"},
}

func main() {
	router := gin.Default()
	router.GET("/todo", getTodo)

	router.Run("localhost:8080")
	fmt.Println("Starting server at port 8080")
	fmt.Println("hello world")
}

func getTodo(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

	c.IndentedJSON(http.StatusOK, todos)
}
