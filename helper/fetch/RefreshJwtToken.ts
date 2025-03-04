import {Tokens} from "@/constants/WihTypes/Auth";
import {ApiConfig} from "@/components/appContexts/ConfigContext";
import {Endpoints} from "@/constants/endpoints";
import {WihResponse} from "@/helper/fetch/WihResponse";

let refreshJwtTokenQueue: Promise<Tokens | null> | null = null;

export async function refreshJwtToken(
    refreshToken: string,
    config: ApiConfig,
    onNewTokens?: (newTokens: Tokens | null) => void
): Promise<Tokens | null> {
    if (!refreshJwtTokenQueue) {
        refreshJwtTokenQueue = (async () => {
            const tokens = await refresh(refreshToken, config, onNewTokens);
            refreshJwtTokenQueue = null;
            return tokens;
        })();
    }
    return refreshJwtTokenQueue;
}

async function refresh(
    refreshToken: string,
    config: ApiConfig,
    onNewTokens?: (newTokens: Tokens | null) => void
): Promise<Tokens | null> {

    const headers = new Headers();
    headers.append("RefreshToken", refreshToken);
    headers.append("X-API-KEY", config.apikey!);
    headers.append("Content-Type", "application/json");

    const uri = buildUrl(config, );

    const response = await fetch(uri, {
        method: "POST",
        headers: headers,
        mode: "cors"
    });

    const wihResponse = await WihResponse.fromResponse<Tokens>(response);

    if (!wihResponse.isValid()){
        return null;
    }

    onNewTokens && onNewTokens(wihResponse.data!);
    return wihResponse.data!;
}

function buildUrl(config: ApiConfig): string {
    return `${config.baseUri}/api/v1/${Endpoints.auth.refresh}`;
}
