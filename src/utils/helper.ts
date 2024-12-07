const nameValidation = (name: string): boolean => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(name)) {
        return false; // Invalid if the name contains invalid characters
      }
    if (name.length < 3) {
        return false;
    }
    return true;
}
const roomCodeValidation = (roomCode: string): boolean => {
    const regex = /^[A-Z0-9]*$/;
    if (!regex.test(roomCode)) {
        return false;
    }
    if (roomCode.length !== 6) {
        return false;
    }
    return true;
}

export default {
    nameValidation,
    roomCodeValidation
} 