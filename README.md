# Getting Started With Line SUSI AI Bot:

[![Build Status](https://travis-ci.org/fossasia/susi_linebot.svg?branch=master)](https://travis-ci.org/fossasia/susi_linebot)  

If you want to add SUSI Line bot as a friend Scan this QR Code and if you want to integrate follow steps given below 

 <img src="/docs/images/Barcode.PNG" width="370">  

To integrate SUSI&#39;s API with Line bot and you will need to have a line account first so that you can follow below procedure. You can download it from [LINE APP](https://play.google.com/store/apps/details?id=jp.naver.line.android&amp;hl=en).

## Pre-requisites:

   - Line app
   - Github
   - Heroku


## Steps:

1. Login/Sign up
2. Create a LINE@ account with enabled Messaging API on [Line Business Center](https://business.line.me/en/)
3. Configure your bot
4. Develop your bot
5. Deploy your bot

## 1- Login/Sign up:

If you have Line account then move to next step else sign up for an account and make
 one. <img src="/docs/images/Sign_up.PNG" width="250">
 
## 2- Create a LINE@ account with enabled Messaging API:

- In the [Line Business Center](https://business.line.me/en/), select Messaging API under the [Service](https://business.line.me/en/services/bot/) category at the top of the page.
- Select either Start using Messaging API.
- Enter the required information for your new LINE@ account. Confirm the information.
- Click the LINE@ MANAGER button at the bottom of the confirmation page.
- Go to the settings and then  Bot Settings page of the LINE@ Manager then click Enable API.

![LINE_LOGIN](/docs/images/Line_Business_Center_Login.PNG)

## 3- Configure your bot:

- In the LINE@ Manager, go to the Bot Settings, which can be found under &quot;Settings&quot; on the side menu.
- To reply to messages using webhooks, select Allow for &quot;Use webhooks&quot; under &quot;Request Settings&quot;
- To participate in group chats, select Allow for the &quot;Allow bots to join group chats&quot; option.
- To send a customized response message to user messages, select Allow for the &quot;Auto Reply Message&quot; option.
- To send a customized greeting message when users add your account as a friend, select Allow for the &quot;Greeting Message&quot; option

![BOT_SETTINGS](/docs/images/Bot_Settings.PNG)

Go to Accounts option at top of page and open LINE Developers from there

- To issue a Channel access token for accessing APIs, click ISSUE for the &quot;Channel access token&quot; item.
- Click EDIT and set a webhook URL for your Channel.

![CHANNEL_CONSOLE](/docs/images/Channel_Console.PNG)
After following these steps your account is ready and you are good to go to develop your bot.

## 4- Develop your bot:

You can develop your own bot or you can fork this repository and deploy it to heroku.

## 5- Deploy your bot:

To deploy your bot to heroku you need an account on [Heroku](https://www.heroku.com/) and after making an account make an app

![NEW_APP](/docs/images/Heroku_new_app.PNG)
- Deploy app using github deployment method.

![HEROKU_DEPLOY](/docs/images/Heroku_deploy.PNG)

- Select Automatic deploys.

![AUTOMATIC_DEPLOY](/docs/images/Automatic_deploys.PNG)

After making app copy this link and paste it in webhook url in Line channel console page from where we got channel access token.

                https:{your_heroku_app_name}.herokuapp.com/webhook

![WEBHOOK_URL](/docs/images/WebHook_Url.PNG)

## SUSI AI BOT:

<img src="/docs/images/SUSI_Chat.PNG" width="250">