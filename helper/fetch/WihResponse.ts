export class WihResponse<T> {
    private readonly errorMessage?: string;

    readonly status: number;
    readonly success: boolean;
    readonly refreshFailed: boolean;

    readonly data?: T;
    readonly error?: Error;

    private constructor(status: number, success: boolean, data?: T, errorMessage?: string, refreshFailed: boolean = false, error?: Error) {
        this.status = status;
        this.success = success;
        this.data = data;
        this.errorMessage = errorMessage;
        this.error = error;
        this.refreshFailed = refreshFailed;

        if(__DEV__ && !this.success){
            console.error(`Got an failing response: ${this.getErrorMessage()}`)
        }
    }

    static async fromResponse<T>(response: Response): Promise<WihResponse<T>> {
        if (response.ok) {
            const data = await response.json();
            return new WihResponse<T>(response.status, true, data);
        }

        const errorText = await response.text();
        return new WihResponse<T>(response.status, false, undefined, errorText || response.statusText);
    }

    static fail<T>(errorMessage: string, status: number = 400, refreshFailed: boolean = false): WihResponse<T> {
        return new WihResponse<T>(status, false, undefined, errorMessage, refreshFailed);
    }

    static error<T>(error: Error): WihResponse<T> {
        return new WihResponse<T>(-1, false, undefined, error.message, false, error);
    }

    isValid(): boolean {
        return this.success;
    }

    getErrorMessage(): string {
        return this.errorMessage || "Unknown error";
    }
}