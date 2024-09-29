export interface LoginResponse {
    result: {
        user: {
            id: string;
            email: string;
            name: string;
            phoneNumber: string;
        };
        token: string;
    };
    isSuccess: boolean;
    message: string;
} 