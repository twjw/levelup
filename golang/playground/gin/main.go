package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

const cookieKey = "c"

func validateCookie(excludeMap map[string]bool) gin.HandlerFunc {
	return func(c *gin.Context) {
		var _, err = c.Cookie(cookieKey)

		if _, ok := excludeMap[c.Request.URL.Path]; ok {
			c.Next()
			return
		}

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": fmt.Sprintf("err %s", c.Request.URL.Path)})
			c.Abort()
			return
		}
	}
}

func main() {
	r := gin.Default()
	r.Use(validateCookie(map[string]bool{"/login": true}))
	r.GET("/home", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"data": "home"})
	})
	r.GET("/login", func(c *gin.Context) {
		c.SetCookie(cookieKey, "cookie", 60, "/", "localhost", false, true)
		c.String(http.StatusOK, "Login Successful")
	})
	r.Run(":8000")
}

func shopIndexHandler(c *gin.Context) {
	time.Sleep(5 * time.Second)
}

func shopHomeHandler(c *gin.Context) {
	time.Sleep(3 * time.Second)
}
