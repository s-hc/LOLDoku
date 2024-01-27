package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
)

func check(e error, spot string) {
	if e != nil {
		fmt.Fprintf(os.Stderr,"func failed at %s because %v\n", spot,e)	
		os.Exit(1)
	}
}

func main() {
	dayOne := time.Date(2024, 1, 10, 12, 00, 58, 651387237, time.UTC)
	gameNum := int(time.Since(dayOne).Hours() / 24)
	// get the time of start day (idk Jan. 15?) until current date
	// get info from table
	fmt.Printf("it's been %d days since the 10th\n", gameNum)
	
	temp_URL, ok:= os.LookupEnv("DATABASE_URL")
	if !ok{
		err := godotenv.Load("../../.env")
		check(err, "local env load")
		temp_URL = os.Getenv("DATABASE_URL")[:87]
	}
	conn, err := pgx.Connect(context.Background(), temp_URL)
	check(err, "database connection")
	defer conn.Close(context.Background())

	var row1, row2, row3, col1, col2, col3 string

	err = conn.QueryRow(context.Background(), "SELECT row1, row2, row3, col1, col2, col3 FROM \"Schedule\" ORDER BY id DESC LIMIT 1").Scan(&row1, &row2, &row3, &col1, &col2, &col3)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(1)
	}

	type questionJSON struct {
		Data    [][]string
		Columns []string
		Rows    []string
	}
	newQuest := questionJSON{}
	subrowQuery := `
	SELECT c.name
	FROM "Champion" c
	JOIN "ValidChamp" vc1 ON vc1.answer = c.id
	JOIN "ValidChamp" vc2 ON vc2.answer = c.id
	JOIN "Header" h1 ON vc1.header = h1.id AND h1.headline = $1
	JOIN "Header" h2 ON vc2.header = h2.id AND h2.headline = $2;
	`
	// var ionian string

	newQuest.Columns = []string{col1, col2, col3}
	newQuest.Rows = []string{row1, row2, row3}
	for _, row := range newQuest.Rows {
		for _, col := range newQuest.Columns {
			rows, _ := conn.Query(context.Background(), subrowQuery, col, row)
			answers, err := pgx.CollectRows(rows, pgx.RowTo[string]) 
			if err != nil {
				fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
				os.Exit(1)
			}
			newQuest.Data = append(newQuest.Data, answers)
		}
	}
	fmt.Println(newQuest.Columns)
	fmt.Println(newQuest.Rows)
	fmt.Println(newQuest.Data)
	question, err := json.Marshal(newQuest)
	check(err, "JSON marshalling")

	// os.WriteFile("../client/questions.json", question)
	f, err := os.Create("../client/questions.json")
	check(err, "creating questions.json")
	defer f.Close()
	l, err := f.Write(question)
	fmt.Printf("%d bytes written to file", l)
	check(err, "writing to file")

}
