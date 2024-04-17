
import { updateStatusController } from "../config/dependencies.inversify";
import { kafka } from "../config/kafka"

const consumer = kafka.consumer({
    groupId:"user-service"
});

export const authSvcConsumer = async ()=>{
    try {        
        await consumer.connect()
        await consumer.subscribe({topic:"userTopic",fromBeginning:true})
        await consumer.run({
            eachMessage:async({message})=>{
                const binarydata:unknown = message?.value;
                const jsonString = binarydata?.toString() as string;
                const jsonData = JSON.parse(jsonString);
                const messageType = jsonData?.type;

                if(messageType == 'updateStatus'){
                    console.log('consumer data -->', jsonData);                    
                    await updateStatusController.updateStatus(jsonData?.data);
                }
            }
        })        
    } catch (err) {
        console.log('Error in user-svc-consumer',err);        
    }
}