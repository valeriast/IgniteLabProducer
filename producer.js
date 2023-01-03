import { Kafka } from 'kafkajs'
import { randomUUID } from 'node:crypto'

async function bootstrap(){
    const kafka = new Kafka({
        clientId: 'notifications',
        brokers: ['mighty-quetzal-8328-us1-kafka.upstash.io:9092'],
        sasl: {
            mechanism: 'scram-sha-256',
            username: 'bWlnaHR5LXF1ZXR6YWwtODMyOCTUcz_3R4wjVEodWIJMKxNdP36Egcyt2GKY7nI',
            password: '200176ba93ad413da2594e3faefaef46',
        },
        ssl: true,
    })

    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
        topic: 'notifications.send-notification',
        messages: [
            {
                value: JSON.stringify({
                    content: 'Nova solicitacao',
                    category: 'Social',
                    recipientId: randomUUID(),
                })
            }
        ]
    })

    await producer.disconnect()
}

bootstrap()

