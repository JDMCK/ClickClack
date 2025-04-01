const API_ROOT = 'https://api.clickclack.aabuharrus.dev/api/v1'

/**
 *  Get the user's basic info like display name and API tokens (trials) the user has
 * 
 * @returns JSON object containing their data
 */
export async function getUserProfile(){
    const response = await fetch("https://api.clickclack.aabuharrus.dev/api/v1/users/profile/", {
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


export async function getTests() {
    // const endpoint = limit > 0 ? `get-tests?limit=${limit}` : "get-tests"
    const response = await fetch(`https://api.clickclack.aabuharrus.dev/api/v1/tests/get-tests/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error("Failed to fetch scores.");
      }
      const fetched = await response.json()
    
}


export async function logOutReq(){
    const response = await fetch(`https://api.clickclack.aabuharrus.dev/api/v1/auth/logout/`, {
        credentials: "include",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(response)
    if (!response.ok) {
        throw new Error("Failed to fetch user profile");
    }
    return response.message
}
