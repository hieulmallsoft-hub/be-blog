const fetchApi = async () => {
    try {
        // vì hàm fetch là hàm bết đồng bộ thế cho nên phải dùng wait nếu không thì nó sẽ bỏ qua 
        // để xuống dòng tiếp theo và không lấy data 
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");// lấy data mất 3s
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchApi();

export default fetchApi;