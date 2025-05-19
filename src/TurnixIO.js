// src/TurnixIO.js

export class TurnixIO {
    constructor({ apiUrl = "https://turnix.io/api/v1/credentials/ice", bearerToken }) {
        if (!bearerToken) throw new Error("Bearer token is required");
        this.apiUrl = apiUrl;
        this.bearerToken = bearerToken;
    }

    /**
     * Request ICE credentials from the TURNIX API
     * @param {Object} options
     * @param {string} [options.room]
     * @param {string} [options.initiatorClient]
     * @param {string} [options.receiverClient]
     * @param {number} [options.ttl]
     * @param {string} [options.fixedRegion]
     * @param {string} [options.preferredRegion]
     * @returns {Promise<Array>} ICE servers array
     */
    async requestCredentials({
                                 room,
                                 initiatorClient,
                                 receiverClient,
                                 ttl,
                                 fixedRegion,
                                 preferredRegion
                             } = {}) {
        const body = new URLSearchParams();
        if (room) body.append("room", room);
        if (initiatorClient) body.append("initiator_client", initiatorClient);
        if (receiverClient) body.append("receiver_client", receiverClient);
        if (ttl) body.append("ttl", ttl);
        if (fixedRegion) body.append("fixed_region", fixedRegion);
        if (preferredRegion) body.append("preferred_region", preferredRegion);

        const res = await fetch(this.apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.bearerToken}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Failed to fetch ICE credentials: ${res.status} ${text}`);
        }

        const data = await res.json();
        return data.iceServers;
    }
}
