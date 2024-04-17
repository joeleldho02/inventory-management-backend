import { kafka } from "../config/kafka";
import UserEntity from "../libs/entities/user.entity";

const producer = kafka.producer();

export const updateUserStatusProducer = async ( userId: string, isActive:boolean, topic: string, type: string ) => {
    try {
        await producer.connect();
        const messagePayload = {
            type: type,
            data: {
                userId, 
                isActive
            },
        };
        const result: any = await producer.send({
            topic: topic,
            messages: [{ value: JSON.stringify(messagePayload) }],
        });
        console.log('Kafka Result: ', result);  

        if (result && result[0] && result[0]?.error)
            throw new Error("Message sent failed!");
    } catch (error) {
        console.log("ERR: Kafka --> addUserProducer", error);
    } finally {
        await producer.disconnect();
    }
};
