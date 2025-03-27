const API_ROOT = 'http://localhost:3001/api/v1/'
import 'dotenv/config'


/**
 *  Get the user's basic info like display name and API tokens (trials) the user has
 * 
 * @returns JSON object containing their data
 */
export async function getUserProfile(){
    const response = await fetch(`${process.env.API_URL}/users/profile/`, {
        credentials: "include",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user profile");
    }
    const info = await response.json();
    return info.data;
}

