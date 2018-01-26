const config = {
    //port
    port:process.env.PORT || 3000,
    //db
    db:'mongodb://localhost/gd-blog',
    //test environment
    test_env:'test',
    test_db: 'gd-blog-test',
    test_port:3001
};

export default config;