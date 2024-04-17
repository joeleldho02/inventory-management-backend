import { kafka } from "../config/kafka";
import UserEntity from "../libs/entities/user.entity";

const producer = kafka.producer();

export const addUserProducer = async ( userData:UserEntity, password:string, topic: string, type: string ) => {
    try {
        await producer.connect();
        const messagePayload = {
            type: type,
            data: {
                userData,
                password
            },
        };
        const result:unknown = await producer.send({
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
