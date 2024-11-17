How to programmatically REQUEST data:

Implement a GET request with the correct endpoint,
in this case /quote. You then need to read and parse the
response accordingly and handle the data as you wish. In this
case use the data to get a random song.

Example Call:
func fetchQuoteFromMainProgram() (*Quote, error) {
	url := "http:localhost:8080/quote"  Replace with the main program's URL
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	avoid copying entire struct
	var quote Quote
	return &quote, nil
}

How to programmatically RECEIVE data:

Define and start a REST API endpoint to recieve data coming in.
Make sure you use the correct endpoint.

Example Call:
http.HandleFunc("/song", SongHandler)

	fmt.Println("Starting the microservice on :8081")
	log.Fatal(http.ListenAndServe(":8081", nil))


UML sequence diagram:

<img width="724" alt="Screenshot 2024-11-17 at 3 45 32 PM" src="https://github.com/user-attachments/assets/42c2a6cb-6f49-4f13-bc5f-73d936ae2997">


Communication Contract:
1. We will use Discord.
2. My normal response time would be 24 hours, even in emergencies (I am pretty flexible in my time).
3. I agree that backup plan for microservices will start when there are 3 days left for the assignment to be due and there has been no response.
4. I will let the team know within the 24 hours of the initial post if I cannot give a proper response and estimated time of when I can give a proper response.
5. If the agreed communication type is offline or is not working, we will fall back to Canvas.
6. I will also send an email if there has been no response.
