const { Worker, Queue } = require("bullmq");
const { supabase } = require("../config/supabase");
const { callAI } = require("../services/ai");

const messageQueue = new Queue("messageProcessing", {
  connection: {
    host: process.env.QUEUE_REDIS_URL.split("://")[1].split(":")[0],
    port: parseInt(process.env.QUEUE_REDIS_URL.split(":")[2]),
  },
});

const processMessage = async (channel, payload) => {
  console.log(`Processing message from ${channel}:`, payload);
  await messageQueue.add("process", { channel, payload });
};

const setupQueueProcessor = () => {
  const worker = new Worker(
    "messageProcessing",
    async (job) => {
      const { channel, payload } = job.data;
      console.log(`Worker processing job ${job.id} from ${channel}`);

      // Extract message text and sender
      let messageText;
      let from;
      if (channel === "whatsapp") {
        messageText = payload.entry[0].changes[0].value.messages[0].text.body;
        from = payload.entry[0].changes[0].value.messages[0].from;
      } else if (channel === "telegram") {
        messageText = payload.message.text;
        from = payload.message.from.id;
      }

      // Save message to DB
      await supabase.from("messages").insert({
        user_id: from, // This needs to be linked to an actual user in the DB
        channel,
        incoming: true,
        payload,
        ai_intent: "", // Will be updated after AI processing
        ai_entities: {}, // Will be updated after AI processing
      });

      // Call AI for intent and entity extraction
      const aiResponse = await callAI(messageText);
      console.log("AI Response:", aiResponse);

      // Update message with AI results
      await supabase
        .from("messages")
        .update({
          ai_intent: aiResponse.intent,
          ai_entities: aiResponse.entities,
        })
        .eq("user_id", from) // This needs to be more specific, e.g., message_id
        .order("created_at", { ascending: false })
        .limit(1);

      // TODO: Implement business logic based on AI intent
      // For example, if intent is 'place_order', call createOrder tool
    },
    {
      connection: {
        host: process.env.QUEUE_REDIS_URL.split("://")[1].split(":")[0],
        port: parseInt(process.env.QUEUE_REDIS_URL.split(":")[2]),
      },
    }
  );

  worker.on("completed", (job) => {
    console.log(`Job ${job.id} has completed!`);
  });

  worker.on("failed", (job, err) => {
    console.log(`Job ${job.id} has failed with ${err.message}`);
  });
};

module.exports = { processMessage, setupQueueProcessor };


