package handlers

import (
	"connections/internal/repository"
	"encoding/json"
	"net/http"
)

var personRepo = &repository.PersonRepository{}

func CreatePersonHandler(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	if name == "" {
		http.Error(w, "Missing 'name' param", http.StatusBadRequest)
		return
	}

	if err := personRepo.CreatePerson(r.Context(), name); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write([]byte("Person created: " + name))
}

func GetPersonsHandler(w http.ResponseWriter, r *http.Request) {
	persons, err := personRepo.GetAllPersons(r.Context())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(persons)
}

func UpdatePersonHandler(w http.ResponseWriter, r *http.Request) {
	oldName := r.URL.Query().Get("old")
	newName := r.URL.Query().Get("new")
	if oldName == "" || newName == "" {
		http.Error(w, "Missing 'old' or 'new' param", http.StatusBadRequest)
		return
	}

	if err := personRepo.UpdatePerson(r.Context(), oldName, newName); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write([]byte("Updated " + oldName + " to " + newName))
}

func DeletePersonHandler(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	if name == "" {
		http.Error(w, "Missing 'name' param", http.StatusBadRequest)
		return
	}

	if err := personRepo.DeletePerson(r.Context(), name); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write([]byte("Deleted: " + name))
}
