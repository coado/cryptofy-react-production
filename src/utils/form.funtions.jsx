
export const checkTradeType = (typeOfTrade) => {
    const tradeTypes = ['Trade', 'Deposit', 'Withdrawal', 'Mining', 'Other'];

    if(!tradeTypes.some(el => el === typeOfTrade)) {

        return false;
    } else {
        return true;
    }
};

export const sliceComment = (comment) => {
        comment = comment.split(' ').map(el => {
        if (el.length > 20) {
            const maxCharactersInOneLine = 15;
            const workArr = [];
            const count = Math.ceil(el.length / maxCharactersInOneLine);
            for (let i = 0; i < count; i++) {
                i + 1 === count ?
                workArr.push(el.slice(i*maxCharactersInOneLine, (i+1)*maxCharactersInOneLine)) :
                workArr.push(el.slice(i*maxCharactersInOneLine, (i+1)*maxCharactersInOneLine) + ' ');
            }
            return workArr.join('')
        }
        return el;
    }).join(' ');

    return comment;
};

export const replaceComma = data => {
        return data.replace(',','.');
};

export const checkNumberField = (...data) => {
    const res = data.some(el => isNaN(el));
    return res;
};

export const removeDolarSign = data => {
    const res = data.replace(/\$/g, '');
    return res;
};

export const calculatePercentageCourseChange = (buyCourse, sellCourse) => {
     return (Math.round(((sellCourse / buyCourse)*100 - 100)*100)) / 100
};