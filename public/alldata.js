function AllData() {
    const [data, setData] = React.useState('');    

    React.useEffect(() => {
        
        // fetch all accounts from API (/public/index.js)
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(JSON.stringify(data));                
            });

    }, []);

    return (<>
        <h5>All Accounts:</h5>
        {data}
    </>);
}
