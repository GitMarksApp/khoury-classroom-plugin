package config

import "github.com/caarlos0/env/v11"

type Config struct {
	Database     `envPrefix:"DATABASE_"`
	AuthHandler  `envPrefix:"AUTH_"`
	GitHubApp    `envPrefix:"GITHUB_APP_"`
	GitHubClient `envPrefix:"GITHUB_CLIENT_"`
}

func LoadConfig() (Config, error) {
	return env.ParseAs[Config]()
}
