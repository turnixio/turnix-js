# @turnix/js

Lightweight JavaScript SDK for requesting TURN/STUN credentials from the Turnix API.

> To use it goto http://turnix.io and register account. You can start for free.

## 📦 Install

```bash
npm install turnix-js

```

# Usage

```js
import { TurnixIO } from '@turnix/js';

const turnix = new TurnixIO({
  bearerToken: 'your-bearer-token'
});

const iceServers = await turnix.requestCredentials({
    initiatorClient: 'alice@example.com',
    receiverClient: 'bob@example.com',
    room: 'demo-room',
    ttl: 60
});

const pc = new RTCPeerConnection({ iceServers });

```

## Advanced Options

All parameters are optional. Pass only those you need:

| Parameter         | Type     | Description                                                                                                                                                                                           |
| ----------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `initiatorClient` | `String` | An identifier for the call initiator.                                                                                                                                                                 |
| `receiverClient`  | `String` | An identifier for the call receiver.                                                                                                                                                                  |
| `room`            | `String` | A room or session identifier to scope TURN URLs.                                                                                                                                                      |
| `ttl`             | `int`    | Time-to-live in seconds for the credentials.                                                                                                                                                          |
| `fixedRegion`     | `String` | **Strict region**: forces allocation in the specified region (e.g., `us-east-1`); if unavailable, the request will fail.                                                                              |
| `preferredRegion` | `String` | **Preferred region**: hints allocation in a region (e.g., `eu-central-1`); if unavailable, the server will fall back to another region.                                                               |
| `clientIp`        | `String` | Client IP for geofencing, sent as `X-TURN-CLIENT-IP` header. Defaults to the requester's IP address if unset, used to determine region when neither `fixedRegion` nor `preferredRegion` is specified. |
