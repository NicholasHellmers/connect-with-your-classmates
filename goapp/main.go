package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

type User struct {
	ID         int    `json:"id"`
	Name       string `json:"name"`
	Short_name string `json:"short_name"`
}

// Asynchronous function to fetch the Canvas API and return the data
func fetchData(url string) string {
	// Fetch the Canvas API with the token
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Fatal("NewRequest: ", err)
		return ""
	}

	client := &http.Client{}

	resp, err := client.Do(req)
	if err != nil {
		log.Fatal("Do: ", err)
		return ""
	}

	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatal("ReadAll: ", err)
		return ""
	}

	return string(body)
}

func main() {
	// Load
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Get the Canvas API token from the environment
	URL := "https://canvas.instructure.com/api/v1/courses?access_token=" + os.Getenv("CANVAS_TOKEN")

	// Print the token
	fmt.Println("Canvas Token: " + os.Getenv("CANVAS_TOKEN"))

	// Fetch the Canvas API with the token
	data := fetchData(URL)

	fmt.Println(data)
}
