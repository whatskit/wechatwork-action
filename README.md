# WeChat Work for GitHub Actions

Sending a message to the WeChat group via Enterprise WeChat bot.

## Usage

### Sending a plain text message

```yaml
- name: WeChat Work notification
  uses: whatskit/wechatwork-action@master
  with:
    webhook: ${{secrets.WECHAT_WORK_BOT_WEBHOOK}}
    msgtype: text
    content: "广州今日天气：29 度，大部分多云，降雨概率：60%"
    mentioned_list: '["billgo","@all"]'
    mentioned_mobile_list: '["888888888888","@all"]'
```
