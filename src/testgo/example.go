package main

import (
	"fmt"
	"os"
)

func main() {
	temp_URL:= os.Getenv("TEST_ENV")
	fmt.Println("Hello, 世界")
	fmt.Println(temp_URL)
}