package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	temp_URL, missing:= os.LookupEnv("TEST_ENV")
	a, b := os.LookupEnv("A1")
	newStr := strings.Split(a, "")
	fmt.Println("Hello, 世界")
	fmt.Printf("%s exists: %t\n", temp_URL, missing)
	fmt.Printf("%s A1 env exists: %t\n", a, b)
	for i := range strings.Split(a, ""){
		fmt.Printf("I acknolwedge there is a value here %d\n", i)
	}
	fmt.Println(newStr)
}