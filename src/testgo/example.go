package main

import (
	"fmt"
	"os"
)

func main() {
	temp_URL, missing:= os.LookupEnv("TEST_ENV")
	a, b := os.LookupEnv("A1")
	fmt.Println("Hello, 世界")
	fmt.Printf("%s exists: %t\n", temp_URL, missing)
	fmt.Printf("%s A1 env exists: %t\n", a, b)
}