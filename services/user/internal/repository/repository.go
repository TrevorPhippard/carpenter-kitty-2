// internal/repository/user_repo.go
package repository

import (
	"user/internal/config"
	"user/internal/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UserRepo struct {
	db *gorm.DB
}

func NewUserRepo() *UserRepo {
	return &UserRepo{db: config.DB}
}

func (r *UserRepo) GetAll() ([]models.User, error) {
	var users []models.User
	result := r.db.Find(&users)
	return users, result.Error
}

func (r *UserRepo) Create(user *models.User) error {
	return r.db.Create(user).Error
}

func (r *UserRepo) GetByID(id uuid.UUID) (*models.User, error) {
	var user models.User
	result := r.db.First(&user, "id = ?", id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}

func (r *UserRepo) Update(user *models.User) error {
	return r.db.Save(user).Error
}

func (r *UserRepo) Delete(user *models.User) error {
	return r.db.Delete(user).Error
}
