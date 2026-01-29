export interface ContactFormData {
    name: string;
    phone: string;
    email: string;
    businessName: string;
    address: string;
    demoDate: string;
    demoTime: string;
}

export const submitToGoogleSheets = async (data: ContactFormData) => {
    try {
        const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

        if (!scriptURL) {
            console.error('Google Script URL is not defined in environment variables.');
            return { success: false, error: 'Configuration Error' };
        }

        // Add submission timestamp if not present
        const payload = {
            ...data,
            timestamp: new Date().toISOString()
        };

        // Use 'no-cors' mode for Google Apps Script to avoid CORS errors in browser
        // Note: In 'no-cors' mode, we can't read the response status or body.
        // We assume success if no network error occurs.
        await fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8', // Google Script likes text/plain to avoid preflight usually
            },
            mode: 'no-cors'
        });

        return { success: true };

    } catch (error) {
        console.error('Error submitting form:', error);
        return { success: false, error: 'Submission Failed' };
    }
};
