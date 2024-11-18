package generateSong

import (
	"bufio"
	"encoding/json"
	"fmt"
	"github.com/jaswdr/faker"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strings"
	"time"
)

// Quote represents the structure of the JSON response from /quote
type Quote struct {
	Value string `json:"value"`
}

// Handler for the /song endpoint
func SongHandler(w http.ResponseWriter, r *http.Request) {
	//Call the main program's /quote path
	//quote, err := fetchQuoteFromMainProgram()

	//TEST
	quote, err := FetchQuoteFromFile("testQuotes.txt")

	if err != nil {
		http.Error(w, "Failed to fetch quote", http.StatusInternalServerError)
		log.Println("Error fetching quote:", err)
		return
	}

	//Extract a keyword from the quote
	keyword := ExtractKeyword(quote.Value)

	//Generate a random song using the Faker library
	fake := faker.New()
	randomSong := fmt.Sprintf("%s - %s", keyword, fake.Music().Name())

	//Return the song as JSON
	response := map[string]string{"song": randomSong}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// TEST TO SHOW HOW IT WOULD WORK FROM FILE!
func FetchQuoteFromFile(filename string) (*Quote, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var quotes []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		quotes = append(quotes, scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}

	if len(quotes) == 0 {
		return nil, fmt.Errorf("no quotes found in file")
	}

	// Pick a random quote
	rand.Seed(time.Now().UnixNano())
	randomQuote := quotes[rand.Intn(len(quotes))]

	return &Quote{Value: randomQuote}, nil
}

// Fetches a quote from the main program's /quote path
//func fetchQuoteFromMainProgram() (*Quote, error) {
//	url := "http://localhost:8080/quote" // Replace with the main program's URL
//	resp, err := http.Get(url)
//	if err != nil {
//		return nil, err
//	}
//	defer resp.Body.Close()
//
//	//avoid copying entire struct
//	var quote Quote
//	return &quote, nil
//}

// Extracts keyword from quote
func ExtractKeyword(quote string) string {
	words := strings.Fields(quote)
	if len(words) > 0 {
		return words[6] // Use the fifth word of quote, assuming every quote has 2 or more words
	}
	return "Unknown"
}
