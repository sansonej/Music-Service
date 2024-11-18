package main

import (
	"fmt"
	"github.com/jaswdr/faker"
	"log"
	"randomSong/generateSong"
)

func main() {
	// Register the /song endpoint
	//http.HandleFunc("/song", songHandler)
	//
	//// TEST: Start the microservice
	//fmt.Println("Starting the microservice on :8081")
	//log.Fatal(http.ListenAndServe(":8081", nil))

	//// TEST: demonstrate microservice
	quote, err := generateSong.FetchQuoteFromFile("testQuotes")
	if err != nil {
		log.Fatalf("Error fetching quote: %v", err)
	}

	// Extract a keyword
	keyword := generateSong.ExtractKeyword(quote.Value)

	// Generate a random song using Faker
	fake := faker.New()
	randomSong := fmt.Sprintf("%s - %s", keyword, fake.Music().Name())

	// Print the result
	fmt.Printf("Quote: %s\n", quote.Value)
	fmt.Printf("Generated Song: %s\n", randomSong)
}
