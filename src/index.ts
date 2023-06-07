import * as core from "@actions/core";
import axios from "axios";

async function run(): Promise<void> {
  try {
    const webhook: string = process.env.WECHAT_WORK_BOT_WEBHOOK || core.getInput("webhook");
    const msgtype: string = core.getInput("msgtype") || "text";
    const content = core.getInput("content");
    const mentioned_list = core.getInput("mentioned_list");
    const mentioned_mobile_list = core.getInput("mentioned_mobile_list");

    if (webhook === "") {
      console.error("[wechatwork-action] Not set webhook");
      process.exit(0);
    }

    const mentioned_list_obj = mentioned_list?.length > 0 ? { mentioned_list } : {};
    const mentioned_mobile_list_obj = mentioned_mobile_list?.length > 0 ? { mentioned_mobile_list } : {};

    if (msgtype === "text") {
      const payload = {
        msgtype,
        text: {
          content,
          ...mentioned_list_obj,
          ...mentioned_mobile_list_obj,
        },
      };
      console.log("[wechatwork-action] Payload data:", JSON.stringify(payload));
      console.log("[wechatwork-action] Sending text message ...");
      const { data } = await axios.post(webhook, JSON.stringify(payload), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("[wechatwork-action] Response data:", data);
    }

    if (msgtype === "markdown") {
      const payload = {
        msgtype,
        markdown: {
          content,
          ...mentioned_list_obj,
          ...mentioned_mobile_list_obj,
        },
      };

      console.log("[wechatwork-action] Payload data:", JSON.stringify(payload));
      console.log("[wechatwork-action] Sending markdown message ...");
      const { data } = await axios.post(webhook, JSON.stringify(payload), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("[wechatwork-action] Response data:", data);
    }

    console.log("[wechatwork-action] Message sent Success! Shutting down ...");
    process.exit(0);
  } catch (err) {
    console.error("[wechatwork-action] Message sent error:");
    console.error(`err.message: ${err}`);
    process.exit(1);
  }
}

run();
