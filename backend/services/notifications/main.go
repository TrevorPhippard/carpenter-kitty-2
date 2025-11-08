package main

import (
    "context"
    "encoding/json"
    "log"
    "os"
    "time"

    "github.com/segmentio/kafka-go"
)

type FriendEvent struct {
    Type string `json:"type"`
    From string `json:"from"`
    To   string `json:"to"`
}

func main() {
    broker := os.Getenv("KAFKA_BROKER")
    if broker == "" {
        broker = "localhost:9092"
    }
    topic := os.Getenv("KAFKA_TOPIC")
    if topic == "" {
        topic = "friend-events"
    }

    reader := kafka.NewReader(kafka.ReaderConfig{
        Brokers:  []string{broker},
        Topic:    topic,
        GroupID:  "notification-service",
        MinBytes: 10e3,
        MaxBytes: 10e6,
    })

    log.Printf("📡 Notification service listening on Kafka topic: %s", topic)

    for {
        msg, err := reader.ReadMessage(context.Background())
        if err != nil {
            log.Printf("Kafka read error: %v", err)
            time.Sleep(2 * time.Second)
            continue
        }

        var event FriendEvent
        if err := json.Unmarshal(msg.Value, &event); err != nil {
            log.Printf("Invalid message: %v", err)
            continue
        }

        switch event.Type {
        case "friend_request":
            log.Printf("📩 [Kafka Consumer] New friend request from %s to %s", event.From, event.To)
        case "friend_accept":
            log.Printf("✅ [Kafka Consumer] Friend request accepted between %s and %s", event.From, event.To)
        default:
            log.Printf("ℹ️ Unknown event type: %s", event.Type)
        }
    }
}
