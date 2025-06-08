package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

// Message struct for our API response
type Message struct {
	Text string `json:"text"`
}

func main() {
	// API endpoint
	http.HandleFunc("/api/hello", helloHandler)

	// Serve static files for the React frontend
	// In development, Vite serves the frontend, so this part is for production builds.
	// We'll explain how to handle development vs. production later.
	staticFilesDir := "./../frontend/dist" // Path to your React build output
	if _, err := os.Stat(staticFilesDir); !os.IsNotExist(err) {
		// Serve the index.html for all non-API routes to enable client-side routing
		http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
			// Prevent API calls from being served as static files
			if strings.HasPrefix(r.URL.Path, "/api/") {
				http.NotFound(w, r)
				return
			}

			// Serve static files like JS, CSS, images directly
			staticHandler := http.FileServer(http.Dir(staticFilesDir))
			if _, err := os.Stat(filepath.Join(staticFilesDir, r.URL.Path)); !os.IsNotExist(err) {
				staticHandler.ServeHTTP(w, r)
				return
			}

			// For all other routes (which are likely handled by React Router), serve index.html
			http.ServeFile(w, r, filepath.Join(staticFilesDir, "index.html"))
		})
	} else {
		fmt.Println("Frontend 'dist' directory not found. Assuming development mode (Vite will serve frontend).")
		fmt.Println("To serve production build, run 'npm run build' in frontend directory first.")
	}

	// Start the server
	port := ":8080"
	fmt.Printf("Go server listening on port %s\n", port)
	log.Fatal(http.ListenAndServe(port, nil))
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	// Set CORS headers (important for development when frontend and backend are on different ports)
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173") // Allow requests from Vite dev server
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Handle preflight OPTIONS request
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	message := Message{Text: "Hello from Go Backend!"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(message)
}
