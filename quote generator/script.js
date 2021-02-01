// Get quote from forismatic API

async function getQuote() {
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
         
    } catch (error) {
        console.log("Oops, no quote", error);
    }
}

getQuote()