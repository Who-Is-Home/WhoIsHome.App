import {useCallback} from "react";
import {useSession} from "@/components/auth/context";
import {Tokens} from "@/constants/WihTypes/Auth";
import {wihFetch, WihResponse} from "@/helper/WihApi";
import {useApiConfig} from "@/components/config/context";

export interface WihApiProps<T> {
    endpoint: string;
    method: "GET" | "POST" | "DELETE" | "PATCH";
    onResponse: (response: WihResponse<T> | null) => void;
    version?: number;
}

export default function useWihApiCallable<T = {}>({
                                                      endpoint,
                                                      onResponse,
                                                      method,
                                                      version = 1
                                                  }: WihApiProps<T>): (body: T) => void {
    const {config} = useApiConfig();
    const {session, onNewSession} = useSession();

    function onNewTokens(tokens: Tokens | undefined) {
        if (tokens) {
            onNewSession(tokens);
        }
    }

    return useCallback((body: T) => {
        if (!session) return;

        wihFetch<T>({endpoint, method, version, body, tokens: session, config: config!, onNewTokens})
            .then(e => onResponse(e));
    }, [endpoint]);
}