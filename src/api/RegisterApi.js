const registerMember = async (bookUser) => {
    
    return await fetch("http://localhost:8080/api/member/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookUser),
    });
        
};

export {registerMember}
    