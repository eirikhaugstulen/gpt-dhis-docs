
export const generateId = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const allowedChars = "0123456789" + letters;
    const NUMBER_OF_CODEPOINTS = allowedChars.length;
    const CODESIZE = 11;
    var uid;

    //the uid should start with a char
    uid = letters.charAt( Math.random() * (letters.length) );

    for ( var i = 1; i < CODESIZE; ++i ){
        uid += allowedChars.charAt( Math.random() * (NUMBER_OF_CODEPOINTS) );
    }

    return uid;
}
