# [Preview] Sample Chat App with AOAI

This repo contains sample code for a simple chat webapp that integrates with Azure OpenAI. Note: some portions of the app use preview APIs.

## Prerequisites
- An existing Azure OpenAI resource and model deployment of a chat model (e.g. `gpt-35-turbo`, `gpt-4`)
- To use Azure OpenAI on your data: an existing Azure Cognitive Search resource and index.

### Deploy from your local machine

#### Local Setup: Basic Chat Experience
1. Copy .env.sample to .env
    
    These variables are required:
    - `AZURE_OPENAI_KEY`
    - `PASSCODE`

2. Start the app with `start.cmd`. This will build the frontend, install backend dependencies, and then start the app.

3. You can see the local running app at http://127.0.0.1:5000.

## Deploy the app
You should have an app services which is configured to pull and has authentication configured
az acr login -n roozcontainerregistry
docker build . --file WebApp.Dockerfile --tag roozcontainerregistry.azurecr.io/gptquest:latest
docker push roozcontainerregistry.azurecr.io/gptquest:latest

### Add an identity provider
After deployment, you will need to add an identity provider to provide authentication support in your app. See [this tutorial](https://learn.microsoft.com/en-us/azure/app-service/scenario-secure-app-authentication-app-service) for more information.

If you don't add an identity provider, the chat functionality of your app will be blocked to prevent unauthorized access to your resources and data. To remove this restriction, or add further access controls, update the logic in `getUserInfoList` in `frontend/src/pages/chat/Chat.tsx`. For example, disable the authorization check like so:
```
const getUserInfoList = async () => {
        setShowAuthMessage(false);
}
```

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.

ROEE

Default LLM: copilotdev - Rome-MDC-Copilot-Dev
https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/resource/subscriptions/29db5731-b1aa-4893-b02f-88848593d486/resourceGroups/Backend/providers/Microsoft.CognitiveServices/accounts/copilotdev/

LLM2: eliLLM - ASC DEMO - 212f9889-769e-45ae-ab43-6da33674bd26
https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/resource/subscriptions/212f9889-769e-45ae-ab43-6da33674bd26/resourceGroups/eliLLM/providers/Microsoft.CognitiveServices/accounts/eliLLM/overview
eliLLM - ASC DEMO - 212f9889-769e-45ae-ab43-6da33674bd26


LLM3: slavaopenai1: Rome-Protectors-AI-Playground
https://oai.azure.com/portal/aa44da6b8d464331aa410b2efba86ba2/deployment?tenantid=72f988bf-86f1-41af-91ab-2d7cd011db47