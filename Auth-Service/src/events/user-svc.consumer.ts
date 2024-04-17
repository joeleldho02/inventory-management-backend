import { addUserController } from "../config/dependencies.inversify";
import { kafka } from "../config/kafka"

const consumer = kafka.consumer({
    groupId:"auth-service"
});

export const userSvcConsumer = async ()=>{
    try {        
        await consumer.connect()
        console.log('Kafka Connected!');        
        await consumer.subscribe({topic:"authTopic",fromBeginning:true})
        await consumer.run({
            eachMessage:async({message})=>{
                console.log('authTopic');
                const binarydata:any = message?.value;
                const jsonString:string = binarydata?.toString();
                const jsonData = JSON.parse(jsonString);
                const messageType = jsonData?.type;                

                if(messageType == 'addUser'){
                    console.log('consumer data -->', jsonData);                    
                    await addUserController.addUser(jsonData?.data?.userData, jsonData?.data?.password);
                }
            }
        })        
    } catch (err) {
        console.log('Error in user-svc-consumer',err);        
    }
}