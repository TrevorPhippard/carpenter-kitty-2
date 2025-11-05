package handlers

import (
	"encoding/json"
	"net/http"
	"time"
)

// HealthHandler provides liveness and readiness endpoints.
type HealthHandler struct {
	DBCheck        func() error // Optional DB health check function
	CacheCheck     func() error // Optional cache or external service check
	ServiceName    string
	ServiceVersion string
	StartTime      time.Time
}

// NewHealthHandler creates a new HealthHandler.
func NewHealthHandler(serviceName, serviceVersion string, dbCheck, cacheCheck func() error) *HealthHandler {
	return &HealthHandler{
		DBCheck:        dbCheck,
		CacheCheck:     cacheCheck,
		ServiceName:    serviceName,
		ServiceVersion: serviceVersion,
		StartTime:      time.Now(),
	}
}

// LivenessCheck is a simple “am I alive?” endpoint.
func (h *HealthHandler) LivenessCheck(w http.ResponseWriter, r *http.Request) {
	response := map[string]interface{}{
		"status":  "ok",
		"service": h.ServiceName,
		"version": h.ServiceVersion,
		"uptime":  time.Since(h.StartTime).String(),
	}
	writeJSON(w, http.StatusOK, response)
}

// ReadinessCheck verifies dependencies (DB, cache, etc.).
func (h *HealthHandler) ReadinessCheck(w http.ResponseWriter, r *http.Request) {
	dependencies := map[string]string{}

	if h.DBCheck != nil {
		if err := h.DBCheck(); err != nil {
			dependencies["database"] = "unhealthy"
		} else {
			dependencies["database"] = "healthy"
		}
	}

	if h.CacheCheck != nil {
		if err := h.CacheCheck(); err != nil {
			dependencies["cache"] = "unhealthy"
		} else {
			dependencies["cache"] = "healthy"
		}
	}

	allHealthy := true
	for _, status := range dependencies {
		if status != "healthy" {
			allHealthy = false
			break
		}
	}

	code := http.StatusOK
	if !allHealthy {
		code = http.StatusServiceUnavailable
	}

	response := map[string]interface{}{
		"status":       ifThenElse(allHealthy, "ok", "degraded"),
		"service":      h.ServiceName,
		"version":      h.ServiceVersion,
		"dependencies": dependencies,
		"timestamp":    time.Now(),
	}

	writeJSON(w, code, response)
}

// Utility helpers
func writeJSON(w http.ResponseWriter, status int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(payload)
}

func ifThenElse(cond bool, a, b string) string {
	if cond {
		return a
	}
	return b
}
