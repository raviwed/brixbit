# frames-client

## Usage

```ts
const brixbitClient = await Client.create(wallet);
const framesClient = new FramesClient(brixbitClient);

const frameUrl = "https://www.myframe.xyz";
const framePostUrl = "https://www.myframe.xyz/api/post"; //fc:frame:post_url

// Read data from a frame
const frameMetadata = await framesClient.proxy.readMetadata(frameUrl);

// Get a proxied image URL, which you can use directly in an <image> tag
const imageUrl = framesClient.proxy.mediaUrl(
  frameMetadata.metaTags["fc:frame:image"],
);

// Handle a click to button 2 from a conversation with topic "/brixbit/0/123" and participant addresses "abc" and "xyz"
const payload = await signFrameAction({
  frameUrl,
  buttonIndex: 2,
  conversationTopic: "/brixbit/0/123",
  participantAccountAddresses: ["abc", "xyz"],
  address: "0x...",
});

// If the button action type was `post`
const updatedFrameMetadata = await framesClient.proxy.post(
  framePostUrl,
  payload,
);
// If the button action type was `post_redirect`
const { redirectedTo } = await framesClient.proxy.postRedirect(
  framePostUrl,
  payload,
);
// If the button action type was `postTransaction`
const transactionInfo = await framesClient.proxy.postTransaction(
  framePostUrl,
  payload,
);
```
