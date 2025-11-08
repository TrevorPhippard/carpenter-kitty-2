package service

import (
	"log"

	"github.com/segmentio/kafka-go"
)

type Producer struct {
	writer *kafka.Writer
}

func NewProducer(broker string) *Producer {
	writer := &kafka.Writer{
		Addr:     kafka.TCP(broker),
		Balancer: &kafka.LeastBytes{},
	}
	return &Producer{writer: writer}
}

func (p *Producer) Publish(topic string, key, value []byte) error {
	msg := kafka.Message{
		Key:   key,
		Value: value,
	}
	if err := p.writer.WriteMessages(nil, msg); err != nil {
		log.Printf("[Kafka] failed to write message: %v", err)
		return err
	}
	return nil
}

func (p *Producer) Close() error {
	return p.writer.Close()
}
