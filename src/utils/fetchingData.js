
 const fetchingData = async (data, to) => {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${data}&vs_currencies=${to}`);
    const course = await res.json();
    return course;
};

export default fetchingData;