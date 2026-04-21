const register = async ({name, email, password, role}) => {
    // 1. check email already exist or not, if yes throw err
    // 2. hash password
    // 3. create and send verification token to user's email
    // 4. send userObj -password -verification token
}

const login = async () => {
    
}

export {
    register,
    login
}