package config

import (
	"fmt"
	"time"

	"gorm.io/gorm"
)

func WaitForDatabase(db *gorm.DB, retries int, delay time.Duration) {
	for i := 0; i < retries; i++ {
		sqlDB, err := db.DB()
		if err == nil {
			if err = sqlDB.Ping(); err == nil {
				fmt.Println("Database is ready")
				return
			}
		}
		fmt.Println("Waiting for database...")
		time.Sleep(delay)
	}
	panic("Database not ready after retries")
}
