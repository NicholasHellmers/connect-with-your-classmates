package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

type User struct {
	ID            int    `json:"id"`
	Name          string `json:"name"`
	Created_at    string `json:"created_at"`
	Sortable_name string `json:"sortable_name"`
	Short_name    string `json:"short_name"`
}

type Course struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

// Asynchronous function to fetch the Canvas API and return the data
func FetchStudentCourses(url string) ([]Course, error) {
	// Fetch the Canvas API with the token
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	// Set the headers
	req.Header.Set("Content-Type", "application/json")

	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	// Close the response body
	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	// Unmarshal the JSON data
	var courses []Course = make([]Course, 0)
	err = json.Unmarshal(body, &courses)
	if err != nil {
		return nil, err
	}

	// Return the data
	return courses, nil
}

func FetchStudentsFromCourse(course_id string, user_token string) ([]User, error) {
	// Fetch the Canvas API with the token
	req, err := http.NewRequest("GET", "https://canvas.instructure.com/api/v1/courses/"+course_id+"/users?access_token="+user_token, nil)

	if err != nil {
		return nil, err
	}

	// Set the headers
	req.Header.Set("Content-Type", "application/json")

	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	// Close the response body
	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return nil, err
	}

	println(string(body))

	// Unmarshal the JSON data
	var users []User = make([]User, 0)
	err = json.Unmarshal(body, &users)

	if err != nil {
		return nil, err
	}

	return users, nil
}

func main() {
	// Load
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Get the Canvas API token from the environment
	CLASSES_URL := "https://canvas.instructure.com/api/v1/courses?access_token=" + os.Getenv("CANVAS_TOKEN")

	// Print the token
	fmt.Println("Canvas Token: " + os.Getenv("CANVAS_TOKEN"))

	// Fetch the Canvas API with the token
	data, err := FetchStudentCourses(CLASSES_URL)

	if err != nil {
		log.Fatal(err)
	}

	// Print the data
	for _, course := range data {
		fmt.Println(course.ID)
		fmt.Println(course.Name)
	}

	for _, course := range data {
		// Fetch the Canvas API with the token
		students, err := FetchStudentsFromCourse(fmt.Sprint(course.ID), os.Getenv("CANVAS_TOKEN"))

		if err != nil {
			log.Fatal(err)
		}

		// Print the data
		for _, student := range students {
			fmt.Println(student.ID)
			fmt.Println(student.Name)
		}
	}
}
