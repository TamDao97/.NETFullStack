export interface IToast {
    title: string;
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    delay?: number;
}